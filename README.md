# ts-self-study

repo para estudar typescript.
Construindo uma API Restful de Vendas Javascript com Node.js, ExpressJS, Typescript, TypeORM, Postgres, Redis, etc.

### docker

Para subir o banco postgres

```console
docker run --name postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```

### migrations

Para rodar as migrations

```console
yarn typeorm migration:run -- -d src/shared/typeorm/index.ts
```
