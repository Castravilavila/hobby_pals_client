/*eslint-disable*/
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import presentationStyle from "assets/jss/material-kit-pro-react/views/presentationStyle.js";

import {useHistory,Link} from "react-router-dom";
import MainPage from "../MainPage/MainPage";
import Favorite from "@material-ui/icons/Favorite";

const useStyles = makeStyles(presentationStyle);

export default function PresentationPage() {
  const history = useHistory();
  if(!localStorage.getItem("accessToken")){
    history.push("/login");
  }
  const classes = useStyles();
  return (
    <div>
      <Header
          brand="Hobby Pals"
          links={<HeaderLinks dropdownHoverColor="info"/>}
          fixed
          color="#1781cb"
          changeColorOnScroll={{
            height: 400,
            color: "info"
          }}
      />
      <Parallax
        image={require("assets/img/back.jpg")}
        className={classes.parallax}
      >
        <div className={classes.container}>
          <GridContainer style={{justifyContent:"center"}}>
              <GridItem>
              <div className={classes.brand} >
                <h1>MEET CREATE SHARE</h1>
                <h3 className={classes.title}>
                  Browse through all the posts and find people with same interests as you!
                </h3>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        < MainPage/>
      </div>
      <Footer
          content={
            <div>
              <div className={classes.left}>
                <List className={classes.list}>
                  <ListItem className={classes.inlineBlock}>
                    <a
                        href="/about"
                        target="_blank"
                        className={classes.block}
                    >
                      Speed Team
                    </a>
                  </ListItem>
                  <ListItem className={classes.inlineBlock}>
                    <a
                        href="https://hobby-pals2front.herokuapp.com/about"
                        target="_blank"
                        className={classes.block}
                    >
                      About us
                    </a>
                  </ListItem>
                </List>
              </div>
              <div className={classes.right}>
                &copy; {1900 + new Date().getYear()} , made with{" "}
                <Favorite className={classes.icon}/> by{" "}
                <a
                    href="/about"
                    target="_blank"
                >
                  Speed Team
                </a>
              </div>
            </div>
          }
      />
    </div>
  );
}
