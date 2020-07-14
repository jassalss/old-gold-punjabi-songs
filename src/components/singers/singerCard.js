import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import history from "../../history";
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export default function ImgMediaCard(props) {
  const classes = useStyles();
  let imageName = props.singerName.replace(/\s+/g, "").toLowerCase();
  const handleSingerClicked = () => {
    history.push(`/songsInPlayer/${imageName}/${props.singerName}`);
  };
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={require(`../../assets/${imageName}.jpg`)}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.singerName}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={handleSingerClicked}>
          More Songs
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            handlearnMore(imageName);
          }}
        >
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
const handlearnMore = (singerName) => {
  if (singerName === "parkashkaur") {
    window.open("https://en.wikipedia.org/wiki/Parkash_Kaur", "_blank");
  } else if (singerName === "gurdasmaan") {
    window.open("https://en.wikipedia.org/wiki/Gurdas_Maan", "_blank");
  } else if (singerName === "gurdasmaan") {
    window.open("https://en.wikipedia.org/wiki/Gurdas_Maan", "_blank");
  } else if (singerName === "lalchandyamlajat") {
    window.open("https://en.wikipedia.org/wiki/Lal_Chand_Yamla_Jatt", "_blank");
  } else {
    window.open("https://en.wikipedia.org/wiki/Amar_Singh_Chamkila", "_blank");
  }
};
