# SQL Practice Lab ---  Solutions


## Basic SQL Practice Exercises 

### 1️⃣ Retrieve Only full_name and email

``` sql
SELECT full_name, email
FROM students;
```

### 2️⃣ Filter With WHERE

### Students whose name starts with "A"

``` sql
SELECT *
FROM students
WHERE full_name LIKE 'A%';
```

### Students whose email ends in email.com

``` sql
SELECT *
FROM students
WHERE email LIKE '%email.com';
```

### 3️⃣ Order Courses by Credits Descending

``` sql
SELECT *
FROM courses
ORDER BY credits DESC;
```

### 4️⃣ Count Records

### Count enrollments

``` sql
SELECT COUNT(*) AS total_enrollments
FROM enrollments;
```

### Count courses with 3 credits

``` sql
SELECT COUNT(*) AS three_credit_courses
FROM courses
WHERE credits = 3;
```

### 5️⃣ INNER JOIN --- Include enrolled_at and Sort

``` sql
SELECT s.full_name, c.title, e.enrolled_at
FROM students s
JOIN enrollments e ON s.id = e.student_id
JOIN courses c ON c.id = e.course_id
ORDER BY s.full_name ASC;
```

### 6️⃣ LEFT JOIN --- Students Not Enrolled

``` sql
SELECT s.full_name
FROM students s
LEFT JOIN enrollments e ON s.id = e.student_id
WHERE e.id IS NULL;
```

### 7️⃣ GROUP BY with HAVING

### Courses with more than 1 student

``` sql
SELECT c.title, COUNT(e.id) AS student_count
FROM courses c
LEFT JOIN enrollments e ON c.id = e.course_id
GROUP BY c.title
HAVING COUNT(e.id) > 1;
```

##  INSERT SQL Practice 

### Add Two More Students

``` sql
INSERT INTO students (full_name, email)
VALUES ('David Kim', 'david@email.com'),
       ('Emma Davis', 'emma@email.com');
```

### Add One New Course

``` sql
INSERT INTO courses (title, credits)
VALUES ('Backend Systems', 4);
```

### Enroll Existing Student into Two Courses

``` sql
INSERT INTO enrollments (student_id, course_id)
VALUES (2, 2),
       (2, 3);
```

##  UPDATE SQL Practice

### Change Bob's Email

``` sql
UPDATE students
SET email = 'bob_new@email.com'
WHERE full_name = 'Bob Smith';
```

### Increase All 3-Credit Courses to 4 Credits

``` sql
UPDATE courses
SET credits = 4
WHERE credits = 3;
```

### Update Multiple Rows with Broader WHERE

``` sql
UPDATE enrollments
SET enrolled_at = NOW()
WHERE student_id = 2;
```

## DELETE SQL Practice 

### Delete Course With No Enrollments

``` sql
DELETE FROM courses
WHERE id NOT IN (
  SELECT DISTINCT course_id FROM enrollments
);
```

### Delete All Enrollments for a Specific Student

``` sql
DELETE FROM enrollments
WHERE student_id = 3;
```

### Attempt to Delete Student With Existing Enrollments

``` sql
DELETE FROM students
WHERE id = 1;
```

This will fail if foreign key constraints prevent deletion.

## Final Challenge 

"Which students are enrolled in more than one course?"

``` sql
SELECT s.full_name, COUNT(e.course_id) AS course_count
FROM students s
JOIN enrollments e ON s.id = e.student_id
GROUP BY s.id, s.full_name
HAVING COUNT(e.course_id) > 1;
```
