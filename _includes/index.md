### Let's get going!

Start a new **Console Application** project called `RecallQuickstart` and select a Shuttle.Recall implementation from the [supported implementations]({{ site.baseurl }}/packages/):

<div class="nuget-badge">
	<p>
		<code>Install-Package Shuttle.Recall.Sql</code>
	</p>
</div>

Now we'll need select one of the [supported containers](http://shuttle.github.io/shuttle-core/overview-container/#Supported):

<div class="nuget-badge">
	<p>
		<code>Install-Package Shuttle.Core.Castle</code>
	</p>
</div>

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
.\packages\Shuttle.Recall.Sql.8.0.0\scripts\EventStoreCreate.sql
```

Add the relevant `connectionString` to the `App.config` file:

``` xml
<configuration>
  <connectionStrings>
    <add name="EventStore"
         connectionString="data source=.\sqlexpress;initial catalog=RecallQuickstart;integrated security=true"
         providerName="System.Data.SqlClient" />
  </connectionStrings>

  <startup>
    <supportedRuntime version="v4.0" sku=".NETFramework,Version=v4.5.2" />
  </startup>
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
            // in a seperate project... done here as example
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

# Event Sourcing

For some background you can have a look at the following:

- [Event Sourcing FAQs](http://cqrs.nu/Faq/event-sourcing)
- [Event Sourcing (Martin Fowler)](http://martinfowler.com/eaaDev/EventSourcing.html)
- [Event Sourcing Pattern (MSDN)](https://msdn.microsoft.com/en-us/library/dn589792.aspx)

The basic premise of event sourcing is that we do not store only the latest state of a particular object but rather *rebuild* the state of the objects by applying each state change in the same sequence that the change occurred.

This is quite a departure from what one typically learns about storing data.  However, let's use the example of a financial account.  Each time we transact using an account the balance of the account changes.  However, we do not simply store only the balance.  We also store each transaction and the amount.  This means that we could "*lose*" the balance on an account but we would be able to determine the current balance by applying all the transactions to the balance in the order that they occurred. 

It is rather odd that we are quite happy with our traditional data storage for our everyday objects such as `Customer`, `Employee`, and `Address` where we simply store the current/latest state but we would never consider *not* storing the transactions when it comes to an account.  Accounting is a very established discipline and this is one of those cases where they got it spot on.

Even souring effectively does the same thing by storing all changes as a series of events.  However, it is not possible to get an overview of the state of the object by querying the events in the same way as we have no idea what the balance is at a particular point by simply querying some account transactions.

## CQRS != Event Sourcing

Command/Query Responsibility Segregation relates to explicitly separating the command side of things (transactional / OLTP) from the querying (read / reporting / OLAP) side of things.  This, in no way, implies that event sourcing is a requirement in order to implement CQRS, though.  However, when implementing event sourcing you are definitely going to be implementing CQRS.