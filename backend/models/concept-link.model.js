const db = require("../db/db");

module.exports = {
  conceptLinkExists,
  createConceptLink,
  deleteConceptLink,
  getConceptLinks,

  deleteConceptLinksForConcept,
  getConceptLinksForConcept,
};

async function conceptLinkExists(concept_ids, connection = db) {
  const res = await connection.first(
    connection.raw(
      "exists ? as exists",
      connection("concept_link")
        .select("id")
        .whereIn("concept1_id", concept_ids)
        .whereIn("concept2_id", concept_ids)
    )
  );

  return res.exists;
}

async function createConceptLink(concept_ids, connection = db) {
  return connection("concept_link")
    .insert({ concept1_id: concept_ids[0], concept2_id: concept_ids[1] })
    .returning("*");
}

async function deleteConceptLink(link_id, connection = db) {
  return connection("concept_link")
    .where({ id: link_id })
    .del();
}

async function deleteConceptLinksForConcept(concept_id, connection = db) {
  return connection("concept_link")
    .where({ concept1_id: concept_id })
    .orWhere({ concept2_id: concept_id })
    .del();
}

async function getConceptLinksForConcept(concept_id, connection = db) {
  return connection("concept_link")
    .where({ concept1_id: concept_id })
    .orWhere({ concept2_id: concept_id });
}

async function getConceptLinks(user_id, filterObj, connection = db) {
  return connection("concept_link")
    .where({ ...filterObj })
    .whereIn("concept1_id", function() {
      this.select("id").from("concept").where({ user_id });
    })
    .whereIn("concept2_id", function() {
      this.select("id").from("concept").where({ user_id });
    });
}