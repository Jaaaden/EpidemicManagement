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
    res.send("infection_manage is ok...");
});

router.get("/all_infection", async (req, res) => {
    let infectionData = await models.infection_manages.findAll({});
    res.send(infectionData);
});

router.get("/query_infection", async (req, res) => {
    let infectionData = await models.infection_manages.findAll({
        where: { 
            m_name:{
                [Op.like]: `%${ req.query.m_name}%`
            } 
        },
    });
    res.send(infectionData);
});

router.post("/insert_infection", async (req, res) => {
    let isInfection = await models.infection_manages.findOne({
        where: { m_stuid: req.body.m_stuid },
    });

    if (!isInfection) {
        let infectionData = await models.infection_manages.create(req.body);
        if (infectionData) res.send(`${req.body.m_stuid}Added successfully!`);
    } else {
        return res.send(`${req.body.m_stuid}Existed!`);
    }
});

router.put("/update_infection", async (req, res) => {
    console.log(req.body);
    let {
        m_stuid,
        m_name,
        m_gender,
        m_college,
        m_class,
        m_building,
        m_build_num,
        m_inject_source,
        m_inject_date
    } = req.body;
    let update_infection = await models.infection_manages.update(
        {
            m_name,
            m_gender,
            m_college,
            m_class,
            m_building,
            m_build_num,
            m_inject_source,
            m_inject_date
        },
        {
            where: { m_stuid },
        }
    );
    if (update_infection) return res.send(`${m_stuid}Successfully modified!`);
});

// Delete confirmed infections
router.delete("/remove_infection/:id", async (req, res) => {
    let isDelete = await models.infection_manages.destroy({
        where: { id: req.params.id },
    });
    if (isDelete) res.send("Infected person deleted successfully!");
});

module.exports = router;
