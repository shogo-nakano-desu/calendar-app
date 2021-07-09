import React from "react";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import PlaceIcon from "@material-ui/icons/Place";
import NotesIcon from "@material-ui/icons/Notes";
import styled from "styled-components";
import "./AddScheduleDialog.css";

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

// "MuiInputBase-root MuiInput-root jss1000 MuiInput-underline MuiInputBase-fullWidth MuiInput-fullWidth">
// const Title = styled.div`
//   color: rgba(0, 0, 0, 0.87);
//   cursor: text;
//   display: inline-flex;
//   position: relative;
//   font-size: 1rem;
//   box-sizing: border-box;
//   align-items: center;
//   font-family: "Roboto", "Helvetica", "Arial", sans-serif;
//   line-height: 1.1875em;
//   position: relative;
//   font-size: 22px;
//   margin-bottom: 32px;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   content: "\00a0";
//   position: absolute;
//   transition: border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
//   border-bottom: 1px solid rgba(0, 0, 0, 0.42);
//   pointer-events: none;
//   width: 100%;
// `;
const Title = styled.div`
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.42);
  font-size: 22px;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
`;

const Input = styled.div`
  &:before {
    left: 0;
    right: 0;
    bottom: 0;
    content: "\00a0";
    position: absolute;
    transition: border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    border-bottom: 1px solid rgba(0, 0, 0, 0.42);
    pointer-events: none;
  }
  $:after {
    left: 0;
    right: 0;
    bottom: 0;
    content: "";
    position: absolute;
    transform: scaleX(0);
    transition: transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    border-bottom: 2px solid #3f51b5;
    pointer-events: none;
  }
  font: inherit;
  color: currentColor;
  width: 100%;
  bord: 0;
  height: 1.1875em;
  margin: 0;
  display: block;
  padding: 6px 0 7px;
  min-width: 0;
  background: none;
  box-sizing: content-box;
  animation-name: MuiInputBase-keyframes-auto-fill-cancel;
  -webkit-tap-highlight-color: transparent;
`;

const AddTitleForm = () => {
  return (
    <Title>
      <Input
        placeholder="タイトルと日時を追加"
        type="text"
        className="MuiInputBase-input MuiInput-input"
        // valueはinput のstateを管理するようになった時に表示させるようにする
      />
    </Title>
  );
};

//MuiGrid-container MuiGrid-spacing-xs-1 MuiGrid-align-items-xs-center MuiGrid-justify-xs-space-between
const FormAndIcon = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
`;

const ShowDateForm = () => {
  return (
    <FormAndIcon>
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
            <input
              className="MuiInputBase-input MuiInput-input"
              aria-invalid="false"
              readOnly
              type="text"
              // valueの値は選んだ日付に応じて変わるようにする必要あり
              value="2021年7月10日"
            />
          </div>
        </div>
      </div>
    </FormAndIcon>
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
            <input
              className="MuiInputBase-input MuiInput-input"
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
            <input
              className="MuiInputBase-input MuiInput-input"
              aria-invalid="false"
              placeholder="説明を追加"
              type="text"
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
      <button
        className="MuiButtonBase-root MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary"
        tabIndex={0}
        type="button"
      >
        <span className="MuiButton-label">保存</span>
        <span className="MuiTouchRipple-root"></span>
      </button>
    </div>
  );
};

const CloseAddScheduleDialog = () => {
  return (
    <div className="MuiDialogActions-root MuiDialogActions-spacing">
      <div className="src-components-AddScheduleDialog-style__closeButton--2v8XJ">
        <button
          className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeSmall"
          tabIndex={0}
          type="button"
          title="閉じる"
        >
          <span className="MuiIconButton-label"></span>
          <span className="MuiTouchRipple-root"></span>
        </button>
      </div>
    </div>
  );
};

export const AddScheduleDialog = () => {
  return (
    <div
      role="presentation"
      className="MuiDialog-root"
      style={{ position: "fixed", zIndex: 1300, inset: "0px" }}
    >
      <div
        className="MuiBackdrop-root"
        aria-hidden="true"
        style={{
          opacity: 1,
          transition: "opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        }}
      ></div>
      <div tabIndex={0} data-test="sentinelStart"></div>
      <div
        className="MuiDialog-container MuiDialog-scrollPaper"
        role="none presentation"
        tabIndex={-1}
        style={{
          opacity: 1,
          transition: "opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        }}
      >
        <div
          className="MuiPaper-root MuiDialog-paper MuiDialog-paperScrollPaper MuiDialog-paperWidthXs MuiDialog-paperFullWidth MuiPaper-elevation24 MuiPaper-rounded"
          role="dialog"
        >
          <CloseAddScheduleDialog />
          <div className="MuiDialogContent-root">
            <AddTitleForm />
            <ShowDateForm />
            <AddPlaceForm />
            <AddDescriptionForm />
          </div>
          <SaveButton />
        </div>
      </div>
      <div tabIndex={0} data-test="sentinelEnd"></div>
    </div>
  );
};
