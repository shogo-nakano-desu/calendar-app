import React from "react";
import styled from "styled-components";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import RoomIcon from "@material-ui/icons/Room";
import NotesIcon from "@material-ui/icons/Notes";
import Dialog from "@material-ui/core/Dialog";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import getYear from "date-fns/getYear";
import getMonth from "date-fns/getMonth";
import { ScheduleMetadata } from "./Calendar";
import { getDate } from "date-fns/esm";

//-----------------渡されるテストデータ
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
  schedules: [
    {
      title: "テスト用の予定だよ",
      place: "家",
      description: "映画見てジム",
    },
  ],
};
//-----------------

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

interface Props4CurrentScheduleDialog {
  openSchedule: boolean;
  handleCloseSchedule: () => void;
  targetSchedule: ScheduleMetadata;
  targetDate: Date;
}

// この中に部品を並べていく。最終的にレンダーするのはこのコンポーネント
export const CurrentScheduleDialog = (props: Props4CurrentScheduleDialog) => {
  const classes = useStyles();
  return (
    <Dialog
      fullWidth
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      classes={{
        container: classes.container,
        paperScrollPaper: classes.paperScrollPaper,
      }}
      open={props.openSchedule}
      onClose={props.handleCloseSchedule}
    >
      <MainBoardStyle>
        <TopSection handleCloseSchedule={props.handleCloseSchedule} />
        <MiddleSection
          targetSchedule={props.targetSchedule}
          targetDate={props.targetDate}
        />
        <BottomSection targetSchedule={props.targetSchedule} />
      </MainBoardStyle>
    </Dialog>
  );
};
const MainBoardStyle = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 7px;
  background-color: rgb(255, 255, 255);
`;

interface Props4TopSection {
  handleCloseSchedule: () => void;
}
const TopSection = (props: Props4TopSection) => {
  return (
    <TopSectionStyle>
      <DeleteOutlined style={{ margin: "5px", fontSize: "30px" }} />
      <HighlightOffIcon
        style={{ margin: "5px", fontSize: "30px" }}
        type="button"
        onClick={props.handleCloseSchedule}
      />
    </TopSectionStyle>
  );
};
const TopSectionStyle = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  flex-diretion: row;
  justify-content: flex-end;
  align-items: center;
`;

// CloseAddScheduleDialogはそのままボタンとして使う
interface Props4MiddleSection {
  targetSchedule: ScheduleMetadata;
  targetDate: Date;
}
// 色の四角、タイトル、日付を入れる
const MiddleSection = (props: Props4MiddleSection) => {
  return (
    <ShowSectionStyle>
      <ColorBox></ColorBox>
      <TitleAndScheduleBoxStyle>
        <TitleAndScheduleBox
          targetSchedule={props.targetSchedule}
          targetDate={props.targetDate}
        />
      </TitleAndScheduleBoxStyle>
    </ShowSectionStyle>
  );
};
const ShowSectionStyle = styled.div`
  height: 40%;
  display: flex;
`;

const ColorBox = () => {
  return (
    <LeftSideOutlineStyle>
      <ColorBoxStyle />
    </LeftSideOutlineStyle>
  );
};
const ColorBoxStyle = styled.div`
  background-color: rgb(37, 150, 209);
  width: 30px;
  height: 30px;
  border-radius: 7px;
`;
const LeftSideOutlineStyle = styled.div`
  height: 100%;
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface Props {
  targetSchedule: ScheduleMetadata;
}

interface Props4TitleAndScheduleBox {
  targetSchedule: ScheduleMetadata;
  targetDate: Date;
}
const TitleAndScheduleBox = (props: Props4TitleAndScheduleBox) => {
  return (
    <TitleAndScheduleBoxStyle>
      <ShowTitle targetSchedule={props.targetSchedule} />
      <ShowDate targetDate={props.targetDate} />
    </TitleAndScheduleBoxStyle>
  );
};
const TitleAndScheduleBoxStyle = styled.div`
  display: flex;
  width: 80%;
  height: 100%;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
`;

const ShowTitle = (props: Props) => {
  // {testADay.schedules[0].title}を表示したい
  return <ShowTitleStyle>{props.targetSchedule.title}</ShowTitleStyle>;
};
const ShowTitleStyle = styled.div`
  height: 40%;
  display: flex;
  align-items: center;
  font-size: 26px;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
`;

interface Props4ShowDate {
  targetDate: Date;
}
const ShowDate = (props: Props4ShowDate) => {
  return (
    <ShowDateStyle>
      {getYear(props.targetDate)}年{getMonth(props.targetDate) + 1}月
      {getDate(props.targetDate)}
    </ShowDateStyle>
  );
};
const ShowDateStyle = styled.div`
  height: 40%;
  display: flex;
  align-items: center;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
`;

const BottomSection = (props: Props) => {
  return (
    <BottomSectionStyle>
      <ShowPlace targetSchedule={props.targetSchedule} />
      <ShowDescription targetSchedule={props.targetSchedule} />
    </BottomSectionStyle>
  );
};
const BottomSectionStyle = styled.div`
  height: 40%;
  width: 100%;
`;
const ShowPlace = (props: Props) => {
  return (
    <ShowPlaceAndDescriptionStyle>
      <LeftSideIconsOutlineStyle>
        <IconsStyle>
          <RoomIcon />
        </IconsStyle>
      </LeftSideIconsOutlineStyle>
      <ShowPlaceText targetSchedule={props.targetSchedule} />
    </ShowPlaceAndDescriptionStyle>
  );
};
const ShowPlaceAndDescriptionStyle = styled.div`
  height: 50%;
  display: flex;
  align-items: center;
`;

const ShowPlaceText = (props: Props) => {
  return (
    <PlaceTextAndDescriptionTextStyle>
      {props.targetSchedule.place}
    </PlaceTextAndDescriptionTextStyle>
  );
};

const LeftSideIconsOutlineStyle = styled.div`
  height: 50%;
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IconsStyle = styled.div`
  width: 0px;
  height: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PlaceTextAndDescriptionTextStyle = styled.div`
  display: flex;
  width: 80%;
  height: 50%;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
`;

const ShowDescription = (props: Props) => {
  return (
    <ShowPlaceAndDescriptionStyle>
      <LeftSideIconsOutlineStyle>
        <IconsStyle>
          <NotesIcon />
        </IconsStyle>
      </LeftSideIconsOutlineStyle>
      <ShowDescriptionText targetSchedule={props.targetSchedule} />
    </ShowPlaceAndDescriptionStyle>
  );
};

const ShowDescriptionText = (props: Props) => {
  return (
    <PlaceTextAndDescriptionTextStyle>
      {props.targetSchedule.description}
    </PlaceTextAndDescriptionTextStyle>
  );
};
