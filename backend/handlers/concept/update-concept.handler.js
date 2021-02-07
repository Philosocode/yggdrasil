const AppError = require("../../utils/app-error.util");
const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { updateConcept } = require("../../models/concept.model");

module.exports = catchAsync(async function (req, res, next) {
  const { conceptId } = req.params;

  if (!conceptId) {
    return next(new AppError("ID of concept to update is required."));
  }

  // check if at least 1 update-able property included
  const { name, tags } = req.body;
  if (!name && !tags) {
    return next(
      new AppError("Allowed properties for update: name, tags.", 422)
    );
  }

  // tags must be an array
  if (tags && !Array.isArray(tags)) {
    return next(
      new AppError("Tags must be an array of strings.", 422)
    );
  }

  // ensure tags are lowercase
  const lowercaseTags = tags?.map(tn => tn.toLowerCase());

  await updateConcept(conceptId, { name, tags: lowercaseTags });

  sendResponse(res, 204);
});
