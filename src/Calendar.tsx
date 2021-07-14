import React from "react";
import add from "date-fns/add";
import getYear from "date-fns/getYear";
import getMonth from "date-fns/getMonth";
import getDaysInMonth from "date-fns/getDaysInMonth";
import getWeeksInMonth from "date-fns/getWeeksInMonth";
import differenceInCalendarDays from "date-fns/differenceInCalendarDays";
import getDate from "date-fns/getDate";
import getDay from "date-fns/getDay";
import styled from "styled-components";
import { Navigation } from "./Navigation";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

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

// まずは巨大な配列を作る処理
// weeksArrayに４年前から４年後までの巨大な配列ができている

// ユーザー操作実装後は不要になるコードーーーーーーーーーーーーーーーーーーーーーーーーーーー

// targetYear / targetMonthはtodayだけでなく、以下の動作によってstateが変わりうる
// そのためコードも変える必要あり
// ・カレンダーのページをめくる
export const targetYear = getYear(today);
export const targetMonth = getMonth(today) + 1;
const targetFirstDayOfTheMonth = new Date(targetYear, targetMonth - 1, 1);
const weeksInMonth = getWeeksInMonth(targetFirstDayOfTheMonth);

// 以下のコードは予定を追加するコードなので、以下の動作と置き換える
// ・AddScheduleDialogを開いてそこで保存をクリックしたら保存されるようにする
weeksArray[1460].schedules.push({
  title: "サッカー",
  place: "高校",
  description: "高校の友達と集まる",
});

weeksArray[1470].schedules.push({
  title: "映画",
  place: "TOHOシネマズ",
  description: "キャラクターか何かを見る。決まってない",
});

weeksArray[1480].schedules.push({
  title: "髪を切る",
  place: "neu",
  description: "流石にそろそろ切らないとまずい",
});

weeksArray[1470].schedules.push({
  title: "ジム",
  place: "エニタイム",
  description: "トレーニングと同時に、解約の手続きもする必要あり",
});
// ↑ユーザー操作実装後は不要になるコードーーーーーーーーーーーーーーーーーーーーーーーーーーー
// ↓そのまま残すコード
// - CalendarApp
// | - CalendarAppStyle
//     | - Navigation
//     | - CalendarBoard
//       | - BorderStyle
//       | - CalendarGridStyle
//         | - Schedules

const CalendarBoard = () => {
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
        <Schedules />
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

const Schedules = () => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      dayStyle: {
        backgroundColor: "rgb(255, 255, 255)",
        padding: "5px",
        display: "flex",
        justifyContent: "center",
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
  const weeksArray: ScheduleModel[] = [];
  const today: Date = new Date();
  const firstDayOfWeeksArray = add(today, { years: -4 });
  for (let i = 0; i < 2920; i++) {
    const aDay: ScheduleModel = {
      date: add(firstDayOfWeeksArray, { days: i }),
      schedules: [],
    };
    weeksArray.push(aDay);
  }

  const dateOfTargetFirstDayOfTheMonth = getDay(targetFirstDayOfTheMonth);
  // カレンダー上でレンダーし始めるべきweeksArrayのIndex番号
  const renderStartIndex: number =
    differenceInCalendarDays(targetFirstDayOfTheMonth, firstDayOfWeeksArray) -
    dateOfTargetFirstDayOfTheMonth;
  // ここから該当月分レンダーしていったら、ピッタリの数になる
  const renderWeeksArray = weeksArray.slice(
    renderStartIndex,
    renderStartIndex + 7 * weeksInMonth
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
                <Typography className={classes.dayStyle}>
                  {getDate(day.date)}
                </Typography>
                {day.schedules.map((schedule: ScheduleMetadata) => (
                  <Typography className={classes.scheduleTitleStyle}>
                    {schedule.title}
                  </Typography>
                ))}
              </ScheduleExistBoxStyle>
            );
          } else {
            return (
              <Typography className={classes.dayStyle}>
                {getDate(day.date)}
              </Typography>
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

export const CalendarApp = (
  <CalendarAppStyle>
    <Navigation />
    <CalendarBoard />
  </CalendarAppStyle>
);
