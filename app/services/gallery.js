const models = require('../models');

module.exports = function () {

    let functions = {
        findAllGalleries: (query = {}, select = "", sort = "", limit = 0, skip = 0) => {
            return new Promise((resolve, reject) => {
                models.gallery.find(query)
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
        findGallery: (query = {}, select = "") => {
            return new Promise((resolve, reject) => {
                models.gallery.findOne(query)
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
        updateGalleries: (query, updates, updateMultipleDocs = false) => {
            return new Promise((resolve, reject) => {
                models.gallery.update(query, updates, {
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
        createGalleries: (data) => {
            return new Promise((resolve, reject) => {
                new models.gallery(data).save((err, success) => {
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