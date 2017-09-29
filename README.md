# Bangazon Ordering System Interface

## The Command Line Ordering System

This ordering system allows a user to create an account, add payment options, add or remove products in a shopping cart, complete an order, add products to sell, and update product information. Users can also view stale products, view an active customer's revenue report, and see overall product popularity.

## Table of Contents

1. [Software Requirements](#software-requirements)
1. [Insallation](#installation)
1. [Get Started](#get-started)
1. [Helper Applications](#helper-applications)
1. [Usage Directions](#usage-directions)
1. [Third Party Libraries](#third-party-libraries)
1. [Credits](#credits)
1. [Contribute to the CLI](#credits)

## Software Requirements
- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)

## Installation
- to clone the project down, run  ```git clone [repo link]```
- run ```npm install``` from the root of the directory to install all of the dependencies

## Get Started
- set up the database using ```npm run db:reset``` command in terminal
- run ```npm start``` from the terminal

## Helper Applications
- [DB Browser for SQLite](http://sqlitebrowser.org/)

## Third Party Libraries
- [chalk](https://www.npmjs.com/package/chalk)
- [prompt](https://www.npmjs.com/package/prompt)
- [revalidator](https://www.npmjs.com/package/revalidator)
- [sqlite3](https://www.npmjs.com/package/sqlite3)
- [dotenv](https://www.npmjs.com/package/dotenv)

## Usage directions

### Main Menu

Users will initially be presented with a welcome menu outlining the functionality of the cli. The user must choose an active user to be able to complete options 3-11.

```bash
*********************************************************
**  Welcome to Bangazon! Command Line Ordering System  **
*********************************************************
1. Create a customer account
2. Choose active customer
3. Create a payment option
4. Add product to sell
5. Add product to shopping cart
6. Complete an order
7. Remove customer product
8. Update product information
9. Show stale products
10. Show customer revenue report
11. Show overall product popularity
12. Leave Bangazon!
>
```

### #1 Create a Customer Account
Users access this prompt to enter a new customer's account information by selecting 1. The user will be prompted to enter account information for the new customer.

```
Enter customer's first name:
Enter customer's last name:
Enter street address:
Enter city:
Enter state (KY):
Enter postal code:
Enter phone number:
```

### Choose Active Customer Menu (#2)
Users access this prompt to choose the active customer by selecting 2. The user will be prompted to enter the numerical id of the customer the user would like to make active.

```
1. Brandon Walker
2. Eda Pagac
Which customer will be active?:
```

### Create a Payment Option Menu (#3)
Users access this prompt to add a payment option by selecting 3. The user will be prompted to add a payment type name and account number. The account number should be 16 numeric characters long.

```
Enter payment type (visa, amex, etc):
Enter account number(16 digits):
```

### Add Product to Sell Menu (#4)
Users access this prompt to add a product to sell by selecting 4. The user will be prompted to add product details. The user must choose a number listed next to the product type names.
```
Select product type from the listed types (by number):
Set unit price (number up to two decimals):
Set product name:
Set product description:
How many do you have for sale? (number):
```



### Add Product to Shopping Cart Menu (#5)
Buyers will be able to access the following prompt to add a product to their shopping cart by pressing 5:
```
1. Diapers
2. Case of Cracking Cola
3. Bicycle
4. AA Batteries
...
9. Done adding products
```
### Complete an Order Menu (#6)
Buyers will be able to access the following prompt to complete an order by pressing 6:

If no products have been selected yet:
```
Please add some products to your order first. Press any key to return to main menu.
```
If there are current products in an order:
```
Your order total is $149.54. Ready to purchase
(Y/N) >
```
If user entered Y:
```
Choose a payment option
1. Amex
2. Visa
>
```

### Remove Customer Product Menu (#7)
Sellers will be able to access the following prompt to delete a product by pressing 7:
```
Choose product to delete:
1. Kite
2. Marbles
3. Refrigerator
>
```

### Update Product Information Menu (#8)
Sellers will be able to access the following prompt to update the information for a product by pressing 8:
```
Select a product to update:
1. Kite
2. Marbles
3. Refrigerator
>
```
ex. If the user chooses option 3, another menu will appear with options for properties to change:

```
1. Change title "Refrigerator"
2. Change description "It keeps things cold"
3. Change price "149.99"
4. Change quantity "1"
>
```
If the user chooses option 3:
```
Enter new price:
>
```

## Credits
### Project Manager
- [Jufe Brown-Tsai](https://github.com/Jufebrown)

### API Developers
- [Megan Brown](https://github.com/megbrown)
- [Arwa Kuterwadliwala](https://github.com/Arwask)
- [Jon Roberts](https://github.com/thejonroberts)
- [Sam Baker](https://github.com/SamBDev)
- [Josh Lloyd](https://github.com/joshualloyd)
- [Alana Smith](https://github.com/missalana00)

## Contribute to API
- fork - issue tickets and pull requests are welcome
- use [airbnb style](https://github.com/airbnb/javascript)
- follow the template for PR requests
- tab size 2

<p align="center">&copy; 2017 Delicate-Butterflys</p>