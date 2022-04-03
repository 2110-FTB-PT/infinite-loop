<p align="center"><img src="./src/components/img/plantarriumreadme.png" width="400"></p>


<!-- TABLE OF CONTENTS -->
# Table of Contents
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#how-it-works">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#local-development">Project Development</a>
      <ul>
        <li><a href="#project-structure">Project Structure</a></li>
      </ul>
      <ul>
        <li><a href="#heroku-deployement">Deployment</a></li>
      </ul>
    </li>
    <li>
      <a href="#project-features">Project Features</a>
      <ul>
        <li><a href="#users">Users</a></li>
      </ul>
      <ul>
        <li><a href="#produts">Products</a></li>
      </ul>
      <ul>
        <li><a href="#reviews">Reviews</a></li>
      </ul>
      <ul>
        <li><a href="#checkout">Checkout</a></li>
      </ul>
      <ul>
        <li><a href="#my-account">My Account</a></li>
      </ul>
      <ul>
        <li><a href="#admin-dashboard">Admin Dashboard</a></li>
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>


# About The Project
<!----- add project description here ---->
Welcome to Plantarrium! As part of Fullstack Academy's Web Development Coding Bootcamp, we present to you a fullstack E-Commerce application marketing luxury plants that are fit for any lifestyle. We started by building our backend database and server and built a full-scale front-end with the capabilities of a fully functioning E-Commerce Website.


## How It Works

- Web Server: [Express](https://expressjs.com/)
- Database system: [PostgreSQL](https://www.postgresql.org/)
- Front End: HTML, CSS, Javascript, [React](https://reactjs.org/)

# Project Development
## Project Structure

```bash
├── .github/workflows
│   └── heroku-deploy.yaml
│
├── api
│   ├── apiRouter.test.js
│   ├── index.js
│   ├── orders.js
│   ├── products_orders.js
│   ├── products.js
│   ├── reviews.js
│   ├── users.js
│   └── utils.js
│
├── db
│   ├── models
│   │   ├── index.js
│   │   ├── orders.js
│   │   ├── products_orders.js
│   │   ├── products.js
│   │   ├── reviews.js
│   │   └── user.js
│   ├── client.js
│   ├── index.js
│   ├── init_db.js
│   └── init_db.js
│
├── public
│   └── index.html
│
├── src
│   ├── axios-services
│   │   └── index.js
│   ├── components
│   │   ├── Admin
│   │   │   ├── AddProduct.js
│   │   │   ├── AdminDash.js
│   │   │   ├── EditOrder.js
│   │   │   ├── EditProduct.js
│   │   │   ├── EditUser.js
│   │   │   ├── Orders.js
│   │   │   ├── OrdersChart.js
│   │   │   ├── Products.js
│   │   │   ├── ProductsChart.js
│   │   │   ├── ReviewsChart.js
│   │   │   ├── Reviews.js
│   │   │   ├── UserOrders.js
│   │   │   └── Users.js
│   │   ├── Footer
│   │   │   ├── About.js
│   │   │   ├── Contact.js
│   │   │   ├── CustomerService.js
│   │   │   ├── Footer.js
│   │   │   └── Shipping.js
│   │   ├── img
│   │   │   ├── about-kim.png
│   │   │   ├── about-lindsay.png
│   │   │   ├── about-mark.png
│   │   │   ├── about-yeonju.png
│   │   │   ├── account.png
│   │   │   ├── admin.png
│   │   │   ├── cart.png
│   │   │   ├── contact-hero.png
│   │   │   ├── magnify.png
│   │   │   ├── manage-accounts.png
│   │   │   ├── manage-orders.png
│   │   │   ├── manage-products.png
│   │   │   ├── manage-reviews.png
│   │   │   ├── plantarriumreadme.png
│   │   │   ├── step1.png
│   │   │   ├── step2.png
│   │   │   └── step3.png
│   │   ├── MyAccount
│   │   │   ├── EditMyAccount.js
│   │   │   ├── MyAccount.js
│   │   │   ├── MyOrders.js
│   │   │   ├── MyReviews.js
│   │   │   ├── SingleOrder.js
│   │   │   └── SingleReview.js
│   │   ├── Order
│   │   │   ├── Cart.js
│   │   │   ├── CartProducts.js
│   │   │   ├── OrderForm.js
│   │   │   ├── SingleCartProduct.js
│   │   │   ├── StripeModal.js
│   │   │   └── Success.js
│   │   ├── Products
│   │   │   ├── LargePlants.js
│   │   │   ├── MediumPlants.js
│   │   │   ├── ProductPage.js
│   │   │   ├── ShopAll.js
│   │   │   ├── SmallPlants.js
│   │   │   └── SoldOut.js
│   │   ├── Reviews
│   │   │   ├── AddReivew.js
│   │   │   ├── ReviewForm.js
│   │   │   └── ReviewsByProduct.js
│   │   ├── App.js
│   │   ├── CartIcon.js
│   │   ├── Home.js
│   │   ├── index.js
│   │   ├── LoginForm.js
│   │   ├── Navigation.js
│   │   ├── PageNotFound.js
│   │   ├── RegisterForm.js
│   │   └── SearchBar.js
│   ├── style
│   │   ├── About.css
│   │   ├── AccountForm.css
│   │   ├── Admin.css
│   │   ├── App.css
│   │   ├── Cart.css
│   │   ├── Collections.css
│   │   ├── Contact.css
│   │   ├── EditMyAccount.css
│   │   ├── EditProduct.css
│   │   ├── Footer.css
│   │   ├── Home.css
│   │   ├── index.css
│   │   ├── MyAccount.css
│   │   ├── Navigation.css
│   │   ├── Orders.css
│   │   ├── ProductPage.css
│   │   ├── Products.css
│   │   ├── ReviewForm.css
│   │   ├── Reviews.css
│   │   ├── ReviewsByProduct.css
│   │   ├── SearchBar.css
│   │   ├── Support.css
│   │   ├── Toast.css
│   │   └── Users.css
│   └── index.js
│
├── .gitignore
├── index.js
├── package-lock.json
├── package.json
└── README.md
```
## Deployment
Deployed URL: [https://plantarrium.herokuapp.com/](https://plantarrium.herokuapp.com/)

# Project Features
## Users
Visitors/Customers
- Have access to browse all available products and view details of a product.
- Add a product to their cart and edit the cart if they change their mind (update quantity, delete).
- Can create an account so that they can have a logged-in experience.

Logged-In Customers
- Have a persistent cart where they can revisit and pick up where they left off.
- Have access to My Account page and can leave a product review.

## Products
Products can be browsed by size (large, medium, small). The main search function provides availability to search any products by name. Users are able to add multiple product

## Reviews
Any visitors/customers can see the reviews, and any logged-in customers can write a review with a 1-5 rating. Each review is diplayed with the individual product page.

## Checkout
Once the products in cart are ready to checkout, customers will be directed to fill out a form with their personal information (first name, last name, email, and address). Then Stripe is used to take the payment from customers. Once the order has been confirmed, logged-in users will be able to see their orders in My Account.

## My Account
Any logged-in users have access to My Account page. My Account Page has following features:

My Information:
- Shows user information (name, username, email).
- Allows users to edit their account information (name, username, email, password, account status).

My Orders:
- Shows every order a user has in a table format.
- Allows users to see their order details (order #, status, full name, address, product, quantity, price, subtotal, shipping, total).
- Allows users to cancel orders.

My Reviews:
- Shows every review a user has in a table format.
- Allows users to delete or edit their order.

## Admin Dashboard
Admin Dashboard is only shown to the admin users. Use any of the following admin users to explore the Admin Dashboard:
- Username: kim
- Password: kimkimk

- Username: lindsay
- Password: lindsaylindsay

- Username: yeonju
- Password: yeonjuyeonju

- Username: mark
- Password: markmarkma

Manage Products:
- 

# Contact
Kim Lê - 1kimthile@gmail.com
Lindsay Nakamura - lindsnakamura@gmail.com
Mark Angelo Dabu - markangelo.dabu@gmail.com 
Yeonju Park - yeonju.k.park@gmail.com

Project Link: [https://github.com/2110-FTB-PT/infinite-loop](https://github.com/2110-FTB-PT/infinite-loop)

# Acknowledgements
[FullstackAcademy/univ-boilerplate](https://github.com/FullstackAcademy/univ-boilerplate)
[Axios API](https://axios-http.com/docs/api_intro)
[Stripe Docs](https://stripe.com/docs)
[Font Awesome](https://fontawesome.com)