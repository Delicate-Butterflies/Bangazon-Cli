const { assert } = require('chai');
const { createTables, insertRows } = require('../db/buildDB');
const { dbGetAllPaymentTypes } = require('../app/models/PaymentTypes.js');
const { dbGetOneOrder, dbPutOrder } = require('../app/models/Order.js');
const { setActiveCustomer, getActiveCustomer } = require('../app/activeCustomer.js');
