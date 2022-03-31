let express = require("express");
let router = express.Router();
let bcrypt = require("bcryptjs");
let models = require("../models");
let jwt = require("jsonwebtoken");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
let { SECRET_KEY, EXPIRES_TIME } = require("../setting/constant.js");
// let Result = require("../utils/Result.js");

const secret = "wen_huan_shi_shuai_ge_ma";

// Test
router.get("/", function (req, res, next) {
    res.send("domestic_notices is ok...");
});

// Check all domestic epidemic notices
router.get("/all_domestic", async (req, res) => {
    let notices = await models.domestic_notices.findAll({});
    res.send(notices);
});

// Query domestic epidemic notices by title
router.get("/query_domestic", async (req, res) => {
    let notice = await models.domestic_notices.findAll({
        where: { 
            n_title:{
                [Op.like]: `%${ req.query.n_title}%`
            } 
        },
    });
    res.send(notice);
});

// Add domestic epidemic notification
router.post("/insert_domestic", async (req, res) => {
    let isNotice = await models.domestic_notices.findOne({
        where: { n_title: req.body.n_title },
    });
    if (!isNotice) {
        let notice = await models.domestic_notices.create(req.body);
        if (notice) res.send(`${req.body.n_title}Added successfully!`);
    } else {
        return res.send(`${req.body.n_title}Existed!`);
    }
});

// Modify the domestic epidemic notice according to the ID
router.put("/update_domestic", async (req, res) => {
    let {
        id,
        n_title,
        n_date
    } = req.body;
    let update_notice = await models.domestic_notices.update(
        {
            n_title,
            n_date
        },
        {
            where: { id },
        }
    );
    if (update_notice) return res.send('The domestic epidemic notice was revised successfully!');
});

// Delete domestic epidemic notice
router.delete("/remove_domestic/:id", async (req, res) => {
    let isDelete = await models.domestic_notices.destroy({
        where: { id: req.params.id },
    });
    if (isDelete) res.send("The domestic epidemic notice was deleted successfully!");
});

module.exports = router;
