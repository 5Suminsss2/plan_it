const express = require("express");
const router = express.Router();

const todosRouter = require("./todos");
const topicsRouter = require("./topics");

router.use("/todos", todosRouter);
router.use("/topic", topicsRouter);

module.exports = router;
