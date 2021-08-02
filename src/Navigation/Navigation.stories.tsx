import { Story, Meta } from "@storybook/react";
// import { useState } from "react";
// import getYear from "date-fns/getYear";
// import getMonth from "date-fns/getMonth";
// import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
// import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
// import { Navigation, Props4Navigation } from "./Navigation";

// // export default {
// //   title: "Navigation",
// //   component: Navigation,
// //   args: {
// //     targetYear: 2021,
// //     targetMonth: 7,
// //   },
// // } as Meta;

// // export const Template: Story<Props4Navigation> = (args) => (
// //   <Navigation {...args} />
// // );

// export const Tempra = () => {
//   const today = new Date();
//   const [targetYear, setTargetYear] = useState(getYear(today));
//   const [targetMonth, setTargetMonth] = useState(getMonth(today) + 1);
//   const putMonthForward = () => {
//     if (targetMonth === 12) {
//       setTargetMonth(1);
//       setTargetYear(targetYear + 1);
//     } else {
//       setTargetMonth(targetMonth + 1);
//     }
//   };
//   const putMonthBack = () => {
//     if (targetMonth === 1) {
//       setTargetMonth(12);
//       setTargetYear(targetYear - 1);
//     } else {
//       setTargetMonth(targetMonth - 1);
//     }
//   };
//   return (
//     <Navigation targetYear={targetYear} targetMonth={targetMonth}></Navigation>
//   );
// };
