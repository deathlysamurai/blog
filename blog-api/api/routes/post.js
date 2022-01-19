const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /post'
    });
});

router.get('/:postId', (req, res, next) => {
    const id = req.params.postId;
    res.status(200).json({
        message: 'Your post id is: ' + id
    });
});

router.post('/', (req, res, next) => {
    const post = {
        title: req.body.title,
        content: req.body.content
    }
    res.status(201).json({
        message: 'Handling POST requests to /post',
        post: post
    });
});

router.patch('/:postId', (req, res, next) => {
    const id = req.params.postId;
    res.status(200).json({
        message: 'Updated post: ' + id
    });
});

router.delete('/:postId', (req, res, next) => {
    const id = req.params.postId;
    res.status(200).json({
        message: 'Deleted post: ' + id
    });
});

module.exports = router;