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
    res.send("health_records is ok...");
});

router.get("/all_record", async (req, res) => {
    let records = await models.health_records.findAll({});
    res.send(records);
});

router.get("/query_record", async (req, res) => {
    let record = await models.health_records.findAll({
        where: { 
            r_name:{
                [Op.like]: `%${ req.query.r_name}%`
            } 
        },
    });
    res.send(record);
});

router.post("/insert_record", async (req, res) => {
    let isRecord = await models.health_records.findOne({
        where: { r_stuid: req.body.r_stuid },
    });
 
    if (!isRecord) {
        let record = await models.health_records.create(req.body);
        if (record) res.send(`${req.body.r_stuid}Added successfully!`);
    } else {
        return res.send(`${req.body.r_stuid}existed!`);
    }
});

router.put("/update_record", async (req, res) => {
    let isRecord = await models.health_records.findOne({
        where: { r_name: req.body.r_name },
    });
    if(isRecord){
        let {
            r_stuid,
            r_name,
            r_vaccine,
            r_inject,
            r_num,
            r_manufacturer,
            r_vac_unit,
            r_vac_date,
            pid
        } = req.body;
        let update_record = await models.health_records.update(
            {
                r_stuid,
                r_name,
                r_vaccine,
                r_inject,
                r_num,
                r_manufacturer,
                r_vac_unit,
                r_vac_date,
                pid
            },
            {
                where: { r_name: r_name },
            }
        );
        if (update_record) return res.send(`${m_name}Successfully modified!`);
    }else{
        let record = await models.health_records.create(req.body);
        if (record) res.send(`${req.body.r_stuid}Added successfully!`);
    }
});

router.delete("/remove_record/:id", async (req, res) => {
    let isDelete = await models.health_records.destroy({
        where: { id: req.params.id },
    });
    if (isDelete) res.send("Vaccination record deleted successfully!");
});

module.exports = router;
