import React, { FC, MouseEvent } from "react";
import ReactModal from "react-modal";
import styled, { CSSProperties } from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { theme } from "../../shared/styles/theme.style";

interface IProps {
  children?: React.ReactNode;
  isShowing: boolean;
  handleClose: (event: MouseEvent) => void;
}

export const ModalWrapper: FC<IProps> = ({ isShowing, handleClose, children }) => {
  const contentStyles: CSSProperties = {
    minHeight: "50vh",
    height: "max-content",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    padding: `${theme.spacing.md} ${theme.spacing.base}`,
    width: "60rem",
    maxWidth: "90vw",
    zIndex: theme.zIndices.modal,
  };

  const overlayStyles: CSSProperties = {
    background: "rgba(0,0,0,0.5)",
    zIndex: theme.zIndices.modal,
  };

  ReactModal.setAppElement("#root");

  return (
    <ReactModal
      isOpen={isShowing}
      onRequestClose={handleClose}
      closeTimeoutMS={150}
      style={{
        content: contentStyles,
        overlay: overlayStyles,
      }}
    >
      <SCloseIcon onClick={handleClose} icon="times" />
      {children}
    </ReactModal>
  );
};

const SCloseIcon = styled(FontAwesomeIcon)`
  color: ${theme.colors.gray["700"]};
  cursor: pointer;
  font-size: 2.4rem;
  position: absolute;
    top: 0.4em;
    right: 0.6em;
`;
