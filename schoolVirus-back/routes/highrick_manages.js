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
    res.send("highrick_manages is ok...");
});

router.get("/all_highrick", async (req, res) => {
    let highrick = await models.highrick_manages.findAll({});
    res.send(highrick);
});

router.get("/query_highrick", async (req, res) => {
    console.log(req.query);
    let highrick = await models.highrick_manages.findAll({
        where: { 
            m_name:{
                [Op.like]: `%${ req.query.m_name}%`
            } 
        },
    });
    res.send(highrick);
});

router.post("/insert_highrick", async (req, res) => {
    let isHighRick = await models.highrick_manages.findOne({
        where: { m_stuid: req.body.m_stuid },
    });
    
    if (!isHighRick) {
        let high_rick = await models.highrick_manages.create(req.body);
        if (high_rick) res.send(`${req.body.m_stuid}Added successfully!`);
    } else {
        return res.send(`${req.body.m_stuid}existed!`);
    }
});

router.put("/update_highrick", async (req, res) => {
    let {
        m_stuid,
        m_name,
        m_gender,
        m_college,
        m_class,
        m_building,
        m_building_num,
        m_recent_place,
        m_recent_history,
        m_health_status
    } = req.body;
    let update_high_rick = await models.highrick_manages.update(
        {
            m_name,
            m_gender,
            m_college,
            m_class,
            m_building,
            m_building_num,
            m_recent_place,
            m_recent_history,
            m_health_status
        },
        {
            where: { m_stuid: m_stuid },
        }
    );
    if (update_high_rick) return res.send(`${m_stuid}Successfully modified!`);
});

router.delete("/remove_highrick/:id", async (req, res) => {
    let isDelete = await models.highrick_manages.destroy({
        where: { id: req.params.id },
    });
    if (isDelete) res.send("Contacts removed successfully!");
});

module.exports = router;
