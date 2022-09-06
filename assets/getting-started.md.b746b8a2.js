import { _ as _export_sfc, o as openBlock, c as createElementBlock, a as createStaticVNode } from "./app.be267ea5.js";
const __pageData = JSON.parse('{"title":"Getting Started","description":"","frontmatter":{"aside":false},"headers":[],"relativePath":"getting-started.md"}');
const _sfc_main = { name: "getting-started.md" };
const _hoisted_1 = /* @__PURE__ */ createStaticVNode('<h1 id="getting-started" tabindex="-1">Getting Started <a class="header-anchor" href="#getting-started" aria-hidden="true">#</a></h1><p>This guide demonstrates using Shuttle.Recall with a Sql Server implementation.</p><p>Start a new <strong>Console Application</strong> project called <code>RecallQuickstart</code> and select a Shuttle.Recall implementation:</p><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">PM&gt; Install-Package Shuttle.Recall.Sql.Storage</span></span>\n<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>This provides a SQL-based store for doamin events.</p><blockquote><p>Install the <code>System.Data.SqlClient</code> nuget package.</p></blockquote><p>This will provide a connection to our Sql Server.</p><p>Now we&#39;ll define the domain event that will represent a state change in the <code>Name</code> attribute:</p><div class="language-c#"><button class="copy"></button><span class="lang">c#</span><pre><code><span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Renamed</span></span>\n<span class="line"><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">string</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Name</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">get</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">set</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div><p>Next we&#39;ll create our <code>Aggregate Root</code>. In a real-world scenario the aggregate in our domain would be something like <code>Customer</code>, <code>Member</code>, <code>Invoice</code>, and so forth. The aggregate will make use of an <code>EventStream</code> to save the changes in the state:</p><div class="language-c#"><button class="copy"></button><span class="lang">c#</span><pre><code><span class="line"><span style="color:#F78C6C;">using</span><span style="color:#A6ACCD;"> System</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"><span style="color:#F78C6C;">using</span><span style="color:#A6ACCD;"> System.Collections.Generic</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#F78C6C;">namespace</span><span style="color:#A6ACCD;"> RecallQuickstart</span></span>\n<span class="line"><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">AggregateRoot</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Guid</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Id</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">get</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">string</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Name</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">get</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">private</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">set</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">List</span><span style="color:#89DDFF;">&lt;string&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">AllNames</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">get</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">List</span><span style="color:#89DDFF;">&lt;string&gt;();</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">AggregateRoot</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">Guid</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">id</span><span style="color:#89DDFF;">)</span></span>\n<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">            Id </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> id</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Renamed</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Rename</span><span style="color:#89DDFF;">(string</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">name</span><span style="color:#89DDFF;">)</span></span>\n<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">return</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">On</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Renamed</span></span>\n<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">                Name </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> name</span></span>\n<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">});</span></span>\n<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#C792EA;">private</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Renamed</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">On</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">Renamed</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">renamed</span><span style="color:#89DDFF;">)</span></span>\n<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">            Name </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> renamed</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Name</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#A6ACCD;">            AllNames</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Add</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">Name</span><span style="color:#89DDFF;">);</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">return</span><span style="color:#A6ACCD;"> renamed</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div><p>Create a new Sql Server database called <code>RecallQuickstart</code> to store our events and execute the following creation script against that database:</p><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">%userprofile%\\.nuget\\packages\\shuttle.recall.sql.storage\\{version}\\scripts\\System.Data.SqlClient\\EventStoreCreate.sql</span></span>\n<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>Next we&#39;ll use event sourcing to store an rehydrate our aggregate root from the <code>Main()</code> entry point:</p><div class="language-c#"><button class="copy"></button><span class="lang">c#</span><pre><code><span class="line"><span style="color:#F78C6C;">using</span><span style="color:#A6ACCD;"> System.Data.Common</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"><span style="color:#F78C6C;">using</span><span style="color:#A6ACCD;"> System.Data.SqlClient</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"><span style="color:#F78C6C;">using</span><span style="color:#A6ACCD;"> Microsoft.Extensions.DependencyInjection</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"><span style="color:#F78C6C;">using</span><span style="color:#A6ACCD;"> Shuttle.Core.Data</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"><span style="color:#F78C6C;">using</span><span style="color:#A6ACCD;"> Shuttle.Recall</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"><span style="color:#F78C6C;">using</span><span style="color:#A6ACCD;"> Shuttle.Recall.Sql.Storage</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#F78C6C;">namespace</span><span style="color:#A6ACCD;"> RecallQuickstart</span></span>\n<span class="line"><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">internal</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Program</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#C792EA;">static</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">void</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Main</span><span style="color:#89DDFF;">(string[]</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">args</span><span style="color:#89DDFF;">)</span></span>\n<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">            DbProviderFactories</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">RegisterFactory</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">System.Data.SqlClient</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> SqlClientFactory</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Instance</span><span style="color:#89DDFF;">);</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#F78C6C;">var</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">services</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ServiceCollection</span><span style="color:#89DDFF;">();</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#A6ACCD;">            services</span></span>\n<span class="line"><span style="color:#A6ACCD;">                </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">AddDataAccess</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">builder</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">                </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">                    builder</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">AddConnectionString</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">EventStore</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">System.Data.SqlClient</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">                        </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Data Source=.;Initial Catalog=RecallQuickstart;user id=sa;password=Pass!000</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">);</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#A6ACCD;">                    builder</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Options</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">DatabaseContextFactory</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">DefaultConnectionStringName </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">EventStore</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"><span style="color:#A6ACCD;">                </span><span style="color:#89DDFF;">})</span></span>\n<span class="line"><span style="color:#A6ACCD;">                </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">AddSqlEventStorage</span><span style="color:#89DDFF;">()</span></span>\n<span class="line"><span style="color:#A6ACCD;">                </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">AddEventStore</span><span style="color:#89DDFF;">();</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#F78C6C;">var</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">provider</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> services</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">BuildServiceProvider</span><span style="color:#89DDFF;">();</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#F78C6C;">var</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">databaseContextFactory</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> provider</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">GetRequiredService</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">IDatabaseContextFactory</span><span style="color:#89DDFF;">&gt;();</span></span>\n<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#F78C6C;">var</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">store</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> provider</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">GetRequiredService</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">IEventStore</span><span style="color:#89DDFF;">&gt;();</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#F78C6C;">var</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">id</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> Guid</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">NewGuid</span><span style="color:#89DDFF;">();</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#89DDFF;">            </span><span style="color:#676E95;">// we can very easily also add unit tests for our aggregate in a separate project... done here as an example</span></span>\n<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#F78C6C;">var</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">aggregateRoot1</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">AggregateRoot</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">id</span><span style="color:#89DDFF;">);</span></span>\n<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#F78C6C;">var</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">stream1</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> store</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">CreateEventStream</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">id</span><span style="color:#89DDFF;">);</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#A6ACCD;">            stream1</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">AddEvent</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">aggregateRoot1</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Rename</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Name-1</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">));</span></span>\n<span class="line"><span style="color:#A6ACCD;">            stream1</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">AddEvent</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">aggregateRoot1</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Rename</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Name-2</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">));</span></span>\n<span class="line"><span style="color:#A6ACCD;">            stream1</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">AddEvent</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">aggregateRoot1</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Rename</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Name-3</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">));</span></span>\n<span class="line"><span style="color:#A6ACCD;">            stream1</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">AddEvent</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">aggregateRoot1</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Rename</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Name-4</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">));</span></span>\n<span class="line"><span style="color:#A6ACCD;">            stream1</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">AddEvent</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">aggregateRoot1</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Rename</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Name-5</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">));</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">if</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">aggregateRoot1</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">AllNames</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Count </span><span style="color:#89DDFF;">!=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">5</span><span style="color:#89DDFF;">)</span></span>\n<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">                </span><span style="color:#89DDFF;">throw</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ApplicationException</span><span style="color:#89DDFF;">();</span></span>\n<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">if</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(!</span><span style="color:#A6ACCD;">aggregateRoot1</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Name</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Equals</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Name-5</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">))</span></span>\n<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">                </span><span style="color:#89DDFF;">throw</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ApplicationException</span><span style="color:#89DDFF;">();</span></span>\n<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#F78C6C;">using</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">databaseContextFactory</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Create</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">EventStore</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">))</span></span>\n<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">                store</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Save</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">stream1</span><span style="color:#89DDFF;">);</span></span>\n<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#F78C6C;">var</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">aggregateRoot2</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">AggregateRoot</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">id</span><span style="color:#89DDFF;">);</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#FFCB6B;">EventStream</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">stream2</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#F78C6C;">using</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">databaseContextFactory</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Create</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">EventStore</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">))</span></span>\n<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">                stream2 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> store</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Get</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">id</span><span style="color:#89DDFF;">);</span></span>\n<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#A6ACCD;">            stream2</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Apply</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">aggregateRoot2</span><span style="color:#89DDFF;">);</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">if</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">aggregateRoot2</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">AllNames</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Count </span><span style="color:#89DDFF;">!=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">5</span><span style="color:#89DDFF;">)</span></span>\n<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">                </span><span style="color:#89DDFF;">throw</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ApplicationException</span><span style="color:#89DDFF;">();</span></span>\n<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">if</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(!</span><span style="color:#A6ACCD;">aggregateRoot2</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Name</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Equals</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Name-5</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">))</span></span>\n<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">                </span><span style="color:#89DDFF;">throw</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ApplicationException</span><span style="color:#89DDFF;">();</span></span>\n<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div><p>Once you have executed the program you&#39;ll find the 5 relevant entries in the <code>EventStore</code> table in the database.</p>', 16);
const _hoisted_17 = [
  _hoisted_1
];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, _hoisted_17);
}
const gettingStarted = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  __pageData,
  gettingStarted as default
};
