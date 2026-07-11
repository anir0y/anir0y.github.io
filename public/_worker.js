const SITE_NAME = "anir0y.in";
const SITE_VERSION = "3.0.0";

const DISCOVERY_LINKS = [
  '</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"',
  '</openapi.json>; rel="service-desc"; type="application/openapi+json"',
  '</docs/api>; rel="service-doc"; type="text/markdown"',
  '</auth.md>; rel="describedby"; type="text/markdown"',
  '</.well-known/agent-skills/index.json>; rel="describedby"; type="application/json"',
  '</.well-known/mcp/server-card.json>; rel="describedby"; type="application/json"',
].join(", ");

function originFrom(request) {
  return new URL(request.url).origin;
}

function isHomePath(pathname) {
  return pathname === "/" || pathname === "/index.html";
}

function wantsMarkdown(request) {
  const accept = request.headers.get("accept") || "";
  return accept.split(",").some((part) => part.trim().toLowerCase().startsWith("text/markdown"));
}

function withCommonHeaders(headers = {}) {
  return {
    "Access-Control-Allow-Origin": "*",
    ...headers,
  };
}

function jsonResponse(body, contentType = "application/json; charset=utf-8", status = 200) {
  return new Response(JSON.stringify(body, null, 2) + "\n", {
    status,
    headers: withCommonHeaders({
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=0, must-revalidate",
    }),
  });
}

function markdownResponse(markdown) {
  const tokenCount = markdown.trim().split(/\s+/).filter(Boolean).length.toString();
  return new Response(markdown, {
    headers: withCommonHeaders({
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
      "Vary": "Accept",
      "x-markdown-tokens": tokenCount,
      "Link": DISCOVERY_LINKS,
    }),
  });
}

function notImplemented(message) {
  return jsonResponse(
    {
      error: "not_enabled",
      message,
    },
    "application/problem+json; charset=utf-8",
    501,
  );
}

function homepageMarkdown(origin) {
  return `# anir0y.in

Security operations portfolio for Animesh Roy, focused on offensive security,
security consulting, research, training, and open-source tooling.

## Public Sections

- About: operator profile and current security focus.
- Defense: risk assessment, red teaming, gap analysis, and SOC capability.
- Training: public security courses and labs.
- Research: published security research and writing.
- Work: public projects and tooling.
- Establish Link: contact paths for authorized engagements.

## Agent Discovery

- API catalog: ${origin}/.well-known/api-catalog
- OpenAPI description: ${origin}/openapi.json
- API documentation: ${origin}/docs/api
- Auth metadata: ${origin}/auth.md
- Agent skills: ${origin}/.well-known/agent-skills/index.json
- MCP server card: ${origin}/.well-known/mcp/server-card.json
- Health: ${origin}/health.json

## Authentication

The public site and public discovery endpoints do not require authentication.
Self-service protected API access is not currently offered.
`;
}

function apiCatalog(origin) {
  return {
    linkset: [
      {
        anchor: `${origin}/`,
        "service-desc": [
          {
            href: `${origin}/openapi.json`,
            type: "application/openapi+json",
            title: `${SITE_NAME} public discovery OpenAPI description`,
          },
        ],
        "service-doc": [
          {
            href: `${origin}/docs/api`,
            type: "text/markdown",
            title: "Public discovery API documentation",
          },
        ],
        status: [
          {
            href: `${origin}/health.json`,
            type: "application/json",
            title: "Deployment health",
          },
        ],
      },
    ],
  };
}

function openApi(origin) {
  return {
    openapi: "3.1.0",
    info: {
      title: `${SITE_NAME} Public Discovery API`,
      version: SITE_VERSION,
      description: `Public, read-only discovery endpoints for ${SITE_NAME}.`,
    },
    servers: [{ url: origin }],
    paths: {
      "/health.json": {
        get: {
          summary: "Deployment health",
          responses: { 200: { description: "Current deployment health metadata" } },
        },
      },
      "/.well-known/api-catalog": {
        get: {
          summary: "RFC 9727 API catalog",
          responses: { 200: { description: "Linkset catalog for public discovery endpoints" } },
        },
      },
      "/.well-known/oauth-protected-resource": {
        get: {
          summary: "OAuth protected resource metadata",
          responses: { 200: { description: "Resource metadata for agent authentication discovery" } },
        },
      },
      "/.well-known/mcp/server-card.json": {
        get: {
          summary: "MCP server card",
          responses: { 200: { description: "MCP server discovery card" } },
        },
      },
    },
  };
}

function oauthProtectedResource(origin) {
  return {
    resource: `${origin}/`,
    authorization_servers: [origin],
    scopes_supported: ["public:read"],
    bearer_methods_supported: ["header"],
    resource_documentation: `${origin}/auth.md`,
  };
}

function oauthAuthorizationServer(origin) {
  return {
    issuer: origin,
    authorization_endpoint: `${origin}/agent/auth/authorize`,
    token_endpoint: `${origin}/agent/auth/token`,
    jwks_uri: `${origin}/.well-known/jwks.json`,
    registration_endpoint: `${origin}/agent/auth/register`,
    grant_types_supported: [],
    response_types_supported: [],
    scopes_supported: ["public:read"],
    token_endpoint_auth_methods_supported: [],
    agent_auth: {
      skill: `${origin}/auth.md`,
      register_uri: "mailto:mail@anir0y.in?subject=Agent%20Access%20Registration",
      identity_types_supported: ["verified_email"],
      verified_email: {
        assertion_types_supported: ["verified_email"],
        credential_types_supported: ["manual_provisioning"],
        claim_uri: "mailto:mail@anir0y.in?subject=Agent%20Identity%20Claim",
      },
    },
  };
}

function openIdConfiguration(origin) {
  return {
    issuer: origin,
    authorization_endpoint: `${origin}/agent/auth/authorize`,
    token_endpoint: `${origin}/agent/auth/token`,
    jwks_uri: `${origin}/.well-known/jwks.json`,
    grant_types_supported: [],
    response_types_supported: [],
    scopes_supported: ["public:read"],
    subject_types_supported: [],
    id_token_signing_alg_values_supported: [],
  };
}

function mcpServerCard(origin) {
  return {
    serverInfo: {
      name: SITE_NAME,
      version: SITE_VERSION,
    },
    transport: {
      type: "streamable-http",
      endpoint: `${origin}/mcp`,
    },
    capabilities: {
      tools: { listChanged: false },
      resources: {},
      prompts: {},
    },
    description:
      "Discovery card for the public site. A remote MCP service is not currently enabled; browser-side WebMCP tools are provided when supported by the user agent.",
  };
}

function agentSkillsIndex(origin) {
  return {
    $schema: "https://schemas.agentskills.io/discovery/0.2.0/schema.json",
    skills: [
      {
        name: "site-navigation",
        type: "skill-md",
        description: "Navigate the public anir0y.in portfolio, discovery metadata, health endpoint, and contact paths.",
        url: `${origin}/.well-known/agent-skills/site-navigation/SKILL.md`,
        digest: "sha256:6789fbe0f7c66d14cf55aa5af463dd86da910fca3938e7dcd2a03d5235d3b053",
      },
    ],
  };
}

function siteNavigationSkill() {
  return `# Skill: Navigate anir0y.in

Use this skill when an agent needs to understand or navigate the public
anir0y.in security operations portfolio.

## Available Public Sections

- \`about\` - operator profile and current focus.
- \`services\` - security consulting and offensive security capabilities.
- \`training\` - public training and lab offerings.
- \`research\` - security research and writing.
- \`projects\` - public tools and project work.
- \`contact\` - public contact links for engagement requests.

## Recommended Agent Flow

1. Fetch \`/\` with \`Accept: text/markdown\` when possible.
2. Read \`/.well-known/api-catalog\` for machine-readable discovery links.
3. Use \`/health.json\` for deployment health.
4. Use \`/auth.md\` before assuming agent registration or protected API access.

## Constraints

- Public pages do not require authentication.
- Protected API access and self-service agent registration are not currently
  offered.
- For security work, only contact the operator for engagements that have
  explicit written authorization.
`;
}

function apiDocs(origin) {
  return `# ${SITE_NAME} Public Discovery API

The public site exposes read-only discovery metadata for automated agents.

## Endpoints

- \`GET /health.json\` returns deployment health metadata.
- \`GET /.well-known/api-catalog\` returns an RFC 9727 linkset catalog.
- \`GET /openapi.json\` returns the OpenAPI description for public discovery endpoints.
- \`GET /.well-known/oauth-protected-resource\` returns OAuth resource metadata for agent discovery.
- \`GET /.well-known/oauth-authorization-server\` returns authorization server metadata.
- \`GET /auth.md\` explains current agent registration and authentication support.
- \`GET /.well-known/mcp/server-card.json\` returns MCP discovery metadata.
- \`GET /.well-known/agent-skills/index.json\` returns the public agent skills index.

## Authentication

The public site and public discovery endpoints do not require authentication.
Self-service protected API access is not currently offered.

Base URL: ${origin}
`;
}

function authMd(origin) {
  return `# auth.md for ${SITE_NAME}

This document describes agent authentication and registration support for
${SITE_NAME}.

## Audience

Agents may use the public site, public discovery metadata, and public health
endpoint without authentication.

## Current Registration Status

Self-service agent registration is not currently offered. To request access for
a scoped security engagement or integration, contact \`mail@anir0y.in\` with the
agent identity, intended use, requested scopes, and authorization context.

## Credential Use

No bearer tokens are required for public discovery endpoints. Do not attempt
unauthorized account actions or protected API access.

## Related Metadata

- OAuth protected resource metadata: ${origin}/.well-known/oauth-protected-resource
- OAuth authorization server metadata: ${origin}/.well-known/oauth-authorization-server
- API catalog: ${origin}/.well-known/api-catalog
`;
}

async function handleDiscovery(request) {
  const url = new URL(request.url);
  const origin = originFrom(request);

  if (isHomePath(url.pathname) && wantsMarkdown(request)) {
    return markdownResponse(homepageMarkdown(origin));
  }

  switch (url.pathname) {
    case "/.well-known/api-catalog":
      return jsonResponse(apiCatalog(origin), "application/linkset+json; charset=utf-8");
    case "/openapi.json":
      return jsonResponse(openApi(origin), "application/openapi+json; charset=utf-8");
    case "/docs/api":
    case "/docs/api.md":
      return markdownResponse(apiDocs(origin));
    case "/auth.md":
      return markdownResponse(authMd(origin));
    case "/.well-known/oauth-protected-resource":
      return jsonResponse(oauthProtectedResource(origin));
    case "/.well-known/oauth-authorization-server":
      return jsonResponse(oauthAuthorizationServer(origin));
    case "/.well-known/openid-configuration":
      return jsonResponse(openIdConfiguration(origin));
    case "/.well-known/jwks.json":
      return jsonResponse({ keys: [] });
    case "/.well-known/mcp/server-card.json":
      return jsonResponse(mcpServerCard(origin));
    case "/.well-known/agent-skills/index.json":
      return jsonResponse(agentSkillsIndex(origin));
    case "/.well-known/agent-skills/site-navigation/SKILL.md":
      return markdownResponse(siteNavigationSkill());
    case "/mcp":
      return notImplemented("Remote MCP transport is not enabled on this static portfolio.");
    case "/agent/auth/authorize":
    case "/agent/auth/token":
    case "/agent/auth/register":
      return notImplemented("Self-service agent OAuth registration and token issuance are not enabled.");
    default:
      return null;
  }
}

function addHomepageDiscoveryHeaders(response, request) {
  const url = new URL(request.url);
  if (!isHomePath(url.pathname)) return response;

  const headers = new Headers(response.headers);
  headers.set("Link", DISCOVERY_LINKS);
  headers.append("Vary", "Accept");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export default {
  async fetch(request, env) {
    const discoveryResponse = await handleDiscovery(request);
    if (discoveryResponse) return discoveryResponse;

    if (!env || !env.ASSETS) {
      return new Response("Cloudflare Pages ASSETS binding is unavailable.", { status: 500 });
    }

    const assetResponse = await env.ASSETS.fetch(request);
    return addHomepageDiscoveryHeaders(assetResponse, request);
  },
};
