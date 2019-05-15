const models = require('../models');

module.exports = function () {

    let functions = {
        findAllNotifications: (query = {}, select = "", sort = "", limit = 0, skip = 0) => {
            return new Promise((resolve, reject) => {
                models.notifications.find(query)
                    .select(select)
                    .sort(sort)
                    .limit(limit)
                    .skip(skip)
                    .lean()
                    .exec(query, (err, data) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(data);
                        }
                    });
            });
        },
        findNotification: (query = {}, select = "") => {
            return new Promise((resolve, reject) => {
                models.notifications.findOne(query)
                    .select(select)
                    .lean()
                    .exec(query, (err, data) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(data);
                        }
                    });
            });
        },
        updateNotifications: (query, updates, updateMultipleDocs = false) => {
            return new Promise((resolve, reject) => {
                models.notifications.update(query, updates, {
                    multi: updateMultipleDocs
                }, (err, success) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(success);
                    }
                });
            });
        },
        createNotifications: (data) => {
            return new Promise((resolve, reject) => {
                new models.notifications(data).save((err, success) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(success);
                    }
                });
            });
        }
    }

    return functions;
}