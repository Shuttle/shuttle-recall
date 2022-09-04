# Events

## EventStore

An `EventStream` contains events for a given `Guid` identifier and is kept outside of your object at all times.

Your domain object would only be concerned about handling the relevant commands issued to it and returning one or more events from those methods.  These will then be added to your `EventStream` before being persisted using an `IEventStore` implementation.

``` c#
IEventStore store = new EventStore();

var aggregate = new Aggregate(Guid.NewGuid());
var eventStream = store.Get(aggregate.Id);

eventStream.AddEvent(aggregate.Move(moveCommand));

// When youhave a substantial number of events 
// you may want to add a snapshot, such as `ClosingBalance`/`OpeningBalance`.
eventStream.AddSnapshot(aggregate.State);
    
store.Save(eventStream);

eventStream = store.Get(aggregate.Id);

Assert.IsFalse(eventStream.IsEmpty);

store.Remove(aggregate.Id);

eventStream = store.Get(aggregate.Id);

Assert.IsTrue(eventStream.IsEmpty);
```

## EventStream

Typically you would not create an `EventStream` directly but rather make use of an `IEventStore` implementation.  You would, however, add events to an `EventStream` and call the `Apply` method to apply all events within the stream to a given object.

An event stream has a `Guid` identifier that is the surrogate key used by the `IEventStore` for your aggregate.  It also has a version number that starts at 0.  Each time an event is added to the stream the version is incremented by 1 **and** the version number is assigned to the event.  This version is also used to check for concurrency violations.  When you `Get` an `EventStream` from an `IEventStore` implementation the initial version is saved.  When you try to save the event stream and the version of the event stream in the store does not match the initial version of the stream an `EventStreamConcurrencyException` should be raised by the `IEventStore` implementation.

As you can imagine, over time an `EventStream` may become quite large.  A `Snapshot` is just an ordinary event that is added as a snapshot and contains the current state of your aggregate.  Since a snapshot is an event it has a specific version number.  If the `IEventStore` finds a snapshot, it is first applied and all events after the sansphot's version number are loaded and applied.  In this way you can cut down on the number of events loaded.  You can delete the snapshot at any time as all the events will then simply be loaded and a new snapshot can be added to the event stream if required.

### Constructor

``` c#
public EventStream(Guid id, IEventMethodInvoker eventMethodInvoker);
public EventStream(Guid id, int version, IEnumerable<DomainEvent> events, IEventMethodInvoker eventMethodInvoker)
```

Creates a new `EventStream` instance wityh the given properties.  The `IEventMethodInvoker` is responsible for invoking the relevant method related to the event on a provided aggregate instance.

### Properties

``` c#
public Guid Id { get; private set; }
public int Version { get; private set; }
public object Snapshot { get; private set; }
public int Count => (_events?.Count ?? 0) + _appendedEvents.Count;
public bool IsEmpty => Count == 0;
public bool HasSnapshot => Snapshot != null;
public bool Removed { get; private set; }
```

### Remove

``` c#
public void Remove()
```

This will set the `Removed` property to `true`.  When the `EventStream` is saved using an `IEventStore` implementation it is the responsibility of the event store to remove all the events associated with the `Id`.

### Commit

``` c#
public void Commit()
```

Adds any appended events to the events and makes the initial version of the stream the current version which is the version number of the last event appended.

### AddEvent

``` c#
public void AddEvent(object data)
```

Adds a new event to the stream with the next version number applied.  This is any instance of any class.  Events will be defined by your domain:

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

### ShouldSave

``` c#
public bool ShouldSave()
```

Returns `true` if there are are any appended events; else `false`.

### GetEvents

``` c#
public IEnumerable<DomainEvent> GetEvents(EventRegistrationType type = EventRegistrationType.Appended)
```

Returns the event represented by the given `EventRegistrationType`.

### Apply

``` c#
public void Apply(object instance);
```

Applies all the events in the stream against the given object by calling the `IEventMethodInvoker` provided to the event strean constructor. 

The following is an example of an event method:

``` c#
private void On(Sample.Events.v1.SomeEvent someEvent)
{
    _someData = someEvent.SomeData;
}
```

### ConcurrencyInvariant

``` c#
public void ConcurrencyInvariant(int expectedVersion)
```

If the event stream's version is not at the `expectedVersion` an `EventStreamConcurrencyException` is thrown.

# IEventStore

An `IEventStore` implementation should be able to persis and retireve an `EventStream`:

### Get

``` c#
EventStream Get(Guid id);
```

Returns a populated `EventStream` with any available snapshot applied.

### Remove

``` c#
void Remove(Guid id);
```

All events that belong to the given `id` are removed.

### Save

``` c#
long Save(EventStream eventStream);
long Save(EventStream eventStream, Action<EventEnvelopeBuilder> builder);
```

Persists the given `EventStream`.  If it contains a snapshot the snapshot is also saved.

## ITypeStore

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