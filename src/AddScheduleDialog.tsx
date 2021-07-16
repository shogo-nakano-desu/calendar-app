// やりたいこと
// 1. コード全体が汚いので綺麗にする。特に、cssが外部ファイルで残っているのを消したい
// 2. 入力フォームにもmaterial - uiがあるはずなので適用する

import React, { useState } from "react";
import getYear from "date-fns/getYear";
import getMonth from "date-fns/getMonth";
import getDate from "date-fns/getDate";
import differenceInCalendarDays from "date-fns/differenceInCalendarDays";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import PlaceIcon from "@material-ui/icons/Place";
import NotesIcon from "@material-ui/icons/Notes";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { flex, maxHeight, maxWidth } from "styled-system";
import { max } from "date-fns/esm";
import { ScheduleModel } from "./Calendar";
import { ScheduleMetadata, Schedules } from "./Calendar";

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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "80%",
      maxWidth: "500px",
    },
    paperScrollPaper: {
      maxHeight: "300px",
      height: "60%",
    },
    titleForm: {
      width: "100%",
      marginLeft: "10px",
      marginRight: "10px",
      display: "flex",
      justifyContent: "center",
      fontSize: "20px",
    },
    titleField: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
    },
    formField: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
    },
    resize: {
      fontSize: 24,
    },
  })
);

interface Props4AddTitleForm {
  titleForm: string;
  titleHandleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AddTitleForm = (props: Props4AddTitleForm) => {
  const classes = useStyles();
  return (
    <form className={classes.titleForm} noValidate autoComplete="off">
      <TextField
        InputProps={{
          classes: { input: classes.resize },
        }}
        className={classes.titleField}
        value={props.titleForm}
        onChange={props.titleHandleChange}
        placeholder=" タイトルを追加"
        // className="MuiInputBase-input MuiInput-input"
        // valueはinput のstateを管理するようになった時に表示させるようにする
      />
    </form>
  );
};

interface Props4ShowDateForm {
  targetDate: Date;
}
const ShowDateForm = (props: Props4ShowDateForm) => {
  const classes = useStyles();
  return (
    <IconAndForm>
      <IconStyle>
        <AccessTimeIcon />
      </IconStyle>
      <FormStyle>
        <TextField
          className={classes.formField}
          value={`${getYear(props.targetDate)}年${
            getMonth(props.targetDate) + 1
          }月${getDate(props.targetDate)}日`}
        />
      </FormStyle>
    </IconAndForm>
  );
};

interface Props4AddPlaceForm {
  placeForm: string;
  placeHandleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AddPlaceForm = (props: Props4AddPlaceForm) => {
  const classes = useStyles();
  return (
    <IconAndForm>
      <IconStyle>
        <PlaceIcon />
      </IconStyle>
      <FormStyle>
        <TextField
          className={classes.formField}
          placeholder="場所を追加"
          value={props.placeForm}
          onChange={props.placeHandleChange}
          // valueは状態をもつようにしてからおくようにする。
        />
      </FormStyle>
    </IconAndForm>
  );
};

interface Props4AddDescriptionForm {
  descriptionForm: string;
  descriptionHandleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const AddDescriptionForm = (props: Props4AddDescriptionForm) => {
  const classes = useStyles();
  return (
    <IconAndForm>
      <IconStyle>
        <NotesIcon />
      </IconStyle>
      <FormStyle>
        <TextField
          className={classes.formField}
          placeholder="説明を追加"
          value={props.descriptionForm}
          onChange={props.descriptionHandleChange}
          //valueの状態を持つようにする必要あり
        />
      </FormStyle>
    </IconAndForm>
  );
};

interface Props4SaveButton {
  titleForm: string;
  placeForm: string;
  descriptionForm: string;
  handleSave: () => void;
  handleClose: () => void;
}

const SaveButton = (props: Props4SaveButton) => {
  return (
    <SaveButtonStyle>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => {
          props.handleSave();
          props.handleClose();
        }}
      >
        保存
      </Button>
    </SaveButtonStyle>
  );
};

const SaveButtonStyle = styled.div`
  display: flex;
  height: 15%;
  justify-content: flex-end;
  margin: 5px;
`;

interface Props4AddScheduleDialog {
  open: boolean;
  handleClose: () => void;
  targetDate: Date;
  firstDayOfWeeksArray: Date;
  titleForm: string;
  placeForm: string;
  descriptionForm: string;
  handleSave: () => void;
  titleHandleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeHandleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  descriptionHandleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AddScheduleDialog = (props: Props4AddScheduleDialog) => {
  const classes = useStyles();

  return (
    <Position>
      <Dialog
        classes={{
          container: classes.container,
          paperScrollPaper: classes.paperScrollPaper,
        }}
        open={props.open}
        onClose={props.handleClose}
        fullWidth
        maxWidth="xl"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        // style={{
        //   height: "100%",
        //   display: "flex",
        //   justifyContent: "center",
        //   alignItems: "center",
        //   backgroundColor: "rgba(128, 128, 128, 0.5)",
        //   padding: 0,
        // }}
      >
        <CloseIconSet>
          <HighlightOffIcon type="button" onClick={props.handleClose} />
        </CloseIconSet>
        <TitleSet>
          <AddTitleForm
            titleForm={props.titleForm}
            titleHandleChange={props.titleHandleChange}
          />
        </TitleSet>
        <ShowDateForm targetDate={props.targetDate} />
        <AddPlaceForm
          placeForm={props.placeForm}
          placeHandleChange={props.placeHandleChange}
        />
        <AddDescriptionForm
          descriptionForm={props.descriptionForm}
          descriptionHandleChange={props.descriptionHandleChange}
        />
        <SaveButton
          titleForm={props.titleForm}
          placeForm={props.placeForm}
          descriptionForm={props.descriptionForm}
          handleSave={props.handleSave}
          handleClose={props.handleClose}
        />
      </Dialog>
    </Position>
  );
};

const Position = styled.div`
  display: flex;
  align-items: center;
`;

const CloseIconSet = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 10px;　
  height: 15%;
`;

const TitleSet = styled.div`
  display: flex;
  margin: 0px 10px 10px 10px;
  height: 25%;
  align-items: flex-start;
`;

const IconAndForm = styled.div`
  display: flex;
  height: 15%;
  width: 100%;
`;
const IconStyle = styled.div`
  margin: 0px 10px 0px 10px;
  display: flex;
  align-items: center;
`;

const FormStyle = styled.div`
  margin: 0px 20px 0px 10px;
  width: 100%;
  display: flex;
  justify-content: center;
`;
