---
layout: api
title: Event Sourcing
---

# Overview

Shuttle.Recall takes a slightly different approach to most event-sourcing mechanisms in that it is non-intrusive.  

An `EventStream` contains events for a given `Guid` identifier and is kept outside of your object at all times.  You do not need to keep track of the events (old or new) in a list within your object.

Your domain object should only be concerned about handling the relevant commands issued to it and returning one or more events from those methods.  These will then be added to your `EventStream` before being persisted using an `IEventStore` implementation.

## EventStream

Typically you would not create an `EventStream` directly but rather make use of an `IEventStore` implementation.  You would, however, add events to an `EventStream` and call the `Apply` method to apply all events within the stream to a given object.

An event stream has a `Guid` identifier that is the surrogate key used by the `IEventStore` for your aggregate.  It also has a version number that starts at 0.  Each time an event is added to the stream the version is incremented by 1 **and** the version number is assigned to the event.  This version is also used to check for concurrency violations.  When you `Get` an `EventStream` from an `IEventStore` implementation the initial version is saved.  When you try to save the event stream and the version of the event stream in the store does not match the initial version of the stream an `EventStreamConcurrencyException` should be raised by the `IEventStore` implementation.

### Snapshot

As you can imagine, over time an `EventStream` may become quite large.  A `Snapshot` is just an ordinary event that is added as a snapshot and contains the current state of your aggregate.  Since a snapshot is an event it has a specific version number.  If the `IEventStore` finds a snapshot it is first applied and all events after the sansphot's version number are loaded and applied.  In this way you can cut down on the number of events loaded.  You can delete the snapshot at any time as all the events will then simply be loaded and a new snapshot can be added to the event stream if required.

## IEventStore

An `IEventStore` implementation should be able to persis and retireve an `EventStream`:

~~~ c#
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
~~~

# API

## EventStream

### Constructor

~~~ c#
public EventStream(Guid id)
public EventStream(Guid id, int version, IEnumerable<Event> events, Event snapshot)
~~~

### Properties

~~~ c#
public Guid Id { get; private set; }
public int Version { get; private set; }
public Event Snapshot { get; private set; }
public bool Removed { get; private set; }
~~~

### Remove

~~~ c#
public void Remove()
~~~

### IsEmpty

~~~ c#
public bool IsEmpty
~~~

### CommitVersion

~~~ c#
public void CommitVersion()
~~~

Makes the initial version of the stream the current version.

### AddEvent

~~~ c#
public void AddEvent(object data)
~~~

### AddSnapshot

~~~ c#
public void AddSnapshot(object data)
~~~

### ShouldSnapshot

~~~ c#
public bool ShouldSnapshot(int snapshotEventCount)
~~~

### AttemptSnapshot

~~~ c#
public bool AttemptSnapshot(int snapshotEventCount)
~~~

### CanSnapshot

~~~ c#
public bool CanSnapshot { get; }
~~~

### EventsAfter

~~~ c#
public IEnumerable<Event> EventsAfter(Event @event)
public IEnumerable<Event> EventsAfter(int version)
~~~

### NewEvents

~~~ c#
public IEnumerable<Event> NewEvents()
~~~

### PastEvents

~~~ c#
public IEnumerable<Event> PastEvents()
~~~

### Apply

~~~ c#
public void Apply(object instance)
public void Apply(object instance, string eventHandlingMethodName)
~~~

### HasSnapshot

~~~ c#
public bool HasSnapshot { get; }
~~~

### ConcurrencyInvariant

~~~ c#
public void ConcurrencyInvariant(int expectedVersion)
~~~

### EmptyInvariant

~~~ c#
public static void EmptyInvariant(this EventStream stream)
~~~