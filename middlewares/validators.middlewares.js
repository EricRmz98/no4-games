const { body, validationResult } = require('express-validator');

// Utils
const { AppError } = require('../utils/appError.util');

const checkValidations = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // [{ ..., msg }] -> [msg, msg, ...] -> 'msg. msg. msg. msg'
        const errorMessages = errors.array().map((err) => err.msg);

        const message = errorMessages.join('. ');

        return next(new AppError(message, 400));
    }

    next();
};

const createUserValidators = [
    body('name')
        .isString()
        .withMessage('Name must be a string')
        .notEmpty()
        .withMessage('Name cannot be empty')
        .isLength({ min: 3 })
        .withMessage('Name must be at least 3 characters'),
    body('email').isEmail().withMessage('Must provide a valid email'),
    body('password')
        .isString()
        .withMessage('Password must be a string')
        .notEmpty()
        .withMessage('Password cannot be empty')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters'),
    checkValidations,
];

const updateUserValidators = [
    body('name')
        .isString()
        .withMessage('Name must be a string')
        .notEmpty()
        .withMessage('Name cannot be empty')
        .isLength({ min: 3 })
        .withMessage('Name must be at least 3 characters'),
    body('email').isEmail().withMessage('Must provide a valid email'),
    checkValidations,
];

const loginValidators = [
    body('email').isEmail().withMessage('Must provide a valid email'),
    body('password')
        .isString()
        .withMessage('Password must be a string')
        .notEmpty()
        .withMessage('Password cannot be empty')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters'),
    checkValidations,
];

const createGameValidators = [
    body('title')
        .isString()
        .withMessage('Name must be a string')
        .notEmpty()
        .withMessage('Name cannot be empty')
        .isLength({ min: 2 })
        .withMessage('Name must be at least 2 characters'),
    body('genre')
        .isString()
        .withMessage('Genre must be a string')
        .notEmpty()
        .withMessage('Genre cannot be empty')
        .isLength({ min: 2 })
        .withMessage('Genre must be at least 2 characters'),
    checkValidations,
];

const updateGameValidators = [
    body('title')
        .isString()
        .withMessage('Title must be a string')
        .notEmpty()
        .withMessage('Title cannot be empty')
        .isLength({ min: 2 })
        .withMessage('Title must be at least 2 characters'),
    checkValidations,
];

const createReviewValidators = [
    body('comment')
        .isString()
        .withMessage('Comment must be a string')
        .notEmpty()
        .withMessage('Comment cannot be empty')
        .isLength({ min: 2 })
        .withMessage('Comment must be at least 2 characters'),
    checkValidations,
];

const createConsoleValidators = [
    body('name')
        .isString()
        .withMessage('Name must be a string')
        .notEmpty()
        .withMessage('Name cannot be empty')
        .isLength({ min: 2 })
        .withMessage('Name must be at least 2 characters'),
    body('company')
        .isString()
        .withMessage('Company must be a string')
        .notEmpty()
        .withMessage('Company cannot be empty')
        .isLength({ min: 2 })
        .withMessage('Company must be at least 2 characters'),
    checkValidations,
];

const updateConsoleValidators = [
    body('name')
        .isString()
        .withMessage('Name must be a string')
        .notEmpty()
        .withMessage('Name cannot be empty')
        .isLength({ min: 2 })
        .withMessage('Name must be at least 2 characters'),
    checkValidations,
];

const createGameInConsoleValidators = [
    body('gameId').isInt().withMessage('gameId must be a integer'),
    body('consoleId').isInt().withMessage('consoleId must be a integer'),
    checkValidations,
];

module.exports = {
    createUserValidators,
    updateUserValidators,
    loginValidators,
    createGameValidators,
    updateGameValidators,
    createReviewValidators,
    createConsoleValidators,
    updateConsoleValidators,
    createGameInConsoleValidators,
};
