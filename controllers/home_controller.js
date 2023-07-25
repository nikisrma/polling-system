const QuestionSchema = require("../models/question.model");
const OptionSchema = require("../models/options.model");
const mongoose = require("mongoose");

/** get Question list*/
module.exports.getQuestionList = async function (req, res) {
  let questionList = await QuestionSchema.find({});
  if (questionList.length==0) {
    return res.status(400).send({
      message: "No question Found",
      status: 0,
    });
  }
  return res.status(201).send({
    message: "Questions found ",
    status: 1,
    data:questionList
  });
};

/** create Question */
module.exports.createQuestion = async function (req, res) {
  let question = await QuestionSchema.create({ ...req.body });
  if (!question) {
    return res.status(400).send({
      message: "Error in creating a question!",
      status: 0,
    });
  }
  return res.status(201).send({
    message: "question created.. ",
    status: 1,
  });
};

/** create option */

module.exports.createOption = async function (req, res) {
  try {
    /** Find question  */
    let question = await QuestionSchema.findById(
      new mongoose.Types.ObjectId(req.params.id)
    );
    /** Generating object id to set the value of 'link_to_vote */
    const objectId = new mongoose.Types.ObjectId();
    let obj = {
      text: req.body.text,
      question: question._id,
      link_to_vote: `http://localhost:8000/options/${objectId}/add_vote`,
      _id: objectId,
    };
    let result = await OptionSchema.create(obj);

    /** Adding generated option ref to question  */
    question.options.push(result._id);
    result = await question.save();

    /** Managing response */
    if (!result) {
      return res.status(500).send({
        message: "Error in creating a option!",
        status: 0,
      });
    }
    return res.status(201).send({
      message: "option created.. ",
      status: 1,
    });
  } catch (err) {
    /** Handel error */
    return res.status(500).send({
      message: "Something went wrong",
      status: 0,
    });
  }
};
module.exports.getOptionList = async function (req, res) {
  let optionsList = await OptionSchema.find({});
  if (optionsList.length==0) {
    return res.status(400).send({
      message: "No question Found",
      status: 0,
    });
  }
  return res.status(201).send({
    message: "Options found ",
    status: 1,
    data:optionsList
  });
};

/** Delete question */
module.exports.deleteQuestion = async function (req, res) {
  try {
    /** Delete all the options for question */
    let result = await OptionSchema.deleteMany({
      question: new mongoose.Types.ObjectId(req.params.id),
    });

    /** Delete question */
    result = await QuestionSchema.deleteOne({
      _id: new mongoose.Types.ObjectId(req.params.id),
    });

    /** Manage Response */
    if (result) {
      return res.status(200).send({
        message: "question deleted successfully.. ",
        status: 1,
      });
    }
    return res.status(400).send({
      message: "Error in deleting question!",
      status: 0,
    });
  } catch (err) {
    /** Handel error */
    return res.status(500).send({
      message: "Something went wrong",
      status: 0,
    });
  }
};

/** Delete option */
module.exports.deleteOption = async function (req, res) {
  try {
    const result = await OptionSchema.deleteOne({
      _id: new mongoose.Types.ObjectId(req.params.id),
    });
    /** Manage Response */
    if (result.deletedCount > 0) {
      return res.status(200).send({
        message: "option deleted successfully.. ",
        status: 1,
      });
    }
    return res.status(400).send({
      message: "Error in deleting option!",
      status: 0,
    });
  } catch (err) {
    /** Handel error */
    return res.status(500).send({
      message: "Something went wrong",
      status: 0,
    });
  }
};

/** Add Vote */
module.exports.addVote = async function (req, res) {
  /** Find question  */
  try {
    let option = await OptionSchema.findById(
      new mongoose.Types.ObjectId(req.params.id)
    );

    /** Update votes count */
    let votes = option.votes + 1;
    let result = await OptionSchema.updateOne(
      { _id: new mongoose.Types.ObjectId(req.params.id) },
      { votes: votes }
    );
    if (result) {
      return res.status(200).send({
        message: "option voted successfully.. ",
        status: 1,
      });
    } else {
      return res.status(500).send({
        message: "Something went wrong",
        status: 0,
      });
    }
  } catch (err) {
    /** Handel error */
    return res.status(500).send({
      message: "Something went wrong",
      status: 0,
    });
  }
};

/** View Question */
module.exports.viewQuestion = async function (req, res) {
  try {
    let result = await QuestionSchema.findById(
      new mongoose.Types.ObjectId(req.params.id)
    )
      .populate({ path: "options", select: "text link_to_vote votes" })
      .exec();
    if (!result || result.length == 0) {
      return res.status(500).send({
        message: "No data found",
        status: 0,
      });
    } else {
      return res.status(200).send({
        message: "Data feched successfully",
        status: 0,
        data: result,
      });
    }
  } catch (err) {
    /** Handel error */
    return res.status(500).send({
      message: "Something went wrong",
      status: 0,
    });
  }
};
