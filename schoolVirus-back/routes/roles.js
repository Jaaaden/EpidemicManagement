let express = require("express");
let router = express.Router();
let bcrypt = require("bcryptjs");
let models = require("../models");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
let jwt = require("jsonwebtoken");
let { SECRET_KEY, EXPIRES_TIME } = require("../setting/constant.js");
// let Result = require("../utils/Result.js");

const secret = "wen_huan_shi_shuai_ge_ma";

// test
router.get("/", function (req, res, next) {
    res.send("role is ok...");
});

// Query all roles
router.get("/all_role", async (req, res) => {
    let role = await models.roles.findAll({
        include: [
            {
                model: models.personal_infos,
                attributes: [
                    "id",
                    "rid",
                    "i_stuid",
                    "i_name",
                    "i_gender",
                    "i_birth",
                    "i_nation",
                    "i_university",
                    "i_college",
                    "i_class",
                    "i_profession",
                    "i_enter_time",
                    "i_background",
                ],
                include: [
                    {
                        model: models.health_records,
                        attributes: [
                            "id",
                            "r_stuid",
                            "r_name",
                            "r_vaccine",
                            "r_inject",
                            "r_num",
                            "r_manufacturer",
                            "r_vac_unit",
                            "r_vac_date",
                            "pid",
                        ],
                    },
                    {
                        model: models.health_messages,
                        attributes: [
                            "id",
                            "m_stuid",
                            "m_name",
                            "m_college",
                            "m_class",
                            "m_recent_resi",
                            "m_recent_touch",
                            "m_touch_date",
                            "m_health_status",
                            "m_status_des",
                            "pid",
                        ],
                    },
                    {
                        model: models.health_infoers,
                        attributes: [
                            "id",
                            "i_name",
                            "i_idcard",
                            "i_phone",
                            "i_gender",
                            "i_birth",
                            "i_nationality",
                            "i_domicile",
                            "i_native",
                            "i_address",
                            "pid",
                        ],
                    },
                    {
                        model: models.journey_datas,
                        attributes: [
                            "id",
                            "d_stuid",
                            "d_name",
                            "d_college",
                            "d_class",
                            "d_building",
                            "d_build_num",
                            "d_return_num",
                            "d_return_date",
                            "d_start_area",
                            "d_arrival_area",
                            "d_in_reach",
                            "pid",
                        ],
                    },
                ],
            },
            {
                model: models.authors,
                attributes: [
                    "id",
                    "a_name",
                    "a_phone",
                    "a_email",
                    "a_start_time",
                    "a_end_time",
                    "aid",
                ],
                include: [
                    {
                        model: models.domestic_notices,
                        attributes: ["id", "n_title", "n_date", "pid"],
                    },
                    {
                        model: models.campus_notices,
                        attributes: [
                            "id",
                            "n_title",
                            "n_content",
                            "n_date",
                            "pid",
                        ],
                    },
                    {
                        model: models.journals,
                        attributes: [
                            "id",
                            "j_stuid",
                            "j_name",
                            "j_role",
                            "j_browser",
                            "j_ip",
                            "j_ipname",
                            "j_date",
                            "j_status",
                            "pid"
                        ],
                    },
                ],
            },
            {
                model: models.close_manages,
                attributes: [
                    "id",
                    "m_stuid",
                    "m_name",
                    "m_gender",
                    "m_college",
                    "m_class",
                    "m_building",
                    "m_building_num",
                    "m_recent_place",
                    "m_recent_history",
                    "m_health_status",
                    "aid",
                ],
            },
            {
                model: models.highrick_manages,
                attributes: [
                    "id",
                    "m_stuid",
                    "m_name",
                    "m_gender",
                    "m_college",
                    "m_class",
                    "m_building",
                    "m_building_num",
                    "m_recent_place",
                    "m_recent_history",
                    "m_health_status",
                    "aid",
                ],
            },
            {
                model: models.lowrick_manages,
                attributes: [
                    "id",
                    "m_stuid",
                    "m_name",
                    "m_gender",
                    "m_college",
                    "m_class",
                    "m_building",
                    "m_building_num",
                    "m_recent_place",
                    "m_recent_history",
                    "m_health_status",
                    "aid",
                ],
            },
            {
                model: models.infection_manages,
                attributes: [
                    "id",
                    "m_stuid",
                    "m_name",
                    "m_gender",
                    "m_college",
                    "m_class",
                    "m_building",
                    "m_build_num",
                    "m_inject_source",
                    "m_inject_date",
                    "aid",
                ],
            },
        ],
    });
    res.send(role);
});

// Query roles by name
router.get("/query_role", async (req, res) => {
    let role_data = await models.roles.findAll({
        where:{
            r_name:{
                [Op.like]: `%${ req.query.r_name}%`
            } 
        }
    });
    res.send(role_data);
});

// role registration
router.post("/reg_role", async (req, res) => {
    let isAccount = await models.roles.findOne({
        where: { r_account: req.body.r_account }
    });
    
    if (!isAccount) {
        // encryption
        bcrypt.hash(req.body.r_pwd, 10, async (err, hash) => {
            req.body.r_pwd = hash;
            let role = await models.roles.create(req.body);
            if (role) res.send(`${req.body.r_account}registration success!`);
        });
    } else {
        return res.send(`${req.body.r_account}existed!`);
    }
});

// role login
router.post("/login_role", async (req, res) => {
    // Determine whether the login role and permissions match
    let data = await models.roles.findOne({
        include: [
            {
                model: models.personal_infos,
                attributes: [
                    "id",
                    "rid",
                    "i_stuid",
                    "i_name",
                    "i_gender",
                    "i_birth",
                    "i_nation",
                    "i_university",
                    "i_college",
                    "i_class",
                    "i_profession",
                    "i_enter_time",
                    "i_background",
                ],
                include: [
                    {
                        model: models.health_records,
                        attributes: [
                            "id",
                            "r_stuid",
                            "r_name",
                            "r_vaccine",
                            "r_inject",
                            "r_num",
                            "r_manufacturer",
                            "r_vac_unit",
                            "r_vac_date",
                            "pid",
                        ],
                    },
                    {
                        model: models.health_messages,
                        attributes: [
                            "id",
                            "m_stuid",
                            "m_name",
                            "m_college",
                            "m_class",
                            "m_recent_resi",
                            "m_recent_touch",
                            "m_touch_date",
                            "m_health_status",
                            "m_status_des",
                            "pid",
                        ],
                    },
                    {
                        model: models.health_infoers,
                        attributes: [
                            "id",
                            "i_name",
                            "i_idcard",
                            "i_phone",
                            "i_gender",
                            "i_birth",
                            "i_nationality",
                            "i_domicile",
                            "i_native",
                            "i_address",
                            "pid",
                        ],
                    },
                    {
                        model: models.journey_datas,
                        attributes: [
                            "id",
                            "d_stuid",
                            "d_name",
                            "d_college",
                            "d_class",
                            "d_building",
                            "d_build_num",
                            "d_return_num",
                            "d_return_date",
                            "d_start_area",
                            "d_arrival_area",
                            "d_in_reach",
                            "pid",
                        ],
                    },
                ],
            },
            {
                model: models.authors,
                attributes: [
                    "id",
                    "a_name",
                    "a_phone",
                    "a_email",
                    "a_start_time",
                    "a_end_time",
                    "aid",
                ],
                include: [
                    {
                        model: models.domestic_notices,
                        attributes: ["id", "n_title", "n_date", "pid"],
                    },
                    {
                        model: models.campus_notices,
                        attributes: [
                            "id",
                            "n_title",
                            "n_content",
                            "n_date",
                            "pid",
                        ],
                    },
                    {
                        model: models.journals,
                        attributes: [
                            "id",
                            "j_stuid",
                            "j_name",
                            "j_role",
                            "j_browser",
                            "j_ip",
                            "j_ipname",
                            "j_date",
                            "j_status",
                            "pid"
                        ],
                    },
                ],
            },
            {
                model: models.close_manages,
                attributes: [
                    "id",
                    "m_stuid",
                    "m_name",
                    "m_gender",
                    "m_college",
                    "m_class",
                    "m_building",
                    "m_building_num",
                    "m_recent_place",
                    "m_recent_history",
                    "m_health_status",
                    "aid",
                ],
            },
            {
                model: models.highrick_manages,
                attributes: [
                    "id",
                    "m_stuid",
                    "m_name",
                    "m_gender",
                    "m_college",
                    "m_class",
                    "m_building",
                    "m_building_num",
                    "m_recent_place",
                    "m_recent_history",
                    "m_health_status",
                    "aid",
                ],
            },
            {
                model: models.lowrick_manages,
                attributes: [
                    "id",
                    "m_stuid",
                    "m_name",
                    "m_gender",
                    "m_college",
                    "m_class",
                    "m_building",
                    "m_building_num",
                    "m_recent_place",
                    "m_recent_history",
                    "m_health_status",
                    "aid",
                ],
            },
            {
                model: models.infection_manages,
                attributes: [
                    "id",
                    "m_stuid",
                    "m_name",
                    "m_gender",
                    "m_college",
                    "m_class",
                    "m_building",
                    "m_build_num",
                    "m_inject_source",
                    "m_inject_date",
                    "aid",
                ],
            },
        ],
        where: {
            r_account: req.body.r_account,
            r_role: req.body.r_role,
        },
    });
    if (!data) {
        return res.send(`${req.body.r_account}Does not exist or the information is wrong, please check or register!`);
    } else {
      
        if (!bcrypt.compareSync(req.body.r_pwd, data.r_pwd)) {
            res.send("Incorrect password, please log in again");
        } else {
            // use jwt to encrypt the token data and return it
            const { id, r_account } = data;
            // Encrypted objects, encryption rules, expiration time
            const token = jwt.sign({ id, r_account }, secret, {
                expiresIn: "24h",
            });
            res.send({
                data,
                token,
            });
        }
    }
});

router.put("/update_role", async (req, res) => {
    console.log(req.body);
    let update_role = await models.roles.update(
        {
            r_serial: req.body.r_serial,
            r_name: req.body.r_name,
            r_role: req.body.r_role,
        },
        {
            where: { r_account: req.body.r_account },
        }
    );
    if (update_role) return res.send(`${req.body.r_account}Successfully modified!`);
});

// Add role
router.post("/insert_role", async (req, res) => {
    let isAccount = await models.roles.findOne({
        where: { r_account: req.body.r_account },
    });
    // judege
    if (!isAccount) {
        // encryption
        bcrypt.hash(req.body.r_pwd, 10, async (err, hash) => {
            req.body.r_pwd = hash;
            let role = await models.roles.create(req.body);
            if (role) res.send(`${req.body.r_account}Added successfully!`);
        });
    } else {
        return res.send(`${req.body.r_account}existed!`);
    }
});

router.delete("/remove_role/:id", async (req, res) => {
    let isDelete = await models.roles.destroy({
        where: { id: req.params.id },
    });
    if (isDelete) res.send("Character deleted successfully!");
});

// Change the password according to the account
router.put("/update_role_pass", async (req, res) => {
    console.log(req.body);
    let update_role = await models.roles.update(
        {
            // Note that if you change the password, you need to re-encrypt, otherwise you will not be able to decrypt it when you log in.
            r_pwd: bcrypt.hashSync(req.body.r_pwd, 10),
        },
        {
            where: { r_account: req.body.r_account },
        }
    );
    if (update_role) return res.send(`${req.body.r_account}Password reset complete!`);
});

module.exports = router;
