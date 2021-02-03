import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { createConcept } from "concept/redux/concept.thunks";
import { selectConcepts, selectConceptTags } from "concept/redux/concept.selectors";
import { useForm } from "shared/hooks/use-form.hook";
import { FormGroup } from "shared/components/form/form-group.component";
import { theme } from "shared/styles/theme.styles";
import { SHeadingSubtitle } from "shared/styles/typography.styles";
import { SButtonGreen } from "shared/styles/button.styles";
import { IModalProps } from "modal/redux/modal.types";
import { TagAutocompleteInput } from "tags/components/tag-autocomplete-input.component";

interface IProps extends IModalProps {}
export const CreateConcept: FC<IProps> = ({ handleClose }) => {
  const { values, handleChange } = useForm({ name: "" });
  const { name } = values;
  const [isDuplicateConcept, setIsDuplicateConcept] = useState(false);
  const [tagsToAdd, setTagsToAdd] = useState<string[]>([]);

  const error = isDuplicateConcept ? "Concept with that name already exists" : "";
  const buttonDisabled = (name.trim() === "" || isDuplicateConcept);
  
  const dispatch = useDispatch();
  const conceptTags = useSelector(selectConceptTags);
  const concepts = useSelector(selectConcepts);

  // check if concept name is duplicate
  useEffect(() => {
    // disable button if name empty
    if (name.trim() === "") {
      setIsDuplicateConcept(false);
      return;
    }

    const duplicateName = concepts.some(c => c.name.toLowerCase() === name.toLowerCase());
    duplicateName
      ? setIsDuplicateConcept(true)
      : setIsDuplicateConcept(false)
  }, [name, concepts]);
  
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // enter key shouldn't submit form
    // reason: user may want to enter tags
    if (event.key === "Enter") event.preventDefault();
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!name) return;

    dispatch(createConcept({ name, tags: tagsToAdd }));
    handleClose();
  }

  return (
    <SContent>
      <SHeadingSubtitle>Create Concept</SHeadingSubtitle>
      <SForm autoComplete="off" onSubmit={handleSubmit}>
        <FormGroup
          name="name"
          onChange={handleChange}
          type="text"
          placeholder="Concept Name"
          onKeyDown={handleKeyDown}
          value={name}
        />
        <SError>{error}</SError>
        <TagAutocompleteInput
          availableTags={conceptTags}
          tagsToAdd={tagsToAdd}
          setTagsToAdd={setTagsToAdd}
        />
        <SButton disabled={buttonDisabled}>Create</SButton>
      </SForm>
    </SContent>
  );
 };

const SContent = styled.div``;

const SForm = styled.form`
  margin-top: ${theme.spacing.base};
`;

const SError = styled.p`
  color: ${theme.colors.red[300]};
  min-height: 3rem;
  margin-top: ${theme.spacing.xs};
  margin-bottom: ${theme.spacing.sm};
`;

const SButton = styled(SButtonGreen)`
  margin-top: ${theme.spacing.md};
`;