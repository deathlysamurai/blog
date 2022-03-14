const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const isLoggedIn = require('../middleware/is-logged-in');
const isAdmin = require('../middleware/is-admin');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './images/characters');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
const upload = multer({
    storage: storage, 
    limits: {
        fileSize: 1024 * 1024 * 5 // 5mb
    },
    fileFilter: fileFilter
});

const Character = require('../models/character');
const Move = require('../models/move');

router.get('/', (req, res, next) => {
    //Use .where behind the .find to add query parameters
    Character
        .find()
        .select('-__v')
        .populate('moves', '-__v')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                characters: docs.map(doc => {
                    return {
                        ...doc['_doc'],
                        request: {
                            type: 'GET',
                            url: req.protocol + '://' + req.headers.host + req.baseUrl + '/' + doc._id
                        }
                    }
                })
            };
            res.status(200).json(response);
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
        .select('-__v')
        .populate('moves', '-__v')
        .exec()
        .then(doc => {
            console.log("From Database", doc);
            if (doc) {
                res.status(200).json({
                    character: doc,
                    request: {
                        type: 'GET',
                        url: req.protocol + '://' + req.headers.host + req.baseUrl,
                        moves: doc.moves.map(result => {
                            return req.protocol + '://' + req.headers.host + "/move/" + result
                        })
                    }
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

router.post('/', isLoggedIn, isAdmin, upload.single('imagePath'), (req, res, next) => {
    console.log(req.file);
    Move.find().exec().then(results => {
        if (req.body.moves.length == 0) {
            return res.status(404).json({message: "Moves may not be empty."});
        } 

        let movesExist = true;
        for (const move of req.body.moves) {
            let moveExist = false;
            for (const result of results) {
                if (result._id == move) {
                    moveExist = true
                    break;
                }
            }
            if (!moveExist) {
                movesExist = false;
                break;
            }
        }
        if (!movesExist) {
            return res.status(404).json({message: "A move was not found."});
        } 

        const character = new Character({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            imagePath: req.file.path.replace(/\\/g, "/"),
            moves: req.body.moves,
            health: req.body.health
        });

        return character.save();
    }).then(result => {
        if (res.statusCode == 404) {
            return res;
        }

        delete result['_doc']['__v'];
        const response = {
            ...result['_doc'],
            request: {
                type: 'GET',
                url: req.protocol + '://' + req.headers.host + req.baseUrl + '/' + result._id 
            }
        };
        res.status(201).json(response);
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.patch('/:characterId', isLoggedIn, isAdmin, (req, res, next) => {
    const id = req.params.characterId;
    const updateOps = {};

    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    };

    Character.updateOne({_id: id}, {$set: updateOps})
        .exec()
        .then(result => {
            res.status(200).json({
                request: {
                    type: 'GET',
                    url: req.protocol + '://' + req.headers.host + req.baseUrl + '/' + id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.delete('/:characterId', isLoggedIn, isAdmin, (req, res, next) => {
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