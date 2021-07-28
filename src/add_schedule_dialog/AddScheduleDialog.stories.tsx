import { Story, Meta } from "@storybook/react";
import {
  AddScheduleDialog,
  Props4AddScheduleDialog,
} from "./AddScheduleDialog";

export default {
  title: "AddScheduleDialog",
  component: AddScheduleDialog,
  args: {
    open: true,
    targetDate: new Date(),
  },
} as Meta;

export const Template: Story<Props4AddScheduleDialog> = (args) => (
  <AddScheduleDialog {...args} />
);

// 複数種類作っていきたい時にはPrimaryのコードを変更していけばよい
// export const Primary = Template.bind({});
// Primary.args = {};

// (props: Props4AddScheduleDialog) => (
//   <AddScheduleDialog
//     open={true}
//     handleClose={props.handleClose}
//     targetDate={props.targetDate}
//     titleForm={props.titleForm}
//     placeForm={props.placeForm}
//     descriptionForm={props.descriptionForm}
//     handleSave={props.handleSave}
//     titleHandleChange={props.titleHandleChange}
//     placeHandleChange={props.placeHandleChange}
//     descriptionHandleChange={props.descriptionHandleChange}
//     clearFormState={props.clearFormState}
//   />
// );
