# Online Bookstore Backend

## Overview
The Online Bookstore backend is a RESTful API that provides functionalities for managing users, books, shopping carts, and orders. This backend serves as the foundation for an online bookstore, enabling user registration, authentication, book browsing, and order management.

# Project Setup

This README file provides instructions on setting up the PostgreSQL database for the project. Before starting the project, ensure you have PostgreSQL installed and PgAdmin configured.

## Prerequisites

- PostgreSQL 13 or later
- PgAdmin 4
- Basic knowledge of SQL

## Step-by-Step Guide

1. **Open PgAdmin**
   - Launch PgAdmin and connect to your PostgreSQL server.

2. **Create a New Database**
   - Right-click on the "Databases" node in the Object Explorer and select "Create" > "Database".
   - Name the database (e.g., `Online-Book-Store`).

3. **Create Tables**

Copy and paste the following SQL commands into the Query Tool in PgAdmin and execute them to create the necessary tables.

```sql
-- Create the users table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL
);

-- Create the orders table
CREATE TABLE orders (
    order_id TEXT PRIMARY KEY,
    user_id INT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    order_status VARCHAR(50) NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    address_line1 VARCHAR(255) NOT NULL,
    address_line2 VARCHAR(255),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    country VARCHAR(100) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Create the order_items table
CREATE TABLE order_items (
    order_item_id SERIAL PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- Create the cart table
CREATE TABLE cart (
    cart_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    date_added TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- Create the cart_history table
CREATE TABLE cart_history (
    history_id SERIAL PRIMARY KEY,
    cart_id INT NOT NULL,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    action VARCHAR(50) NOT NULL,
    quantity INT NOT NULL,
    action_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cart_id) REFERENCES cart(cart_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- Create the products table
CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    product_description TEXT,
    price DECIMAL(10, 2) NOT NULL
);

-- Create the books table
CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    author VARCHAR(100) NOT NULL,
    category VARCHAR(50),
    price DECIMAL(10, 2) NOT NULL,
    description TEXT
);

-- Create the admin table
CREATE TABLE admin (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
);
```

## Verify Tables

After executing the SQL commands, verify that the tables have been created successfully:

- Expand the "Schemas" node under your database.
- Expand the "Tables" node to see the list of created tables.

## Next Steps

With the database and tables set up, you can proceed with the application development, integrating the PostgreSQL database with your backend and ensuring proper data handling and management.

## Troubleshooting

- Ensure that PostgreSQL service is running.
- Check for any syntax errors in the SQL commands.
- Verify foreign key references if you encounter any integrity constraint violation errors.


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
  - **Endpoint**: `GET http://localhost:3000/book/showAllBooks`
  - **Description**: Displays a list of available books for users to browse.

- **Search Books**
  - **Endpoint**: `POST http://localhost:3000/book/searchBook`
  - **Description**: Allows users to search for books by title, author, or category.
  - **Query Parameters**: 'serialnumber', 'title', 'author', 'description', 'language'
  ```json
    {
      "searchKeyWord":"mystery set"
    }
    ```

- **View Book Details**
  - **Endpoint**: `POST http://localhost:3000/book/viewBookDetails/:serialNumber`
  - **Description**: Shows detailed information about a selected book.
  <!-- Ex - http://localhost:3000/book/viewBookDetails/8207207864 -->

### Shopping Cart APIs
- **Add to Cart**
  - **Endpoint**: `POST http://localhost:3000/cart/addToCart`
  - **Description**: Allows users to add books to their shopping cart.
  - **Request Body**:
    ```json
    {
      "user_id": 10, 
      "product_id": 8207207864, 
      "quantity":"5"
    }
    ```
- **View Cart**
  - **Endpoint**: `GET http://localhost:3000/cart/getCartInformation/:cartID`
  - **Description**: Displays the contents of the shopping cart.
  <!-- Ex - http://localhost:3000/cart/getCartInformation/31250502475793300000 -->

- **View Cart full information**
  - **Endpoint**: `GET http://localhost:3000/cart/getAllCarts/:cart_id`
  - **Description**: Displays the contents of the shopping cart.
  <!-- Ex - http://localhost:3000/cart/getAllCarts/10 -->

- **Remove from Cart**
  - **Endpoint**: `DELETE http://localhost:3000/cart/deleteCartInformation/:cartID`
  - **Description**: Allows users to remove items from the shopping cart.
  <!-- Ex - http://localhost:3000/cart/deleteCartInformation/35168043339183292000  -->

  - **Cart History**
  - **Endpoint**: `GET http://localhost:3000/cart/allCartHistory`
  - **Description**: Allows users to remove items from the shopping cart.
  <!-- Ex - http://localhost:3000/cart/allCartHistory  -->

  - **Single Cart full History**
  - **Endpoint**: `POST http://localhost:3000/cart/cartFullHistory/:history_id`
  - **Description**: Allows users to remove items from the shopping cart.
  <!-- Ex - http://localhost:3000/cart/cartFullHistory/1  -->

### Order APIs
- **Checkout**
  - **Endpoint**: `POST http://localhost:3000/order/orderItems`
  - **Description**: Enables users to place an order for the items in their shopping cart.
  - **Request Body**:
    ```json
    {
      "cartId": "string",
      "paymentDetails": "object"
    }
    ```

- **View Orders**
  - **Endpoint**: `http://localhost:3000/order/viewOrderItems`
  - **Description**: Allows users to view their order history.

It looks like you've provided the description and request bodies for various admin APIs, but there are a few corrections and improvements needed to align with typical API practices and functionality. Let's refine these descriptions and request bodies based on standard conventions:

### Admin APIs

#### Admin Signup

- **Endpoint**: `POST http://localhost:3000/admin/AdminSignup`
- **Description**: Allows admin users to register into the admin panel.
- **Request Body**:
  ```json
  {
    "username": "Durgesh Bisen",
    "password": "dallu",
    "email": "webdev.durgesh@gmail.com",
    "number": "9669931361",
    "address": "Khandwa Madhya Pradesh",
    "location": "Khandwa",
    "country": "India"
  }
  ```

#### Admin Login

- **Endpoint**: `POST http://localhost:3000/admin/AdminLogin`
- **Description**: Allows admin users to log into the admin panel.
- **Request Body**:
  ```json
  {
    "email": "webdev.durgesh@gmail.com",
    "password": "dallu"
  }
  ```

#### Update Admin Profile

- **Endpoint**: `PUT http://localhost:3000/admin/UpdateAdminProfile`
- **Description**: Allows admin users to update their profile information.
- **Request Body**:
  ```json
  {
    "password": "dallu",
    "username": "Durgesh Thakur",
    "email": "webdev.durgesh@gmail.com",
    "number": "9669931361",
    "address": "Khandwa Madhya Pradesh",
    "location": "Khandwa",
    "country": "India",
    "photo:":"photo name"
  }
  ```

#### Generate OTP

- **Endpoint**: `POST http://localhost:3000/admin/GenerateOTP`
- **Description**: Generates and sends OTP to the registered email for password reset.
- **Request Body**:
  ```json
  {
    "email": "webdev.durgesh@gmail.com"
  }
  ```

#### Forgot Admin Password

- **Endpoint**: `PUT http://localhost:3000/admin/ForgotAdminPassword`
- **Description**: Allows admin users to reset their password using OTP.
- **Request Body**:
  ```json
  {
    "email": "webdev.durgesh@gmail.com",
    "otp": "123456",  // OTP received via email
    "newPassword": "newpassword"
  }
  ```

#### Delete Admin Account

- **Endpoint**: `DELETE http://localhost:3000/admin/DeleteAdminAccount`
- **Description**: Allows admin users to permanently delete their account after OTP verification.
- **Request Body**:
  ```json
  {
    "email": "webdev.durgesh@gmail.com",
    "otp": "123456"  // OTP received via email for verification
  }
  ```


- **Manage Inventory**
  - **Add Book**
    - **Endpoint**: `POST http://localhost:3000/book/uploadBook`
    - **Description**: Allows admins to add a new book to the inventory.
    - **Request Body**:
      ```json
      {
        "title": "Mystery of the Lost City",
        "author": "Jane Smith",
        "description": "A thrilling mystery set in an ancient city.",
        "publisher": "Mystery House",
        "published_date": "2019-11-22",
        "language": "English",
        "pages": 280,
        "price": 15.99,
        "quantity": 30,
        "photo": "lost_city.jpg",   
        "gallery": [
                     "city1.jpg",
                     "city2.jpg"
                   ]
      }
      ```
      <!-- NOTE - Photo And Gallery Upload imgae using form data -->

  - **Edit Book**
    - **Endpoint**: `PUT http://localhost:3000/book/updateBook/:serialNumber`
    <!-- Ex - http://localhost:3000/book/updateBook/9839291938 -->
    - **Description**: Allows admins to edit an existing book in the inventory.
    - **Request Body**:
      <!-- change Date -->
      ```json
      {
        "title": "Mystery of the Lost City",
        "author": "Jane Smith",
        "description": "A thrilling mystery set in an ancient city.",
        "publisher": "Mystery House",
        "published_date": "2019-11-23",
        "language": "English",
        "pages": 280,
        "price": 15.99,
        "quantity": 30,
        "photo": "lost_city.jpg",   
        "gallery": [
                     "city1.jpg",
                     "city2.jpg"
                   ]
      }
      ```

  - **Delete Book**
    - **Endpoint**: `DELETE http://localhost:3000/book/deleteBook/:serialNumber`
    <!-- Ex - http://localhost:3000/book/deleteBook/4841877989 -->
    - **Description**: Allows admins to delete a book from the inventory.

- **Manage Orders**
  - **View Orders**
    - **Endpoint**: `GET http://localhost:3000/order/viewOrderItems`
    - **Description**: Allows admins to view customer orders.

  - **Update Orders**
    - **Endpoint**: `POST http://localhost:3000/order/UpdatwOrderItemsStatus/:order_id`
    - **Description**: Allows admins to view customer orders.
    <!-- EX - http://localhost:3000/order/UpdatwOrderItemsStatus/IP9P7PFEHWBHY5SFTFKN -->

    ```json
    {
      "order_status":"completed"
    }
    ```





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
