const express = require("express");
const router = express.Router();

const todosRouter = require("./todos");
const topicsRouter = require("./topics");
const SharedPlanRouter = require("./sharedPlan");

router.use("/todos", todosRouter);
router.use("/topic", topicsRouter);
router.use("/sharedPlan", SharedPlanRouter);

module.exports = router;
