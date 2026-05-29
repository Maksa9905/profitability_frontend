# GHCR deploy checklist

1. Make package `profitability-frontend` **public** on GitHub Packages.
2. On VPS `.env.prod`: `IMAGE_REGISTRY=your-github-username`, `IMAGE_TAG=latest`.
3. `docker compose -f docker-compose.prod.yml --env-file .env.prod pull && up -d --no-deps profitability-frontend`
