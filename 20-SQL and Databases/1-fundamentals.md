# SQL Fundamentals

## What Is SQL?

**SQL (Structured Query Language)** is the standard language used to
communicate with **relational databases**.

Relational databases store information in **tables**, which are made up of
**rows and columns**.

- **Rows** represent individual records (for example, one user).
- **Columns** represent pieces of information about that record (such as name, email, or age).

Developers use SQL to **interact with this table data**.

## How SQL Connects to Real Applications

In a real web application, users constantly interact with data.

For example, a user might:

- Create a new account
- View their profile
- Update their password
- Delete their account

These actions are known as **CRUD operations**:

| Action | Meaning | HTTP Request | SQL Command | Example |
|---|---|---|---|---|
| **Create** | Add new data | `POST` | `INSERT` | Register a new user |
| **Read** | Retrieve data | `GET` | `SELECT` | View a profile |
| **Update** | Modify existing data | `PUT` / `PATCH` | `UPDATE` | Change an email |
| **Delete** | Remove data | `DELETE` | `DELETE` | Delete an account |

When a user performs one of these actions, the **backend server** sends a
request to the database.

If the application is using a **relational database**, these requests are
completed by **working with table data using SQL**.

This is how user actions become permanent changes in the database.

## Understanding Tables, Rows, and Columns

Relational databases store data in **tables**, similar to spreadsheets.

Each table represents a **type of data**.

Example: a `users` table.

| id | name  | email            |
|----|-------|------------------|
| 1  | Alice | alice@email.com  |
| 2  | Bob   | bob@email.com    |
| 3  | Carla | carla@email.com  |

### Columns

Columns describe **what type of information is stored**.

Example columns:

-   `id`
-   `name`
-   `email`

Each column also has a **data type**.

| Column | Data Type | Meaning |
|------|-----------|----------------|
| id | INTEGER | Unique user ID |
| name | TEXT | User name |
| email | TEXT | Email address |

### Rows

Each **row** represents a single record.

Example row:

| id | name  | email           |
|----|-------|-----------------|
| 1  | Alice | alice@email.com |

That row represents **one user**.

So a table is simply:

    Table
     ├─ Row
     ├─ Row
     └─ Row
## Retrieving Data with SELECT

The most common SQL command is **SELECT**, which retrieves data from a
table.

Think of `SELECT` as **asking the database a question**.

Example:

``` sql
SELECT * FROM users;
```

This means:

-   `SELECT` → retrieve data
-   `*` → all columns
-   `FROM users` → from the `users` table

Running `SELECT * FROM users;` returns **all rows and all columns** from the table.

### Selecting Specific Columns

Often you **don't need all the data** from a table.

Instead, you can request **specific columns**.

Example:

``` sql
SELECT name, email FROM users;
```

This query asks the database:

Return only the `name` and `email` columns from the `users` table.

#### Result:

| name  | email            |
|-------|------------------|
| Alice | alice@email.com  |
| Bob   | bob@email.com    |
| Carla | carla@email.com  |

Notice that the **id column is not included**, because we didn't request
it.

### Why SELECT Is Important

`SELECT` is used constantly in real applications.

Examples:

-   Loading a user's profile
-   Displaying a list of products
-   Showing posts in a social media feed
-   Generating reports from stored data

Almost every application needs to **retrieve data from a database**, and
`SELECT` is the command that makes this possible.

## Filtering Data with WHERE

Often you **don't want every row in a table**. Instead, you want to
retrieve **only the rows that match certain conditions**.

That's where the **`WHERE` clause** comes in.

`WHERE` tells the database:

> Only return rows that meet a specific condition.

#### Example Table

 | id | name  | email            |
|----|-------|------------------|
| 1  | Alice | alice@email.com  |
| 2  | Bob   | bob@email.com    |
| 3  | Carla | carla@email.com  |

### Example: Find One User

``` sql
SELECT * FROM users
WHERE id = 1;
```

This query means:

-   `SELECT *` → return all columns
-   `FROM users` → from the `users` table
-   `WHERE id = 1` → only return rows where the id is 1

#### Result:

| id | name  | email           |
|----|-------|-----------------|
| 1  | Alice | alice@email.com |

The database **filters the table** and returns only the row that matches
the condition.

### Example: Find a Specific Name

``` sql
SELECT * FROM users
WHERE name = 'Bob';
```

#### Result:

| id | name | email          |
|----|------|----------------|
| 2  | Bob  | bob@email.com  |

Notice that **text values must be wrapped in quotes**.

### Example: Select Specific Columns with Filtering

You can combine `WHERE` with selecting specific columns.

``` sql
SELECT name, email
FROM users
WHERE id = 2;
```

#### Result:

| name | email          |
|------|----------------|
| Bob  | bob@email.com  |
This query:

-   Retrieves **only two columns**
-   From **only one row**

## Comparison Operators

`WHERE` works using **comparison operators**.

| Operator | Meaning            |
|----------|--------------------|
| =        | equal              |
| !=       | not equal          |
| >        | greater than       |
| <        | less than          |
| >=       | greater or equal   |
| <=       | less or equal      |

These allow you to create different types of filters.

### Example: Greater Than

``` sql
SELECT * FROM users
WHERE id > 1;
```

#### Result:

| id | name  | email           |
|----|-------|-----------------|
| 2  | Bob   | bob@email.com   |
| 3  | Carla | carla@email.com |

This query returns **all users with an id greater than 1**.

### Example: Not Equal

``` sql
SELECT * FROM users
WHERE name != 'Alice';
```

Result:

| id | name  | email           |
|----|-------|-----------------|
| 2  | Bob   | bob@email.com   |
| 3  | Carla | carla@email.com |

This query returns **all users except Alice**.

### Why Filtering Is Important

Filtering data is extremely common in real applications.

Examples include:

-   Showing a specific user's profile
-   Finding orders placed today
-   Loading posts from a specific author
-   Displaying products under a certain price

Instead of retrieving **every row in a table**, `WHERE` lets you retrieve **exactly the data you need**.

## Inserting Data with INSERT

To **add new records to a table**, we use the **`INSERT`** command.

`INSERT` creates a **new row in a database table**.

This is how applications **store new information permanently**.

Example:

``` sql
INSERT INTO users (name, email)
VALUES ('Alice', 'alice@email.com');
```

This statement means:

-   `INSERT INTO users` → add a new row to the `users` table
-   `(name, email)` → the columns we want to fill with data
-   `VALUES (...)` → the actual data being inserted


#### Example Table Before INSERT

| id | name | email          |
|----|------|----------------|
| 1  | Bob  | bob@email.com  |

#### After INSERT

| id | name  | email            |
|----|-------|------------------|
| 1  | Bob   | bob@email.com    |
| 2  | Alice | alice@email.com  |


### How INSERT Relates to the Frontend

In real applications, `INSERT` usually happens when a user **submits a form**.

For example, imagine a signup form in a React application.
A user fills out a signup form:

    Name: Alice
    Email: alice@email.com

Then clicks **Submit**.

    [ User fills out form ]
            │
            ▼
    [ React Frontend ]
    Sends request to API
            │
            ▼
    POST /api/users
            │
            ▼
    [ Backend Server (Node / Express) ]
    Processes the request
            │
            ▼
    Runs SQL Query:
    INSERT INTO users (name, email)
    VALUES ('Alice', 'alice@email.com');
            │
            ▼
    [ Database ]
    New row is added to the users table


#### The frontend might send a request like this:

POST /api/users

With data:

``` json
{
  "name": "Alice",
  "email": "alice@email.com"
}
```

The backend server then runs the SQL query:

``` sql
INSERT INTO users (name, email)
VALUES ('Alice', 'alice@email.com');
```

This **stores the new user in the database**.

### Example: Adding Multiple Users

You can insert multiple rows at once.

``` sql
INSERT INTO users (name, email)
VALUES
('Alice', 'alice@email.com'),
('Bob', 'bob@email.com'),
('Carla', 'carla@email.com');
```

#### Resulting table:

| id | name  | email            |
|----|-------|------------------|
| 1  | Alice | alice@email.com  |
| 2  | Bob   | bob@email.com    |
| 3  | Carla | carla@email.com  |

## Updating Existing Data

To **change existing data in a table**, we use the **UPDATE** command.

`UPDATE` modifies values that already exist in a database row.

Example:

``` sql
UPDATE users
SET email = 'alice@newdomain.com'
WHERE id = 1;
```

This query means:

-   `UPDATE users` → modify rows in the `users` table
-   `SET email = ...` → change the value of the `email` column
-   `WHERE id = 1` → only update the row where the id is 1

### Why a Unique Identifier Is Important

When updating data, you usually want to **change one specific record**.

To do that safely, tables typically contain a **unique identifier
column**, such as an `id`.

#### Example table:

| id | name  | email            |
|----|-------|------------------|
| 1  | Alice | alice@email.com  |
| 2  | Bob   | bob@email.com    |
| 3  | Carla | carla@email.com  |

Because the `id` column is **unique**, we can safely update a single
user.

### Example Update

Let's update Alice's email.

``` sql
UPDATE users
SET email = 'alice@newdomain.com'
WHERE id = 1;
```

#### Table Before Update

| id | name  | email            |
|----|-------|------------------|
| 1  | Alice | alice@email.com  |
| 2  | Bob   | bob@email.com    |
| 3  | Carla | carla@email.com  |

#### Table After Update

 | id | name  | email                |
|----|-------|----------------------|
| 1  | Alice | alice@newdomain.com  |
| 2  | Bob   | bob@email.com        |
| 3  | Carla | carla@email.com      |

Only **one row was modified**.


### ⚠️ Why the WHERE Clause Is Important

The `WHERE` clause prevents accidental updates to **every row in the
table**.

Example (dangerous):

``` sql
UPDATE users
SET email = 'updated@email.com';
```

Without a `WHERE` condition, the result would be:

| id | name  | email              |
|----|-------|--------------------|
| 1  | Alice | updated@email.com  |
| 2  | Bob   | updated@email.com  |
| 3  | Carla | updated@email.com  |

Every row would be changed.

That is why developers almost always update using a **unique identifier
like `id`**.

### How UPDATE Relates to the Frontend

In real applications, `UPDATE` usually happens when a user **edits existing information** — editing a profile, changing a password, updating an address, or editing a blog post.

The frontend sends a `PUT` request to the backend, which runs the SQL query:

    PUT /api/users/1

With data:

``` json
{
  "email": "alice@newdomain.com"
}
```

## Deleting Data

To **remove records from a table**, we use the **DELETE** command.

`DELETE` permanently removes rows from a database table.

Example:

``` sql
DELETE FROM users
WHERE id = 1;
```

This query means:

-   `DELETE FROM users` → remove rows from the `users` table\
-   `WHERE id = 1` → only delete the row where the id is 1

#### Example Table

| id | name  | email            |
|----|-------|------------------|
| 1  | Alice | alice@email.com  |
| 2  | Bob   | bob@email.com    |
| 3  | Carla | carla@email.com  |

#### After DELETE

``` sql
DELETE FROM users
WHERE id = 1;
```

#### Result:

| id | name  | email           |
|----|-------|-----------------|
| 2  | Bob   | bob@email.com   |
| 3  | Carla | carla@email.com |

The row for **Alice** has been removed from the table.

### ⚠️ Why the WHERE Clause Is Important

The same rule applies here as with `UPDATE` — always use `WHERE` with a unique identifier. Without it, `DELETE FROM users;` would wipe every row in the table.

### How DELETE Relates to the Frontend

In real applications, `DELETE` usually happens when a user **removes something** — deleting an account, removing a post, or clearing a saved item.

The frontend sends a `DELETE` request, and the backend runs the SQL query:

    DELETE /api/users/1

### Real-World Considerations When Deleting Data

Deleting data is often **more complicated in real applications**.

### 1. Related Data in Other Tables

Many databases have **relationships between tables**.

Example:

    users
    orders
    comments
    posts

If you delete a user, what happens to:

-   their orders?
-   their comments?
-   their posts?

Developers must decide whether to:

-   delete related records\
-   keep them but remove the user reference\
-   prevent the deletion entirely

---

### 2. Soft Deletes (Archiving Instead)

Sometimes applications **do not truly delete data**.

Instead, they mark the record as inactive.

Example:

| id | name  | email            | deleted |
|----|-------|------------------|---------|
| 1  | Alice | alice@email.com  | true    |

This is called a **soft delete**.

Benefits:

-   prevents accidental data loss\
-   allows restoring accounts\
-   keeps historical records

---

### 3. Legal or Business Requirements

Some data must be preserved for:

-   financial records
-   auditing
-   legal compliance
-   analytics

In these cases, data might be **archived instead of deleted**.



## What's Next: Database Schemas and Creating Tables

You now know how to read, write, update, and delete data from a database table. But before any of that can happen, the table itself has to exist — and that means designing it first.

The next document covers **building a database schema**. A schema is the overall blueprint of your database — it defines what tables exist, what columns each table has, what type of data each column holds, and how the tables relate to each other.
