class ApiFeatures {
  constructor(mongooseQuery, queryStr) {
    this.mongooseQuery = mongooseQuery;
    this.queryStr = queryStr;
  }

  // @desc fieltering
  fielter() {
    // 1) fieltring
    const queryStringObjc = { ...this.queryStr };
    const execludFields = ["page", "limit", "sort", "field"];
    execludFields.forEach((val) => delete queryStringObjc[val]);

    // Apply filteration using [gte,gt,lte,lt]
    let quertS = JSON.stringify(queryStringObjc);

    quertS = JSON.parse(
      quertS.replace(/\b(gte|gt|lte|lt)\b/g, (val) => `$${val}`)
    );
    this.mongooseQuery = this.mongooseQuery.find(quertS);
    // if (this.queryStr.keyword) {
    //   // searching
    //   this.mongooseQuery = this.mongooseQuery.find({
    //     $or: [
    //       { title: { $regex: this.queryStr.keyword, $options: "i" } }, // 'i' for case-insensitive
    //       { description: { $regex: this.queryStr.keyword, $options: "i" } },
    //       { name: { $regex: this.queryStr.keyword, $options: "i" } },
    //     ],
    //   });
    // } else {
    //   // get products
    //   this.mongooseQuery = this.mongooseQuery.find();
    // }
    return this;
  }

  // @desc sorting
  sort() {
    // sorting
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.sort(sortBy);
    } else {
      this.mongooseQuery = this.mongooseQuery.sort("createdAt");
    }
    return this;
  }

  // @desc return  limit fields
  limitFields() {
    // // fields
    if (this.queryStr.field) {
      const fieldsStr = this.queryStr.field.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.select(fieldsStr);
    } else {
      this.mongooseQuery = this.mongooseQuery.select("-__v");
    }
    return this;
  }
  // @desc pagination
  paginate(docemuntCount) {
    // 2) pagination
    const page = this.queryStr.page * 1 || 1;
    const limit = this.queryStr.limit * 1 || 50;
    const skip = (page - 1) * limit;
    const endIndex = page * limit;
    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);

    const pagination = {};
    pagination.currentPage = page;
    pagination.limit = limit;
    pagination.numberOfPages = Math.ceil(docemuntCount / limit);

    // next page
    if (endIndex < docemuntCount) {
      pagination.next = page + 1;
    } else if (skip > 0) {
      pagination.prev = page - 1;
    }

    this.paginationResult = pagination;
    return this;
  }
}

module.exports = ApiFeatures;
