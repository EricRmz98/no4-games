const express = require('express');

// controllers
const {
    getActiveGames,
    updateGameTitle,
    deleteGame,
    createReview,
    createGame,
    createGameInConsole,
} = require('../controllers/games.controllers');

// middlewares
const { protectSession } = require('../middlewares/auth.middlewares');
const { gameExists } = require('../middlewares/games.middlewares');
const {
    createGameValidators,
    updateGameValidators,
    createReviewValidators,
    createGameInConsoleValidators,
} = require('../middlewares/validators.middlewares');

const gamesRouter = express.Router();

gamesRouter.post('/', createGameValidators, protectSession, createGame);

gamesRouter.get('/', getActiveGames);

gamesRouter.patch(
    '/:id',
    updateGameValidators,
    protectSession,
    gameExists,
    updateGameTitle
);

gamesRouter.delete('/:id', protectSession, gameExists, deleteGame);

gamesRouter.post(
    '/reviews/:gameId',
    createReviewValidators,
    protectSession,
    createReview
);

gamesRouter.post(
    '/assign',
    createGameInConsoleValidators,
    protectSession,
    createGameInConsole
);

module.exports = { gamesRouter };
