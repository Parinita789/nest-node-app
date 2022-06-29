## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

```
## API
USER APIS -------------------------------------------------------

POST - Create User API
```bash
curl --location --request POST 'http://localhost:3000/api/v1/user' \
--header 'Content-Type: application/json' \
--data-raw '{
    "first_name": "Parinita",
    "last_name": "Kumari",
    "user_name": "Pari789",
    "password": "123456"
}'

Response: 

{
    "data": {
        "user_id": 1
    },
    "message": "User Created Successfully.",
    "status": 201
}
```

GET - Get User By Id
```bash
curl --location --request GET 'http://localhost:3000/api/v1/user/1'

Response:

{
    "data": {
        "id": 1,
        "first_name": "Parinita",
        "last_name": "Kumari",
        "user_name": "Pari789",
        "profile_picture_url": null,
        "created_at": "2022-06-29T16:54:32.994Z",
        "updated_at": "2022-06-29T16:54:32.994Z"
    },
    "message": "User fetched Successfully.",
    "status": 200
}
```
PATCH - Update user by id
```bash
curl --location --request PATCH 'http://localhost:3000/api/v1/user/1' \
--header 'Content-Type: application/json' \
--data-raw '{
    "first_name": "Monika",
    "last_name": "Singh"
}'

Response: 
{
    "data": {
        "id": 1,
        "first_name": "Monika",
        "last_name": "Singh",
        "user_name": "Pari789",
        "profile_picture_url": null,
        "created_at": "2022-06-29T16:54:32.994Z",
        "updated_at": "2022-06-29T16:54:32.994Z"
    },
    "message": "Users Updated Successfully.",
    "status": 200
}
```

DEL - Delete user by id
```bash
curl --location --request DELETE 'http://localhost:3000/api/v1/user/2'

Response:

{
    "data": null,
    "message": "User Deleted Successfully.",
    "status": 200
}

```


