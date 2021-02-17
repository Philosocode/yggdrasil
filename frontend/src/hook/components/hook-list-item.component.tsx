import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

// logic
import { IHook } from "hook/redux/hook.types";
import { useForm } from "../../shared/hooks/use-form.hook";
import { showModal } from "modal/redux/modal.slice";
import { deleteHook, updateHook } from "../redux/hook.thunks";

// styles
import { theme } from "../../shared/styles/theme.style";
import { STextareaBase } from "../styles/hook.style";
import { SButtonGreen, SButtonRed } from "shared/styles/button.style";
import { selectCurrentConcept } from "../../concept/redux/concept.selectors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IProps {
  hook: IHook;
}
export const HookListItem: React.FC<IProps> = ({ hook }) => {
  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState(true);
  const currentConcept = useSelector(selectCurrentConcept);

  const { handleChange, values } = useForm({
    title: hook.title,
    content: hook.content
  });

  const { content, title } = values;

  function showDeleteHookModal() {
    dispatch(showModal({
      modalType: "confirmation",
      modalProps: {
        handleConfirm: handleDeleteHook,
        title: "Delete Hook",
        text: `Are you sure you want to delete this hook?`,
        confirmButtonText: "Delete",
        isWarning: true
      }
    }));
  }

  function toggleExpand() {
    setIsExpanded(prevValue => !prevValue);
  }

  function handleUpdateHook() {
    if (!currentConcept) return;

    const updates = {
      ...(titleChanged() && { title }),
      ...(contentChanged() && { content }),
    };

    dispatch(updateHook({
      conceptId: currentConcept.id,
      hookId: hook.id,
      updates,
    }));
  }

  function handleDeleteHook() {
    if (!currentConcept) return;

    dispatch(deleteHook({
      hookId: hook.id,
      conceptId: currentConcept.id,
    }));
  }

  function titleChanged() {
    return title.trim() !== hook.title;
  }

  function contentChanged() {
    return content.trim() !== hook.content;
  }

  function changesMade() {
    return titleChanged() || contentChanged();
  }

  return (
    <SContainer>
      <SHeader>
        <SPosition>{hook.position}</SPosition>
        <SCaretContainer onClick={toggleExpand}>
          <SCaret icon={isExpanded ? "caret-up" : "caret-down" } />
        </SCaretContainer>
      </SHeader>
      <STitleTextarea name="title" onChange={handleChange} value={title}>
        {hook.title}
      </STitleTextarea>
      <SContentTextarea name="content" onChange={handleChange} value={content}>
        {hook.content}
      </SContentTextarea>
      <SButtons>
        <SButtonGreen
          disabled={!changesMade()}
          onClick={handleUpdateHook}
        >Update</SButtonGreen>
        <SButtonRed onClick={showDeleteHookModal}>Delete</SButtonRed>
      </SButtons>
    </SContainer>
  );
};

const SContainer = styled.li`
  background: ${theme.colors.gray[100]};
  border-radius: 3px;
  box-shadow: ${theme.boxShadows.light};
  margin-top: ${theme.spacing.base};
  padding: ${theme.spacing.base};
  padding-top: 0; // determined by SHeader
`;

const SHeader = styled.div`
  background: ${theme.colors.green};
  display: flex;
    align-items: flex-start;
    justify-content: space-between;
  position: relative;
  padding: ${theme.spacing.base} 0;
`;

const SPosition = styled.div`
  background: ${theme.colors.gray[200]};
  border-radius: 3px;
  display: flex;
    justify-content: center;
    align-items: center;
  font-size: ${theme.fontSizes.sm};
  height: 2.5rem; width: 2.5rem;
`;

const SCaretContainer = styled.div`
  background: transparent;
  border-radius: 50%;
  cursor: pointer;
  text-align: center;
  height: 3rem; width: 3rem;
  transition: background 0.1s ease-in-out;
  
  &:hover {
    background: ${theme.colors.gray[200]};
    transform: scale(1);
  }
`;

const SCaret = styled(FontAwesomeIcon)`
  color: ${theme.colors.gray[500]};
  font-size: 3rem;
  transform: translateY(-2px);
`;

const STitleTextarea = styled(STextareaBase)`
  border-top: none;
  border-left: none;
  border-right: none;
  padding-bottom: 5px;
`;

const SContentTextarea = styled(STextareaBase)`
  margin-top: ${theme.spacing.sm};
  padding: ${theme.spacing.sm};
`;

const SButtons = styled.div`
  margin-top: ${theme.spacing.sm};

  & > button {
    font-size: ${theme.fontSizes.sm};
  }

  & > button:first-child {
    margin-right: ${theme.spacing.base};
  }
`;