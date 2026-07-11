# auth.md for anir0y.in

This document describes agent authentication and registration support for
anir0y.in.

## Audience

Agents may use the public site, public discovery metadata, and public health
endpoint without authentication.

## Current Registration Status

Self-service agent registration is not currently offered. To request access for
a scoped security engagement or integration, contact `mail@anir0y.in` with the
agent identity, intended use, requested scopes, and authorization context.

## Credential Use

No bearer tokens are required for public discovery endpoints. Do not attempt
unauthorized account actions or protected API access.

## Related Metadata

- OAuth protected resource metadata: `/.well-known/oauth-protected-resource`
- OAuth authorization server metadata: `/.well-known/oauth-authorization-server`
- API catalog: `/.well-known/api-catalog`
