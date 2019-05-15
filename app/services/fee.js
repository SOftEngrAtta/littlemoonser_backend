const models = require('../models');

module.exports = function () {

    let functions = {
        saveFee: (data) => {
            return new Promise((resolve, reject) => {
                new models.fee(data).save((err, success) => {
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