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
    res.send("journey_datas is ok...");
});

router.get("/all_journey", async (req, res) => {
    let jourey = await models.journey_datas.findAll({});
    res.send(jourey);
});

router.get("/query_journey", async (req, res) => {
    console.log(req.query);
    let jourey = await models.journey_datas.findAll({
        where: { 
            d_stuid:{
                [Op.like]: `%${ req.query.d_name}%`
            } 
        },
    });
    res.send(jourey);
});

router.post("/insert_journey", async (req, res) => {
    let jourey = await models.journey_datas.findOne({
        where: { d_stuid: req.body.d_stuid },
    });
 
    if (!jourey) {
        let joureyData = await models.journey_datas.create(req.body);
        if (joureyData) res.send(`${req.body.d_stuid}Added successfully!`);
    } else {
        return res.send(`${req.body.d_stuid}existed!`);
    }
});

router.put("/update_journey", async (req, res) => {
    let jourey = await models.journey_datas.findOne({
        where: { d_stuid: req.body.d_stuid },
    });
    if(jourey){
        let {
            d_stuid,
            d_name,
            d_college,
            d_class,
            d_building,
            d_build_num,
            d_return_num,
            d_return_date,
            d_start_area,
            d_arrival_area,
            d_in_reach,
            pid
        } = req.body;
        let update_jourey = await models.journey_datas.update(
            {
                d_stuid,
                d_name,
                d_college,
                d_class,
                d_building,
                d_build_num,
                d_return_num,
                d_return_date,
                d_start_area,
                d_arrival_area,
                d_in_reach,
                pid
            },
            {
                where: { d_stuid: d_stuid },
            }
        );
        if (update_jourey) return res.send(`${d_stuid}Successfully modified!`);
    }else{
        let joureyData = await models.journey_datas.create(req.body);
        if (joureyData) res.send(`${req.body.d_stuid}Added successfully!`);
    }
});

router.delete("/remove_journey/:id", async (req, res) => {
    let isDelete = await models.journey_datas.destroy({
        where: { id: req.params.id },
    });
    if (isDelete) res.send("Trip data deleted successfully!");
});

module.exports = router;
