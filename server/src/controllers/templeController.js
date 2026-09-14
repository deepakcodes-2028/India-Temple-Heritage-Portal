const Temple = require('../models/Temple');

exports.getTemples = async (req, res) => {
  try {
    const { state, city, deity, search, featured, popular, category, all } = req.query;

    let query = {};
    // Public queries only show published temples unless explicitly requested by admin
    if (all !== 'true') {
      query.published = true;
    }

    if (state) query['location.state'] = { $regex: state, $options: 'i' };
    if (city) query['location.city'] = { $regex: city, $options: 'i' };
    if (deity) query.deity = { $regex: deity, $options: 'i' };
    if (category) query.category = { $regex: category, $options: 'i' };
    if (featured) query.featured = featured === 'true';
    if (popular) query.popular = popular === 'true';

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { 'location.city': { $regex: search, $options: 'i' } },
        { deity: { $regex: search, $options: 'i' } },
      ];
    }

    const temples = await Temple.find(query).populate('festivals').sort({ createdAt: -1 });
    res.status(200).json(temples);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTempleById = async (req, res) => {
  try {
    const { id } = req.params;
    let temple;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      temple = await Temple.findById(id).populate('festivals');
    } else {
      temple = await Temple.findOne({ slug: id }).populate('festivals');
    }

    if (!temple) {
      return res.status(404).json({ message: 'Temple not found' });
    }

    res.status(200).json(temple);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createTemple = async (req, res) => {
  try {
    const temple = await Temple.create(req.body);
    res.status(201).json(temple);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateTemple = async (req, res) => {
  try {
    const temple = await Temple.findById(req.params.id);

    if (!temple) {
      return res.status(404).json({ message: 'Temple not found' });
    }

    const updatedTemple = await Temple.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedTemple);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteTemple = async (req, res) => {
  try {
    const temple = await Temple.findById(req.params.id);

    if (!temple) {
      return res.status(404).json({ message: 'Temple not found' });
    }

    await Temple.findByIdAndDelete(req.params.id);
    res.status(200).json({ id: req.params.id, message: 'Temple deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

