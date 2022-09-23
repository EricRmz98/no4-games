const express = require('express');

// controllers
const {
    createConsole,
    getActiveConsoles,
    updateConsole,
    deleteConsole,
} = require('../controllers/consoles.controllers');

// middlewares
const { protectSession } = require('../middlewares/auth.middlewares');
const { consoleExists } = require('../middlewares/console.middlewares.');
const {
    createConsoleValidators,
    updateConsoleValidators,
} = require('../middlewares/validators.middlewares');

const consolesRouter = express.Router();

consolesRouter.post(
    '/',
    createConsoleValidators,
    protectSession,
    createConsole
);

consolesRouter.get('/', getActiveConsoles);

consolesRouter.patch(
    '/:id',
    updateConsoleValidators,
    protectSession,
    consoleExists,
    updateConsole
);

consolesRouter.delete('/:id', protectSession, consoleExists, deleteConsole);

module.exports = { consolesRouter };
