import React from "react";
import styled from "styled-components";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import RoomIcon from "@material-ui/icons/Room";
import NotesIcon from "@material-ui/icons/Notes";
import getYear from "date-fns/getYear";
import getMonth from "date-fns/getMonth";

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

export const CurrentScheduleDialog = () => {
  return (
    <Outline>
      <MainBoard />
    </Outline>
  );
};

const Outline = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(128, 128, 128, 0.5);
  padding: 0;
`;

// この中に部品を並べていく。最終的にレンダーするのはこのコンポーネント
const MainBoard = () => {
  return (
    <MainBoardStyle>
      <TopSection />
      <MiddleSection />
      <BottomSection />
    </MainBoardStyle>
  );
};
const MainBoardStyle = styled.div`
  width: min(75%, 450px);
  height: 25%;
  border-radius: 7px;
  background-color: rgb(255, 255, 255);
`;

const TopSection = () => {
  return (
    <TopSectionStyle>
      <DeleteOutlined style={{ margin: "5px", fontSize: "30px" }} />
      <HighlightOffIcon
        style={{ margin: "5px", fontSize: "30px" }}
        type="button"
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

// 色の四角、タイトル、日付を入れる
const MiddleSection = () => {
  return (
    <ShowSectionStyle>
      <ColorBox></ColorBox>
      <TitleAndScheduleBoxStyle>
        <TitleAndScheduleBox />
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

const TitleAndScheduleBox = () => {
  return (
    <TitleAndScheduleBoxStyle>
      <ShowTitle />
      <ShowDate />
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

const ShowTitle = () => {
  // {testADay.schedules[0].title}を表示したい
  return <ShowTitleStyle>{testADay.schedules[0].title}</ShowTitleStyle>;
};
const ShowTitleStyle = styled.div`
  height: 40%;
  display: flex;
  align-items: center;
  font-size: 26px;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
`;
const ShowDate = () => {
  return (
    <ShowDateStyle>
      {getYear(testADay.date)}年{getMonth(testADay.date) + 1}月
    </ShowDateStyle>
  );
};
const ShowDateStyle = styled.div`
  height: 40%;
  display: flex;
  align-items: center;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
`;

const BottomSection = () => {
  return (
    <BottomSectionStyle>
      <ShowPlace />
      <ShowDescription />
    </BottomSectionStyle>
  );
};
const BottomSectionStyle = styled.div`
  height: 40%;
  width: 100%;
`;
const ShowPlace = () => {
  return (
    <ShowPlaceAndDescriptionStyle>
      <LeftSideIconsOutlineStyle>
        <IconsStyle>
          <RoomIcon />
        </IconsStyle>
      </LeftSideIconsOutlineStyle>
      <ShowPlaceText />
    </ShowPlaceAndDescriptionStyle>
  );
};
const ShowPlaceAndDescriptionStyle = styled.div`
  height: 50%;
  display: flex;
  align-items: center;
`;

const ShowPlaceText = () => {
  return (
    <PlaceTextAndDescriptionTextStyle>
      {testADay.schedules[0].place}
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

const ShowDescription = () => {
  return (
    <ShowPlaceAndDescriptionStyle>
      <LeftSideIconsOutlineStyle>
        <IconsStyle>
          <NotesIcon />
        </IconsStyle>
      </LeftSideIconsOutlineStyle>
      <ShowDescriptionText />
    </ShowPlaceAndDescriptionStyle>
  );
};

const ShowDescriptionText = () => {
  return (
    <PlaceTextAndDescriptionTextStyle>
      {testADay.schedules[0].description}
    </PlaceTextAndDescriptionTextStyle>
  );
};
