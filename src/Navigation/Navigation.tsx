import MenuIcon from "@material-ui/icons/Menu";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";

export interface Props4Navigation {
  targetYear: number;
  targetMonth: number;
  setTargetYear: React.Dispatch<React.SetStateAction<number>>;
  setTargetMonth: React.Dispatch<React.SetStateAction<number>>;
}

export const Navigation = (props: Props4Navigation) => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        flexGrow: 1,
        backgroundColor: "rgb(255,255,255)",
        height: 64,
      },
      bar: {
        backgroundColor: "rgb(17, 30, 51)", // Kleinの濃いネイビー
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      title: {
        flexGrow: 0.1,
      },
    })
  );
  const classes = useStyles();
  const putMonthBack = () => {
    if (props.targetMonth === 1) {
      props.setTargetMonth(12);
      props.setTargetYear(props.targetYear - 1);
    } else {
      props.setTargetMonth(props.targetMonth - 1);
    }
  };

  const putMonthForward = () => {
    if (props.targetMonth === 12) {
      props.setTargetMonth(1);
      props.setTargetYear(props.targetYear + 1);
    } else {
      props.setTargetMonth(props.targetMonth + 1);
    }
  };

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar className={classes.bar}>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          aria-controls="simple-menu"
          aria-haspopup="true"
        >
          <MenuIcon />
        </IconButton>
        <CalendarTodayIcon />
        <Typography variant="h6" className={classes.title}>
          カレンダー
        </Typography>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          aria-controls="simple-menu"
          aria-haspopup="true"
        >
          <ArrowBackIosIcon onClick={() => putMonthBack()} />
        </IconButton>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          aria-controls="simple-menu"
          aria-haspopup="true"
        >
          <ArrowForwardIosIcon onClick={() => putMonthForward()} />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          {props.targetYear}年{props.targetMonth}月
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
