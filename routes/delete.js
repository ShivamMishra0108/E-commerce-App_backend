// const express = require("express");
// const mongoose = require("mongoose");

// const deleteRouter = express.Router();

// deleteRouter.delete("/api/delete", async (req, res) => {
//   try {
//     const { model, ids } = req.body;

//     if (!model || !ids || !Array.isArray(ids)) {
//       return res.status(400).json({ error: "model and ids are required" });
//     }

//     const Model = mongoose.model(model);

//     await Model.deleteMany({ _id: { $in: ids } });

//     res.json({ message: "Deleted successfully" });
//   } catch (e) {
//     res.status(500).json({ error: e.message });
//   }
// });

// module.exports = deleteRouter;
