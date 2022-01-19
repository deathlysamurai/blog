const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /move'
    });
});

router.get('/:moveId', (req, res, next) => {
    const id = req.params.moveId;
    res.status(200).json({
        message: 'Your move id is: ' + id
    });
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'Handling POST requests to /move'
    });
});

router.patch('/:moveId', (req, res, next) => {
    const id = req.params.moveId;
    res.status(200).json({
        message: 'Updated move: ' + id
    });
});

router.delete('/:moveId', (req, res, next) => {
    const id = req.params.moveId;
    res.status(200).json({
        message: 'Deleted move: ' + id
    });
});

module.exports = router;