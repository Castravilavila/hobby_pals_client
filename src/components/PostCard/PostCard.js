import sectionInterestedStyle from "assets/jss/material-kit-pro-react/views/blogPostsSections/sectionInterestedStyle.js";
import { makeStyles } from "@material-ui/core/styles";

import React from 'react';
import CardHeader from "components/Card/CardHeader.js";
import Info from "components/Typography/Info.js";
import CardBody from "components/Card/CardBody.js";
import Card from "components/Card/Card.js";
import GridItem from "components/Grid/GridItem.js";

import bg5 from "assets/img/bg5.jpg";
import placeholder from "assets/img/placeholder.jpg";

import {Link} from 'react-router-dom';

const useStyles = makeStyles(sectionInterestedStyle);

export function PostCard(props){

    const sectionClasses = useStyles();

    return(
        <GridItem key={props.post.id}
                  xs={props.nr===1?12: props.nr===3?4 : props.nr===2?6 : props.nr===4?3 : props.nr===6?2:12}
                  sm={props.nr===1?12:props.nr===3?4 : props.nr===2?6 : props.nr===4?3 : props.nr===6?2:4}
                  md={props.nr===1?12:props.nr===3?4 : props.nr===2?6 : props.nr===4?3 : props.nr===6?2:4}
                  lg={props.nr===1?12:props.nr===3?4 :props.nr===2?6 : props.nr===4?3 : props.nr===6?2:4}
                  xl={props.nr===1?12:props.nr===3?4 :props.nr===2?6 : props.nr===4?3 : props.nr===6?2:4} style={{marginTop: "0px", marginBottom: "0px"}}>
                                        <Card plain blog>
                                            <CardHeader image plain>
                                                <a href={`/blogPost/${props.post.id}`} >
                                                    <img src={props.post.imageUrl.length>1?props.post.imageUrl:placeholder} alt="..." width={"150px"} height={"330px"}/>
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
                                            <Link to={`/categoryPage/${props.post.categoryId}`}>
                                                <Info>
                                                <h6>{props.post.categoryName}</h6>
                                                </Info>
                                            </Link> {" "}
                                            <Link to={`/groupPage/${props.post.groupId}`}>
                                                <Info>
                                                <h6>{props.post.groupName}</h6>
                                                </Info>
                                            </Link>
                                                <h4 className={sectionClasses.cardTitle}>
                                                    <a href={`/blogPost/${props.post.id}`}>
                                                        {props.post.title}
                                                    </a>
                                                </h4>
                                                <p className={sectionClasses.description}>
                                                    {props.post.text.length>50?props.post.text.substr(0,50):props.post.text}
                                                    {props.post.text.length>50?<a href={`/blogPost/${props.post.id}`}> Read More </a>:null}
                                                </p>
                                            </CardBody>
                                        </Card>
                                    </GridItem>
    )
}