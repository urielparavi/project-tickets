const express = require('express');
const router = express.Router();
const {
  getPresents,
  getPresent,
  createPresent,
  deletePresent,
  updatePresent
} = require('../controllers/presentController');

const { protect } = require('../middleware/authMiddleware');

router
  .route('/')
  .get(protect, getPresents)
  .post(protect, createPresent);

router
  .route('/:id')
  .get(protect, getPresent)
  .delete(protect, deletePresent)
  .put(protect, updatePresent);

module.exports = router;