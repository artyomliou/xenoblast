# Setup

```
cd backend && make setup
cd deploy/docker-compose && docker compose build
cd frontend && npm run proto-js && npm run proto-ts
```

# Run

```
cd deploy/docker-compose && cp .env.example .env && docker compose up -d
cd frontend && npm run dev
```

Then check http://localhost:8080
