import styled from "styled-components";
import AutosizeTextarea from "react-textarea-autosize";

import { theme } from "./theme.style";

export const SInputBorderless = styled.input`
  border: none;
  border-bottom: 1px solid ${theme.colors.gray[500]};
  display: block;
  padding-bottom: ${theme.spacing.xs};
  width: 100%;

  &:active,
  &:focus {
    outline: none;
  }
`;

export const SSelectLabel = styled.label`
  display: block;
  font-size: ${theme.fontSizes.base};
  margin-top: ${theme.spacing.base};
  
  ${theme.media.tabLand} {
    font-size: ${theme.fontSizes.basePlus};
  }
  
  & > select {
    display: block;
  }
`;

// FROM: https://www.w3schools.com/howto/howto_css_custom_checkbox.asp
export const SCheckboxLabel = styled.label`
  cursor: pointer;
  display: block;
  font-size: ${theme.fontSizes.base};
  margin-top: ${theme.spacing.sm};
  padding-left: 2.1em;
  position: relative;

  ${theme.media.tabLand} {
    font-size: ${theme.fontSizes.basePlus};
  }

  // hide the checkbox input
  & > input {
    display: none;
  }

  // custom checkbox
  & > span {
    border: 1px solid ${theme.colors.gray[500]};
    border-radius: 3px;
    height: 1.4em;
    width: 1.4em;
    position: absolute;
    top: 0;
    left: 0;
  }

  // add background when checked
  & > input:checked ~ span {
    background: ${theme.colors.green[400]};
    border: 1px solid ${theme.colors.green[400]};
  }

  // create checkmark (hidden when unchecked)
  & > span:after {
    color: ${theme.colors.offWhite};
    content: "✓";
    display: none;
    font-weight: 500;
    text-align: center;
    transform: translateY(-2px);
  }
  
  // show checkmark when checked
  & > input:checked ~ span:after {
    display: block;
  }
`;

export const STextareaBase = styled(AutosizeTextarea)`
  background: transparent;
  border: 1px solid ${theme.colors.gray[300]};
  font-size: ${theme.fontSizes.base};
  padding: 0;
  resize: none;
  overflow: hidden;
  width: 100%;
  
  &:active,
  &:focus {
    border-color: ${theme.colors.gray[800]};
    outline: none;
  }
`;
