import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Badge from "components/Badge/Badge.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardAvatar from "components/Card/CardAvatar.js";

import profileImage from "assets/img/faces/card-profile1-square.jpg";

import sectionBlogInfoStyle from "assets/jss/material-kit-pro-react/views/blogPostSections/sectionBlogInfoStyle.js";

import {deletePost} from "../../../util/ApiUtils";

import {useHistory} from "react-router-dom";
import profilePageStyle from "assets/jss/material-kit-pro-react/views/profilePageStyle";

const useStyles = makeStyles(sectionBlogInfoStyle);

export default function SectionBlogInfo(props) {

  const history = useHistory();

  const classes = useStyles();
  return (
    <div className={classes.section} >
      <GridContainer justify="center" style={{marginTop:"0px", marginBottom:"0px"}} >
        <GridItem xs={10} sm={10} md={10}>
          <GridContainer style={{marginTop:"0px", marginBottom:"0px"}}>
            <GridItem>
              <div className={classes.blogTags}>
                Tags:
                <Badge color="primary">{props.post&&props.post.categoryName?props.post.categoryName:"No category"}</Badge>
              </div>
            </GridItem>
            <GridItem style={{justifyContent:"center"}}>
            {props.post.accessToEdit?
                <GridItem >
                  <Button style={{marginRight:"30px", marginTop:"5px"}} href={`/editPost/${props.post.groupId}/${props.post.id}`} className={classes.buttons}>
                    Edit Post
                  </Button>
                  <Button style={{marginLeft:"590px"}} onClick={()=>{deletePost(props.post.id).then(()=>{history.push(`/groupPage/${props.post.groupId}`)})}}>
                    Delete Post
                  </Button>
                </GridItem>:null}
            </GridItem>
          </GridContainer>
          <hr />
          <Card plain profile className={classes.card}>
            <GridContainer style={{marginTop:"0px", marginBottom:"0px"}}>
              <GridItem xs={12} sm={2} md={2}>
                <CardAvatar plain profile>
                  <img src={props.post.creatorImageUrl} alt="..." />
                </CardAvatar>
              </GridItem>
              <GridItem xs={12} sm={2} md={2} style={{marginTop:"0px", marginBottom:"0px"}}>
                <h4 className={classes.cardTitle}>Post by:</h4>
                <h4 className={classes.cardTitle}>{props.post.creatorUsername?props.post.creatorUsername:"Couldn't fetch user"}</h4>
              </GridItem>
            </GridContainer>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
