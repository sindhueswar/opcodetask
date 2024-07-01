import mongoose from "mongoose";
import Event from "../models/EventModel.js";
import User from "../models/UserModel.js";

/************************************ Get All Events ************************************/
const getEvents = async (req, res) => {
  try {
    // Grab all the events from DB
    const events = await Event.find().sort({ createdAt: "desc" });
    res.status(200).json({ events });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/************************************ Get User's Events ************************************/
const getUserEvents = async (req, res) => {
  // Grab the authenticated user from request object
  const user = await User.findById(req.user._id);

  try {
    // Grab user's events from DB
    const userEvents = await Event.find({ user: user._id }).sort({ createdAt: "desc" });
    res.status(200).json({ userEvents, email: user.email });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/************************************ Create New Event ************************************/
const addEvent = async (req, res) => {
  // Grab the data from request date
  const { name, date } = req.body;

  // Check the fields are not empty
  if (!name || !date) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Find the authenticated user using the user id provided by request object
  const user = await User.findById(req.user._id);

  try {
    // Create a new event and save in DB
    const event = await Event.create({ user: user._id, name, date });

    res.status(200).json({ success: "Event created.", event });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/************************************ Delete Event ************************************/
const deleteEvent = async (req, res) => {
  // Check the ID is valid type
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Incorrect ID" });
  }

  // Check the event exists
  const event = await Event.findById(req.params.id);
  if (!event) {
    return res.status(400).json({ error: "Event not found" });
  }

  // Check the user owns the event
  const user = await User.findById(req.user._id);
  if (!event.user.equals(user._id)) {
    return res.status(401).json({ error: "Not authorized" });
  }

  try {
    await event.deleteOne();
    res.status(200).json({ success: "Event was deleted." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/************************************ Update Event ************************************/
const updateEvent = async (req, res) => {
  // Grab the data from request date
  const { name, date } = req.body;

  // Check the fields are not empty
  if (!name || !date) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Check the ID is valid type
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Incorrect ID" });
  }

  // Check the event exists
  const event = await Event.findById(req.params.id);
  if (!event) {
    return res.status(400).json({ error: "Event not found" });
  }

  // Check the user owns the event
  const user = await User.findById(req.user._id);
  if (!event.user.equals(user._id)) {
    return res.status(401).json({ error: "Not authorized" });
  }

  try {
    await event.updateOne({ name, date });
    // Send event and success message
    res.status(200).json({ success: "Event was updated." }, event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getEvents, getUserEvents, addEvent, deleteEvent, updateEvent };
