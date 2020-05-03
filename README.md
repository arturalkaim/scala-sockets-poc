# Akka Streams + WebSockets

### Running

```
sbt ~reStart
```



## Overview

### Pages:
  /                 -> show the status
  /settings         -> manipulates the status
  
When changing the values in /settings the changes show up in the main page.

The WebSocket flow is built from a `Sink.ignore` and an `actorRef` that we `preMaterialize()`
