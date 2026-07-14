# DNS-AID Records for anir0y.in

Publish these records in the authoritative DNS zone for `anir0y.in`.

```dns
_index._agents.anir0y.in. 3600 IN HTTPS 1 anir0y.in. alpn="h2,h3" mandatory=alpn
_mcp._agents.anir0y.in. 3600 IN HTTPS 1 anir0y.in. alpn="h2,h3" mandatory=alpn
_webmcp._agents.anir0y.in. 3600 IN HTTPS 1 anir0y.in. alpn="h2,h3" mandatory=alpn
```

The public discovery zone should be DNSSEC-signed so validating resolvers can
return authenticated data.
