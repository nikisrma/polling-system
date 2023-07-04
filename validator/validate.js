const QuestionSchema = require("../models/question.model");
const OptionSchema = require("../models/options.model");
const mongoose = require("mongoose");

/** validate Question */
module.exports.ValidateQuestion = async function (req, res, next) {
  console.log(req.body);
  let errors = [];
  if (
    !req.body.title ||
    req.body.title == undefined ||
    !req.body.title.trim()
  ) {
    errors.push({
      param: "title",
      message: "title is required",
    });
  }

  if (errors.length > 0) {
    return res.status(400).send({
      message: "Error in creating a question!",
      status: 0,
      error: errors,
    });
  } else {
    return next();
  }
};

/** validate option */
module.exports.validateOption = async function (req, res, next) {
  console.log(req.params.id);
  let errors = [];
  if (!req.body.text || req.body.text == undefined || !req.body.text.trim()) {
    errors.push({
      param: "text",
      message: "text is required",
    });
  }
    if (!req.params.id || req.params.id == undefined || !req.params.id.trim()) {
    errors.push({
      param: "question",
      message: "question id is required",
    });
  }
  /** Find question with id */
  let question = await QuestionSchema.findById(
    new mongoose.Types.ObjectId(req.params.id)
  );
  if (!question) {
    errors.push({
      param: "id",
      message: "Question not found",
    });
  }
  if (errors.length > 0) {
    return res.status(400).send({
      message: "Error in creating a option!",
      status: 0,
      error: errors,
    });
  } else {
    return next();
  }
};

/** validate question */
module.exports.validateOptionId = async function (req, res, next) {
  let errors = [];
  if (!req.params.id || req.params.id == undefined || !req.params.id.trim()) {
    errors.push({
      param: "id",
      message: "id is required",
    });
  } else {
    /** Find option */
    let option = await OptionSchema.findById(
      new mongoose.Types.ObjectId(req.params.id)
    );
    if (!option) {
      errors.push({
        param: "id",
        message: "Option not found",
      });
    }
  }
  if (errors.length > 0) {
    return res.status(400).send({
      message: "Error in deletion!",
      status: 0,
      error: errors,
    });
  } else {
    return next();
  }
};

/** Delete question */
module.exports.validateQuestionId = async function (req, res, next) {
  let errors = [];
  if (!req.params.id || req.params.id == undefined || !req.params.id.trim()) {
    errors.push({
      param: "id",
      message: "id is required",
    });
  } else {
    /** Find question */
    let question = await QuestionSchema.findById(
      new mongoose.Types.ObjectId(req.params.id)
    );
    if (!question) {
      errors.push({
        param: "id",
        message: "Question not found",
      });
    }
  }
  if (errors.length > 0) {
    return res.status(400).send({
      message: "Error in deletion!",
      status: 0,
      error: errors,
    });
  } else {
    return next();
  }
};
