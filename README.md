# Full-Stack Goymarey Assessment

## Frontend

### Setup
```sh
cd frontend

cp .env.sample .env

pnpm install
pnpm start
```
- `.env.sample` provides a template for environment variables.
- `pnpm start` runs the development server using Vite.


### structure
The frontend is organized as follows:

```sh
.
├── components.json
├── index.html
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── public
│   ├── favicon.ico
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── README.md
├── src
│   ├── components
│   │   ├── custom
│   │   │   ├── Draft.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   ├── ErrorCard.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── LoadingCard.tsx
│   │   │   ├── Post.tsx
│   │   │   └── Reply.tsx
│   │   └── ui
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── dialog.tsx
│   │       ├── input.tsx
│   │       ├── scroll-area.tsx
│   │       ├── tabs.tsx
│   │       └── textarea.tsx
│   ├── lib
│   │   ├── apollo.ts
│   │   ├── constants.ts
│   │   └── utils.ts
│   ├── logo.svg
│   ├── main.tsx
│   ├── reportWebVitals.ts
│   ├── routes
│   │   ├── auth
│   │   │   ├── login.tsx
│   │   │   └── register.tsx
│   │   ├── index.tsx
│   │   ├── post
│   │   │   └── $postId.tsx
│   │   ├── profile.tsx
│   │   ├── __root.tsx
│   │   └── user
│   │       └── $userId.tsx
│   ├── routeTree.gen.ts
│   └── styles.css
├── tsconfig.json
└── vite.config.js
```
- **Routing**: Uses [TanStack Router](https://tanstack.com/router/latest/docs/framework/react/overview) for file-based, type-safe routing.

- **Components**:
components/custom: Application-specific components (e.g., Post.tsx, Reply.tsx).
components/ui: Reusable UI components from Shadcn UI, customized for the app.

- **Lib**: Utility files like apollo.ts (Apollo Client setup), constants.ts, and utils.ts.


### Technical Choices
1. TanStack Router:
    - Provides type-safe, file-based routing with automatic route generation (routeTree.gen.ts).
    - Simplifies navigation and dynamic routes (e.g., /post/$postId).
    - Chosen over React Router for better TypeScript integration and developer experience.

2. Shadcn UI:
- Lightweight, customizable component library.
- Allows for tailored UI without heavy dependencies like Material UI.

## Backend

To set up the backend, run the following commands:

```sh
cd backend
cp .env.sample .env
pnpm install
pnpm dev
```
- `.env.sample` includes required environment variables (e.g., database URL).
- `pnpm dev` starts the Express server in development mode with hot reloading.

### Structure
The backend is organized as follows:

```sh
.
├── lib
│   ├── db.ts
│   ├── gql
│   │   ├── post.ts
│   │   ├── reply.ts
│   │   ├── schema.ts
│   │   └── user.ts
│   └── types
│       └── userContext.ts
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── prisma
│   ├── migrations
│   │   ├── 20250408024608_init
│   │   │   └── migration.sql
│   │   └── migration_lock.toml
│   └── schema.prisma
├── shell.nix
├── src
│   └── index.ts
└── tsconfig.json
```

- Entry Point: src/index.ts initializes the Express server and GraphQL middleware.
- GraphQL:
    - lib/gql: Contains GraphQL resolvers and schema definitions (post.ts, user.ts, etc.).
    - schema.ts: Centralizes the GraphQL schema.
- Database:
    - lib/db.ts: Prisma client setup.
    - prisma/schema.prisma: Defines the database schema.
    - prisma/migrations: Tracks database migrations.

- Shell.nix: Configures a reproducible development environment for Prisma compatibility.

### Technical Choices
- Database Schema:
    - Post Likes: Modeled as a many-to-many relation between User and Post to ensure a user can like a post only once.
    - IDs: Uses CUIDs instead of UUIDs for shorter, URL-friendly identifiers.

- GraphQL-HTTP:
    - Chosen over Apollo Server to write resolvers and schemas in TypeScript without SDL (Schema Definition Language).
    - Simplifies backend logic and aligns with the TypeScript-first approach.

- Shell.nix:
Ensures consistent development environments, particularly for Prisma's binary dependencies.
