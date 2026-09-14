const express = require('express');
const router = express.Router();

const {
  getCircuits,
  createCircuit,
  updateCircuit,
  deleteCircuit
} = require('../controllers/pilgrimageController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .get(getCircuits)
  .post(protect, admin, createCircuit);

router.route('/:id')
  .put(protect, admin, updateCircuit)
  .delete(protect, admin, deleteCircuit);

module.exports = router;
