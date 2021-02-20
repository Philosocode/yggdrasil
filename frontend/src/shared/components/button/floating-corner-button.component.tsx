import React, { FC } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { theme } from "shared/styles/theme.style";
import useKeypress from "shared/hooks/use-key-press.hook";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface IProps {
  handleClick: () => void;
  icon: IconProp;
  triggerKey?: string;
}
export const FloatingCornerButton: FC<IProps> = ({
  handleClick,
  icon,
  triggerKey,
}) => {
  useKeypress({ key: triggerKey, action: handleClick });

  return (
    <SButton onClick={handleClick}>
      <SIcon icon={icon} />
    </SButton>
  )
};

const SButton = styled.button`
  background: ${theme.colors.green[400]};
  border: none;
  border-radius: 50%;
  box-shadow: ${theme.boxShadows.pressed};
  cursor: pointer;
  height: 6rem;
  width: 6rem;
  position: fixed;
    bottom: 5vh;
    right: 2.5vw;

  &:focus,
  &:active {
    outline: 1px solid grey;
  }

  &:hover {
    background: ${theme.colors.green[300]};
  }
`;

const SIcon = styled(FontAwesomeIcon)`
  color: ${theme.colors.white};
  font-size: 2rem;
`;