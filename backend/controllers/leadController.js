const Lead = require("../models/Lead");

// CREATE LEAD
const createLead = async (req, res) => {
  try {
    const { name, email, company, status, notes } = req.body;

    const lead = await Lead.create({
      name,
      email,
      company,
      status,
      notes,
      assignedTo: req.user._id,
    });

    res.status(201).json(lead);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL LEADS
const getLeads = async (req, res) => {
  try {
    const search = req.query.search || "";
    const status = req.query.status || "";

    let query = {};

    // Search filter
    if (search) {
      query.$or = [
        {
          name: { $regex: search, $options: "i" },
        },
        {
          email: { $regex: search, $options: "i" },
        },
        {
          company: { $regex: search, $options: "i" },
        },
      ];
    }

    // Status filter
    if (status) {
      query.status = status;
    }

    const leads = await Lead.find(query)
      .populate("assignedTo", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(leads);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET SINGLE LEAD
const getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id).populate(
      "assignedTo",
      "name email"
    );

    if (!lead) {
      return res.status(404).json({
        message: "Lead not found",
      });
    }

    res.status(200).json(lead);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE LEAD
const updateLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        message: "Lead not found",
      });
    }

    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json(updatedLead);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE LEAD
const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        message: "Lead not found",
      });
    }

    await lead.deleteOne();

    res.status(200).json({
      message: "Lead deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getLeadStats = async (req, res) => {
  try {
    const totalLeads = await Lead.countDocuments();

    const newLeads = await Lead.countDocuments({
      status: "New",
    });

    const contactedLeads = await Lead.countDocuments({
      status: "Contacted",
    });

    const convertedLeads = await Lead.countDocuments({
      status: "Converted",
    });

    const lostLeads = await Lead.countDocuments({
      status: "Lost",
    });

    res.status(200).json({
      totalLeads,
      newLeads,
      contactedLeads,
      convertedLeads,
      lostLeads,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
  getLeadStats,
};