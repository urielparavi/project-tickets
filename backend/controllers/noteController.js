const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');
const Note = require('../models/noteModel');
const Present = require('../models/presentModel');

// @desc    Get notes for a present
// @route   GET /api/presents/:presentId/notes
// @access  Private
const getNotes = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401)
    throw new Error('User not found!');
  }

  const present = await Present.findById(req.params.presentId);

  if (present.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized');
  }

  const notes = await Note.find({ present: req.params.presentId });

  res.status(200).json(notes);
});

// @desc    Get present note
// @route   POST /api/presents/:presentId/notes
// @access  Private
const addNote = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401)
    throw new Error('User not found!');
  }

  const present = await Present.findById(req.params.presentId);

  if (present.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized');
  }

  const note = await Note.create({
    text: req.body.text,
    isStaff: false,
    present: req.params.presentId,
    user: req.user.id
  });

  res.status(200).json(note);
});

module.exports = {
  getNotes,
  addNote,
};