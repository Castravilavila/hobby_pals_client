import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Button from "components/CustomButtons/Button.js";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import teamStyle from "assets/jss/material-kit-pro-react/views/aboutUsSections/teamStyle.js";

import FaceLiviu from "assets/img/faces/Liviu3.jpg";
import FaceSandu from "assets/img/faces/TrueSandu.png";
import FaceMihai from "assets/img/faces/Mihai3Copy.jpg";
import FaceVlad from "assets/img/faces/TrueVlad.jpg";
import FaceTriss from "assets/img/faces/TrueTriss.jpg";

const useStyles = makeStyles(teamStyle);

export default function SectionTeam() {
  const classes = useStyles();
  return (
    <div className={classes.team}>
      <GridContainer>
        <GridItem
          md={8}
          sm={8}
          className={classNames(
            classes.mrAuto,
            classes.mlAuto,
            classes.textCenter
          )}
        >
          <h2 className={classes.title}>We are here for YOU</h2>
          <h5 className={classes.description}>
            Our small amazing team, created and build this platform
            with love and passion.
          </h5>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem md={3} sm={2}>
          <Card profile plain>
            <CardAvatar profile plain>
              <a href="#pablo">
                <img src={FaceLiviu} alt="profile-pic" className={classes.img} />
              </a>
            </CardAvatar>
            <CardBody plain>
              <h4 className={classes.cardTitle}>Liviu</h4>
              <h6 className={classes.textMuted}>Developer</h6>
              <p className={classes.cardDescription}>
                {/*Passionate student, which loves to learn.*/}
              </p>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem md={2} sm={2}>
          <Card profile plain>
            <CardAvatar profile plain>
              <a href="#pablo">
                <img
                  src={FaceVlad}
                  alt="profile-pic"
                  className={classes.img}
                />
              </a>
            </CardAvatar>
            <CardBody plain>
              <h4 className={classes.cardTitle}>Vlad</h4>
              <h6 className={classes.textMuted}>Developer</h6>
              <p className={classes.cardDescription}>
                {/*Loves to create and do useful things.*/}
              </p>
            </CardBody>

          </Card>
        </GridItem>
        <GridItem md={2} sm={2}>
          <Card profile plain>
            <CardAvatar profile plain>
              <a href="#pablo">
                <img
                  src={FaceSandu}
                  alt="profile-pic"
                  className={classes.img}
                />
              </a>
            </CardAvatar>
            <CardBody plain>
              <h4 className={classes.cardTitle}>Alexandru</h4>
              <h6 className={classes.textMuted}>Developer</h6>
              <p className={classes.cardDescription}>
                {/*Passion for programming and helping people.*/}
              </p>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem md={2} sm={2}>
          <Card profile plain>
            <CardAvatar profile plain>
              <a href="#pablo">
                <img src={FaceTriss} alt="profile-pic" className={classes.img} />
              </a>
            </CardAvatar>
            <CardBody plain>
              <h4 className={classes.cardTitle}>Beatrice</h4>
              <h6 className={classes.textMuted}>Developer</h6>
              <p className={classes.cardDescription}>
                {/*Banana.*/}
              </p>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem md={3} sm={3}>
          <Card profile plain>
            <CardAvatar profile plain>
              <a href="#pablo">
                <img
                  src={FaceMihai}
                  alt="profile-pic"
                  className={classes.img}
                />
              </a>
            </CardAvatar>
            <CardBody plain>
              <h4 className={classes.cardTitle}>Mihai</h4>
              <h6 className={classes.textMuted}>Developer</h6>
              <p className={classes.cardDescription}>
                {/*Design, code, create, build, push to branch.*/}
              </p>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
