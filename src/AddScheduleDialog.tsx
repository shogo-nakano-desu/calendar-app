import React from "react";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import PlaceIcon from "@material-ui/icons/Place";
import NotesIcon from "@material-ui/icons/Notes";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import "./AddScheduleDialog.css";
import { flexbox } from "styled-system";
import { FullscreenExitTwoTone } from "@material-ui/icons";

// ----------ここで渡されているデータ
interface TestScheduleMetadata {
  title: string;
  place: string;
  description: string;
}
interface TestScheduleModel<T = TestScheduleMetadata> {
  date: Date;
  schedules: Array<T>;
}
const testToday: Date = new Date();
const testADay: TestScheduleModel = {
  date: testToday,
  schedules: [],
};
// ----------

const Title = styled.div`
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.42);
  font-size: 22px;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;

  &::before {
    content: "";
    transition: border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    border-bottom: 1px solid rgba(0, 0, 0, 0.42);
    pointer-events: none;
  }
  &::after {
    content: "";
    transition: transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    border-bottom: 2px solid #3f51b5;
    pointer-events: none;
  }
`;

const Input = styled.input`
  font: inherit;
  color: currentColor;
  width: 100%;
  border: none;
  height: 1.1875em;
  padding: 6px 0 7px;
`;

//MuiGrid-container MuiGrid-spacing-xs-1 MuiGrid-align-items-xs-center MuiGrid-justify-xs-space-between
const FormAndIcon = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
`;

const DateForm = styled(FormAndIcon)`
  padding: 25px 0 0 0;
`;

const AddTitleForm = () => {
  return (
    <Title>
      <Input
        placeholder="タイトルと日時を追加"
        type="text"
        // className="MuiInputBase-input MuiInput-input"
        // valueはinput のstateを管理するようになった時に表示させるようにする
      />
    </Title>
  );
};

const ShowDateForm = () => {
  return (
    <DateForm>
      <div className="MuiGrid-root MuiGrid-item">
        <AccessTimeIcon
          className="MuiSvgIcon-root"
          focusable="false"
          viewBox="0 0 24 24"
          aria-hidden="true"
          role="presentation"
        />
      </div>
      <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-10">
        {/* format='YYYY年M月D日'を本当は↓のdivに入れたいのだができなかったのでいったん放置 */}
        <div
          className="MuiFormControl-root MuiTextField-root MuiFormControl-fullWidth"
          style={{ margin: "4px 0px" }}
        >
          <div className="MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-fullWidth MuiInput-fullWidth MuiInputBase-formControl MuiInput-formControl">
            <Input
              aria-invalid="false"
              readOnly
              type="text"
              // valueの値は選んだ日付に応じて変わるようにする必要あり
              value="2021年7月10日"
            />
          </div>
        </div>
      </div>
    </DateForm>
  );
};

const AddPlaceForm = () => {
  return (
    <FormAndIcon>
      <div className="MuiGrid-root MuiGrid-item">
        <PlaceIcon
          className="MuiSvgIcon-root"
          focusable="false"
          viewBox="0 0 24 24"
          aria-hidden="true"
          role="presentation"
        />
      </div>
      <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-10">
        <div
          className="MuiFormControl-root MuiTextField-root MuiFormControl-fullWidth"
          style={{ margin: "4px 0px" }}
        >
          <div className="MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-fullWidth MuiInput-fullWidth MuiInputBase-formControl MuiInput-formControl">
            <Input
              aria-invalid="false"
              placeholder="場所を追加"
              type="text"
              // valueは状態をもつようにしてからおくようにする。
            />
          </div>
        </div>
      </div>
    </FormAndIcon>
  );
};

const AddDescriptionForm = () => {
  return (
    <FormAndIcon>
      <div className="MuiGrid-root MuiGrid-item">
        <NotesIcon
          className="MuiSvgIcon-root"
          focusable="false"
          viewBox="0 0 24 24"
          aria-hidden="true"
          role="presentation"
        />
      </div>
      <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-10">
        <div
          className="MuiFormControl-root MuiTextField-root MuiFormControl-fullWidth"
          style={{ margin: "4px 0px" }}
        >
          <div className="MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-fullWidth MuiInput-fullWidth MuiInputBase-formControl MuiInput-formControl">
            <Input
              aria-invalid="false"
              placeholder="説明を追加"
              type="text"
              //valueの状態を持つようにする必要あり
            />
          </div>
        </div>
      </div>
    </FormAndIcon>
  );
};

const SaveButton = () => {
  return (
    <div className="MuiDialogActions-root MuiDialogActions-spacing">
      <Button variant="outlined" color="primary">
        保存
      </Button>
    </div>
  );
};

const CloseAddScheduleDialog = () => {
  return (
    <div className="MuiDialogActions-root MuiDialogActions-spacing">
      <div className="src-components-AddScheduleDialog-style__closeButton--2v8XJ">
        <HighlightOffIcon type="button" />
      </div>
    </div>
  );
};

export const AddScheduleDialog = () => {
  return (
    <div
      role="presentation"
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(128, 128, 128, 0.5)",
        padding: 0,
      }}
    >
      <div
        aria-hidden="true"
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0,0,0,0.5)",
          opacity: 0.5,
          transition: "opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        }}
      ></div>
      {/* これが全部入りの箱の外側 */}
      {/* <SetPositionOfDialog> */}
      <OutlineBox role="dialog">
        <CloseAddScheduleDialog />
        <div className="MuiDialogContent-root">
          <AddTitleForm />
          <ShowDateForm />
          <AddPlaceForm />
          <AddDescriptionForm />
        </div>
        <SaveButton />
      </OutlineBox>
      {/* </SetPositionOfDialog> */}
      <div tabIndex={0} data-test="sentinelEnd"></div>
    </div>
  );
};

// className="MuiPaper-root MuiDialog-paper
// MuiDialog - paperScrollPaper MuiDialog - paperWidthXs
// MuiDialog - paperFullWidth MuiPaper - elevation24 MuiPaper - rounded"
const OutlineBox = styled.div`
  color: rgba(0, 0, 0, 0.87);
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  background-color: #fff;
  width: 40%;
`;

const SetPositionOfDialog = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
`;
