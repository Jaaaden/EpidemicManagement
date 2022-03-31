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
    res.send("health_infoers is ok...");
});

router.get("/all_infoer", async (req, res) => {
    let messages = await models.health_infoers.findAll({});
    res.send(messages);
});

// Query applicant information by name
router.get("/query_infoer", async (req, res) => {
    let message = await models.health_infoers.findAll({
        where: { 
            i_name:{
                [Op.like]: `%${req.query.i_name}%`
            } 
        },
    });
    res.send(message);
});

// add applicant information
router.post("/insert_infoer", async (req, res) => {
    let isInfoer = await models.health_infoers.findOne({
        where: { i_name: req.body.i_name },
    });
    // Check if the user exists
    if (!isInfoer) {
        let infoer = await models.health_infoers.create(req.body);
        if (infoer) res.send(`${req.body.i_name}Added successfully!`);
    } else {
        return res.send(`${req.body.i_name}Existed!`);
    }
});

// Modify applicant information by name
router.put("/update_infoer", async (req, res) => {
    let isInfoer = await models.health_infoers.findOne({
        where: { i_name: req.body.i_name },
    });
    if(isInfoer){
        let {
            i_name,
            i_idcard,
            i_phone,
            i_gender,
            i_birth,
            i_nationality,
            i_domicile,
            i_native,
            i_address,
            pid
        } = req.body;
        let update_infoer = await models.health_infoers.update(
            {
                i_name,
                i_idcard:i_idcard,
                i_phone:i_phone,
                i_gender:i_gender,
                i_birth:i_birth,
                i_nationality:i_nationality,
                i_domicile:i_domicile,
                i_native:i_native,
                i_address:i_address,
                pid
            },
            {
                where: { i_name: i_name },
            }
        );
        if (update_infoer) return res.send(`${i_name}Successfully modified!`);
    }else{
        let infoer = await models.health_infoers.create(req.body);
        if (infoer) res.send(`${req.body.i_name}Added successfully!`);
    }
});

// Delete filer information
router.delete("/remove_infoer/:id", async (req, res) => {
    let isDelete = await models.health_infoers.destroy({
        where: { id: req.params.id },
    });
    if (isDelete) res.send("The applicant information was deleted successfully!");
});

module.exports = router;