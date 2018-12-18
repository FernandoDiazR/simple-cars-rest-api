const User = require('../models/users');
const Car = require('../models/cars')

module.exports = {
    index: async (req, res, next) => {
        const users = await User.find({});
        res.status(200).json(users);
    },
    newUser: async (req, res, next) => {
        const newUser = new User(req.body);
        const user = await newUser.save();
        res.status(200).json(user);
    },
    getUser: async (req, res, next) => {
        const { userId } = req.params;
        const user = await User.findById(userId);
        res.status(200).json(user);
    },
    replaceUser: async (req, res, next) => {
        const { userId } = req.params;
        const newUser = req.body;
        const oldUser = await User.findOneAndUpdate(userId, newUser);
        res.status(200).json({success: true});
    },
    updateUser: async (req, res, next) => {
        const { userId } = req.params;
        const newUser = req.body;
        await User.findOneAndUpdate(userId, newUser);
        res.status(200).json({success: true});
    },
    deleteUser: async (req, res, next) => {
        const { userId } = req.params;
        await User.findByIdAndRemove(userId);
        res.status(200).json({success: true});
    },
    getUserCars: async (req, res, next) => {
        const { userId } = req.params;
        const user = await User.findById(userId);
        var cars = [];
        for(var i=0; i<user.cars.length; i++) {
            const car = await Car.findById(user.cars[i]);
            cars.push(car);
        };
        res.status(200).json(cars);
    },
    newUserCar: async (req, res, next) => {
        const { userId } = req.params;
        const newCar = new Car(req.body);
        const user = await User.findById(userId);
        newCar.seller = user;
        await newCar.save();
        user.cars.push(newCar);
        await user.save();
        res.status(201).json(newCar)
    }
}