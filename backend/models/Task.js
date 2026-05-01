const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,          // ✅ important
      trim: true,
      minlength: 3,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"], // ✅ upgrade
      default: "pending",
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,          // ✅ important (owner)
    },

    dueDate: {
      type: Date,
      default: null,
    },

    isDeleted: {
      type: Boolean,
      default: false,          // ✅ soft delete future use
    },
  },
  { timestamps: true }
);


// ✅ index for fast queries (important in real apps)
taskSchema.index({ user: 1, status: 1 });


// ✅ optional: virtual field (nice for frontend)
taskSchema.virtual("isOverdue").get(function () {
  if (!this.dueDate) return false;
  return this.dueDate < new Date() && this.status !== "completed";
});


// ✅ ensure virtuals show in JSON
taskSchema.set("toJSON", { virtuals: true });
taskSchema.set("toObject", { virtuals: true });


module.exports = mongoose.model("Task", taskSchema);