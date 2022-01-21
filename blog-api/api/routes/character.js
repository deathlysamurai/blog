const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Character = require('../models/character');

router.get('/', (req, res, next) => {
    //Use .where behind the .find to had query parameters
    Character
        .find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json({
                message: 'Handling GET requests to /character',
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

router.get('/:characterId', (req, res, next) => {
    const id = req.params.characterId;

    Character.findById(id)
        .exec()
        .then(doc => {
            console.log("From Database", doc);
            if (doc) {
                res.status(200).json({
                    message: 'Your character id is: ' + id, 
                    doc
                });
            } else {
                res.status(404).json({
                    message: 'No Character Found.'
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
    const character = new Character({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        health: req.body.health
    });

    character
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Handling POST requests to /character',
                character: character
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.patch('/:characterId', (req, res, next) => {
    const id = req.params.characterId;
    const updateOps = {};

    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    };

    Character.updateOne({_id: id}, {$set: updateOps})
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Updated character: ' + id,
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

router.delete('/:characterId', (req, res, next) => {
    const id = req.params.characterId;

    Character.deleteOne({_id: id})
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Deleted character: ' + id,
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