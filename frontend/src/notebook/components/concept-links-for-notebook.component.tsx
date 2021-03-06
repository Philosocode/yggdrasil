import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// logic
import { INotebook } from "../redux/notebook.types";
import { ILinkGridItem } from "../../shared/components/link/link-grid-item.component";
import { api } from "services/api.service";
import { selectConceptsLoaded } from "shared/redux/init.selectors";
import { selectConceptHash } from "../../concept/redux/concept.selectors";

// components
import { LinkGrid } from "shared/components/link/link-grid.component";

// styles
import { SHeadingSubSubtitle } from "shared/styles/typography.style";
import { getConcepts } from "../../concept/redux/concept.thunks";
import { sortEntitiesByKey } from "../../shared/utils/entity.util";

interface IGetConceptLinksResponse {
  status: string;
  data: {
    conceptLinks: string[];
  };
}
interface IProps {
  notebook: INotebook;
}
export const ConceptLinksForNotebook: React.FC<IProps> = ({ notebook }) => {
  const dispatch = useDispatch();
  const conceptHash = useSelector(selectConceptHash);
  const conceptsLoaded = useSelector(selectConceptsLoaded);
  const [conceptIds, setConceptIds] = useState<string[]>();

  useEffect(() => {
    if (!conceptsLoaded) {
      dispatch(getConcepts());
    }

    if (!conceptIds) {
      api.get<IGetConceptLinksResponse>(`/notebooks/${notebook.id}/concepts`)
        .then(response => {
          setConceptIds(response.data.data.conceptLinks)
        });
    }
  }, [conceptsLoaded, conceptIds, notebook, dispatch]);

  const conceptLinks = useMemo(() => {
    if (!conceptsLoaded) return;

    const uniqueConceptIds = Array.from(new Set(conceptIds ?? []));
    const links: ILinkGridItem[] = [];

    uniqueConceptIds.forEach(id => {
      const concept = conceptHash[id];

      links.push({
        currentId: notebook.id,
        otherId: concept.id,
        name: concept.name,
        url: `/concepts/${concept.id}`
      });
    });

    return sortEntitiesByKey(links, "name");
  }, [conceptsLoaded, conceptHash, notebook.id, conceptIds]);

  if (!conceptLinks) return null;
  return (
    <div>
      <div>
        {
          conceptLinks.length === 0 && (
            <SHeadingSubSubtitle weight={500}>No links found.</SHeadingSubSubtitle>
          )
        }
        <LinkGrid links={conceptLinks} />
      </div>

    </div>
  );
}