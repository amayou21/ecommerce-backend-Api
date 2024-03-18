const asyncHandler = require("express-async-handler");
const ApiError = require("../utility/apiError");
const ApiFeatures = require("../utility/ApiFeatures");

exports.getAll = (model) =>
  asyncHandler(async (req, res, next) => {
    let filter = {};
    if (req.filterObj) {
      filter = req.filterObj
    }

    // if (req.query.keyword) {
    //   const keywordRegex = new RegExp(req.query.keyword, 'i');
    //   filterObject.$or = [
    //     { name: { $regex: keywordRegex } },
    //     { title: { $regex: keywordRegex } },
    //     { description: { $regex: keywordRegex } },]
    // }

    //@desc  documents count
    const docemuntCount = await model.countDocuments(filter);

    const apiFeatures = new ApiFeatures(model.find(filter), req.query)
      .fielter()
      .paginate(docemuntCount)
      .sort()
      .limitFields();
    const { paginationResult, mongooseQuery } = apiFeatures;
    const documents = await mongooseQuery;
    res.status(200).json({
      paginationResult,
      result: documents.length,
      documents: documents.reverse(),
    });
  });

exports.createOne = (model) =>
  asyncHandler(async (req, res, next) => {
    const document = await model.create(req.body);
    res.status(201).json(document);
  });

exports.getOne = (model, populateOpt) =>
  asyncHandler(async (req, res, next) => {

    // @desc 1) build query
    let query = model.findById(req.params.id)
    if (populateOpt) {
      query = query.populate(populateOpt)
    }
    // @desc 2) exicute query
    const document = await query
    !document
      ? next(new ApiError(`no document with this id : ${req.params.id}`, 400))
      : res.status(200).json(document);
  });

exports.updateOnde = (model) =>
  asyncHandler(async (req, res, next) => {
    const document = await model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });


    if (!document) {
      next(new ApiError(`no document with this id : ${req.params.id}`, 400))
    }

    // Trigger "save" event when update document
    document.save()
    res.status(200).json(document);
  });

exports.deleteOne = (model) =>
  asyncHandler(async (req, res, next) => {
    const document = await model.findByIdAndDelete(req.params.id);

    if (!document) {
      return next(
        new ApiError(`No document found for this id: ${req.params.id}`, 404)
      );
    }
    // To trigger 'remove' event when deleting the document
    document.remove();
    // 204 no content
    res.status(204).send();
  });