## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## prerequisite
Node.js
Postgres
## Installation

```bash
$ npm install
```

## Running the app

```bash
$ npm run start

## Test

```bash
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

LANGUAGE API ----------------------------------------------------------

POST - Create Language
```bash
curl --location --request POST 'http://localhost:3000/api/v1/language' \
--header 'Content-Type: application/json' \
--data-raw '{
    "code": "EN",
    "name": "English"
}'

Response:
{
    "data": {
        "language_id": 1
    },
    "message": "Language Created Successfully.",
    "status": 201
}
```

GET - Get all languages
```bash
curl --location --request GET 'http://localhost:3000/api/v1/language?code=hi&name=Hindi&limit=10&page=1'

Response:
{
    "data": {
        "languages": [
            {
                "id": 2,
                "name": "Hindi",
                "code": "hi",
                "created_at": "2022-06-29T17:06:18.231Z"
            }
        ],
        "record_per_page": 1,
        "total_count": "1"
    },
    "message": "Language fetched Successfully.",
    "status": 200
}
```

PATCH - Update language by id
```bash
 {
    "data": {
        "languages": [
            {
                "id": 2,
                "name": "Hindi",
                "code": "hi",
                "created_at": "2022-06-29T17:06:18.231Z"
            }
        ],
        "record_per_page": 1,
        "total_count": "1"
    },
    "message": "Language fetched Successfully.",
    "status": 200
}

Response:

{
    "data": {
        "id": 1,
        "code": "en",
        "name": "english1",
        "is_deleted": false,
        "created_at": "2022-06-29T17:05:31.324Z",
        "updated_at": "2022-06-29T17:05:31.324Z"
    },
    "message": "Language Updated Successfully.",
    "status": 200
}
```
DEL - Delete language by id

```bash
curl --location --request DELETE 'http://localhost:3000/api/v1/language/1'

Response:
{
    "data": {
        "language_id": 1
    },
    "message": "Language Deleted Successfully.",
    "status": 200
}
```

DEL - Delete all languages
```bash
{
    "data": {
        "language_id": 1
    },
    "message": "Language Deleted Successfully.",
    "status": 200
}

Response:

{
    "data": null,
    "message": "Language Deleted Successfully.",
    "status": 200
}
```

Lesson API -----------------------------------------------------

POST - Create Lesson
```bash
curl --location --request POST 'http://localhost:3000/api/v1/lesson' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Chapter 1",
    "language_id": 1,
    "lesson_text": "Learn Beginners english"
}'
Response:
{
    "data": {
        "lesson_id": 1
    },
    "message": "Lesson Created Successfully.",
    "status": 201
}
```

GET - Get all lessons

```bash
curl --location --request GET 'http://localhost:3000/api/v1/lesson?name=Chapter 1&limit=10&page=1'

Response:
{
    "data": {
        "lessons": [
            {
                "id": 1,
                "name": "Chapter 1",
                "language_id": 1,
                "language_code": "en",
                "language_name": "english1",
                "lesson_text": "Learn Beginners english",
                "created_at": "2022-06-29T17:40:07.867Z"
            }
        ],
        "record_per_page": 1,
        "total_count": "1"
    },
    "message": "Lesson fetched Successfully.",
    "status": 200
}
```

PATCH - update lesson by id
```bash
curl --location --request PATCH 'http://localhost:3000/api/v1/lesson/1' \
--header 'Content-Type: application/json' \
--data-raw '{
    "lesson_text": "Beginners english"
}'

Response:
{
    "data": {
        "id": 1,
        "name": "Chapter 1",
        "lesson_text": "Beginners english",
        "language_id": 1,
        "is_deleted": false,
        "created_at": "2022-06-29T17:40:07.867Z",
        "updated_at": "2022-06-29T17:40:07.867Z"
    },
    "message": "Lesson Updated Successfully.",
    "status": 200
}
```

DEL - Delete Lesson By Id
```bash
curl --location --request DELETE 'http://localhost:3000/api/v1/lesson/2'

Response: 
{
    "data": null,
    "message": "Lesson Deleted Successfully.",
    "status": 200
}
```

Course API ---------------------------------------------------------------

POST - Create Course
```bash
curl --location --request POST 'http://localhost:3000/api/v1/course' \
--header 'Content-Type: application/json' \
--data-raw '{
  "name": "Spanish course",
  "owner_user_id": 1
}'

Response:
{
    "data": {
        "course_id": 6
    },
    "message": "Course Created Successfully.",
    "status": 201
}
```

GET - Get course api
```bash
curl --location --request GET 'http://localhost:3000/api/v1/course?owner_user_id=1'

Response:
{
    "data": {
        "courses": [
            {
                "id": 2,
                "name": "Hindi course",
                "owner": {
                    "id": 1,
                    "first_name": "Parinita",
                    "last_name": "Kumari"
                },
                "lesson_ids": null
            },
            {
                "id": 1,
                "name": "Spoken english course",
                "owner": {
                    "id": 1,
                    "first_name": "Monika",
                    "last_name": "Singh"
                },
                "lesson_ids": [
                    1
                ]
            }
        ],
        "record_per_page": 2,
        "total_count": "6"
    },
    "message": "Course fetched Successfully.",
    "status": 200
}
```

PATCH - Update course By id
```bash
curl --location --request PATCH 'http://localhost:3000/api/v1/course/2' \
--header 'Content-Type: application/json' \
--data-raw '{
    "active_lesson": 2
}'

Response:
{
    "data": {
        "id": 2,
        "name": "Hindi course",
        "lesson_ids": [
            1,
            2,
            3,
            4
        ],
        "active_lesson": 2,
        "owner_user_id": 1,
        "is_deleted": false,
        "created_at": "2022-06-29T18:23:58.673Z",
        "updated_at": "2022-06-29T18:23:58.673Z"
    },
    "message": "Course Updated Successfully.",
    "status": 200
}
```

DEL - delete course by Id
```bash
curl --location --request DELETE 'http://localhost:3000/api/v1/course/1'

Response:
{
    "data": null,
    "message": "Course Deleted Successfully.",
    "status": 200
}
```







