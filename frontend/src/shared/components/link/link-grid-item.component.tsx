import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

import { theme } from "../../styles/theme.style";

export interface ILinkGridItem {
  currentId: string;
  otherId: string;
  name: string;
  url: string;
}
interface IProps {
  link: ILinkGridItem;
  handleDelete?: (currentId: string, otherId: string) => void;
}
export const LinkGridItem: React.FC<IProps> = ({ handleDelete, link }) => {
  function handleDeleteClick(event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    handleDelete?.(link.currentId, link.otherId);
  }

  return (
    <SLink to={link.url}>
      <div>{link.name}</div>
      {
        handleDelete && (
          <SIcon
            icon="trash"
            onClick={handleDeleteClick}
          />
        )
      }
    </SLink>
  )
}

const SIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 0.5em;
  right: 0.5em;
  
  ${theme.media.tabLand} {
    font-size: 1.2em;
    visibility: hidden;
  }

  &:hover {
    color: ${theme.colors.gray[600]};
  }
`;

const SLink = styled(Link)`
  background: ${theme.colors.offWhite};
  border-radius: 5px;
  box-shadow: ${theme.boxShadows.light};
  font-weight: 500;
  padding: 3.5rem;
  position: relative;
  text-align: center;
  
  ${theme.media.tabLand} {
    padding: ${theme.spacing.md} ${theme.spacing.base};
  }

  &:hover {
    background: ${theme.colors.green[400]};
    color: ${theme.colors.white};
  }

  &:hover ${SIcon} {
    visibility: visible;
  }
`;
