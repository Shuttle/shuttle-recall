# Getting Started

Start a new **Console Application** project called `RecallQuickstart` and select a Shuttle.Recall implementation:

```
PM> Install-Package Shuttle.Recall.Sql.Storage
```

Now we'll need select one of the [supported containers](https://shuttle.github.io/shuttle-core/container/shuttle-core-container.html#implementations):

```
PM> Install-Package Shuttle.Core.Castle
```
Now we'll define the domain event that will represent a state change in the `Name` attribute:

``` c#
public class Renamed
{
    public string Name { get; set; }
}
```

Next we'll create our `Aggregate Root` that will make use of an `EventStream` to save it's states:

``` c#
public class AggregateRoot
{
    public Guid Id { get; private set; }
    public string Name { get; private set; }

    public AggregateRoot(Guid id)
    {
        Id = id;
    }

    public Renamed Rename(string name)
    {
        return On(new Renamed
        {
            Name = name
        });
    }

    public Renamed On(Renamed renamed)
    {
        Name = renamed.Name;

        return renamed;
    }
}
```

Create a new Sql Server database called `RecallQuickstart` to store our events and execute the following creation script against that database:

```
%userprofile%\.nuget\packages\shuttle.recall.sql.storage\{version\scripts\System.Data.SqlClient\EventStoreCreate.sql
```

Add the relevant `connectionString` to the `App.config` file:

``` xml
<configuration>
  <connectionStrings>
    <add name="EventStore"
         connectionString="data source=.\sqlexpress;initial catalog=RecallQuickstart;integrated security=true"
         providerName="System.Data.SqlClient" />
  </connectionStrings>
</configuration>
```

Next we'll use event sourcing to store an rehydrate our aggregate root from the `Main()` entry point:

``` c#
using System;
using System.Linq;
using Castle.Windsor;
using Shuttle.Core.Castle;
using Shuttle.Core.Data;
using Shuttle.Core.Infrastructure;
using Shuttle.Recall;

namespace RecallQuickstart
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            var container = new WindsorComponentContainer(new WindsorContainer());

            EventStore.Register(container);

            var id = Guid.NewGuid();

            // we can very easily also add unit tests for our aggregate
            // in a seperate project... done here as an example
            var aggregateRoot1 = new AggregateRoot(id);
            var stream1 = new EventStream(id);

            stream1.AddEvent(aggregateRoot1.Rename("Name-1"));
            stream1.AddEvent(aggregateRoot1.Rename("Name-2"));
            stream1.AddEvent(aggregateRoot1.Rename("Name-3"));
            stream1.AddEvent(aggregateRoot1.Rename("Name-4"));
            stream1.AddEvent(aggregateRoot1.Rename("Name-5"));

            if (aggregateRoot1.AllNames().Count() != 5)
            {
                throw new ApplicationException();
            }

            if (!aggregateRoot1.Name.Equals("Name-5"))
            {
                throw new ApplicationException();
            }

            var databaseContextFactory = container.Resolve<IDatabaseContextFactory>();
            var store = EventStore.Create(container);

            using (databaseContextFactory.Create("EventStore"))
            {
                store.Save(stream1);
            }

            var aggregateRoot2 = new AggregateRoot(id);
            EventStream stream2;

            using (databaseContextFactory.Create("EventStore"))
            {
                stream2 = store.Get(id);
            }

            stream2.Apply(aggregateRoot2);

            if (aggregateRoot2.AllNames().Count() != 5)
            {
                throw new ApplicationException();
            }

            if (!aggregateRoot2.Name.Equals("Name-5"))
            {
                throw new ApplicationException();
            }
        }
    }
}
```