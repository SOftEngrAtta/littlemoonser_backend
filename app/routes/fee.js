const express = require("express"),
    router = express.Router();

module.exports = function (connection) {
    const feeService = require('../services/fee')();
    router.post("/addFee", (req, res) => {
        var feeRecord = req.body
        feeService.saveFee(req.body)
        .then(result => {
            res.json({
                status: true,
                message: result
            })
        })
        .catch(error=>{
            console.log(error);
        })
    });
    return router;
}