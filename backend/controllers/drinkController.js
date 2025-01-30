const asyncHandler = require('express-async-handler')

// ** FOR DATABASE **
const Drink = require('../models/drinkModel')

// @desc Get all drinks
// @route GET /api/getAllDrinks
// @access Private

const getAllDrinks = asyncHandler(async (req, res) => {
    
    const drinks = await Drink.find()
    res.status(200).json(drinks)
})

// @desc Get user drinks
// @route GET /api/drinks
// @access Private

const getDrinks = asyncHandler(async (req, res) => {
    
    const drinks = await Drink.find({ user: req.user.id })
    res.status(200).json(drinks)
})

// @desc Create an drink
// @route POST /api/drinks
// @access Private

const setDrink = asyncHandler(async (req, res) => {
    // Proper method with middleware
    // ** req.body.text pertains to specific drink **
    // ** If Drink has no text propety, use a different property within the Drink object **
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add text field') // Utilizes new error middleware created
    }


    // MongoDB request
    const drink = await Drink.create({
        text: req.body.text,
        user: req.user.id
    })
    res.status(200).json(drink)
})

// @desc Update an drink
// @route PUT /api/drinks/:id
// @access Private

const updateDrink = asyncHandler(async( req, res) => {
    const drink = await Drink.findById(req.params.id)
    if(!drink){
        res.status(400)
        throw new Error('Goal not found')
    }

    // check for user
    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // make sure logged in user matches drink to user
    if(drink.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedDrink = await Drink.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    res.status(200).json(updatedDrink)
})

// @desc Delete an drink
// @route DELETE /api/drinks/:id
// @access Private

const deleteDrink = asyncHandler(async (req, res) => {
    const drink = await Drink.findById(req.params.id)

    if(!drink){
        res.status(400)
        throw new Error('Drink not found')
    } 

    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    if(drink.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    await Drink.findByIdAndDelete(req.params.id)

    res.status(200).json({ 
        message: 'Drink Deleted',
        id: req.params.id 
    })
})

module.exports = {
    getAllDrinks,
    getDrinks,
    setDrink,
    updateDrink,
    deleteDrink
}