import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { DropResult } from "react-beautiful-dnd";
import { faLightbulb, faQuestionCircle, faStickyNote } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

// logic
import { IMenuAction, Menu } from "../../shared/components/menu/menu.component";
import { selectNotesForSection } from "../redux/note.selectors";
import { createNote, deleteNote, updateNote, updateNotePosition } from "../redux/note.thunks";
import { repositionNote } from "section/redux/section.slice";
import { useExpandHash } from "../../shared/hooks/use-expand-hash.hook";
import { useToggle } from "../../shared/hooks/use-toggle.hook";
import { showModal } from "modal/redux/modal.slice";

// components
import { DragAndDropWrapper } from "shared/components/drag-and-drop/drag-and-drop-wrapper.component";
import { DraggableWrapper } from "shared/components/drag-and-drop/draggable-wrapper.component";
import { FloatingCornerButton } from "shared/components/button/floating-corner-button.component";
import { EditableContentBox } from "shared/components/info/editable-content-box.component";

// styles
import { theme } from "shared/styles/theme.style";
import { SHeadingSubSubtitle } from "shared/styles/typography.style";
import { SContentBoxList } from "../../shared/components/info/content-box.style";

interface IProps {
  sectionId: string;
}
export const NoteList: React.FC<IProps> = ({ sectionId }) => {
  const dispatch = useDispatch();
  const notes = useSelector(selectNotesForSection);

  const { expandedHash, toggleEntityExpansion } = useExpandHash(notes ?? [], true);

  const [menuShowing, toggleMenu] = useToggle(false);
  const menuActions: IMenuAction[] = [
    { name: "Note", icon: faStickyNote, action: handleCreateNote },
    { name: "Flashcard", icon: faQuestionCircle, action: handleCreateFlashcard },
    { name: "Concept", icon: faLightbulb, action: handleCreateConcept },
  ];

  function handleDragEnd(result: DropResult) {
    if (!notes) return;

    const { source, destination } = result;
    if (!destination || destination.index === source.index) return;

    const oldIndex = source.index;
    const newIndex = destination.index;

    dispatch(repositionNote({
      ownerEntityId: sectionId,
      oldIndex,
      newIndex
    }));

    // async call to update position on backend
    dispatch(updateNotePosition({
      sectionId,
      noteId: notes[oldIndex].id,
      // positions in DB start at 1, not 0
      newPosition: newIndex + 1,
    }));
  }

  function handleCreateNote() {
    dispatch(createNote({ sectionId }));
  }

  function handleCreateFlashcard() {
    dispatch(showModal({
      modalType: "create-flashcard",
      modalProps: {
        sectionId
      }
    }));
  }

  function handleCreateConcept() {
    dispatch(showModal({
      modalType: "create-concept",
    }));
  }

  function handleUpdate(noteId: string, name?: string, content?: string) {
    const updates = { name, content };
    dispatch(updateNote({
      sectionId,
      noteId,
      updates,
    }));
  }

  function handleDelete(noteId: string) {
    dispatch(deleteNote({ noteId, sectionId }));
  }

  if (!notes) return null;
  return (
    <SContainer>
      <SHeadingSubSubtitle># Notes: {notes.length}</SHeadingSubSubtitle>

      {notes.length === 0 && <SNoItemsHeading>No notes found...</SNoItemsHeading>}
      <DragAndDropWrapper droppableId="note-list-droppable" handleDragEnd={handleDragEnd}>
        <SContentBoxList>
          {notes.map((note, index) => (
            <DraggableWrapper key={note.id} draggableId={note.id} index={index} dragDisabled={false}>
              <EditableContentBox
                entityId={note.id}
                handleDelete={handleDelete}
                handleUpdate={handleUpdate}
                index={index}
                content={note.content}
                title={note.name}
                isExpanded={expandedHash[note.id]}
                toggleIsExpanded={toggleEntityExpansion}
              />
            </DraggableWrapper>
          ))}
        </SContentBoxList>
      </DragAndDropWrapper>

      <FloatingCornerButton
        handleClick={toggleMenu}
        icon="plus"
      />
      <SMenuContainer>
        <Menu actions={menuActions} toggleMenu={toggleMenu} menuShowing={menuShowing} />
      </SMenuContainer>
    </SContainer>
  );
};

const SContainer = styled.div`
  margin-top: ${theme.spacing.md};
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const SNoItemsHeading = styled(SHeadingSubSubtitle)`
  font-weight: 500;
`;

const SMenuContainer = styled.div`
  position: fixed;
    bottom: 21rem;
    right: 15rem;

  ${theme.media.tabPort} {
    bottom: 24rem;
    right: 17rem;
    
  }
  ${theme.media.tabLand} {
    bottom: 25rem;
    right: 19rem;
  }
`;
