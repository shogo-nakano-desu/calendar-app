import MenuIcon from "@material-ui/icons/Menu";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { targetYear, targetMonth } from "./Calendar";

const kleinColor = "rgb(17, 30, 51)";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundColor: "rgb(255,255,255)",
      height: 64,
    },
    bar: {
      backgroundColor: kleinColor,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 0.1,
    },
  })
);

export const Navigation = () => {
  const classes = useStyles();
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
          <ArrowBackIosIcon />
        </IconButton>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          aria-controls="simple-menu"
          aria-haspopup="true"
        >
          <ArrowForwardIosIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          {targetYear}年{targetMonth}月
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
