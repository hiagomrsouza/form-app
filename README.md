# Form App

A web application that allows users to create custom forms, view them, and fill them out.

## Prerequisites

- [Docker](https://www.docker.com/get-started) must be installed on your system

## Running the Project Locally

1. Clone the repository and navigate to the project root directory

2. Start the application using Docker Compose:
   ```bash
   docker compose up -d
   ```

3. Run migrations and seed data:
   ```bash
   cd backend
   npm run migrate
   npm run seed
   ```

4. Access the application at [http://localhost:3000](http://localhost:3000)

## Features

### Form Management

- **Form Listing**: Access `/` or `/forms` to view all created forms
  - If no forms exist, a "Create new form" button is available at the top of the page

- **Form Creation**: Click the "Create new form" button to build a custom form
  - Once created, the form will appear in the form list

- **Form Viewing**: Click on any form in the list to view its details
  - From the view page, you can access the "Fill out" feature

- **Form Filling**: Complete the form and save the data

### Accessing Filled Data

Currently, filled form data can only be accessed directly from the database using the following SQL query:

```sql
select * from source_data;