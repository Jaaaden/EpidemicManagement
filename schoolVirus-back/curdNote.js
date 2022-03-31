const express = require("express");
const sequelize = require("sequelize");

const { where } = require("sequelize");
const {User, Article} = require("../models");
const router = express.Router();

// Multi-table query
router.get("/:id", async (req, res) => {
    const id = req.params.id
    const data = await User.findAll({
        where:{
            id
        },
        include: [Article]
    });
    res.json(data);
});

// All users query
router.get("/findAll", async (req, res) => {
    const userList = await User.findAll();
    res.json(userList);
});

// Sorting and paging
router.get("/findPage", async (req, res) => {
    const page = 2; 
    const size = 3; 
    const userList = await User.findAll({
        order: [["id", "desc"]],
        // offset: (age-1)*size
        limit: size,
    });
    res.json(userList);
});

// Single table conditional query
router.get("/findByConditaion1", async (req, res) => {
    const userList = await User.findAll({
        attributes: [
            "id",
            "username",
            [
                sequelize.fn("char_length", sequelize.col("username")),
                "usernameLength"
            ]
        ],
        where: {
            
        },
    });
    res.json(userList);
});

// New
router.post("/", (req, res) => {
    User.create({
        username:'JYY',
        content:'WellDone'
    });
    res.json({
        code: 1000,
        msg: "Added record successfully",
    });
});

router.post("/niubi", (req, res) => {
    const data = [
        {
            username:'Jyy',
            content:'nice job'
        },
        {
            username:'Jyyy',
            content:'Hello world'
        },
        {
            username:'Jyyyy',
            content:'well done'
        }
    ]
    data.forEach(item => {
        User.create({
            username:item.username,
            content:item.content,
        });
    });
    res.json({
        code: 1000,
        msg: "Added multiple records successfully",
    });
});

router.put("/:id", (req, res) => {
    console.log(req.params.id);
    User.update({
        'username': 'change'
    }, {

        'where': { 'id': req.params.id }
    })
    res.json({
        code: 1000,
        msg: "change success",
    });
});

router.delete("/:id", async (req, res) => {
    await User.destroy({
        where: {
            id: req.params.id,
        },
    });
    res.json({
        code: 1000,
        msg: "Delete record successfully",
    });
});

module.exports = router;
