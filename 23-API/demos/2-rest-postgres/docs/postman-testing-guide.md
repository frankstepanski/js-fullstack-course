This guide explains how to test the **School REST API** using Postman.

Base URL:
http://localhost:3000

## 1. Start the Server

Run:

npm run dev

You should see:

Server running on port 3000

## 2. Students API

### Test 1 — Get All Students

GET /students

Expected:
200 OK

Example response:

[
  {
    "id": 1,
    "name": "Alice Johnson",
    "email": "alice@email.com"
  }
]

### Test 2 — Get Student by ID

GET /students/1

Expected:
200 OK

### Test 3 — Invalid Student ID

GET /students/9999

Expected:
404 Not Found

{
  "error": "Student not found"
}

### Test 4 — Create Student

POST /students

Body:

{
  "name": "QA Tester",
  "email": "qa@test.com"
}

Expected:
201 Created

### Test 5 — Missing Fields

POST /students

{
  "name": "Incomplete"
}

Expected:
400 Bad Request

### Test 6 — Delete Student

DELETE /students/1

Expected:
200 OK

## 3. Courses API

### Test 7 — Get Courses

GET /courses

Expected:
200 OK

### Test 8 — Create Course

POST /courses

{
  "title": "API Testing",
  "instructor": "QA Engineer"
}

Expected:
201 Created

### Test 9 — Invalid Course Body

POST /courses

{}

Expected:
400 Bad Request

## 4. Enrollments API

### Test 10 — Enroll Student

POST /enrollments

{
  "studentId": 1,
  "courseId": 2
}

Expected:
201 Created

### Test 11 — Student Courses

GET /enrollments/student/1

Expected:
200 OK

### Test 12 — Course Students

GET /enrollments/course/1

Expected:
200 OK

## 5. Edge Case Testing

GET /students/abc

Expected:
400 Bad Request

POST /students

{
  "name": "",
  "email": ""
}

Expected:
400 Bad Request

## 6. What This Testing Confirms

- Routes work correctly
- Controllers process requests
- Services communicate with PostgreSQL
- Error handling works
- Correct HTTP status codes are returned