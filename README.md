# ts-self-study

repo para estudar typescript.
Construindo uma API Restful de Vendas Javascript com Node.js, ExpressJS, Typescript, TypeORM, Postgres, Redis, etc.

### docker

Para subir o banco postgres

```console
docker run --name postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```

Para subir o redis

```console
docker run --name redis -p 6379:6379 -d -t redis:alpine
```

### migrations

Crie o banco `apivendas` e rode as migrations;

Para rodar as migrations

```console
yarn typeorm migration:run -- -d src/shared/typeorm/index.ts
```

### endpoints

O projeto é divido em 4 modulos:

1. `products`
2. `users`
3. `customers`
4. `orders`

sendo cada modulo com vários endpoints:

- `/products`
- `/users`
  - `/avatar`
- `/password`
  - `/forgot`
  - `/reset`
- `/sessions`
- `/profile`
- `/customers`
- `/orders`
