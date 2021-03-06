export type TModalType =
  | "create-concept"
  | "delete-concept"
  | "update-concept"

  | "create-notebook"
  | "delete-notebook"
  | "update-notebook"

  | "update-section"
  | "delete-section"

  | "delete-tag"
  | "update-tag"

  | "create-flashcard"

  | "create-named-entity"
  | "update-named-entity"
  | "confirmation"

export interface IModalState {
  modalShowing: boolean;
  modalType?: TModalType;
  modalProps?: unknown;
}

export interface IModalProps {
  handleClose: () => void;
}

export interface IShowModalPayload {
  modalType: TModalType;
  modalProps?: unknown;
}
