---
layout: api
title: Event Sourcing - Sql Server
---

# Sql Server

The `Shuttle.Recall.SqlServer` packages provides implementations of the `IEventStore` and `IKeyStore` and makes use of the `Shuttle.Core.Data`[<a href="http://shuttle.github.io/shuttle-core/overview-data/" target="_blank">^</a>] components as well as the `ISerializer` from the `Shuttle.Core.Infrastructure`[<a href="http://shuttle.github.io/shuttle-core/overview-serializer/" target="_blank">^</a>] component.

## EventStore

### Constructor

``` c#
public EventStore(ISerializer serializer, IDatabaseGateway databaseGateway, IEventStoreQueryFactory queryFactory)
```

Typically you would make use of the `DefaultSerializer` from the `Shuttle.Core.Infrastructure` package.  If you prefer serilizing to something other the Xml then you would need another implementation.  The `EventStoreQueryFactory` implements the `IEventStoreQueryFactory` and returns all the `IQuery` instnaces required to interact with the `EventStore` database.

### Database

You would need to execute the `EventStoreCreate.sql` script against your event store database in order to create the structures required for the event store to operate.

### Usage

``` c#
var databaseContextFactory = DatabaseContextFactory.Default();
var eventStore = new EventStore(new DefaultSerializer(), new DatabaseGateway(), new EventStoreQueryFactory());

using (databaseContextFactory.Create("eventStringConnectionStringName"))
{
    var stream = eventStore.Get(sampleAggregateId);

    if (stream.IsEmpty)
    {
        return;
    }

    sampleAggregate = new SampleAggregate(sampleAggregateId;
    stream.Apply(sampleAggregate);

    stream.AddEvent(sampleAggregate.CommandReturningEvent("Some Data"));

    eventStore.SaveEventStream(stream);
}
```

<br/>