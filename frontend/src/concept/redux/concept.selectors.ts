import { createSelector } from "@reduxjs/toolkit";

import { TAppState } from "shared/redux/store";
import { IConceptLinkWithName } from "./concept.types";

const selectConcept = (state: TAppState) => state.concept;

export const selectConceptHash = createSelector(
  [selectConcept],
  (concept) => concept.concepts
);

export const selectConceptList = createSelector(
  [selectConcept],
  (concept) => Object.values(concept.concepts)
)

export const selectCurrentConceptId = createSelector(
  [selectConcept],
  (state) => state.currentConceptId
);

export const selectCurrentConcept = createSelector(
  [selectConceptHash, selectCurrentConceptId],
  (conceptHash, currentConceptId) => {
    if (currentConceptId) return conceptHash[currentConceptId];
  }
);

export const selectConceptTags = createSelector(
  [selectConceptList],
  (conceptList) => {
    const tags = new Set<string>();

    conceptList.forEach(c => {
      c.tags.forEach(t => {
        tags.add(t);
      });
    });

    return Array.from(tags).sort();
  }
);

export const selectConceptHooks = createSelector(
  [selectCurrentConcept],
  (currentConcept) => currentConcept?.hooks
);

export const selectConceptLinks = createSelector(
  [selectConceptHash, selectCurrentConcept],
  (conceptHash, currentConcept) => {
    const links = currentConcept?.links;
    if (!links) return;

    // find concepts matching link IDs
    const conceptsForLinks: IConceptLinkWithName[] = [];

    links.forEach(link => {
      const concept = conceptHash[link.concept_id];
      
      conceptsForLinks.push({
        ...link,
        concept_name: concept.name,
        created_at: concept.created_at,
        updated_at: concept.updated_at,
      });
    });

    return conceptsForLinks;
  }
);
