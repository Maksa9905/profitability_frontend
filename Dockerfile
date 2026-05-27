FROM node:22-alpine AS build

WORKDIR /app

ARG NUXT_PUBLIC_SITE_URL=https://profit.hakolr.dev
ARG NUXT_PUBLIC_API_BASE_URL=https://api.profit.hakolr.dev
ARG NUXT_PUBLIC_DEV_AUTH_USER_ID=00000000-0000-4000-8000-000000000001
ENV NUXT_PUBLIC_SITE_URL=$NUXT_PUBLIC_SITE_URL
ENV NUXT_PUBLIC_API_BASE_URL=$NUXT_PUBLIC_API_BASE_URL
ENV NUXT_PUBLIC_DEV_AUTH_USER_ID=$NUXT_PUBLIC_DEV_AUTH_USER_ID

ENV HUSKY=0
ENV NODE_OPTIONS="--max-old-space-size=4096"

RUN corepack enable && corepack prepare pnpm@10.32.1 --activate

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build

FROM node:22-alpine AS runtime

WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

COPY --from=build /app/.output ./.output

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
