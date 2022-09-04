# Sql Server

```
PM> Install-Package Shuttle.Recall.Sql.EventProcessing
```

A Sql Server implementation of the `Shuttle.Recall` event sourcing mechanism.

## Configuration

```c#
services.AddSqlEventProcessing(builder => 
{
	builder.Options.EventProjectionConnectionStringName = "event-projection-connection-string-name";
	builder.Options.EventStoreConnectionStringName = "event-store-connection-string-name";
});

services.AddEventStore(builder =>
{
    builder.AddEventHandler<ProjectionNameHandler>("ProjectionName");
});
```

The default JSON settings structure is as follows:

```json
{
  "Shuttle": {
    "EventProcessing": {
      "EventProjectionConnectionStringName": "event-projection-connection-string-name",
      "EventStoreConnectionStringName": "event-store-connection-string-name"
    }
  }
}
```
## Database

In order to create the relevant database structures execute the relevant `ProjectionCreate.sql` script:

```
%userprofile%\.nuget\packages\shuttle.recall.sql.eventprocessing\{version}\scripts\{provider}\ProjectionCreate.sql
```

## Supported providers

- `Microsoft.Data.SqlClient`
- `System.Data.SqlClient`

If you'd like support for another SQL-based provider please feel free to give it a bash and send a pull request if you *do* go this route.  You are welcome to create an issue and assistance will be provided where possible.
