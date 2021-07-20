import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import {
  AddScheduleDialog,
  Props4AddScheduleDialog,
} from "./AddScheduleDialog";

export default {
  title: "AddScheduleDialog",
  component: AddScheduleDialog,
} as ComponentMeta<typeof AddScheduleDialog>;

export const Template: ComponentStory<typeof AddScheduleDialog> = (
  props: Props4AddScheduleDialog
) => (
  <AddScheduleDialog
    open={props.open}
    handleClose={props.handleClose}
    targetDate={props.targetDate}
    titleForm={props.titleForm}
    placeForm={props.placeForm}
    descriptionForm={props.descriptionForm}
    handleSave={props.handleSave}
    titleHandleChange={props.titleHandleChange}
    placeHandleChange={props.placeHandleChange}
    descriptionHandleChange={props.descriptionHandleChange}
    clearFormState={props.clearFormState}
  />
);
