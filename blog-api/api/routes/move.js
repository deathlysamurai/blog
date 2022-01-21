const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Move = require('../models/move');

router.get('/', (req, res, next) => {
    //Use .where behind the .find to had query parameters
    Move
        .find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json({
                message: 'Handling GET requests to /move',
                docs
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.get('/:moveId', (req, res, next) => {
    const id = req.params.moveId;

    Move.findById(id)
        .exec()
        .then(doc => {
            console.log("From Database", doc);
            if (doc) {
                res.status(200).json({
                    message: 'Your move id is: ' + id,
                    doc
                });
            } else {
                res.status(404).json({
                    message: 'No Move Found.'
                });
            };
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.post('/', (req, res, next) => {
    const move = new Move({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        uses: req.body.uses
    });

    move
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Handling POST requests to /move',
                move: move
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.patch('/:moveId', (req, res, next) => {
    const id = req.params.moveId;
    const updateOps = {};

    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    };

    Move.updateOne({_id: id}, {$set: updateOps})
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Updated move: ' + id,
                result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.delete('/:moveId', (req, res, next) => {
    const id = req.params.moveId;

    Move.deleteOne({_id: id})
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Deleted move: ' + id,
                result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;