

# Task Management API

This is a Task Management API built using Hono and Prisma with Accelerate extension. The API allows you to create, retrieve, update, and delete tasks.

## Prerequisites

- Node.js v16 or above
- A running instance of a database supported by Prisma (e.g., PostgreSQL, MySQL, SQLite, etc.)
- Prisma client library installed
- Environment variable `DATABASE_URL` set to your Prisma database URL

## Installation

1. Clone the repository:

    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up your environment variable by creating a `.env` file in the root of the project:

    ```bash
    DATABASE_URL="your-database-url"
    ```

4. Run the server:

    ```bash
    npm run dev
    ```

## API Endpoints

### 1. Create a Task

- **Endpoint:** `POST /tasks`
- **Description:** Creates a new task.
- **Request Body:**
  ```json
  {
    "title": "Task Title",
    "description": "Task Description",
    "status": "PENDING",
    "due_date": "2024-12-31T23:59:59.999Z",
    "priority": "HIGH"
  }
  ```
- **Response:**
  ```json
  {
    "id": 1
  }
  ```

### 2. Get All Tasks

- **Endpoint:** `GET /tasks`
- **Description:** Retrieves all tasks with optional query parameters.
- **Query Parameters:**
  - `priority` (optional): Filter tasks by priority (`LOW`, `MEDIUM`, `HIGH`).
  - `status` (optional): Filter tasks by status (`PENDING`, `IN_PROGRESS`, `COMPLETED`).
  - `sortBy` (optional): Sort tasks by `created_at` or `due_date` or `priority`.
  - `order` (optional): Sort order (`asc` or `desc`).
- **Response:**
  ```json
  [
    {
      "task_id": 1,
      "title": "Task Title",
      "description": "Task Description",
      "status": "PENDING",
      "due_date": "2024-12-31T23:59:59.999Z",
      "created_at: "2024-09-11T13:09:00.564Z",
      "updated_at": "2024-09-11T13:09:00.564Z",
      "priority": "HIGH"
    },
    ...
  ]
  ```

### 3. Get a Task by ID

- **Endpoint:** `GET /tasks/:id`
- **Description:** Retrieves a specific task by its ID.
- **Response:**
  ```json
  {
    "task": {
      "task_id": 1,
      "title": "Task Title",
      "description": "Task Description",
      "status": "PENDING",
      "due_date": "2024-12-31T23:59:59.999Z",
      "created_at: "2024-09-11T13:09:00.564Z",
      "updated_at": "2024-09-11T13:09:00.564Z",
      "priority": "HIGH"
    }
  }
  ```

### 4. Update a Task

- **Endpoint:** `PUT /tasks/:id`
- **Description:** Updates a specific task by its ID.
- **Request Body:**
  ```json
  {
    "title": "Updated Task Title",
    "description": "Updated Task Description",
    "status": "COMPLETED",
    "due_date": "2024-12-31",
    "priority": "MEDIUM"
  }
  ```
- **Response:**
  ```json
  {
    "id": 1
  }
  ```

### 5. Delete a Task

- **Endpoint:** `DELETE /tasks/:id`
- **Description:** Deletes a specific task by its ID.
- **Response:**
  ```json
  {
    "message": "Task deleted successfully",
    "task": {
      "task_id": 1,
      "title": "Task Title",
      "description": "Task Description",
      "status": "PENDING",
      "due_date": "2024-12-31T23:59:59.999Z",
      "created_at: "2024-09-11T13:09:00.564Z",
      "updated_at": "2024-09-11T13:09:00.564Z",
      "priority": "HIGH"
    }
  }
  ```

## Error Handling

The API returns appropriate error messages and HTTP status codes for different error scenarios:

- `400 Bad Request` - Invalid request or parameters
- `404 Not Found` - Task not found
- `500 Internal Server Error` - Server-side error

## License

This project is licensed under the MIT License.

## Contact

For any questions or inquiries, please contact Ayush Kannaujiya at ayushkannaujiya@gmail.com

## Live URL

https://backend-challenge.ayushkannaujiya.workers.dev
