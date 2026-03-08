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

| Action | Meaning | Example |
|------|------|------|
| **Create** | Add new data | Register a new user |
| **Read** | Retrieve data | View a profile |
| **Update** | Modify existing data | Change an email |
| **Delete** | Remove data | Delete an account |

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

### Example Table

| id | name  | email            |
|----|-------|------------------|
| 1  | Alice | alice@email.com  |
| 2  | Bob   | bob@email.com    |
| 3  | Carla | carla@email.com  |

Running this query:

``` sql
SELECT * FROM users;
```

Returns **all rows and all columns** from the table.

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

In real applications, `UPDATE` usually happens when a user **edits
existing information**.

For example:

-   editing a profile
-   changing a password
-   updating an address
-   editing a blog post

### Frontend Example


For example, imagine a user editing their profile. A updates a form:

    Name: Alice
    Email: alice@newdomain.com

They click **Save**.

    [ User edits profile ]
            │
            ▼
    [ React Frontend ]
    User clicks Save
            │
            ▼
    PUT /api/users/1
            │
            ▼
    [ Backend Server (Node / Express) ]
    Processes request
            │
            ▼
    Runs SQL Query
    UPDATE users
    SET email = 'alice@newdomain.com'
    WHERE id = 1;
            │
            ▼
    [ Database ]
    User row is updated

#### The frontend might send a request like this:

    PUT /api/users/1

With data:

``` json
{
  "email": "alice@newdomain.com"
}
```

The backend then runs the SQL update query.

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

Just like `UPDATE`, the `WHERE` clause prevents deleting **every row in
the table**.

Example (dangerous):

``` sql
DELETE FROM users;
```

Result:

| id | name | email |
|----|------|-------|

The entire table would be empty.

That is why developers almost always delete rows using a **unique identifier like `id`**.

### How DELETE Relates to the Frontend

In real applications, `DELETE` usually happens when a user **removes
something**.

Examples include:

-   deleting an account
-   removing a product from an admin dashboard
-   deleting a comment or post
-   removing a saved item

### Frontend Example

Imagine a user deleting their account.

    Account: Alice
    Email: alice@email.com

They click **Delete Account**.

### What Happens Next

    [ User clicks delete ]
            │
            ▼
    [ React Frontend ]
    Sends delete request
            │
            ▼
    DELETE /api/users/1
            │
            ▼
    [ Backend Server (Node / Express) ]
    Processes request
            │
            ▼
    Runs SQL Query
    DELETE FROM users
    WHERE id = 1;
            │
            ▼
    [ Database ]
    Row is removed from users table

#### The frontend might send a request like this:

    DELETE /api/users/1

The backend then runs the SQL query to remove that user.

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



# Creating Tables

Before storing data, we need to **create tables**.

Example:

``` sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT,
  email TEXT
);
```

This defines the structure of the table.

------------------------------------------------------------------------

# SQL in Backend Development

In real applications:

1.  The **frontend** sends a request.
2.  The **backend server** runs a SQL query.
3.  The **database executes the query**.
4.  Results are returned to the frontend.

Example in Node.js:

``` javascript
const result = await pool.query(
  "SELECT * FROM users WHERE id = $1",
  [1]
);
```

------------------------------------------------------------------------

# The Big Picture

SQL allows developers to **control and interact with relational
databases**.

With SQL you can:

-   define database structure
-   store application data
-   retrieve information
-   update records
-   analyze datasets

Modern application flow:

    Frontend (React)
          │
          ▼
    Backend API (Node / Express)
          │
          ▼
    SQL Query
          │
          ▼
    Database (PostgreSQL / MySQL)
          │
          ▼
    Stored Data
