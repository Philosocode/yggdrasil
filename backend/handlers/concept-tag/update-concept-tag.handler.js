const AppError = require("../../utils/app-error.util");
const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { updateConceptTag } = require("../../models/concept-tag.model");
const { entityExists } = require("../../models/common.model");

module.exports = catchAsync(async function (req, res, next) {
  const { tagName } = req.params;
  const { name } = req.body;

  const oldTagName = tagName.trim().toLowerCase();
  const newTagName = name.trim().toLowerCase();

  // validation
  if (!oldTagName) return next(new AppError("Please include a tag to update.", 422));
  if (!newTagName) return next(new AppError("Please include a new name for tag.", 422));
  if (oldTagName === newTagName) return next(new AppError("New tag name must be different.", 422));

  // can't update what's not there
  const oldTagExists = await entityExists("tag", { name: oldTagName });
  if (!oldTagExists) return next(new AppError("Concept tag to update was not found.", 409));

  await updateConceptTag(req.user.id, oldTagName, newTagName);

  sendResponse(res, 204);
});