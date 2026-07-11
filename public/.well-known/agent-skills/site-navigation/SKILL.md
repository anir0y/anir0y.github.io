# Skill: Navigate anir0y.in

Use this skill when an agent needs to understand or navigate the public
anir0y.in security operations portfolio.

## Available Public Sections

- `about` - operator profile and current focus.
- `services` - security consulting and offensive security capabilities.
- `training` - public training and lab offerings.
- `research` - security research and writing.
- `projects` - public tools and project work.
- `contact` - public contact links for engagement requests.

## Recommended Agent Flow

1. Fetch `/` with `Accept: text/markdown` when possible.
2. Read `/.well-known/api-catalog` for machine-readable discovery links.
3. Use `/health.json` for deployment health.
4. Use `/auth.md` before assuming agent registration or protected API access.

## Constraints

- Public pages do not require authentication.
- Protected API access and self-service agent registration are not currently
  offered.
- For security work, only contact the operator for engagements that have
  explicit written authorization.
