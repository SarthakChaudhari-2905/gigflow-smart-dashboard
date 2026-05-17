const Lead = require("../models/Lead");

// CREATE LEAD
const createLead = async (req, res) => {
  try {
    console.log("CREATE LEAD USER:", req.user);

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
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL LEADS
const getLeads = async (req, res) => {
  try {
    console.log("LOGGED IN USER ID:", req.user._id);
    console.log("LOGGED IN USER EMAIL:", req.user.email);

    const search = req.query.search || "";
    const status = req.query.status || "";

    let query = {
      assignedTo: req.user._id,
    };

    // SEARCH FILTER
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

    // STATUS FILTER
    if (status) {
      query.status = status;
    }

    console.log("FINAL QUERY:", query);

    const leads = await Lead.find(query)
      .populate("assignedTo", "name email")
      .sort({ createdAt: -1 });

    console.log("FOUND LEADS:", leads);

    res.status(200).json(leads);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// GET SINGLE LEAD
const getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findOne({
      _id: req.params.id,
      assignedTo: req.user._id,
    }).populate("assignedTo", "name email");

    if (!lead) {
      return res.status(404).json({
        message: "Lead not found",
      });
    }

    res.status(200).json(lead);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE LEAD
const updateLead = async (req, res) => {
  try {
    const updatedLead = await Lead.findOneAndUpdate(
      {
        _id: req.params.id,
        assignedTo: req.user._id,
      },
      req.body,
      {
        new: true,
      }
    );

    if (!updatedLead) {
      return res.status(404).json({
        message: "Lead not found",
      });
    }

    res.status(200).json(updatedLead);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE LEAD
const deleteLead = async (req, res) => {
  try {
    const deletedLead = await Lead.findOneAndDelete({
      _id: req.params.id,
      assignedTo: req.user._id,
    });

    if (!deletedLead) {
      return res.status(404).json({
        message: "Lead not found",
      });
    }

    res.status(200).json({
      message: "Lead deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// DASHBOARD STATS
const getLeadStats = async (req, res) => {
  try {
    const totalLeads = await Lead.countDocuments({
      assignedTo: req.user._id,
    });

    const newLeads = await Lead.countDocuments({
      status: "New",
      assignedTo: req.user._id,
    });

    const contactedLeads = await Lead.countDocuments({
      status: "Contacted",
      assignedTo: req.user._id,
    });

    const convertedLeads = await Lead.countDocuments({
      status: "Converted",
      assignedTo: req.user._id,
    });

    const lostLeads = await Lead.countDocuments({
      status: "Lost",
      assignedTo: req.user._id,
    });

    res.status(200).json({
      totalLeads,
      newLeads,
      contactedLeads,
      convertedLeads,
      lostLeads,
    });
  } catch (error) {
    console.log(error);

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