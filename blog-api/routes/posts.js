const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const isLoggedIn = require('../middleware/is-logged-in');
const isAdmin = require('../middleware/is-admin');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './images/posts');
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

const Post = require('../models/post');

router.get('/', (req, res, next) => {
    //Use .where behind the .find to add query parameters
    Post
        .find()
        .select('-__v')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                posts: docs.map(doc => {
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

router.get('/:postId', (req, res, next) => {
    const id = req.params.postId;

    Post.findById(id)
        .select('-__v')
        .exec()
        .then(doc => {
            console.log("From Database", doc);
            if (doc) {
                res.status(200).json({
                    post: doc,
                    request: {
                        type: 'GET',
                        url: req.protocol + '://' + req.headers.host + req.baseUrl
                    }
                });
            } else {
                res.status(404).json({
                    message: 'No Post Found.'
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
    const post = new Post({
        _id: new mongoose.Types.ObjectId,
        title: req.body.title,
        content: req.body.content,
        imagePath: req.file.path.replace(/\\/g, "/")
    });

    post
        .save()
        .then(result => {
            delete result['_doc']['__v'];
            const response = {
                ...result['_doc'],
                request: {
                    type: 'GET',
                    url: req.protocol + '://' + req.headers.host + req.baseUrl + '/' + result._id 
                }
            };
            res.status(201).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.patch('/:postId', isLoggedIn, isAdmin, (req, res, next) => {
    const id = req.params.postId;
    const updateOps = {};

    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    };

    Post.updateOne({_id: id}, {$set: updateOps})
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

router.delete('/:postId', isLoggedIn, isAdmin, (req, res, next) => {
    const id = req.params.postId;

    Post.deleteOne({_id: id})
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Deleted post: ' + id,
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