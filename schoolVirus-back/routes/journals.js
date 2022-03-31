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

router.get("/", function (req, res, next) {
    res.send("journals is ok...");
});

router.get("/all_journal", async (req, res) => {
    let journal = await models.journals.findAll({});
    res.send(journal);
});

router.get("/query_journal", async (req, res) => {
    let journal = await models.journals.findAll({
        where: { 
            j_name:{
                [Op.like]: `%${ req.query.j_name}%`
            } 
        },
    });
    res.send(journal);
});

router.post("/insert_journal", async (req, res) => {
    let journal = await models.journals.create(req.body);
    if (journal) res.send('log added successfully');
});

module.exports = router;
