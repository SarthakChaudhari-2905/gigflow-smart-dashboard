const express = require("express");

const {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
  getLeadStats,
} = require("../controllers/leadController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Routes
router.post("/", protect, createLead);

router.get("/", protect, getLeads);

router.get("/stats/dashboard", protect, getLeadStats);

router.get("/:id", protect, getLeadById);

router.put("/:id", protect, updateLead);

router.delete("/:id", protect, deleteLead);

module.exports = router;