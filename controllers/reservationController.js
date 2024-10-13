const Reservation = require('../models/Reservation');
const mongoose = require('mongoose');

exports.createReservation = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { salleId, startTime, endTime } = req.body;
    const userId = req.user.id;

    // Check for conflicting reservations within a transaction
    const conflictingReservation = await Reservation.findOne({
      salle: salleId,
      $or: [
        { startTime: { $lt: endTime }, endTime: { $gt: startTime } },
        { startTime: { $gte: startTime, $lt: endTime } },
        { endTime: { $gt: startTime, $lte: endTime } }
      ]
    }).session(session);

    if (conflictingReservation) {
      await session.abortTransaction();
      session.endSession();
      return res.status(409).json({ message: 'Already reserved for the selected time slot' });
    }

    // If no conflict, create the reservation
    const reservation = await Reservation.create([{ user: userId, salle: salleId, startTime, endTime }], { session });

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    res.status(201).json(reservation[0]);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

exports.getReservations = async (req, res, next) => {
    try {
      const reservations = await Reservation.find().populate('salle');
      res.json(reservations);
    } catch (error) {
      next(error);
    }
  };
exports.getUserReservations = async (req, res, next) => {
  try {
    const reservations = await Reservation.find({ user: req.user.id }).populate('salle');
    res.json(reservations);
  } catch (error) {
    next(error);
  }
};

exports.updateReservation = async (req, res, next) => {
  try {
    const { startTime, endTime } = req.body;
    const reservation = await Reservation.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { startTime, endTime },
      { new: true }
    );
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found or you are not authorized to update it' });
    }
    res.json(reservation);
  } catch (error) {
    next(error);
  }
};

exports.deleteReservation = async (req, res, next) => {
  try {
    const reservation = await Reservation.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found or you are not authorized to delete it' });
    }
    res.json({ message: 'Reservation deleted successfully' });
  } catch (error) {
    next(error);
  }
};