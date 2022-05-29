# Sql Server

```
PM> Install-Package Shuttle.Recall.Sql.EventProcessing
```

A Sql Server implementation of the `Shuttle.Recall` event sourcing mechanism.

## Event Processing

``` c#
// use any of the supported DI containers
var container = new NinjectComponentContainer(new StandardKernel());

// This registers the event store dependencies provided by Shuttle.Recall 
// - also registers event handlers in referenced assemblies
container.RegisterEventStore();

// This registers the sql server implementations provided by Shuttle.Recall.Sql.Storage, for instance
container.RegisterEventStoreStorage();

// This registers the sql server implementations provided by Shuttle.Recall.Sql.EventProcessing, for instance
container.RegisterEventProcessing();

// The following is important to remember as it connects the event processing module to the pipeline factory
container.Resolve<EventProcessingModule>();

container.Register<IMyQueryFactory, MyQueryFactory>();
container.Register<IMyQuery, MyQuery>();

var processor = container.Resolve<IEventProcessor>();

using (container.Resolve<IDatabaseContextFactory>().Create("ProjectionConnectionName"))
{
    // Adds the relevant projection to the processor which keeps track of the projection position
    processor.AddProjection("ProjectionName");

    // Attaches the given event handler implementation to the projection, by name
    resolver.AddEventHandler<BowlingHandler>("ProjectionName");

    // A short-hand format for the above is as follows:
    // resolver.AddEventHandler<BowlingHandler>(processor.AddProjection("ProjectionName"));
}

processor.Start();

// wait for application run to complete

processor.Dispose();
```

## Application Configuration File

``` xml
<configuration>
	<configSections>
		<sectionGroup name="shuttle">
			<section 
				name="projection" 
				type="Shuttle.Recall.Sql.EventProcessing.ProjectionSection, Shuttle.Recall.Sql.EventProcessing" />
		</sectionGroup>
	</configSections>

	<shuttle>
		<projection eventStoreConnectionStringName="EventStore" eventProjectionConnectionStringName="EventProjection" />
	</shuttle>

	<connectionStrings>
		<clear />
		<add 
			name="EventStore" 
			connectionString="Data Source=.;Initial Catalog=EventStoreDatabase;Integrated Security=SSPI;" 
			providerName="System.Data.SqlClient" />
		<add 
			name="EventProjection" 
			connectionString="Data Source=.;Initial Catalog=EventProjectionDatabase;Integrated Security=SSPI;" 
			providerName="System.Data.SqlClient" />
	</connectionStrings>
</configuration>
```

The `IDatabaseContextFactory` and `IDatabaseGateway` implementation follow the structures as defined in the [Shuttle.Core.Data](https://shuttle.github.io/shuttle-core/data/shuttle-core-data.html) package.

## Registration / Activation

The required components may be registered by calling `ComponentRegistryExtensions.RegisterEventProcessing(IComponentRegistry)`.

In order for the event processing module to attach to the `IPipelineFactory` you would need to resolve it using `IComponentResolver.Resolve<EventProcessingModule>()`.
