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

// test
router.get("/", function (req, res, next) {
    res.send("close_manages is ok...");
});

// Check all close contacts
router.get("/all_close", async (req, res) => {
    let closeData = await models.close_manages.findAll({});
    res.send(closeData);
});

// Search for close contacts by name
router.get("/query_close", async (req, res) => {
    console.log(req.query);
    let closeData = await models.close_manages.findAll({
        where: { 
            m_name:{
                [Op.like]: `%${ req.query.m_name}%`
            } 
        },
    });
    res.send(closeData);
});

// Add close contacts
router.post("/insert_close", async (req, res) => {
    let isClose = await models.close_manages.findOne({
        where: { m_stuid: req.body.m_stuid },
    });
    // Determine if the user exists
    if (!isClose) {
        let closeData = await models.close_manages.create(req.body);
        if (closeData) res.send(`${req.body.m_stuid}Added successfully!`);
    } else {
        return res.send(`${req.body.m_stuid}Existed!`);
    }
});

// Modify close contacts
router.put("/update_close", async (req, res) => {
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
    let update_close = await models.close_manages.update(
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
    if (update_close) return res.send(`${m_stuid}Successfully modified!`);
});

// Delete close contacts
router.delete("/remove_close/:id", async (req, res) => {
    let isDelete = await models.close_manages.destroy({
        where: { id: req.params.id },
    });
    if (isDelete) res.send("Contacts removed successfully!");
});

module.exports = router;
