const express = require("express"),
    router = express.Router();

module.exports = function (connection) {
    const galleryService = require('../services/gallery')();

    router.post("/getAll", (req, res) => {
        let body = req.body;
        let query = {
            status: 1,
            galleryType: body.galleryType || "EVENTS_GALLERY"
        };
        let promise = null;
        if (query.galleryType === 'EVENTS_GALLERY') {
            promise = galleryService.findAllGalleries(query);
        } else {
            promise = galleryService.findGallery(query);
        }

        promise.then(result => {
                res.json({
                    status: true,
                    message: result
                })
            })
            .catch(error => {
                res.json({
                    status: false,
                    message: error
                })
            });
    });

    router.get('/getSelected/:eventID', (req, res) => {
        let eventID = req.params.eventID;
        let galleryQuery = {};
        if (eventID === "MISC_IMAGES_GALLERY") {
            galleryQuery = {
                galleryType: eventID
            };
        } else {
            galleryQuery = {
                _id: eventID
            };
        }

        galleryService.findGallery(galleryQuery)
            .then(result => {
                console.log("Get selected gallery", result);
                if (!result && eventID === "MISC_IMAGES_GALLERY") {

                    galleryService.createGalleries({
                            status: 1,
                            galleryType: "MISC_IMAGES_GALLERY"
                        })
                        .then(result => {
                            res.json({
                                status: true,
                                message: result
                            })
                        })
                        .catch(error => {
                            res.json({
                                status: false,
                                message: error
                            })
                        });

                } else {
                    res.json({
                        status: true,
                        message: result
                    })
                }
            })
            .catch(error => {
                res.json({
                    status: false,
                    message: error
                })
            });
    });

    router.post("/Register", (req, res) => {
        let body = req.body.data;
        let newDoc = {
            status: 1,
            galleryType: body.galleryType || "EVENTS_GALLERY"
        };
        if (body.eventName) {
            newDoc.eventName = body.eventName;
        }
        if (body.eventDate) {
            newDoc.eventDate = new Date(body.eventDate);
        }

        galleryService.createGalleries(newDoc)
            .then(result => {
                res.json({
                    status: true,
                    message: result
                })
            })
            .catch(error => {
                res.json({
                    status: false,
                    message: error
                })
            });
    });



    router.post('/saveUploadedFileDetails', (req, res) => {
        var queryObj = {
            _id: req.body.eventID
        };
        var updates = {
            $push: {
                images: req.body.fileInfo
            },
            $inc: {
                imagesCount: 1
            }
        };

        galleryService.updateGalleries(queryObj, updates)
            .then(result => {
                res.json({
                    status: true,
                    message: result
                })
            })
            .catch(error => {
                res.json({
                    status: false,
                    message: error
                })
            });

    });

    router.post("/deleteUploadedFile", (req, res) => {
        var queryObj = {
            _id: req.body.eventID
        };
        var updates = {
            $pull: {
                images: {
                    signature: req.body.signature
                }
            },
            $inc: {
                imagesCount: -1
            }
        };

        galleryService.updateGalleries(queryObj, updates)
            .then(result => {
                res.json({
                    status: true,
                    message: result
                })
            })
            .catch(error => {
                res.json({
                    status: false,
                    message: error
                })
            });

    });
    return router;
}