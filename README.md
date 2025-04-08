# Full-Stack Goymarey Assessment

## Frontend

### Setup
```sh
cd frontend
pnpm install
pnpm start
```

### Choices

1. Router: **[Tanstack Router](https://tanstack.com/router/latest/docs/framework/react/overview)**
- Tanstack router provides typesafe file-based routing

## Backend

```sh
cd backend
pnpm install
pnpm dev
```

### Choices

Database Schema
---
- Post likes are a relation between the user and the post.
This is helps ensuring a user can like a post only once.

- IDs use cuids instead of uuids.
Since they are going to be used mostly in urls it helps that they are shorter than uuids

