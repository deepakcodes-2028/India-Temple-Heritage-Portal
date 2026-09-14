const Festival = require('../models/Festival');

exports.getFestivals = async (req, res) => {
  try {
    const festivals = await Festival.find().populate('associatedTemples', 'name location images');
    res.status(200).json(festivals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createFestival = async (req, res) => {
  try {
    const festival = await Festival.create(req.body);
    res.status(201).json(festival);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateFestival = async (req, res) => {
  try {
    const festival = await Festival.findById(req.params.id);

    if (!festival) {
      return res.status(404).json({ message: 'Festival not found' });
    }

    const updatedFestival = await Festival.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedFestival);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteFestival = async (req, res) => {
  try {
    const festival = await Festival.findById(req.params.id);

    if (!festival) {
      return res.status(404).json({ message: 'Festival not found' });
    }

    await Festival.findByIdAndDelete(req.params.id);
    res.status(200).json({ id: req.params.id, message: 'Festival deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
