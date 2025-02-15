let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let propertyDetailSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  price: {
    type: String,
    trim: true,
  },
  room: {
    type: String,
    trim: true,
  },
  garage: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    trim: true,
  },
  bedroom: {
    type: String,
    trim: true,
  },
  built: {
    type: String,
    trim: true,
  },
  furnicher: {
    type: String,
    trim: true,
  },
  direction: {
    type: String,
    trim: true,
  },
  location: {
    type: String,
    trim: true,
  },
  areaSize: {
    type: String,
    trim: true,
  },
  other: {
    type: String,
    trim: true,
  },
  photos: {
    type: [String],
  },
  propertyTypeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "propertyTypes",
    required: true,
  },
});

let PROPERTYDETAIL = mongoose.model("propertyDetail", propertyDetailSchema);
module.exports = PROPERTYDETAIL;
