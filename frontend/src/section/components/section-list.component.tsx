import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { faCompress, faExpand } from "@fortawesome/free-solid-svg-icons";
import { DropResult } from "react-beautiful-dnd";
import styled from "styled-components";

// logic
import { selectSectionsForPart } from "../redux/section.selectors";

// components
import { DragAndDropWrapper } from "shared/components/drag-and-drop/drag-and-drop-wrapper.component";
import { FloatingCornerButton } from "shared/components/button/floating-corner-button.component";

// styles
import { theme } from "shared/styles/theme.style";
import { SHeadingSubSubtitle } from "shared/styles/typography.style";
import { useExpandHash } from "../../shared/hooks/use-expand-hash.hook";
import { ISection } from "../redux/section.types";
import { DraggableContentBox } from "../../shared/components/info/draggable-content-box.component";

export const SectionList: React.FC = () => {
  const dispatch = useDispatch();
  const sections = useSelector(selectSectionsForPart);

  const {
    expandedHash,
    toggleEntityExpansion,
    hasExpandedEntity,
    toggleAllExpansions
  } = useExpandHash(sections ?? []);

  function handleDragEnd(result: DropResult) {
    const { source, destination } = result;
    if (!destination || destination.index === source.index) return;
  }

  if (!sections) return null;
  return (
    <>
    <SHeadingSubSubtitle># Sections: {sections.length}</SHeadingSubSubtitle>

    {sections.length === 0 && <SNoItemsHeading>No hooks found...</SNoItemsHeading>}
    <DragAndDropWrapper droppableId="hook-list-droppable" handleDragEnd={handleDragEnd}>
      <SList>
        {sections.map((section, index) => (
          <DraggableContentBox
            key={section.id}
            dragDisabled={false}
            entityId={section.id}
            handleDelete={() => {}}
            handleUpdate={() => {}}
            index={index}
            initialContent={section.content}
            initialName={section.name}
            isExpanded={expandedHash[section.id]}
            toggleIsExpanded={toggleEntityExpansion}
          />
        ))}
      </SList>
    </DragAndDropWrapper>

    <FloatingCornerButton
      handleClick={toggleAllExpansions}
      icon={hasExpandedEntity() ? faCompress : faExpand}
    />
  </>
  )
}

const SNoItemsHeading = styled(SHeadingSubSubtitle)`
  font-weight: 500;
  margin-top: ${theme.spacing.md};
`;

const SList = styled.ul`
  margin-top: ${theme.spacing.md};
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
`;