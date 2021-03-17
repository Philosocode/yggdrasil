import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

// logic
import { IUserSettings } from "../redux/user.types";
import { useForm } from "../../shared/hooks/use-form.hook";

// components
import { ModalWrapper } from "modal/components/modal-wrapper.component";
import { LabelCheckbox } from "../../shared/components/form/label-checkbox.component";

// styles
import { theme } from "../../shared/styles/theme.style";
import { SHeadingSubtitle } from "shared/styles/typography.style";
import { SButtonGreen } from "shared/styles/button.style";
import { updateUserSettings } from "../redux/user.thunks";

interface IProps {
  currentSettings: IUserSettings;
  modalShowing: boolean;
  toggleModal: () => void;
}
export const SettingsModal: React.FC<IProps> = ({
  currentSettings,
  modalShowing,
  toggleModal,
}) => {
  const dispatch = useDispatch();
  const { values, handleChange, itemsChanged } = useForm<IUserSettings>(currentSettings);

  function handleUpdateSettings(event: React.FormEvent) {
    event.preventDefault();

    if (!itemsChanged()) return;

    const updates: Partial<IUserSettings> = {};

    Object.keys(currentSettings).forEach((setting) => {
      const key = setting as keyof IUserSettings;
      // FROM: https://fettblog.eu/typescript-better-object-keys/
      if (currentSettings[key] !== values[key]) {
        // @ts-ignore
        updates[key] = values[key];
      }
    });

    // convert to numbers
    if (updates["defaultBreakTime"]) {
      updates["defaultBreakTime"] = +updates["defaultBreakTime"];
    }
    if (updates["defaultStudyTime"]) {
      updates["defaultStudyTime"] = +updates["defaultStudyTime"];
    }

    dispatch(updateUserSettings({ userId: "hello", updates }));

    toggleModal();
  }

  return (
    <ModalWrapper handleClose={toggleModal} isShowing={modalShowing}>
      <SHeadingSubtitle>Settings</SHeadingSubtitle>
      <form onSubmit={handleUpdateSettings}>
        <LabelCheckbox
          text="Show welcome modal"
          htmlFor="showWelcomeModal"
          id="showWelcomeModal"
          name="showWelcomeModal"
          onChange={handleChange}
          checked={values["showWelcomeModal"]}
        />
        <LabelCheckbox
          text="Forced breaks"
          htmlFor="forcedBreaks"
          id="forcedBreaks"
          name="forcedBreaks"
          onChange={handleChange}
          checked={values["forcedBreaks"]}
        />
        <LabelCheckbox
          text="Automatically start study timer"
          htmlFor="autoStartTimer"
          id="autoStartTimer"
          name="autoStartTimer"
          onChange={handleChange}
          checked={values["autoStartTimer"]}
        />
        <SSelectLabel>
          Default Study Time:
          <select
            name="defaultStudyTime"
            value={values["defaultStudyTime"]}
            onChange={handleChange}
          >
            <option value="30">30 minutes</option>
            <option value="60">1 hour</option>
          </select>
        </SSelectLabel>
        <SSelectLabel>
          Default Break Time:
          <select
            name="defaultBreakTime"
            value={values["defaultBreakTime"]}
            onChange={handleChange}
          >
            <option value="5">5 minutes</option>
            <option value="10">10 minutes</option>
          </select>
        </SSelectLabel>
        <SSubmit disabled={!itemsChanged()}>Submit</SSubmit>
      </form>
    </ModalWrapper>
  );
};

const SSelectLabel = styled.label`
  display: block;
  font-size: ${theme.fontSizes.basePlus};
  margin-top: ${theme.spacing.base};
  
  & > select {
    display: block;
  }
`;

const SSubmit = styled(SButtonGreen)`
  margin-top: ${theme.spacing.md};
`;