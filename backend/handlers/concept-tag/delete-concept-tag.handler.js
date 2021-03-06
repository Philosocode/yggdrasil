const AppError = require("../../utils/app-error.util");
const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { deleteEntityTag } = require("../../models/entity-tag.model");

module.exports = catchAsync(async function (req, res, next) {
  const { tagName } = req.params;

  const tagLower = tagName.trim().toLowerCase();
  if (!tagLower) return next(new AppError("Please include a tag to delete.", 422));

  await deleteEntityTag("concept", tagLower, req.user.id);

  sendResponse(res, 204);
});