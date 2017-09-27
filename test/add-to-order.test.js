require('dotenv').config();

const TIMEOUT = process.env.TIMEOUT;

const { assert } = require('chai');
const { createTables, insertRows } = require('../db/buildDB');
const { dbGetAllProducts } = require('../models/Product');
const { dbPostOrderProduct } = require('../models/Order-Product');
const { dbGetOpenOrderByUser, dbPostOrder } = require('../models/Order');

describe('add product to customer order', () => {
  describe('', () => {

  });
});