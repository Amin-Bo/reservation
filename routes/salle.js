const express = require('express');
const router = express.Router();
const salleController = require('../controllers/salleController');
const authMiddleware = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');



router.get('/', authMiddleware, salleController.getAllSalles);


router.get('/:id', authMiddleware, salleController.getSalleById);


router.post('/', authMiddleware, checkRole('admin'), salleController.createSalle);

router.put('/:id', authMiddleware, checkRole('admin'), salleController.updateSalle);


router.delete('/:id', authMiddleware, checkRole('admin'), salleController.deleteSalle);

module.exports = router;