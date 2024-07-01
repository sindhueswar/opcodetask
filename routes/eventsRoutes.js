import express from "express";
import {
  getEvents,
  getUserEvents,
  addEvent,
  deleteEvent,
  updateEvent,
} from "../controllers/eventsController.js";
import auth from "../middlewares/auth.js";

// Creating an instance of Express router
const router = express.Router();

// Get all events route
router.get("/", getEvents);

// Get user's events route
router.get("/user", auth, getUserEvents);

// Add new event route
router.post("/", auth, addEvent);

// Delete post route
router.delete("/:id", auth, deleteEvent);

// Update event route
router.put("/:id", auth, updateEvent);

export { router as eventsRoutes };
