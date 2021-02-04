const { getConcepts } = require("../../models/concept.model");
const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const mergeEntityWithTagsAndLinks = require("../../utils/merge-entity-tags-links.util");

module.exports = catchAsync(async function (req, res) {
  const userId = req.user.id;

  const options = {
    include: {
      tags: "tags" in req.query,
      links: "links" in req.query,
    }
  };

  const conceptsFlat = await getConcepts(userId, options);
  const conceptsMerged = mergeEntityWithTagsAndLinks(conceptsFlat);

  sendResponse(res, 200, { concepts: conceptsMerged });
});