//models
const { Console } = require('../models/console.model');
const { Game } = require('../models/game.model');
const { GameInConsole } = require('../models/gameInConsole.model');
const { Review } = require('../models/review.model');

//utils
const { catchAsync } = require('../utils/catchAsync.util');

const getActiveGames = catchAsync(async (req, res, next) => {
    const games = await Game.findAll({
        where: { status: 'active' },
        include: [
            {
                model: Console,
                required: false,
                where: { status: 'active' },
            },
            {
                model: Review,
                required: false,
                where: { status: 'active' },
            },
        ],
    });

    res.status(200).json({
        status: 'success',
        data: { games },
    });
});

const createGame = catchAsync(async (req, res, next) => {
    const { title, genre } = req.body;

    const newGame = await Game.create({ title, genre });

    res.status(201).json({
        status: 'success',
        data: { newGame },
    });
});

const updateGameTitle = catchAsync(async (req, res, next) => {
    const { title } = req.body;
    const { game } = req;

    await game.update({ title });

    res.status(200).json({
        status: 'success',
        data: { game },
    });
});

const deleteGame = catchAsync(async (req, res, next) => {
    const { game } = req;

    await game.update({ status: 'deleted' });

    res.status(204).json({
        status: 'success',
    });
});

const createReview = catchAsync(async (req, res, next) => {
    //const gameId = req.game.id;
    const { gameId } = req.params;
    const userId = req.sessionUser.id;
    const { comment } = req.body;

    const newReview = await Review.create({ gameId, userId, comment });

    res.status(201).json({
        status: 'success',
        data: { newReview },
    });
});

const createGameInConsole = catchAsync(async (req, res, next) => {
    const { gameId, consoleId } = req.body;

    await GameInConsole.create({ gameId, consoleId });

    res.status(204).json({ status: 'success' });
});

module.exports = {
    getActiveGames,
    createGame,
    updateGameTitle,
    deleteGame,
    createReview,
    createGameInConsole,
};
