const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');
const Present = require('../models/presentModel');

// @desc    Get user presents
// @route   GET /api/presents
// @access  Private
const getPresents = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401)
    throw new Error('User not found!');
  }

  const presents = await Present.find({ user: req.user.id });

  res.status(200).json(presents);
});

// @desc    Get user present
// @route   GET /api/presents/:id
// @access  Private
const getPresent = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401)
    throw new Error('User not found!');
  }

  const present = await Present.findById(req.params.id);

  if (!present) {
    res.status(404)
    throw new Error('Present not found!');
  }

  if (present.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized!');
  }

  res.status(200).json(present);
});

// @desc    Get new present
// @route   POST /api/presents
// @access  Private
const createPresent = asyncHandler(async (req, res) => {
  const { product, description } = req.body;

  if (!product || !description) {
    res.status(400)
    throw new Error('Please add a product and description!');
  }

  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401)
    throw new Error('User not found!');
  }

  const present = await Present.create({
    product,
    description,
    user: req.user.id,
    status: 'new'
  });

  res.status(201).json(present);
});

// @desc    Delete present
// @route   DELETE /api/presents/:id
// @access  Private
const deletePresent = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401)
    throw new Error('User not found!');
  }

  const present = await Present.findById(req.params.id);

  if (!present) {
    res.status(404)
    throw new Error('Present not found!');
  }

  if (present.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized!');
  }

  await present.remove();

  res.status(200).json({ success: true });
});

// @desc    Update present
// @route   PUT /api/presents/:id
// @access  Private
const updatePresent = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401)
    throw new Error('User not found!');
  }

  const present = await Present.findById(req.params.id);

  if (!present) {
    res.status(404)
    throw new Error('Present not found!');
  }

  if (present.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized!');
  }
  // new => If new doesn't exist so creatd at
  const updatedPresent = await Present.findByIdAndUpdate(req.params.id, req.body, { new: true });

  res.status(200).json(updatedPresent);
});

module.exports = {
  getPresents,
  getPresent,
  createPresent,
  deletePresent,
  updatePresent
};

