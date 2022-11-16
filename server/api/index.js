const express = require("express");
const router = express.Router();

router.use("/students", require("./students"));
router.use("/campuses", require("./campuses"));

module.exports = router;