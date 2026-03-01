# SQL Practice Lab --- Using DB Fiddle

We'll be using the tool https://www.db-fiddle.com/ for our SQL
exercises.

DB Fiddle is an online SQL playground that allows you to:

-   Create tables\
-   Insert data\
-   Run queries\
-   See results instantly

All inside your browser --- no installation required.

## Why It's Great for Practice

DB Fiddle removes that overhead so you can:

✔️ Focus only on writing queries
✔️ Quickly experiment
✔️ Break things safely
✔️ Reset your schema easily
✔️ Practice anywhere

Think of it as the CodePen for databases.

# Practice Scenario --- Education Platform

We'll simulate a simple education system with:

-   Students
-   Courses
-   Enrollments

## Step 1 --- Create the Tables

``` sql
CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  credits INT DEFAULT 3
);

CREATE TABLE enrollments (
  id SERIAL PRIMARY KEY,
  student_id INT REFERENCES students(id),
  course_id INT REFERENCES courses(id),
  enrolled_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Step 2 --- Seed Some Data

``` sql
INSERT INTO students (full_name, email) VALUES
('Alice Johnson', 'alice@email.com'),
('Bob Smith', 'bob@email.com'),
('Carol Lee', 'carol@email.com');

INSERT INTO courses (title, credits) VALUES
('SQL Basics', 3),
('Web Development', 4),
('Data Visualization', 3);

INSERT INTO enrollments (student_id, course_id) VALUES
(1, 1),
(1, 2),
(2, 1),
(3, 3);
```

## Step 3 --- Basic SQL Practice Exercises

### 1️⃣ Retrieve All Students

``` sql
SELECT * FROM students;
```

Exercise: - Modify this to only return `full_name` and `email`.

### 2️⃣ Filter With WHERE

``` sql
SELECT * FROM courses
WHERE credits = 3;
```

Exercises: - Return students whose name starts with "A".\
- Return students whose email ends in `email.com`.

### 3️⃣ Ordering Results

``` sql
SELECT * FROM students
ORDER BY full_name ASC;
```

Exercise: - Order courses by credits descending.

### 4️⃣ Count Records

``` sql
SELECT COUNT(*) AS total_students
FROM students;
```

Exercises: - Count how many enrollments exist.\
- Count how many courses have 3 credits.

### 5️⃣ Basic INNER JOIN

``` sql
SELECT s.full_name, c.title
FROM students s
JOIN enrollments e ON s.id = e.student_id
JOIN courses c ON c.id = e.course_id;
```

Exercises: - Modify this query to also show `enrolled_at`.\
- Sort results by student name.

### 6️⃣ LEFT JOIN

``` sql
SELECT s.full_name, c.title
FROM students s
LEFT JOIN enrollments e ON s.id = e.student_id
LEFT JOIN courses c ON c.id = e.course_id;
```

Exercise: - Identify which students are not enrolled in any course.

### 7️⃣ GROUP BY

``` sql
SELECT c.title, COUNT(e.id) AS student_count
FROM courses c
LEFT JOIN enrollments e ON c.id = e.course_id
GROUP BY c.title;
```

Exercise: - Only show courses with more than 1 student using `HAVING`.

## Step 4 --- INSERT SQL Practice Exercises

You've already used INSERT to seed data. Now let's practice adding new
records manually.

### Insert a New Student

``` sql
INSERT INTO students (full_name, email)
VALUES ('David Kim', 'david@email.com');
```

### Insert a New Course

``` sql
INSERT INTO courses (title, credits)
VALUES ('Backend Systems', 4);
```

### Enroll a Student in a Course

``` sql
INSERT INTO enrollments (student_id, course_id)
VALUES (4, 2);
```

Exercises:

-   Add two more students.\
-   Add one new course.\
-   Enroll an existing student into two courses.


## Step 5 --- UPDATE SQL Practice Exercises

UPDATE allows you to change existing records.

⚠️ Always use a WHERE clause unless you intentionally want to update
every row.

### Update a Student's Email

``` sql
UPDATE students
SET email = 'alice_new@email.com'
WHERE id = 1;
```

### Update Course Credits

``` sql
UPDATE courses
SET credits = 5
WHERE title = 'Web Development';
```

### Update Enrollment Status (if you add a status column)

``` sql
ALTER TABLE enrollments
ADD COLUMN status VARCHAR(50) DEFAULT 'active';

UPDATE enrollments
SET status = 'completed'
WHERE student_id = 1 AND course_id = 1;
```

Exercises:

-   Change Bob's email.\
-   Increase all 3-credit courses to 4 credits.\
-   Update multiple rows at once using a broader WHERE condition.

## Step 6 --- DELETE SQL Practice Exercises

DELETE removes rows from a table.

⚠️ Be careful. If you forget WHERE, you delete everything.

### Delete a Single Enrollment

``` sql
DELETE FROM enrollments
WHERE student_id = 2 AND course_id = 1;
```

### Delete a Student

``` sql
DELETE FROM students
WHERE id = 4;
```

⚠️ If the student has enrollments, this may fail due to foreign key
constraints.

Exercises:

-   Delete a course that has no enrollments.\
-   Delete all enrollments for a specific student.\
-   Try deleting a student who still has enrollments --- observe what
    happens.

## Final Challenge

Write a query that answers:

"Which students are enrolled in more than one course?"

Hint: - Use GROUP BY
- Use COUNT
- Use HAVING
