const express = require('express')
const router = express.Router()
const { getDrinks, setDrink, updateDrink, deleteDrink, getAllDrinks } = require('../controllers/itemController')
const { protect } = require('../middleware/authMiddleware')

router.get('/', protect, getDrinks)
router.post('/', protect, setDrink)
router.put('/:id', protect, updateDrink)
router.delete('/:id', protect, deleteDrink)
router.get('/all', getAllDrinks)

module.exports = router