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

// Re-route into note router
const noteRouter = require('./noteRoutes');
router.use('/:presentId/notes', noteRouter);

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