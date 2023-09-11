const express = require("express");
const router = express.Router();
const motorqq = require("../models/motorq");
const motorqqidpass = require("../models/useridpass");
const documentnames = require("../models/documentname");
const documentname = require("../models/documentname");
// const motorq = require("../models/motorq");

//signup

router.post("/signup", async (req, res) => {
  const newmotorqqidpass = new motorqqidpass({
    phone: req.body.phone,
    password: req.body.password,
  });

  try {
    const newMotorqqidpass = await newmotorqqidpass.save();
    res.status(201).json(newMotorqqidpass);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//users

router.get("/users", async (req, res) => {
  try {
    const motorq = await motorqq.find();
    const phones = motorq.map((nma) => nma.phone);
    res.json(phones);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//documentpost

router.post("/", async (req, res) => {
  const motorqqq = new motorqq({
    phone: req.body.phone,
    password: req.body.password,
    documentname: req.body.documentname,
    sharedto: req.body.sharedto,
    content: req.body.content,
  });

  try {
    const useridpasscheck = await motorqqidpass.findOne({
      phone: req.body.phone,
    });
    res.status(201).json({ saved: useridpasscheck });

    if (useridpasscheck.password == req.body.password) {
      const newMotorqq = motorqqq.save();
      // res.status(201).json({ saved: useridpasscheck });
    }
  } catch (err) {
    res.status(400).json({ message: "User not found" });
  }
});

//documentget

router.post("/getalldoc", async (req, res) => {
  const alldocs = new documentnames({
    phone: req.body.phone,
    password: req.body.password,
  });

  try {
    const getdoc = await motorqq.find({});

    // {
    //   phone: req.body.phone,
    // }

    const documentn = getdoc.map((nma) => nma.documentname);

    // const newdocu=documentn.map((nkl)=>)
    res.json({ message: documentn });
    // const documentn = getdoc.map((nma) => nma.documentname);

    // res.json(documentn);
  } catch (err) {
    res.status(400).json({ message: "User not found" });
  }
});

//delete

router.get("/delete/:id", (req, res) => {
  var uid = req.params.id.toString();
  motorqq.findOneAndDelete({ _id: uid }).then((doc) => {
    console.log(doc);
  });

  // motorqq.deleteOne;

  res.status(201).json({ message: uid });
});

//get document shared

router.post("/document/:id/shared", async (req, res) => {
  const useridpasscheck = await motorqqidpass.findOne({
    phone: req.body.phone,
  });

  var uid = req.params.id.toString();

  if (useridpasscheck.password == req.body.password) {
    const finddocbyid = await motorqq.find({
      _id: uid,
    });

    res.status(201).json({ sharedwith: finddocbyid[0].phone });
  }
});

//post document shared

//get document shared

router.post("/document/sharedwithhim", async (req, res) => {
  const useridpasscheck = await motorqqidpass.findOne({
    phone: req.body.phone,
  });

  // var uid = req.params.id.toString();

  if (useridpasscheck.password == req.body.password) {
    const finddocbyid = await motorqq.find({
      sharedto: req.body.phone,
    });

    res.status(201).json({
      documentname: finddocbyid[0].documentname,
      sharedby: finddocbyid[0].phone,
    });
  }
});

router.post("/document/:id/sharedwithhimdoccoc", async (req, res) => {
  const useridpasscheck = await motorqqidpass.findOne({
    phone: req.body.phone,
  });

  var uid = req.params.id.toString();

  if (useridpasscheck.password == req.body.password) {
    const finddocbyid = await motorqq.find({
      _id: uid,
      sharedto: req.body.phone,
      phone: req.body.phone,
    });

    res.status(201).json({
      documentname: finddocbyid.documentname,
      documentcontent: finddocbyid.content,
    });
  }
});

module.exports = router;
