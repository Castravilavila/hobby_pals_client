import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import placeholder from "assets/img/placeholder.jpg";

import sectionTextStyle from "assets/jss/material-kit-pro-react/views/blogPostSections/sectionTextStyle.js";

const useStyles = makeStyles(sectionTextStyle);

export default function SectionText(props) {
    const classes = useStyles();
    const imgClasses = classNames(
        classes.imgRaised,
        classes.imgRounded,
        classes.imgFluid
    );
    return (
        <div className={classes.section}>
            <GridContainer justify="center" style={{marginTop: "80px", marginBottom: "0px"}}>
                <GridItem xs={6} sm={6} md={6}>
                    <h3 className={classes.title}>
                        {props.post.title}
                    </h3>
                    <p>
                        {props.post.text}
                    </p>
                </GridItem>
                <GridItem xs={4} sm={4} md={4} style={{marginTop: "0px", marginBottom: "0px"}}>
                    <GridContainer>
                        <GridItem style={{
                            width: "100%",
                            marginLeft: "auto",
                            marginTop: "0px",
                            marginBottom: "0px",
                            textAlign: "center"
                        }}>
                            <img src={props.post.imageUrl?props.post.imageUrl:placeholder} className={imgClasses}/>
                        </GridItem>
                    </GridContainer>
                </GridItem>
            </GridContainer>
        </div>
    );
}
