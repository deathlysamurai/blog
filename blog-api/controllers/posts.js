const mongoose = require('mongoose');
const Post = require('../models/post');
const Tag = require('../models/tag');
const fs = require('fs');
const sharp = require('sharp');

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

exports.posts_create_post = async (req, res, next) => {
    try {
        const allTags = await Tag.find();
        const postTags = (req.body.tags.length > 0) ? req.body.tags.split(',') : null;

        if (postTags) {
            if (!checkTagsExist(postTags, allTags)) {
                return res.status(404).json({message: "A tag was not found."});
            } 
        }

        const post = new Post({
            _id: new mongoose.Types.ObjectId(),
            title: req.body.title,
            content: req.body.content,
            imagePath: req.file ? req.file.path.replace(/\\/g, "/") : null,
            tags: postTags
        });

        if (req.file) {
            await processPostImage(req.file.path.replace(/\\/g, "/"));
        }

        let newPost = await post.save();
        delete newPost['_doc']['__v'];
        const response = {
            ...newPost['_doc'],
            request: {
                type: 'GET',
                url: req.protocol + '://' + req.headers.host + req.baseUrl + '/' + newPost._id 
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

exports.posts_update_post = (req, res, next) => { //TODO: Add process image like character controller
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

function checkTagsExist(postTags, allTags) {
    let tagsExist = true;
    for (const postTag of postTags) {
        let tagExist = false;
        for (const tag of allTags) {
            if (tag._id == postTag) {
                tagExist = true
                break;
            }
        }
        if (!tagExist) {
            tagsExist = false;
            break;
        }
    }
    return tagsExist;
}

async function processPostImage(image) {
    try {
        await sharp(image)
            .resize(1080, 720)
            .webp({ quality: 50 })
            .toFile(`${image}.webp`);
        fs.unlink(image, (err) => { if (err) throw err });
    } catch (err) {
        throw(err);
    }
}