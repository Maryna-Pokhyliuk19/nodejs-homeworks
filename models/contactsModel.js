const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
      unique: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Contact = mongoose.model("Contacts", contactSchema);

module.exports = { Contact };
