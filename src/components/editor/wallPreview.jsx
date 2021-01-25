import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import { Grid } from '@material-ui/core';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function WallPreview(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };


  const handleExpandClick = () => {
    setExpanded(!expanded);
    alert("display pop up here")
  };

  return (
    <Grid container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
    >
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            S
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <Avatar aria-label="recipe" style={{ backgroundColor: props.wallColor}} className={classes.avatar} onClick={props.handleClickOpenClose}>
            <ColorLensIcon color="secondary"/>
          </Avatar>
          </IconButton>
        }
        title={props.displayname}
        subheader={new Date(Date.now()).toLocaleDateString(undefined, options)}
      />
      <CardContent style={{backgroundColor: props.wallColor, height: '50vh' , overflow: "scroll" }}>
          <h3 className="apply-font" >{props.mainHeading}</h3>
          <div className="apply-font" dangerouslySetInnerHTML={{__html: props.editorHtml}}/>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton aria-label="share">
        <QuestionAnswerIcon/>
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
    </Card>

    </Grid>
  );
}
