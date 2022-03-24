const mongoose = require('mongoose');
const Post = require('../models/post');
const Tag = require('../models/tag');

exports.posts_get_all = (req, res, next) => {
    //Use .where behind the .find to add query parameters
    Post
        .find()
        .select('-__v')
        // .populate('tags', '-__v')
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
};

exports.posts_get_one = (req, res, next) => {
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
};

exports.posts_create_post = (req, res, next) => {
    Tag.find().exec().then(results => {
        const tags = (req.body.tags.length > 0) ? req.body.tags.split(',') : null;

        if (tags) {
            let tagsExist = true;
            for (const tag of tags) {
                let tagExist = false;
                for (const result of results) {
                    if (result._id == tag) {
                        tagExist = true
                        break;
                    }
                }
                if (!tagExist) {
                    tagsExist = false;
                    break;
                }
            }
            if (!tagsExist) {
                return res.status(404).json({message: "A tag was not found."});
            } 
        }

        const post = new Post({
            _id: new mongoose.Types.ObjectId(),
            title: req.body.title,
            content: req.body.content,
            imagePath: req.file ? req.file.path.replace(/\\/g, "/") : null,
            tags: tags
        });

        return post.save();
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
};

exports.posts_update_post = (req, res, next) => {
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
};

exports.posts_delete_post = (req, res, next) => {
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
};