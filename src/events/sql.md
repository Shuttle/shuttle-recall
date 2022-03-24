# Sql Server

```
PM> Install-Package Shuttle.Recall.Sql.Storage
```

A Sql Server implementation of the `Shuttle.Recall` event sourcing `EventStore`.

# Registration

The required components may be registered by calling `ComponentRegistryExtensions.RegisterEventStoreStorage(IComponentRegistry)`.

## Event Store

``` c#
// use any of the supported DI containers
var container = new WindsorComponentContainer(new WindsorContainer());

container.RegisterEventStoreStorage();

var eventStore = container.Resolve<IEventStore>();
```
