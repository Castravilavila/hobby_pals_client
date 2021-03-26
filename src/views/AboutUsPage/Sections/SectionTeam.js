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

import FaceLiviu from "assets/img/faces/liviu.jpg";
import FaceSandu from "assets/img/faces/sandu.png";
import FaceMihai from "assets/img/faces/mihai.jpg";
import FaceVlad from "assets/img/faces/vlad.jpg";
import FaceTriss from "assets/img/faces/triss.jpg";

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
                Passionate student, which loves to learn.
              </p>
            </CardBody>
            <CardFooter className={classes.justifyContent}>
              <Button href="#pablo" justIcon simple color="twitter">
                <i className="fab fa-twitter" />
              </Button>
              <Button href="#pablo" justIcon simple color="facebook">
                <i className="fab fa-facebook" />
              </Button>
              <Button href="#pablo" justIcon simple color="google">
                <i className="fab fa-google" />
              </Button>
            </CardFooter>
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
                Loves to create and do useful things.
              </p>
            </CardBody>
            <CardFooter className={classes.justifyContent}>
              <Button href="#pablo" justIcon simple color="twitter">
                <i className="fab fa-twitter" />
              </Button>
              <Button href="#pablo" justIcon simple color="google">
                <i className="fab fa-google" />
              </Button>
              <Button href="#pablo" justIcon simple color="linkedin">
                <i className="fab fa-linkedin-in" />
              </Button>
            </CardFooter>
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
                Passion for programming and helping people.
              </p>
            </CardBody>
            <CardFooter className={classes.justifyContent}>
              <Button href="#pablo" justIcon simple color="facebook">
                <i className="fab fa-facebook" />
              </Button>
              <Button href="#pablo" justIcon simple color="google">
                <i className="fab fa-google" />
              </Button>
            </CardFooter>
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
                Banana.
              </p>
            </CardBody>
            <CardFooter className={classes.justifyContent}>
              <Button href="#pablo" justIcon simple color="twitter">
                <i className="fab fa-twitter" />
              </Button>
              <Button href="#pablo" justIcon simple color="facebook">
                <i className="fab fa-facebook" />
              </Button>
              <Button href="#pablo" justIcon simple color="google">
                <i className="fab fa-google" />
              </Button>
            </CardFooter>
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
                Design, code, create, build, push to branch.
              </p>
            </CardBody>
            <CardFooter className={classes.justifyContent}>
              <Button href="#pablo" justIcon simple color="google">
                <i className="fab fa-google" />
              </Button>
              <Button href="#pablo" justIcon simple color="twitter">
                <i className="fab fa-twitter" />
              </Button>
              <Button href="#pablo" justIcon simple color="facebook">
                <i className="fab fa-facebook" />
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
