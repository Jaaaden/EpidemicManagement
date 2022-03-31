var express = require("express");
var router = express.Router();
// boom middleware: When the processing route does not exist, return an error message
const boom = require("boom");
// let jwtAuth = require("../setting/jwt");

// All secondary routes need to verify the token, so that you do not need to add token verification to each secondary route
// router.use(jwtAuth);

// all secondary routes (interfaces)
const roleRouter = require("./roles");
const personalInfoRouter = require("./personal_infos");
const lowRickRouter = require("./lowrick_manages");
const highRickRouter = require("./highrick_manages");
const closeRouter = require("./close_manages");
const infectionRouter = require("./infection_manages");
const joureyRouter = require("./jourey_datas");
const recordRouter = require("./health_records");
const messageRouter = require("./health_messages");
const infoerRouter = require("./health_infoers");
const domesticRouter = require("./domestic_notices");
const campusRouter = require("./campus_notices");
const authorRouter = require("./authors");
const journalRouter = require("./journals");

// Configure first-level routing
router.use("/role", roleRouter);
router.use("/personal", personalInfoRouter);
router.use("/lowrick", lowRickRouter);
router.use("/highrick", highRickRouter);
router.use("/close", closeRouter);
router.use("/infection", infectionRouter);
router.use("/journey", joureyRouter);
router.use("/record", recordRouter);
router.use("/message", messageRouter);
router.use("/infoer", infoerRouter);
router.use("/domestic", domesticRouter);
router.use("/campus", campusRouter);
router.use("/author", authorRouter);
router.use("/journal", journalRouter);

// Match the case where the route does not exist (put it at the end of the router)
router.use((req, res, next) => {
    next(boom.notFound("interface does not exist"));
});

module.exports = router;
