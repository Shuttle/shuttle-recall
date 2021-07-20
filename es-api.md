---
layout: api
title: Event Sourcing
---

# Overview

An `EventStream` contains events for a given `Guid` identifier and is kept outside of your object at all times.  You do not need to keep track of the events (old or new) in a list within your object.

Your domain object should only be concerned about handling the relevant commands issued to it and returning one or more events from those methods.  These will then be added to your `EventStream` before being persisted using an `IEventStore` implementation.

``` c#
IEventStore store = new EventStore();

var aggregate = new Aggregate(Guid.NewGuid());
var eventStream = store.Get(aggregate.Id);

eventStream.AddEvent(aggregate.Move(moveCommand));

if (eventStream.ShouldSnapshot(100))
{
    eventStream.AddSnapshot(aggregate.State);
}
    
store.SaveEventStream(eventStream);

eventStream = store.Get(aggregate.Id);

Assert.IsFalse(eventStream.IsEmpty);

store.Remove(aggregate.Id);

eventStream = store.Get(aggregate.Id);

Assert.IsTrue(eventStream.IsEmpty);
```

# EventStream

Typically you would not create an `EventStream` directly but rather make use of an `IEventStore` implementation.  You would, however, add events to an `EventStream` and call the `Apply` method to apply all events within the stream to a given object.

An event stream has a `Guid` identifier that is the surrogate key used by the `IEventStore` for your aggregate.  It also has a version number that starts at 0.  Each time an event is added to the stream the version is incremented by 1 **and** the version number is assigned to the event.  This version is also used to check for concurrency violations.  When you `Get` an `EventStream` from an `IEventStore` implementation the initial version is saved.  When you try to save the event stream and the version of the event stream in the store does not match the initial version of the stream an `EventStreamConcurrencyException` should be raised by the `IEventStore` implementation.

As you can imagine, over time an `EventStream` may become quite large.  A `Snapshot` is just an ordinary event that is added as a snapshot and contains the current state of your aggregate.  Since a snapshot is an event it has a specific version number.  If the `IEventStore` finds a snapshot it is first applied and all events after the sansphot's version number are loaded and applied.  In this way you can cut down on the number of events loaded.  You can delete the snapshot at any time as all the events will then simply be loaded and a new snapshot can be added to the event stream if required.

### Constructor

``` c#
public EventStream(Guid id)
public EventStream(Guid id, int version, IEnumerable<Event> events, Event snapshot)
```

Creates a new `EventStream` instance wityh the given properties.

### Properties

``` c#
public Guid Id { get; private set; }
public int Version { get; private set; }
public Event Snapshot { get; private set; }
public bool Removed { get; private set; }
```

### Remove

``` c#
public void Remove()
```

This will set the `Removed` property to `true`.  When the `EventStream` is saved using an `IEventStore` implementation it is the responsibility of the event store to remove all the events associated with the `Id`.

### IsEmpty

``` c#
public bool IsEmpty
```

Returns `true` if there are no events in the stream; else `false`.

### CommitVersion

``` c#
public void CommitVersion()
```

Makes the initial version of the stream the current version.

### AddEvent

``` c#
public void AddEvent(object data)
```

Adds a new event to the stream.  This is any instance of any class.  Events will be defined by your domain:

``` c#
public class ItemAdded
{
    public Guid ProductId { get; set; }
    public string Description { get; set; }
    public decimal Price { get; set; }
}

var stream = new EventStream(Guid.NewGuid());

var itemAdded = new ItemAdded
        {
            ProductId = Guid.NewGuid(),
            Description = "SampleItem",
            Price = 125.50
        };
                
stream.AddEvent(itemAdded);
```

It will be up to the event store implementation to serialize the event data and persist it.

### AddSnapshot

``` c#
public void AddSnapshot(object data)
```

Similar to the `AddEvent` method, the `AddSnapshot` method is used to add an object that represents the complete state of the aggregate at any point in time.  It is essentially handled in the same way an event is.  When a snapshot is available it is loaded first and then all events following the snapshot would be loaded.  It is therefore important that your aggregate state is adequately represented by the snapshot object.

### ShouldSnapshot

``` c#
public bool ShouldSnapshot(int snapshotEventCount)
```

Returns `true` if there are at least the `snapshotEventCount` number of events in the stream; else `false`.  Once there are enough events in the stream a snapshot can be made.

### AttemptSnapshot

``` c#
public bool AttemptSnapshot(int snapshotEventCount)
```

This method works in conjunction with the `Apply` method.  When an object instance is provided to the `Apply` method Recall will check whether the object implements the `ICanSnapshot` interface.  If it does it means that the object can return a snapshot from the implement `GetSnapshotEvent` method.

The `AttemptSnaphot` will add a snapshot and return `true` if a snapshot could be added; else no snapshot will be added and `false` is returned.

### CanSnapshot

``` c#
public bool CanSnapshot { get; }
```

Returns `true` if the object supplied to the `Apply` method implements the `ICanSnapshot` interface.

### EventsAfter

``` c#
public IEnumerable<Event> EventsAfter(Event @event)
public IEnumerable<Event> EventsAfter(int version)
```

Returns all the events after the given `version` or the `Version` of the given `@event`.

### NewEvents

``` c#
public IEnumerable<Event> NewEvents()
```

Returns all the events added that have a version number higher than the initial stream version number.

### PastEvents

``` c#
public IEnumerable<Event> PastEvents()
```

Returns all events before, or equal to, the initial version of the stream.

### Apply

``` c#
public void Apply(object instance)
public void Apply(object instance, string eventHandlingMethodName)
```

Applies all the events in the stream against the given object by finding a method with the `eventHandlingMethodName`.  The default name used is `On`.  For each event type you would then need to have a `public` method with the relevant name that takes an instance of the event:

``` c#
public void On(Sample.Events.v1.SomeEvent someEvent)
{
    _someData = someEvent.SomeData;
}
```

### HasSnapshot

``` c#
public bool HasSnapshot { get; }
```

Returns `true` if the stream contains a snapshot; else `false`.

### ConcurrencyInvariant

``` c#
public void ConcurrencyInvariant(int expectedVersion)
```

If the event stream's version is not at the `expectedVersion` an `EventStreamConcurrencyException` is thrown.

### EmptyInvariant

``` c#
public static void EmptyInvariant(this EventStream stream)
```

If the stream is empty an `EventStreamEmptyException` is thrown.

# IEventStore

An `IEventStore` implementation should be able to persis and retireve an `EventStream`:

### Get

``` c#
EventStream Get(Guid id);
```

Returns a populated `EventStream` with any available snapshot applied.

### GetRaw

``` c#
EventStream GetRaw(Guid id);
```

Returns a populated `EventStream` that contains all events from version 0.  No snapshot is applied.

### Remove

``` c#
void Remove(Guid id);
```

All events that belong to the given `id` are removed.

### SaveEventStream

``` c#
void SaveEventStream(EventStream eventStream);
```

Persists the given `EventStream`.  If it contains a snapshot the snapshot is also saved.

# IKeyStore

You are bound to run into situations where you have a business or other key that is required to be unique.  Given that the `IEventStore` makes use of only surrogate keys the `IKeyStore` is used to create a unique list of keys associated with a given aggregate identifier.

Since the keys used in the key store have to be unique you should ensure that they contain enough information to be unique and have the intended meaning.

A key could be something such as `order-number:ord-001/2016` or even `customer-onboarding:id-number=0000005555089`.

### Contains

``` c#
bool Contains(string key);
```

Returns `true` if the given `key` has an associated aggregate identifier.

### Get

``` c#
Guid? Get(string key);
```

Returns the `Guid` associated with the given key; else `null`.

### Remove

``` c#
void Remove(string key);
void Remove(Guid id);
```

When specifying the `key` the assocation with the identifier will be removed.  When specifying the `id` all keys associated with the given `id` will be removed.

### Add

``` c#
void Add(Guid id, string key);
```

Createds an association between the `id` and the `key`.

# ITypeStore

You wouldn't typically interact directly with an `ITypeStore` implementation.  Each event type is stored in the type store using its fully qualified assembly type.  Since this is a rather significantly sized string it is assigned a unique `Guid` and this identifier is used when storing events.

### Get

``` c#
Guid Get(Type type);
```

Returns the `Guid` identifier for the given `type`.

### Add

``` c#
Guid Add(Type type);
```

Adds a new `type` to the store and returns the `Guid` identifier assigned to it.