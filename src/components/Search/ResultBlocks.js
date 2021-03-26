import React, { useState, useEffect } from "react";
import GridItem from "../Grid/GridItem";
import Card from "../Card/Card";
import CardHeader from "../Card/CardHeader";
import bg5 from "../../assets/img/bg5.jpg";
import CardBody from "../Card/CardBody";
import GridContainer from "../Grid/GridContainer";
/*eslint-disable*/

import {makeStyles} from "@material-ui/core/styles";
import sectionInterestedStyle
    from "../../assets/jss/material-kit-pro-react/views/blogPostsSections/sectionInterestedStyle";
const useSectionStyles = makeStyles(sectionInterestedStyle);


require("es6-promise").polyfill();
require("isomorphic-fetch");

function ResultBlocks(props) {
    const sectionClasses = useSectionStyles();


    return (
        <GridContainer>
            {props.groups.content?props.groups.content.map((g,i)=>{
                return(
                    <GridItem id={i} xs={12} sm={3} md={3} lg={3} xl={3}>
                        <Card plain blog>
                            <CardHeader image plain>
                                <a href={`/groupPage/${g.groupId}`}>
                                    <img src={g.imageUrl} alt="..." />
                                </a>
                                <div
                                    className={sectionClasses.coloredShadow}
                                    style={{
                                        backgroundImage: "url(" + bg5 + ")",
                                        opacity: "1"
                                    }}
                                />
                            </CardHeader>
                            <CardBody plain>
                                <h4 className={sectionClasses.cardTitle}>
                                    <a href={`/category`}>
                                        {g.groupTitle}
                                    </a>
                                </h4>
                                <h8 className={sectionClasses.cardTitle}>
                                    <a href={`/category`}>
                                        {g.groupTitle}
                                    </a>
                                </h8>
                                <p className={sectionClasses.cardDescription}>{g.groupDescription}</p>
                            </CardBody>
                        </Card>
                    </GridItem>)
            }):null}
        </GridContainer>
    );
}
export default ResultBlocks