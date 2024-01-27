const asyncHandler = require("express-async-handler");
const ApiError = require("../utility/apiError");
const ApiFeatures = require("../utility/ApiFeatures");

exports.getAll = (model) =>
  asyncHandler(async (req, res, next) => {
    let filterObject = {};
    req.params.categoryId
      ? (filterObject.category = req.params.categoryId)
      : (filterObject = {});
    //@desc  documents count
    const docemuntCount = await model.countDocuments();

    const apiFeatures = new ApiFeatures(model.find(filterObject), req.query)
      .fielter()
      .paginate(docemuntCount)
      .sort()
      .limitFields();

    const { paginationResult, mongooseQuery } = apiFeatures;
    const documents = await mongooseQuery;
    res.status(200).json({
      paginationResult,
      result: documents.length,
      documents,
    });
  });

exports.createOne = (model) =>
  asyncHandler(async (req, res, next) => {
    const document = await model.create(req.body);
    res.status(201).json(document);
  });

exports.getOne = (model) =>
  asyncHandler(async (req, res, next) => {
    const document = await model.findById(req.params.id);
    !document
      ? next(new ApiError(`no document with this id : ${req.params.id}`, 400))
      : res.status(200).json(document);
  });

exports.updateOnde = (model) =>
  asyncHandler(async (req, res, next) => {
    const documeent = await model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    !documeent
      ? next(new ApiError(`no documeent with this id : ${req.params.id}`, 400))
      : res.status(200).json(documeent);
  });

exports.deleteOne = (model) =>
  asyncHandler(async (req, res, next) => {
    const document = await model.findByIdAndDelete(req.params.id);
    !document
      ? next(new ApiError(`no document with this id : ${req.params.id}`, 400))
      : res.status(200).json({
        mes: `the document with id :${req.params.id} deleted successfully`,
      });
  });
