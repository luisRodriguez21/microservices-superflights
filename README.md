# SuperFlights · NestJS Microservices

Flight scheduling API split into independent NestJS microservices. An **API Gateway** exposes the REST endpoints and JWT authentication, and forwards each request over **RabbitMQ** to the service that owns the data. Each service persists to **MongoDB**, and the whole system runs with **Docker Compose**.

## Architecture

```
client ──HTTP──▶ api-gateway (REST · JWT · Swagger)
                     │  RabbitMQ (request/response queues)
        ┌────────────┼──────────────┐
        ▼            ▼              ▼
 microservice-   microservice-   microservice-
    users         passengers       flights
        └────────────┴──────────────┘
                   MongoDB
```

| Service | Responsibility |
|---|---|
| `api-gateway` | REST API, auth (local + JWT strategies), global exception filter, timeout interceptor, Swagger |
| `microservice-users` | Users (pilots) CRUD and credential validation |
| `microservice-passengers` | Passengers CRUD |
| `microservice-flights` | Flights CRUD and assigning passengers to a flight |

## Tech stack

NestJS · TypeScript · RabbitMQ · MongoDB / Mongoose · Passport JWT · Swagger · Docker Compose

## Getting started

```bash
git clone https://github.com/luisRodriguez21/microservices-superflights.git
cd microservices-superflights

# create a .env in the root with:
# PORT=3000
# AMQP_URL=amqp://rabbitmq:5672
# URI_MONGODB=mongodb://mongodb:27017/superflights
# JWT_SECRET=<your-secret>

docker compose up -d --build
```

- API: http://localhost
- Swagger docs: http://localhost/api/docs
