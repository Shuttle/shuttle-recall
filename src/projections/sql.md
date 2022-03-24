# Sql Server

```
PM> Install-Package Shuttle.Recall.Sql.EventProcessing
```

A Sql Server implementation of the `Shuttle.Recall` event sourcing mechanism.

## Event Processing

``` c#
// use any of the supported DI containers
var container = new WindsorComponentContainer(new WindsorContainer());

EventStore.Register(container);

// register event handlers for event processing along with any other dependencies
container.Register<MyHandler, MyHandler>();
container.Register<IMyQueryFactory, MyQueryFactory>();
container.Register<IMyQuery, MyQuery>();

EventStoreConfigurator.Configure(container);

var processor = EventProcessor.Create(container);

using (container.Resolve<IDatabaseContextFactory>().Create("ProjectionConnectionName"))
{
    processor.AddProjection("ProjectionName");

    resolver.AddEventHandler<BowlingHandler>("ProjectionName");
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
			connectionString="Data Source=.\sqlexpress;Initial Catalog=EventStoreDatabase;Integrated Security=SSPI;" 
			providerName="System.Data.SqlClient" />
		<add 
			name="EventProjection" 
			connectionString="Data Source=.\sqlexpress;Initial Catalog=EventProjectionDatabase;Integrated Security=SSPI;" 
			providerName="System.Data.SqlClient" />
	</connectionStrings>
</configuration>
```

The `IDatabaseContextFactory` and `IDatabaseGateway` implementation follow the structures as defined in the [Shuttle.Core.Data](https://shuttle.github.io/shuttle-core/data/shuttle-core-data.html) package.

## Registration / Activation

The required components may be registered by calling `ComponentRegistryExtensions.RegisterEventProcessing(IComponentRegistry)`.

In order for the event processing module to attach to the `IPipelineFactory` you would need to resolve it using `IComponentResolver.Resolve<EventProcessingModule>()`.

