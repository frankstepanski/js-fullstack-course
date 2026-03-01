#  SQL Practice Lab --- Using DB Fiddle

We'll be using the tool https://www.db-fiddle.com/ for our SQL
exercises.

### What Is DB Fiddle?

DB Fiddle is an online SQL playground that allows you to:

-   Create tables
-   Insert data
-   Run queries
-   See results instantly

All inside your browser --- no installation required.

### Why It's Great for Practice

When you're learning SQL, setting up:

-   PostgreSQL locally
-   Creating databases
-   Seeding data
-   Managing connections

...can become a distraction from actually learning SQL.

DB Fiddle removes that overhead so you can:

✔️ Focus only on writing queries\
✔️ Quickly experiment\
✔️ Break things safely\
✔️ Reset your schema easily\
✔️ Practice anywhere

Think of it as the CodePen for databases.

#  Practice Scenario --- Education Platform

We'll simulate a simple education system with:

-   Students
-   Courses
-   Enrollments


##  Step 1 --- Create the Tables

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

**Exercise:**
- Modify this to only return `full_name` and `email`.

### 2️⃣ Filter With WHERE

``` sql
SELECT * FROM courses
WHERE credits = 3;
```

**Exercises:**
- Return students whose name starts with "A".
- Return students whose email ends in `email.com`.

### 3️⃣ Ordering Results

``` sql
SELECT * FROM students
ORDER BY full_name ASC;
```

**Exercise:**
- Order courses by credits descending.

### 4️⃣ Count Records

``` sql
SELECT COUNT(*) AS total_students
FROM students;
```

**Exercises:**
- Count how many enrollments exist.
- Count how many courses have 3 credits.

### 5️⃣ Basic INNER JOIN

``` sql
SELECT s.full_name, c.title
FROM students s
JOIN enrollments e ON s.id = e.student_id
JOIN courses c ON c.id = e.course_id;
```

**Exercises:**
- Modify this query to also show `enrolled_at`.
- Sort results by student name.


### 6️⃣ LEFT JOIN

``` sql
SELECT s.full_name, c.title
FROM students s
LEFT JOIN enrollments e ON s.id = e.student_id
LEFT JOIN courses c ON c.id = e.course_id;
```

**Exercise:**
- Identify which students are not enrolled in any course.

### 7️⃣ GROUP BY

``` sql
SELECT c.title, COUNT(e.id) AS student_count
FROM courses c
LEFT JOIN enrollments e ON c.id = e.course_id
GROUP BY c.title;
```

**Exercise:**
- Only show courses with more than 1 student using `HAVING`.

## Final Challenge

Write a query that answers:

"Which students are enrolled in more than one course?"

Hint: - Use `GROUP BY` - Use `COUNT` - Use `HAVING`
