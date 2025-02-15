const PROPERTYDETAIL = require("../model/propertyDetail");
let cloudinary = require("../utiles/cloudinary");
exports.Create = async function (req, res) {
  try {
    let {
      name,
      description,
      price,
      room,
      garage,
      status,
      bedroom,
      built,
      furnicher,
      direction,
      location,
      areaSize,
      other,
    } = req.body;

    // console.log(req.file);

    if (
      !name ||
      !price ||
      !status ||
      !bedroom ||
      !built ||
      !furnicher ||
      !direction ||
      !location ||
      !areaSize ||
      !description
    ) {
      throw new Error(
        "Please provide => name, description, price , room ,garage , status , bedroom  , built  , furnicher , direction ,location ,areaSize , other "
      );
    }

    // Check if photos exist in the request
    if (req.files) {
      const uploadResponses = await Promise.all(
        req.files.map(
          (el) => cloudinary.uploader.upload(el.path) // Upload each file individually
        )
      );

      // Extract the URLs of all uploaded photos
      const photoUrls = uploadResponses.map((response) => response.secure_url);

      // Store the array of URLs in the request body
      req.body.photos = photoUrls;
    } else {
      req.body.photos = null;
    }

    // req.body.propertyTypeId =
    let propertyData = await PROPERTYDETAIL.create(req.body);

    res.status(201).json({
      status: "Success",
      message: "Successfully created  property Data",
      data: propertyData,
    });
  } catch (error) {
    // Handle any errors that occur
    res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
};



exports.Read = async function (req, res) {
  try {
    let propertyData = await PROPERTYDETAIL.find().populate("propertyTypeId");
    res.status(201).json({
      status: "Success",
      message: "Successfully Ready property ",
      data: propertyData,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
};

exports.Search = async function (req, res, next) {
  try {
    //let searchQuery = req.query.Search ? req.query.Search.trim() : ""; // Trim input
    let searchData;

    if (req.query.Search) {
      searchData = await PROPERTYDETAIL.find({
        $or: [
          { name: { $regex: req.query.Search, $options: "i" } },
          { location: { $regex: req.query.Search, $options: "i" } },
        ],
      })
        .populate("propertyTypeId")
        .lean(); // Use lean() for better performance
    } else {
      searchData = await PROPERTYDETAIL.find().populate("propertyTypeId");
    }

    res.status(200).json({
      status: "Success",
      message: "Successfully retrieved interview questions",
      data: searchData,
    });
  } catch (error) {
    console.error("Search Error:", error); // Log errors for debugging

    res.status(500).json({
      status: "Error",
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

exports.Delete = async function (req, res, next) {
  try {
    let id1 = req.params.id;
    let propertyDelete = await PROPERTYDETAIL.findByIdAndDelete({ _id: id1 });
    console.log(propertyDelete);
    res.status(201).json({
      status: "Success",
      message: "Successfully Delete category",
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
};

exports.Update = async function (req, res, next) {
  try {
    let id1 = req.params.id;
    let propertyData = await PROPERTYDETAIL.findByIdAndUpdate(id1, req.body, { new: true });
    console.log(propertyData);
    res.status(201).json({
      data: propertyData,
      status: "Success",
      message: "Successfully updated interview question",
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
};
