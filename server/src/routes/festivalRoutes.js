const express = require('express');
const router = express.Router();

const {
  getFestivals,
  createFestival,
  updateFestival,
  deleteFestival
} = require('../controllers/festivalController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .get(getFestivals)
  .post(protect, admin, createFestival);

router.route('/:id')
  .put(protect, admin, updateFestival)
  .delete(protect, admin, deleteFestival);

module.exports = router;
