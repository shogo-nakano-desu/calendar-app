import React, { useState } from "react";
import add from "date-fns/add";
import getYear from "date-fns/getYear";
import getMonth from "date-fns/getMonth";
import getDaysInMonth from "date-fns/getDaysInMonth";
import getWeeksInMonth from "date-fns/getWeeksInMonth";
import differenceInCalendarDays from "date-fns/differenceInCalendarDays";
import getDate from "date-fns/getDate";
import getDay from "date-fns/getDay";
import styled from "styled-components";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import { Navigation } from "./Navigation";
import { AddScheduleDialog } from "./AddScheduleDialog";
import "./Calendar.css";

// 予定の持たせ方の型定義
interface ScheduleMetadata {
  title: string;
  place: string;
  description: string;
}
interface ScheduleModel<T = ScheduleMetadata> {
  date: Date;
  schedules: Array<T>;
}

type WeeksArrayModel = ScheduleModel[];
// まずは巨大な配列を作る処理
// weeksArrayに４年前から４年後までの巨大な配列ができている

// ユーザー操作実装後は不要になるコードーーーーーーーーーーーーーーーーーーーーーーーーーーー

// targetYear / targetMonthはtodayだけでなく、以下の動作によってstateが変わりうる
// そのためコードも変える必要あり
// ・カレンダーのページをめくる

// 以下のコードは予定を追加するコードなので、以下の動作と置き換える
// ・AddScheduleDialogを開いてそこで保存をクリックしたら保存されるようにする
// weeksArray[1460].schedules.push({
//   title: "サッカー",
//   place: "高校",
//   description: "高校の友達と集まる",
// });

// weeksArray[1470].schedules.push({
//   title: "映画",
//   place: "TOHOシネマズ",
//   description: "キャラクターか何かを見る。決まってない",
// });

// weeksArray[1480].schedules.push({
//   title: "髪を切る",
//   place: "neu",
//   description: "流石にそろそろ切らないとまずい",
// });

// weeksArray[1470].schedules.push({
//   title: "ジム",
//   place: "エニタイム",
//   description: "トレーニングと同時に、解約の手続きもする必要あり",
// });
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
  handleClickOpen: () => void;
  open: boolean;
  handleClose: () => void;
}

interface Props4Schedule {
  targetFirstDayOfTheMonth: Date;
  weeksInMonth: number;
  weeksArray: WeeksArrayModel;
  setWeeksArray: React.Dispatch<React.SetStateAction<WeeksArrayModel>>;
  handleClickOpen: () => void;
  open: boolean;
  handleClose: () => void;
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
          handleClickOpen={props.handleClickOpen}
          open={props.open}
          handleClose={props.handleClose}
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

const CalendarGridStyle = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: ${({ theme }) => theme.rows};
  grid-gap: 1px;
`;

const Schedules = (props: Props4Schedule) => {
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
      {renderWeeksArray.map((day) =>
        // <ScheduleStyle>{getDate(day.date)}</ScheduleStyle>
        {
          if (day.schedules.length >= 1) {
            return (
              // day.schedules.map((schedule: ScheduleMetadata) => (
              <ScheduleExistBoxStyle>
                <Day2ButtonStyle onClick={props.handleClickOpen}>
                  {getDate(day.date)}
                </Day2ButtonStyle>

                {day.schedules.map((schedule: ScheduleMetadata) => (
                  <Typography className={classes.scheduleTitleStyle}>
                    {schedule.title}
                  </Typography>
                ))}
              </ScheduleExistBoxStyle>
            );
          } else {
            return (
              <Day2ButtonStyle onClick={props.handleClickOpen}>
                {getDate(day.date)}
              </Day2ButtonStyle>
            );
          }
        }
      )}
    </>
  );
};
const ScheduleExistBoxStyle = styled.div`
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

const Day2ButtonStyle = styled.button`
  background-color: rgb(255, 255, 255);
  padding: 5px;
  display: flex;
  justify-content: center;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 0.00938em;
  border-color: rgb(255, 255, 255);
`;

export const CalendarApp = () => {
  const today = new Date();
  const [targetYear, setTargetYear] = useState(getYear(today));
  const [targetMonth, setTargetMonth] = useState(getMonth(today) + 1);
  const [weeksArray, setWeeksArray] = useState<WeeksArrayModel>([]);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const weeksArray: ScheduleModel[] = [];
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
        handleClickOpen={handleClickOpen}
        open={open}
        handleClose={handleClose}
      />
      <AddScheduleDialog open={open} handleClose={handleClose} />
    </CalendarAppStyle>
  );
};
