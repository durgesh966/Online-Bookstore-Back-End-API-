# Online Bookstore Backend

## Overview
The Online Bookstore backend is a RESTful API that provides functionalities for managing users, books, shopping carts, and orders. This backend serves as the foundation for an online bookstore, enabling user registration, authentication, book browsing, and order management.

## Functionality

### User APIs
- **User Registration**
  - **Endpoint**: `POST user/register`
  - **Description**: Allows users to create an account.
  - **Request Body**:
    ```json
    {
    "username":"Durgesh Bisen", 
    "password":"dallu", 
    "email":"webdev.durgesh@gmail.com", 
    "number":"9669931361", 
    "address":"Khandwa Madhya Pradesh", 
    "location":"Khandwa", 
    "country":"India"
    }
    ```

- **User Login**
  - **Endpoint**: `POST /user/login`
  - **Description**: Enables users to log in to their accounts.
  - **Request Body**:
    ```json
    {
    "email":"webdev.durgesh@gmail.com", 
    "password":"durgesh"
    }
    ```

    - **User Update**
  - **Endpoint**: `PUT /user/updateUser`
  - **Description**: Enables users to update information in to their accounts.
  - **Request Body**:
    <!-- note:- before this create a foldar name with tmp/my-uploads -->
    ```json
    {
    "password":"dallu", 
    "username":"Dallu Thakur", 
    "email":"webdev.durgesh@gmail.com", 
    "number":"9669931360", 
    "address":"surgaon Banjari kalkapuram", 
    "location":"Khandwa", 
    "country":"India",
    "photos":"image url string"
    }
    ```

    - **User Send OTP for user forgate password and delete account**
  - **Endpoint**: `POST /user/generateotp`
  - **Description**: Enables users to send OTP on registerd email address for delete account and forgate password.
  - **Request Body**:
    ```json
    {
    "Email":"webdev.durgesh@gmail.com"
    }
    ```

    - **User forgate password and update password**
  - **Endpoint**: `POST http://localhost:3000/user/forgotpassword`
  - **Description**: Enables users to log in to their accounts.
  - **Request Body**:
    ```json
    {
    "email":"webdev.durgesh@gmail.com",
    "otp": 5477,
    "newPassword":"dallu"
    }
    ```
    

### Book APIs
- **Browse Books**
  - **Endpoint**: `GET /api/books`
  - **Description**: Displays a list of available books for users to browse.

- **Search Books**
  - **Endpoint**: `GET /api/books/search`
  - **Description**: Allows users to search for books by title, author, or category.
  - **Query Parameters**: `title`, `author`, `category`

- **View Book Details**
  - **Endpoint**: `GET /api/books/:bookId`
  - **Description**: Shows detailed information about a selected book.

### Shopping Cart APIs
- **Add to Cart**
  - **Endpoint**: `POST /api/cart`
  - **Description**: Allows users to add books to their shopping cart.
  - **Request Body**:
    ```json
    {
      "bookId": "string",
      "quantity": "integer"
    }
    ```

- **View Cart**
  - **Endpoint**: `GET /api/cart`
  - **Description**: Displays the contents of the shopping cart.

- **Remove from Cart**
  - **Endpoint**: `DELETE /api/cart/:bookId`
  - **Description**: Allows users to remove items from the shopping cart.

### Order APIs
- **Checkout**
  - **Endpoint**: `POST /api/orders`
  - **Description**: Enables users to place an order for the items in their shopping cart.
  - **Request Body**:
    ```json
    {
      "cartId": "string",
      "paymentDetails": "object"
    }
    ```

- **View Orders**
  - **Endpoint**: `GET /api/orders`
  - **Description**: Allows users to view their order history.

### Admin APIs
- **Admin Login**
  - **Endpoint**: `POST /api/admin/login`
  - **Description**: Enables admin users to log in to the admin panel.
  - **Request Body**:
    ```json
    {
      "username": "string",
      "password": "string"
    }
    ```

- **Manage Inventory**
  - **Add Book**
    - **Endpoint**: `POST /api/admin/books`
    - **Description**: Allows admins to add a new book to the inventory.
    - **Request Body**:
      ```json
      {
        "title": "string",
        "author": "string",
        "category": "string",
        "price": "number",
        "description": "string"
      }
      ```

  - **Edit Book**
    - **Endpoint**: `PUT /api/admin/books/:bookId`
    - **Description**: Allows admins to edit an existing book in the inventory.
    - **Request Body**:
      ```json
      {
        "title": "string",
        "author": "string",
        "category": "string",
        "price": "number",
        "description": "string"
      }
      ```

  - **Delete Book**
    - **Endpoint**: `DELETE /api/admin/books/:bookId`
    - **Description**: Allows admins to delete a book from the inventory.

- **Manage Orders**
  - **View Orders**
    - **Endpoint**: `GET /api/admin/orders`
    - **Description**: Allows admins to view customer orders.

## Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/durgesh966/Online-Bookstore-Back-End-API.git
    cd online-bookstore-backend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Set up the database:
    - Ensure you have a running database instance.
    - Run the database migrations:
    ```sh
    npm run migrate
    ```

4. Start the application:
    ```sh
    npm start
    ```

5. The API will be available at `http://localhost:3000`.


## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
