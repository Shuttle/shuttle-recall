---
layout: api
title: Event Sourcing
---

# Approach

Shuttle.Recall takes a slightly different approach to most event-sourcing mechanisms in that it is non-intrusive.  

An `EventStream` contains events for a given `Guid` identifier and is kept outside of your object at all times.  You do not need to keep track of the events (old or new) in a list within your object.

Your domain object should only be concerned about handling the relevant commands issued to it and returning one or more events from those methods.  These will then be added to your `EventStream` before being persisted using an `IEventStore` implementation.

