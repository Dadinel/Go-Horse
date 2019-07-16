# amqp-run-test-case

Testando a fila com amqp para rodar diversos casos de teste...

### Para subir o Rabbit:
```
docker run -d --hostname my-rabbit --name rabbit13 -p 8080:15672 -p 5672:5672 -p 25676:25676 rabbitmq:3-management
```