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

### test

criar no endpoint `/products`

```console
curl --data '{ "name": "book 1", "price": 20, "quantity": 5 }' --header 'Content-Type: application/json' localhost:8080/products
```

listar no endpoint `/products`

```console
curl localhost:8080/products
```

Para ler um product no endpoint `/products`

```console
curl -G -d 'id=58cef497-c1fc-409a-9ffa-d83ebd10ef0f' localhost:8080/products
```
