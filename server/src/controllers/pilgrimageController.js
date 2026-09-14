const PilgrimageCircuit = require('../models/PilgrimageCircuit');

exports.getCircuits = async (req, res) => {
  try {
    const circuits = await PilgrimageCircuit.find().populate('temples', 'name location images');
    res.status(200).json(circuits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createCircuit = async (req, res) => {
  try {
    const circuit = await PilgrimageCircuit.create(req.body);
    res.status(201).json(circuit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateCircuit = async (req, res) => {
  try {
    const circuit = await PilgrimageCircuit.findById(req.params.id);

    if (!circuit) {
      return res.status(404).json({ message: 'Circuit not found' });
    }

    const updatedCircuit = await PilgrimageCircuit.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedCircuit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteCircuit = async (req, res) => {
  try {
    const circuit = await PilgrimageCircuit.findById(req.params.id);

    if (!circuit) {
      return res.status(404).json({ message: 'Circuit not found' });
    }

    await PilgrimageCircuit.findByIdAndDelete(req.params.id);
    res.status(200).json({ id: req.params.id, message: 'Circuit deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
