# Server (deprecated)

The Express API previously lived in this folder and was deployed on Railway.

## Where things live now

| What | Location |
|------|----------|
| **Frozen Express snapshot** (interview / history) | [`archive/express-server/`](../archive/express-server/) |
| **Live domain layer** (services, repositories, schemas) | [`client/src/server/`](../client/src/server/) |
| **Live HTTP API** (Next.js Route Handlers) | [`client/src/app/api/`](../client/src/app/api/) |

This directory is kept temporarily so existing local scripts keep working during the migration cutover. Prefer the archive for reading the original Express implementation, and `client/` for all new work.
