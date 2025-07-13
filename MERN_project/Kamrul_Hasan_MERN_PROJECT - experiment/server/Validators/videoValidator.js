const { check } = require('express-validator');

const createVideoValidator = [
    check('title')
        .not()
        .isEmpty()
        .withMessage('Title is required')
        .isLength({ max: 100 })
        .withMessage('Title must be less than 100 characters'),

    check('description')
        .not()
        .isEmpty()
        .withMessage('Description is required')
        .isLength({ max: 500 })
        .withMessage('Description must be less than 500 characters'),

    check('src')
        .not()
        .isEmpty()
        .withMessage('Video URL is required')
        .matches(/^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/)
        .withMessage('Please enter a valid YouTube URL')
];

module.exports = createVideoValidator;