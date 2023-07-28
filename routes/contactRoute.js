const express = require("express");
const router = express.Router();
const {
  getContact,
  getContacts,
  updateContact,
  deleteContact,
  createContact,
} = require("../controllers/contactControllers");
const validateTokenHandler = require("../middleware/validateTokenhandler");

router.use(validateTokenHandler);

router.get("/", getContacts);

router.get("/:id", getContact);

router.post("/", createContact);

router.put("/:id", updateContact);

router.delete("/:id", deleteContact);

module.exports = router;
