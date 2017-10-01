# Bangazon Ordering System Interface

## The Command Line Ordering System

This ordering system allows a user to create an account, add payment options, add or remove products in a shopping cart, complete an order, add products to sell, and update product information. Users can also view stale products, view an active customer's revenue report, and see overall product popularity.

## Table of Contents

1. [Software Requirements](#software-requirements)
1. [Insallation](#installation)
1. [Get Started](#get-started)
1. [Helper Applications](#helper-applications)
1. [Third Party Libraries](#third-party-libraries)
1. [Usage Directions](#usage-directions)
1. [Credits](#credits)
1. [Contribute to the CLI](#contribute-to-cli)

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
Users access this prompt to enter a new customer's account information by selecting option 1. The user will be prompted to enter account information for the new customer.

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
Users access this prompt to choose the active customer by selecting option 2. The user will be prompted to enter the numerical id of the customer the user would like to make active.

```
1. Brandon Walker
2. Eda Pagac
Which customer will be active?:
```

### Create a Payment Option Menu (#3)
Users access this prompt to add a payment option by selecting option 3. The user will be prompted to add a payment type name and account number. The account number should be 16 numeric characters long.

```
Enter payment type (visa, amex, etc):
Enter account number(16 digits):
```

### Add Product to Sell Menu (#4)
Users access this prompt to add a product to sell by selecting option 4. The user will be prompted to add product details. The user must choose a number listed next to the product type names.

```
Select product type from the listed types (by number):
Set unit price (number up to two decimals):
Set product name:
Set product description:
How many do you have for sale? (number):
```

### Add Product to Shopping Cart Menu (#5)
Users access this prompt to add a product to their order by selecting option 5. The user will be prompted to choose a product from a list of available products by selecting the number listed next to the product name. The user will also specify a quantity.

```
1: Awesome Wooden Chair, Similique aspernatur ex soluta rerum quo est.
2: Unbranded Plastic Keyboard, Dolore quaerat corporis et voluptates perferendis sint non aut et.
...
Choose a product ID to add to the order:
How many do you want? (number):
```

### Complete an Order Menu (#6)
Users access this prompt to complete an order by selecting option 6. If no products have been selected yet, the user will be prompted to return to the main menu. If products have been added, the user will be given the order total and the option to proceed. If the user chooses no, he/she will be returned to the main menu. If the user chooses yes, the user is presented with his/her saved payment types. The user can complete the order by choosing a payment type to add to the order.

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
Users access this prompt to delete a product by selecting option 7.

```
Choose product to delete:
1. Kite
2. Marbles
3. Refrigerator
>
```

### Update Product Information Menu (#8)
Users access this prompt to update the information for a product by selecting option 8.
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

### Show Stale Products (#9)
Users access this prompt to show stale products. A stale product:
1. Has never been added to an order, and has been in the system for more than 180 days
2. Has been added to an order, but the order hasn't been completed, and the order was created more than 90 days ago
3. Has been added to one, or more orders, and the order were completed, but there is remaining quantity for the product, and the product has been in the system for more than 180 days

### Show Customer Revenue Report (#10)
Users access this prompt to show the current active customer's revenue report.

```
Revenue report for Svetlana:

Order #34
----------------------------------------------------
Marble                          15         $21.43

Order #109
----------------------------------------------------
Kite                            1          $5.12
Marble                          5          $5.52

Total Revenue: $32.07
```

### Show Overall Product Popularity (#11)
Users access this prompt to show the overall product poplarity.
```
Product             Orders      Purchasers    Revenue
*******************************************************
AA Batteries        100         20            $990.90
Diapers             50          10            $640.95
Case of Cracking... 40          30            $270.96
*******************************************************
Totals:             190         60            $1,902.81

-> Press any key to return to main menu
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

## Contribute to CLI
- fork - issue tickets and pull requests are welcome
- use [airbnb style](https://github.com/airbnb/javascript)
- follow the template for PR requests
- tab size 2

<p align="center">&copy; 2017 Delicate-Butterflys</p>