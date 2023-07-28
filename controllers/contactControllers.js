const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// Get All the contact present in DB.
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id }).sort("name");
  // console.log(contacts);
  if (contacts) res.render("showContact", { contacts });
  // res.status(200).json(contacts);
});

// Get a particular contact identified by ID
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (contact) {
    res.status(200).json(contact);
  } else {
    res.status(404);
    throw new Error("Contact not found...");
  }
});

// Create a new contact in DB.
const createContact = asyncHandler(async (req, res) => {
  // console.log("Request body is: ", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  res.status(201).json(contact);
});

// Update an already existing contact in DB
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (contact) {
    res.status(200).json(contact);
  } else {
    res.status(404);
    throw new Error("Contact not found...");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("you are not the author of this contact");
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedContact);
});

// Delete a contact present in Db..
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (contact) {
    res.status(200).json(contact);
  } else {
    res.status(404);
    throw new Error("Contact not found...");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("you are not the author of this contact");
  }
  await Contact.deleteOne({ _id: req.params.id });
  res.status(200).json(contact);
});

module.exports = {
  getContact,
  getContacts,
  createContact,
  updateContact,
  deleteContact,
};
