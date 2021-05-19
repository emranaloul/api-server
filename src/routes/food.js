'use strict';
const express = require('express');
const DataMngr = require('../models/dataMngr.js');
const FoodModel = require('../models/food.js');
const dataMngr = new DataMngr(FoodModel);
const router = express.Router();

router.get('/', getFood);
router.get('/:id', getFoodById);
router.post('/', createFood);
router.put('/:id', updateFood);
router.delete('/:id', deleteFood);

// controller
async function deleteFood(req, res, next) {
  try {
    const resObj = await  dataMngr.delete(req.params.id);
    res.json(resObj);

  }
  catch (error) {
    next(error);
  }
}

async function updateFood(req, res) {
  const foodObj = req.body;
  const resObj = await dataMngr.update(req.params.id, foodObj);
  res.json(resObj);
}

async function createFood(req, res) {
  const foodObj = req.body;
  const resObj = await dataMngr.create(foodObj);
  res.status(201).json(resObj);
}

async function getFood(req, res) {
  const resObj = await dataMngr.read();
  res.json(resObj);
}

async function getFoodById(req, res) {
  const resObj = await dataMngr.read(req.params.id);
  res.json(resObj);
}

module.exports = router;