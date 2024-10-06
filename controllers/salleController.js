const Salle = require('../models/Salle');

exports.getAllSalles = async (req, res, next) => {
  try {
    const salles = await Salle.find();
    res.json(salles);
  } catch (error) {
    next(error);
  }
};

exports.getSalleById = async (req, res, next) => {
  try {
    const salle = await Salle.findById(req.params.id);
    if (!salle) {
      return res.status(404).json({ message: 'salle not found' });
    }
    res.json(salle);
  } catch (error) {
    next(error);
  }
};
exports.createSalle = async (req, res, next) => {
    try {
      const { name, capacity, equipment } = req.body;
      const salle = await Salle.create({ name, capacity, equipment });
      res.status(201).json(salle);
    } catch (error) {
      next(error);
    }
  };
  
  exports.updateSalle = async (req, res, next) => {
    try {
      const { name, capacity, equipment } = req.body;
      const salle = await Salle.findByIdAndUpdate(
        req.params.id,
        { name, capacity, equipment },
        { new: true, runValidators: true }
      );
      if (!salle) {
        return res.status(404).json({ message: 'salle not found' });
      }
      res.json(salle);
    } catch (error) {
      next(error);
    }
  };
  
  exports.deleteSalle = async (req, res, next) => {
    try {
      const salle = await Salle.findByIdAndDelete(req.params.id);
      if (!salle) {
        return res.status(404).json({ message: 'salle not found' });
      }
      res.json({ message: 'salle deleted successfully' });
    } catch (error) {
      next(error);
    }
  };
