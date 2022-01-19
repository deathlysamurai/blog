const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /character'
    });
});

router.get('/:characterId', (req, res, next) => {
    const id = req.params.characterId;
    res.status(200).json({
        message: 'Your character id is: ' + id
    });
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'Handling POST requests to /character'
    });
});

router.patch('/:characterId', (req, res, next) => {
    const id = req.params.characterId;
    res.status(200).json({
        message: 'Updated character: ' + id
    });
});

router.delete('/:characterId', (req, res, next) => {
    const id = req.params.characterId;
    res.status(200).json({
        message: 'Deleted character: ' + id
    });
});

module.exports = router;