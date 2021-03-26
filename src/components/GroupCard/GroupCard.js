import React from 'react';

import sectionInterestedStyle from "assets/jss/material-kit-pro-react/views/blogPostsSections/sectionInterestedStyle.js";
import { makeStyles } from "@material-ui/core/styles";

import CardHeader from "components/Card/CardHeader.js";
import Info from "components/Typography/Info.js";
import CardBody from "components/Card/CardBody.js";
import Card from "components/Card/Card.js";
import GridItem from "components/Grid/GridItem.js";
import Badge from "components/Badge/Badge.js";
import bg5 from "assets/img/bg5.jpg";
import placeholder from "assets/img/placeholder.jpg";

import {Link} from 'react-router-dom';
import {getPostData} from "../../util/ApiUtils";

const useStyles = makeStyles(sectionInterestedStyle);

export function GroupCard(props){

    const [groupAccessType, setGroupAccessType ] = React.useState("");

    const sectionClasses = useStyles();

    React.useEffect(() => {
            setGroupAccessType(props.group.accessType);
    },[]);

    return(
        <GridItem id={props.group.id} xs={12} sm={3} md={3} lg={4} xl={2}>
        <Card plain blog>
            <CardHeader image plain>
                <a href={`/groupPage/${props.group.id}`}>
                    <img src={props.group.imageUrl?props.group.imageUrl:placeholder} alt="..." width={"150px"} height={"250px"}/>
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
               <Link to={`/categoryPage/${props.group.categoryId}`}>
               <Info>
                   <Badge color={groupAccessType==="public"?"success":"rose"}>{groupAccessType}</Badge>
               </Info>
               </Link>
                <h4 className={sectionClasses.cardTitle}>
                    <a href={`/groupPage/${props.group.id}`}>
                        {props.group.name}
                    </a>
                </h4>
                <p className={sectionClasses.description}>
                    {props.group.description.length>50?props.group.description.substr(0,50):props.group.description}
                    {props.group.description.length>50?<a href={`/groupPage/${props.group.id}`}> Read More </a>:null}
                </p>
            </CardBody>
        </Card>
    </GridItem>
    )
}