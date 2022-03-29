const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.users_get_all = (req, res, next) => {
    //Use .where behind the .find to add query parameters
    User
        .find()
        .select('-__v')
        // .populate('characters', '-__v')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                users: docs.map(doc => {
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

exports.users_get_one = (req, res, next) => {
    User.findById(req.params.userId)
        .select('-__v')
        .exec()
        .then(doc => {
            console.log("From Database", doc);
            if (doc) {
                res.status(200).json({
                    user: doc,
                    request: {
                        type: 'GET',
                        url: req.protocol + '://' + req.headers.host + req.baseUrl
                    }
                });
            } else {
                res.status(404).json({
                    message: 'No User Found.'
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

exports.users_register_user = (req, res, next) => {
    User.find()
        .or([{ username: req.body.username }, { email: req.body.email }])
        .exec()
        .then(user => {
            if (user.length >= 1) {
                if (user[0].username == req.body.username) {
                    return res.status(409).json({
                        message: 'Username exists.'
                    });
                } else {
                    return res.status(409).json({
                        message: 'Email exists.'
                    });
                }  
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId,
                            username: req.body.username,
                            email: req.body.email,
                            password: hash,
                            admin: req.body.admin || undefined,
                            firstName: req.body.firstName,
                            lastName: req.body.lastName
                        });
            
                        user.save()
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
                    }
                });
            }
        });
};

exports.users_login_user = (req, res, next) => {
    User.find()
        .and([{ username: req.body.username }, { email: req.body.email }])
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'Login Failed.'
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Login Failed.'
                    });
                }
                if (result) {
                    const token = jwt.sign(
                        {
                            userId: user[0]._id,
                            username: user[0].username,
                            email: user[0].email,
                            admin: user[0].admin
                        }, 
                        process.env.JWT_KEY
                    );
                    return res.status(200).json({
                        message: 'Login Successful.',
                        user: user[0],
                        token: token
                    });
                }
                res.status(401).json({
                    message: 'Login Failed.'
                });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.users_update_user = async (req, res, next) => {
    const id = req.params.userId;
    const updateOps = {};

    try {
        for (const ops of req.body) {
            if (ops.propName == 'password') {
                ops.value = await bcrypt.hash(ops.value, 10);
            }

            updateOps[ops.propName] = ops.value;
        };

        await User.updateOne({_id: id}, {$set: updateOps});
 
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

exports.users_delete_user = (req, res, next) => {
    const id = req.params.userId;

    User.deleteOne({_id: id})
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Deleted user: ' + id,
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

exports.users_verify_unique = (req, res, next) => {
    User.find()
        .or([{ email: req.params.param }, { username: req.params.param}])
        .select('-__v')
        .exec()
        .then(user => {
            if (user.length > 0) {
                res.status(200).json({
                    message: 'A user was found.'
                });
            } else {
                res.status(202).json({
                    message: 'No User Found.'
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};