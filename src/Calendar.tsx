import React, { useState, useRef } from "react";
import add from "date-fns/add";
import getYear from "date-fns/getYear";
import getMonth from "date-fns/getMonth";
import getDaysInMonth from "date-fns/getDaysInMonth";
import toDate from "date-fns/toDate";
import getWeeksInMonth from "date-fns/getWeeksInMonth";
import differenceInCalendarDays from "date-fns/differenceInCalendarDays";
import getDate from "date-fns/getDate";
import getDay from "date-fns/getDay";
import parseISO from "date-fns/parseISO";
import styled from "styled-components";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import { Navigation } from "./Navigation";
import { AddScheduleDialog } from "./AddScheduleDialog";
import "./Calendar.css";
import { getISODay } from "date-fns/esm";

// 予定の持たせ方の型定義
export interface ScheduleMetadata {
  title: string;
  place: string;
  description: string;
}
export interface ScheduleModel<T = ScheduleMetadata> {
  date: Date;
  schedules: Array<T>;
}

type WeeksArrayModel = ScheduleModel[];

// ↑ユーザー操作実装後は不要になるコードーーーーーーーーーーーーーーーーーーーーーーーーーーー
// ↓そのまま残すコード
// - CalendarApp
// | - CalendarAppStyle
//     | - Navigation
//     | - CalendarBoard
//       | - BorderStyle
//       | - CalendarGridStyle
//         | - Schedules
interface Props4CalendarBoard {
  targetYear: number;
  targetMonth: number;
  weeksArray: WeeksArrayModel;
  setWeeksArray: React.Dispatch<React.SetStateAction<WeeksArrayModel>>;
  open: boolean;
  handleClose: () => void;
  getID: (e: any) => string;
  getClickedDate: (e: any) => void;
  handleClickOpen: () => void;
}
interface Props4Schedule {
  targetFirstDayOfTheMonth: Date;
  weeksInMonth: number;
  weeksArray: WeeksArrayModel;
  setWeeksArray: React.Dispatch<React.SetStateAction<WeeksArrayModel>>;
  open: boolean;
  handleClose: () => void;
  getID: (e: any) => string;
  getClickedDate: (e: any) => void;
  handleClickOpen: () => void;
}

const CalendarBoard = (props: Props4CalendarBoard) => {
  const targetFirstDayOfTheMonth = new Date(
    props.targetYear,
    props.targetMonth - 1,
    1
  );
  const weeksInMonth = getWeeksInMonth(targetFirstDayOfTheMonth);
  // calendarの行数に応じてグリッドを生成するための１frを返す
  const calendarRowsCalc = (weeksInMonth: number): string => {
    if (weeksInMonth === 4) {
      return "1fr 1fr 1fr 1fr";
    } else if (weeksInMonth === 5) {
      return "1fr 1fr 1fr 1fr 1fr";
    } else {
      return "1fr 1fr 1fr 1fr 1fr 1fr";
    }
  };
  return (
    <BorderStyle>
      <CalendarGridStyle theme={{ rows: calendarRowsCalc(weeksInMonth) }}>
        <Schedules
          targetFirstDayOfTheMonth={targetFirstDayOfTheMonth}
          weeksInMonth={weeksInMonth}
          weeksArray={props.weeksArray}
          setWeeksArray={props.setWeeksArray}
          open={props.open}
          handleClose={props.handleClose}
          getID={props.getID}
          getClickedDate={props.getClickedDate}
          handleClickOpen={props.handleClickOpen}
        />
      </CalendarGridStyle>
    </BorderStyle>
  );
};

const BorderStyle = styled.div`
  background-color: rgb(218, 220, 224);
  width: 100%;
  height: 100%;
  margin: 8px;
`;

const CalendarGridStyle = styled.ul`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: ${({ theme }) => theme.rows};
  grid-gap: 1px;
`;

export const Schedules = (props: Props4Schedule) => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      dayStyle: {
        backgroundColor: "rgb(255, 255, 255)",
        padding: "5px",
        display: "flex",
        justifyContent: "center",
        fontSize: "1rem",
        fontFamily: "Roboto Helvetica Arial sans-serif",
        fontWeight: 400,
        lineHeight: 1.5,
        letterSpacing: "0.00938em",
      },
      scheduleTitleStyle: {
        backgroundColor: "rgb(33, 151, 156)",
        color: "rgb(255, 255, 255)",
        borderRadius: "5px",
        margin: "1px",
      },
    })
  );
  const classes = useStyles();

  const today: Date = new Date();
  const firstDayOfWeeksArray = add(today, { years: -4 });
  for (let i = 0; i < 2920; i++) {
    const aDay: ScheduleModel = {
      date: add(firstDayOfWeeksArray, { days: i }),
      schedules: [],
    };
    props.weeksArray.push(aDay);
    props.setWeeksArray(props.weeksArray);
  }

  const dateOfTargetFirstDayOfTheMonth = getDay(props.targetFirstDayOfTheMonth);
  // カレンダー上でレンダーし始めるべきweeksArrayのIndex番号
  const renderStartIndex: number =
    differenceInCalendarDays(
      props.targetFirstDayOfTheMonth,
      firstDayOfWeeksArray
    ) - dateOfTargetFirstDayOfTheMonth;
  // ここから該当月分レンダーしていったら、ピッタリの数になる
  const renderWeeksArray = props.weeksArray.slice(
    renderStartIndex,
    renderStartIndex + 7 * props.weeksInMonth
  );
  return (
    <>
      {renderWeeksArray.map((day, i) =>
        // <ScheduleStyle>{getDate(day.date)}</ScheduleStyle>
        {
          if (day.schedules.length >= 1) {
            return (
              // day.schedules.map((schedule: ScheduleMetadata) => (
              <ScheduleExistBoxStyle
                id={`${day.date}`}
                key={`${day.date}`}
                data-clickeddate={() => {
                  if (getMonth(day.date) + 1 >= 10 && getDay(day.date) >= 10) {
                    return `${getYear(day.date)}-${
                      getMonth(day.date) + 1
                    }-${getDay(day.date)}T11:11:11`;
                  } else if (
                    getMonth(day.date) + 1 < 10 &&
                    getDay(day.date) >= 10
                  ) {
                    return `${getYear(day.date)}-0${
                      getMonth(day.date) + 1
                    }-${getDay(day.date)}T11:11:11`;
                  } else if (
                    getMonth(day.date) + 1 >= 10 &&
                    getDay(day.date) < 10
                  ) {
                    return `${getYear(day.date)}-${
                      getMonth(day.date) + 1
                    }-0${getDay(day.date)}T11:11:11`;
                  } else {
                    return `${getYear(day.date)}-0${
                      getMonth(day.date) + 1
                    }-0${getDay(day.date)}T11:11:11`;
                  }
                }}
                onClick={(e: any) => {
                  props.getClickedDate(e);
                  props.handleClickOpen();
                }}
              >
                {getDate(day.date)}
                {day.schedules.map((schedule: ScheduleMetadata) => (
                  <Typography className={classes.scheduleTitleStyle}>
                    {schedule.title}
                  </Typography>
                ))}
              </ScheduleExistBoxStyle>
            );
          } else {
            return (
              <li
                id={`${day.date}`}
                key={`${day.date}`}
                data-clickeddate={() => {
                  console.log("data-clickedDate動いている");
                  if (getMonth(day.date) + 1 >= 10 && getDay(day.date) >= 10) {
                    return `${getYear(day.date)}-${
                      getMonth(day.date) + 1
                    }-${getDay(day.date)}T11:11:11`;
                  } else if (
                    getMonth(day.date) + 1 < 10 &&
                    getDay(day.date) >= 10
                  ) {
                    return `${getYear(day.date)}-0${
                      getMonth(day.date) + 1
                    }-${getDay(day.date)}T11:11:11`;
                  } else if (
                    getMonth(day.date) + 1 >= 10 &&
                    getDay(day.date) < 10
                  ) {
                    return `${getYear(day.date)}-${
                      getMonth(day.date) + 1
                    }-0${getDay(day.date)}T11:11:11`;
                  } else {
                    return `${getYear(day.date)}-0${
                      getMonth(day.date) + 1
                    }-0${getDay(day.date)}T11:11:11`;
                  }
                }}
                onClick={(e: any) => {
                  props.getClickedDate(e);
                  props.handleClickOpen();
                }}
              >
                {getDate(day.date)}
              </li>
            );
          }
        }
      )}
    </>
  );
};
const ScheduleExistBoxStyle = styled.li`
  background-color: rgb(255, 255, 255);
  width: 100%;
  height: 100%;
`;

const CalendarAppStyle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: rgb(255, 255, 255);
`;

// スタイルだけ使いまわせそうだから、最後に見た目を整えるときに使う
// const Day2ButtonStyle = styled.div`
//   background-color: rgb(255, 255, 255);
//   padding: 5px;
//   display: flex;
//   justify-content: center;
//   font-size: 1rem;
//   font-weight: 400;
//   line-height: 1.5;
//   letter-spacing: 0.00938em;
//   border-color: rgb(255, 255, 255);
// `;

export const CalendarApp = () => {
  const today = new Date();
  const [targetYear, setTargetYear] = useState(getYear(today));
  const [targetMonth, setTargetMonth] = useState(getMonth(today) + 1);
  const [weeksArray, setWeeksArray] = useState<WeeksArrayModel>([]);
  const [open, setOpen] = useState(false);
  const [targetDate, setTargetDate] = useState(today);
  const [titleForm, setTitleForm] = useState("");
  const [placeForm, setPlaceForm] = useState("");
  const [descriptionForm, setDescriptionForm] = useState("");
  const titleHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleForm(e.target.value);
  };

  const placeHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlaceForm(e.target.value);
  };

  const descriptionHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescriptionForm(e.target.value);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const getClickedDate = (e: any) => {
    const stringDate: string = getID(e);

    const stringDateYear = stringDate.match(/(?<=^.{11}).{4}/);
    const year = () => {
      if (stringDateYear === null) {
        return 0;
      } else {
        return parseInt(stringDateYear[0]);
      }
    };
    const stringDateMonth = stringDate.match(/(?<=^.{4}).{3}/);
    const month = () => {
      if (stringDateMonth === null) {
        return 0;
      } else if (stringDateMonth[0] === "Jan") {
        return 1;
      } else if (stringDateMonth[0] === "Feb") {
        return 2;
      } else if (stringDateMonth[0] === "Mar") {
        return 3;
      } else if (stringDateMonth[0] === "Apr") {
        return 4;
      } else if (stringDateMonth[0] === "May") {
        return 5;
      } else if (stringDateMonth[0] === "Jun") {
        return 6;
      } else if (stringDateMonth[0] === "Jul") {
        return 7;
      } else if (stringDateMonth[0] === "Aug") {
        return 8;
      } else if (stringDateMonth[0] === "Sep") {
        return 9;
      } else if (stringDateMonth[0] === "Oct") {
        return 10;
      } else if (stringDateMonth[0] === "Nov") {
        return 11;
      } else {
        return 12;
      }
    };

    const stringDateDay = stringDate.match(/(?<=^.{8}).{2}/);
    const day = () => {
      if (stringDateDay === null) {
        return 0;
      } else {
        return parseInt(stringDateDay[0]);
      }
    };
    const Num2Date = new Date(year(), month() - 1, day());
    setTargetDate(Num2Date);
  };
  const firstDayOfWeeksArray = add(today, { years: -4 });

  const handleClose = () => {
    setOpen(false);
  };
  const pushableForms: ScheduleMetadata = {
    title: titleForm,
    place: placeForm,
    description: descriptionForm,
  };

  const indexCalc = differenceInCalendarDays(targetDate, firstDayOfWeeksArray);
  console.log(indexCalc);
  const handleSave = () => {
    weeksArray[indexCalc].schedules.push(pushableForms);
    setWeeksArray(weeksArray);
  };

  const getID = (e: any): string => {
    const id = e.currentTarget.id;
    return id;
  };

  const clearFormState = () => {
    setTitleForm("");
    setPlaceForm("");
    setDescriptionForm("");
  };

  return (
    <CalendarAppStyle>
      <Navigation
        targetYear={targetYear}
        targetMonth={targetMonth}
        setTargetYear={setTargetYear}
        setTargetMonth={setTargetMonth}
      />
      <CalendarBoard
        targetYear={targetYear}
        targetMonth={targetMonth}
        weeksArray={weeksArray}
        setWeeksArray={setWeeksArray}
        open={open}
        handleClose={handleClose}
        getID={getID}
        getClickedDate={getClickedDate}
        handleClickOpen={handleClickOpen}
      />
      <AddScheduleDialog
        open={open}
        handleClose={handleClose}
        targetDate={targetDate}
        firstDayOfWeeksArray={firstDayOfWeeksArray}
        titleForm={titleForm}
        placeForm={placeForm}
        descriptionForm={descriptionForm}
        handleSave={handleSave}
        titleHandleChange={titleHandleChange}
        placeHandleChange={placeHandleChange}
        descriptionHandleChange={descriptionHandleChange}
        clearFormState={clearFormState}
      />
    </CalendarAppStyle>
  );
};
