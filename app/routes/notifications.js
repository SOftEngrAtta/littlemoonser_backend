const express = require("express"),
    router = express.Router();

module.exports = function (connection) {
    const notificationService = require('../services/notification')();

    router.get("/get/:notificationCategory", (req, res) => {
        let query = {
            status: 1,
            category: req.params.notificationCategory
        }

        notificationService.findNotification(query)
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



    router.post("/create/:notificationCategory", (req, res) => {
        let body = req.body;
        let newDoc = {
            status: 1,
            category: req.params.notificationCategory,
            notificationText: body.notificationText
        };
        let updates = {
            query: {
                category: req.params.notificationCategory,
                status: 1
            },
            updates: {
                status: 0
            }
        }

        notificationService.updateNotifications(updates.query, updates.updates, true)
            .then(() => {
                notificationService.createNotifications(newDoc)
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