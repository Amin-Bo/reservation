const Reservation = require('../models/Reservation');
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
  exports.getAvailableSalles = async (req, res, next) => {
    try {
      let { startTime, endTime } = req.query;
  
      if (!startTime || !endTime) {
        return res.status(400).json({ message: 'Start time and end time are required' });
      }
  
      // Find all salles
      const allSalles = await Salle.find();
  
      // Find reservations that overlap with the given time period
      const reservations = await Reservation.find({
        $or: [
          { startTime: { $lt: endTime }, endTime: { $gt: startTime } },
          { startTime: { $gte: startTime, $lt: endTime } },
          { endTime: { $gt: startTime, $lte: endTime } }
        ]
      });
  
      // Get the IDs of reserved Salles
      const reservedSallesIds = reservations.map(reservation => reservation.salle.toString());
  
      // Filter out the reserved salles
      const availableSalles = allsalles.filter(salle => !reservedsalleIds.includes(salle._id.toString()));
  
      res.json(availablesalles);
    } catch (error) {
      next(error);
    }
  };