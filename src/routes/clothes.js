'use strict';
const express = require('express');
const DataMngr = require('../models/dataMngr.js');
const ClothesModel = require('../models/clothes.js');
const dataMngr = new DataMngr(ClothesModel);
const router = express.Router();

router.get('/', getClothes);
router.get('/:id', getClothesById);
router.post('/', createClothes);
router.put('/:id', updateClothes);
router.delete('/:id', deleteClothes);

async function deleteClothes(req, res) {
  const resObj = await dataMngr.delete(req.params.id);
  res.json(resObj);
}

async function updateClothes(req, res) {
  const clothesObj = req.body;
  const resObj = await dataMngr.update(req.params.id, clothesObj);
  res.json(resObj);
}

async function createClothes(req, res) {
  const clothesObj = req.body;
  const resObj = await dataMngr.create(clothesObj);
  res.status(201).json(resObj);
}

async function getClothes(req, res) {
  const resObj = await dataMngr.read();
  res.json(resObj);
}

async function getClothesById(req, res) {
  const resObj = await dataMngr.read(req.params.id);
  res.json(resObj);
}

module.exports = router;