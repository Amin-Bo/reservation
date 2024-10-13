const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, reservationController.createReservation);

router.get('/', authMiddleware, reservationController.getReservations);


router.get('/user', authMiddleware, reservationController.getUserReservations);

router.put('/:id', authMiddleware, reservationController.updateReservation);


router.delete('/:id', authMiddleware, reservationController.deleteReservation);

module.exports = router;