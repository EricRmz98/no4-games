const express = require('express');

// Controllers
const {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    login,
} = require('../controllers/users.controller');

// Middlewares
const { userExists } = require('../middlewares/users.middlewares');
const {
    protectSession,
    protectUsersAccount,
} = require('../middlewares/auth.middlewares');
const {
    createUserValidators,
    updateUserValidators,
    loginValidators,
} = require('../middlewares/validators.middlewares');

const usersRouter = express.Router();

// create a user
usersRouter.post('/signup', createUserValidators, createUser);

// user login
usersRouter.post('/login', loginValidators, login);

// update user data
usersRouter.patch(
    '/:id',
    updateUserValidators,
    protectSession,
    userExists,
    protectUsersAccount,
    updateUser
);

//* Protecting below endpoints
usersRouter.use(protectSession);

// get all active users
usersRouter.get('/', getAllUsers);

// disable a user
usersRouter.delete('/:id', userExists, protectUsersAccount, deleteUser);

module.exports = { usersRouter };
