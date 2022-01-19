const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /user'
    });
});

router.get('/:userId', (req, res, next) => {
    const id = req.params.userId;
    res.status(200).json({
        message: 'Your user id is: ' + id
    });
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'Handling POST requests to /user'
    });
});

router.patch('/:userId', (req, res, next) => {
    const id = req.params.userId;
    res.status(200).json({
        message: 'Updated user: ' + id
    });
});

router.delete('/:userId', (req, res, next) => {
    const id = req.params.userId;
    res.status(200).json({
        message: 'Deleted user: ' + id
    });
});

module.exports = router;