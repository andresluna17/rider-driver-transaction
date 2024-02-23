## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

This test was developed in Nestjs, sequelize and sqlite, the database is loaded with 3 drivers, they are located in coordinates near the El Dorado airport, the api searches among the available drivers the closest one to 5 KM.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).


## Curl

create Rider

$ curl --location 'http://localhost:3000/rider' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Rider 1",
    "email": "rider1@example.com"
}'

create Driver

$ curl --location 'http://localhost:3000/driver' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "driver 1",
    "email": "driver1@example.com"
}'

create Ride

$ curl --location 'http://localhost:3000/ride' \
--header 'Content-Type: application/json' \
--data '{
    "riderId":1,
    "lon":"-74.1469444444",
    "lat":"4.70138888889"
}'

Finish Ride 

$ curl --location 'http://localhost:3000/ride/1' \
--header 'Content-Type: application/json' \
--data '{
    "lon": "-74.0554677",
    "lat": "4.6052221",
    "tokenCardId": "tok_test_90174_d6B20716bF0b6F33e016c2f2389B0540"
}'