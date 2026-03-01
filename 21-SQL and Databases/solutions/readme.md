#  SQL Practice Lab --- Solutions to Extra Exercises

This file contains solutions to the extra exercises from the SQL
Practice Lab.


## 1️⃣ Retrieve Only full_name and email

``` sql
SELECT full_name, email
FROM students;
```

## 2️⃣ Filter With WHERE

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

## 3️⃣ Order Courses by Credits Descending

``` sql
SELECT *
FROM courses
ORDER BY credits DESC;
```

## 4️⃣ Count Records

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

## 5️⃣ INNER JOIN --- Include enrolled_at and Sort

``` sql
SELECT s.full_name, c.title, e.enrolled_at
FROM students s
JOIN enrollments e ON s.id = e.student_id
JOIN courses c ON c.id = e.course_id
ORDER BY s.full_name ASC;
```
## 6️⃣ LEFT JOIN --- Students Not Enrolled

``` sql
SELECT s.full_name
FROM students s
LEFT JOIN enrollments e ON s.id = e.student_id
WHERE e.id IS NULL;
```

## 7️⃣ GROUP BY with HAVING

### Courses with more than 1 student

``` sql
SELECT c.title, COUNT(e.id) AS student_count
FROM courses c
LEFT JOIN enrollments e ON c.id = e.course_id
GROUP BY c.title
HAVING COUNT(e.id) > 1;
```

## 🏁 Final Challenge Solution

### Students enrolled in more than one course

``` sql
SELECT s.full_name, COUNT(e.course_id) AS course_count
FROM students s
JOIN enrollments e ON s.id = e.student_id
GROUP BY s.id, s.full_name
HAVING COUNT(e.course_id) > 1;
```
