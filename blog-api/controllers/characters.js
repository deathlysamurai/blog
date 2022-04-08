const mongoose = require('mongoose');
const Character = require('../models/character');
const Move = require('../models/move');
const fs = require('fs');
const sharp = require('sharp');

exports.characters_get_all = (req, res, next) => {
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
};

exports.characters_get_one = (req, res, next) => {
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
};

exports.characters_create_character = async (req, res, next) => {
    try {
        const allMoves = await Move.find();
        const characterMoves = req.body.moves.split(',');

        if (characterMoves.length == 0) {
            return res.status(404).json({message: "Moves may not be empty."});
        } 

        if (!checkMovesExist(characterMoves, allMoves)) {
            return res.status(404).json({message: "A move was not found."});
        } 

        const character = new Character({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            imagePath: `${req.file.path.replace(/\\/g, "/")}.webp`,
            moves: characterMoves,
            health: req.body.health,
            description: req.body.description,
            speed: req.body.speed
        });

        await processCharacterImage(req.file.path.replace(/\\/g, "/"));

        let newCharacter = await character.save();
        delete newCharacter['_doc']['__v'];
        const response = {
            ...newCharacter['_doc'],
            request: {
                type: 'GET',
                url: req.protocol + '://' + req.headers.host + req.baseUrl + '/' + newCharacter._id 
            }
        };
        res.status(201).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
};

exports.characters_update_character = async (req, res, next) => {
    const id = req.params.characterId;
    const updateOps = {};

    if (req.body.PROPS) {
        const props = JSON.parse(req.body.PROPS);
        for (const ops of props) {
            updateOps[ops.propName] = ops.value;
        };
    }

    try {
        if (req.file) {
            updateOps['imagePath'] = `${req.file.path.replace(/\\/g, "/")}.webp`;
            await processCharacterImage(req.file.path.replace(/\\/g, "/"));
        };
        if(req.body.previousImagePath) {
            fs.unlink(req.body.previousImagePath, (err) => { if (err) throw err })
        }
    
        await Character.updateOne({_id: id}, {$set: updateOps})
        res.status(200).json({
            request: {
                type: 'GET',
                url: req.protocol + '://' + req.headers.host + req.baseUrl + '/' + id
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
    
};

exports.characters_delete_character = (req, res, next) => {
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
};

function checkMovesExist(characterMoves, allMoves) {
    let movesExist = true;
    for (const characterMove of characterMoves) {
        let moveExist = false;
        for (const move of allMoves) {
            if (move._id == characterMove) {
                moveExist = true
                break;
            }
        }
        if (!moveExist) {
            movesExist = false;
            break;
        }
    }
    return movesExist;
}

async function processCharacterImage(image) {
    try {
        await sharp(image).webp({ quality: 50 }).toFile(`${image}.webp`);
        fs.unlink(image, (err) => { if (err) throw err });
    } catch (err) {
        throw(err);
    }
}