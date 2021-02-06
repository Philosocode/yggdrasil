import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

import { selectCurrConceptTag } from "concept/redux/concept.selectors";
import { theme } from "shared/styles/theme.styles";
import { showModal } from "modal/redux/modal.slice";

interface IProps {
  tag: string;
  setCurrTag: (name: string) => void;
}
export const TagSidebarItem: FC<IProps> = ({ setCurrTag, tag }) => {
  const dispatch = useDispatch();
  const currTag = useSelector(selectCurrConceptTag);

  function handleEdit(event: React.MouseEvent) {
    event.stopPropagation();

    dispatch(
      showModal({
        modalType: "update-tag",
        modalProps: {
          oldTagName: tag,
        },
      })
    );
  }

  function handleDeleteTag(event: React.MouseEvent) {
    event.stopPropagation();

    dispatch(
      showModal({
        modalType: "delete-tag",
        modalProps: {
          tagName: tag,
        },
      })
    );
  }

  return (
    <SContainer onClick={() => setCurrTag(tag)} isActive={currTag === tag}>
      <div>
        <SIcon icon="tag" />
        {tag}
      </div>
      <SActionIcons>
        <SEditIcon icon="pencil-alt" onClick={handleEdit} />
        <SDeleteIcon icon="trash" onClick={handleDeleteTag} />
      </SActionIcons>
    </SContainer>
  );
};

const SActionIcons = styled.div`
  visibility: hidden;
`;

interface IContainerProps {
  isActive: boolean;
}
const SContainer = styled.li<IContainerProps>`
  ${(p) => (p.isActive ? `background: ${theme.colors.gray[100]}` : null)};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${theme.spacing.sm} ${theme.spacing.base};

  &:hover {
    background: ${theme.colors.gray[100]};
  }

  &:hover ${SActionIcons} {
    visibility: visible;
  }
`;

const SIcon = styled(FontAwesomeIcon)`
  color: ${theme.colors.gray[600]};
  margin-right: ${theme.spacing.sm};
`;

const SEditIcon = styled(FontAwesomeIcon)`
  font-size: 1.8rem;
  margin-right: ${theme.spacing.sm};

  &:hover {
    color: orange;
  }
`;

const SDeleteIcon = styled(FontAwesomeIcon)`
  font-size: 1.8rem;

  &:hover {
    color: ${theme.colors.red[300]};
  }
`;
