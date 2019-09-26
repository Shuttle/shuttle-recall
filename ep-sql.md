---
layout: api
title: Event Sourcing - Sql Server
---

# Sql Server

The `Shuttle.Recall.SqlServer` packages provides an implementation of the `IProjectionService` interface and makes use of the `Shuttle.Core.Data`[<a href="http://shuttle.github.io/shuttle-core/overview-data/" target="_blank">^</a>] components as well as the `ISerializer` from the `Shuttle.Core.Infrastructure`[<a href="http://shuttle.github.io/shuttle-core/overview-serializer/" target="_blank">^</a>] component.

# ProjectionService

The `ProjectionService` is the Sql Server implementation of the `IProjectionService` interface.

## Constructor

~~~ c#
public ProjectionService(
    ISerializer serializer, 
    IProjectionConfiguration projectionConfiguration, 
    IDatabaseContextFactory databaseContextFactory, 
    IDatabaseGateway databaseGateway, 
    IProjectionQueryFactory queryFactory)
~~~

You can use the `DefaultSerializer` implementation for the `ISerializer` from the [Shuttle.Core.Infrastructure](http://shuttle.github.io/shuttle-core/overview-serializer/) package as a starting point.

The `IProjectionConfiguration` specifies the `ProviderName` and `ConnectionString` to use to connect to the database.  These can be configured using the `ProjectionSection` configuration section in the application configuration file:

~~~ xml
<configuration>
    <configSections>
        <sectionGroup name="shuttle">
            <section 
                name="projection" 
                type="Shuttle.Recall.SqlServer.ProjectionSection, Shuttle.Recall.SqlServer" />
        </sectionGroup>
    </configSections>

    <shuttle>
        <projection connectionStringName="EventStore" />
    </shuttle>

    <connectionStrings>
        <clear />
        <add 
            name="EventStore" 
            connectionString="Data Source=.\sqlexpress;Initial Catalog=shuttle;Integrated Security=SSPI;" 
            providerName="System.Data.SqlClient" />
    </connectionStrings>
</configuration>
~~~

You can then call `ProjectionSection.Configuration()` to return the configuration set up according to the application configuration files `ProjectionSection`.

The `IDatabaseContextFactory` and `IDatabaseGateway` implementation follow the structures as defined in the [Shuttle.Core.Data](http://shuttle.github.io/shuttle-core/overview-data/) package.

For the `IProjectionQueryFactory` you can simply specify `new ProjectionQueryFactory()`.

## Database

You would need to execute the `ProjectionCreate.sql` script against your projection database in order to create the structures required for the projection service to operate.
