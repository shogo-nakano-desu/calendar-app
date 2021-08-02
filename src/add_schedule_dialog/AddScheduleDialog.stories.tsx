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
  },
} as Meta;

const Template: Story<Props4AddScheduleDialog> = (args) => (
  <AddScheduleDialog {...args} />
);
export const Default = Template.bind({});
Default.args = {
  titleForm: "サッカー練習試合",
  targetDate: new Date(),
  placeForm: "小石川運動公園",
  descriptionForm:
    "11時集合で練習試合。仕事がある人が多い日なので人数少なく遅刻厳禁",
};

export const LongTitle = Template.bind({});
LongTitle.args = {
  ...Default.args,
  titleForm:
    "サッカー練習試合。相手は食べチョクさんなので遅刻厳禁でお願いします！他に、ユーザベースさんとPOLさんもきます！",
};

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
