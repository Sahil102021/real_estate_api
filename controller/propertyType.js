const PROPERTYTYPE = require("../model/propertyType");

exports.Create = async function (req, res) {
  try {
    let { propertyType , detail } = req.body;

    if (!propertyType) throw new Error('Please provide propertyType !');

    req.body.user = req.user;
    let propertyData = await PROPERTYTYPE.create(req.body);

    res.status(201).json({
      status: "Success",
      message: "Successfully created propertyType .",
      data: propertyData,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
};


exports.Read = async function (req, res) {
    try {
      let propertyData = await PROPERTYTYPE.find({user : req.user});
      res.status(201).json({
        status: "Success",
        message: "Successfully Ready property type",
        data: propertyData,
      });
    } catch (error) {
      res.status(500).json({
        status: "Error",
        message: error.message,
      });
    }
};


exports.Delete = async function(req , res ,next) {
  try {
    let id1 = req.params.id ;
    let propertyDelete = await PROPERTYTYPE.findByIdAndDelete({_id : id1 , user : req.user});
    console.log(propertyDelete);
    res.status(201).json({
      status: "Success",
      message: "Successfully Delete properType",
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
}


exports.Update = async function(req, res, next) {
  try {
    let id1 = req.params.id;
    let propertyUpdate = await PROPERTYTYPE.findByIdAndUpdate(id1, req.body, {new: true});
    console.log(propertyUpdate);
    res.status(201).json({
      data: propertyUpdate,
      status: "Success",
      message: "Successfully updated properType",
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
};


