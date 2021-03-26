import React, {useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Media from "components/Media/Media.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import profile4 from "assets/img/faces/card-profile4-square.jpg";
import profile1 from "assets/img/faces/card-profile1-square.jpg";

import {Link} from "react-router-dom";

import sectionCommentsStyle from "assets/jss/material-kit-pro-react/views/blogPostSections/sectionCommentsStyle.js";
import {createComment, getCommentsData, deleteComment,updateComment,getUserProfileImage} from "../../../util/ApiUtils";

const useStyles = makeStyles(sectionCommentsStyle);

export default function SectionComments(props) {



  React.useEffect(() => {
    getCommentsData(props.param).then(response=>{
      setAllComments(response.content);
    });
    getUserProfileImage(-1).then(response=>{
      setCurrentUserProfileImage(response.imageUrl);
    });
  },[]);

  const [currentUserProfileImage,setCurrentUserProfileImage] = React.useState("");
  const [allComments,setAllComments] = React.useState({});
  const classes = useStyles();
  const [isEmptyCommentText,setIsEmptyCommentText] = React.useState(true);
  const [commentData,setCommentData] = React.useState("");
  const [editing,setEditingComment] = React.useState(-1);
  const [editingValue,setEditingValue] = React.useState("");

  const onCommentTextChangeHandler = event => {
    setCommentData(event.target.value);
    if(commentData.length<5){
      setIsEmptyCommentText(true);
    }else setIsEmptyCommentText(false);
  }

  console.log(currentUserProfileImage);

  return (
    <div className={classes.section} >
      <GridContainer justify="center" style={{marginTop:"0px", marginBottom:"0px"}}>
        <GridItem xs={12} sm={10} md={8} >
          <div>
            {
              allComments.length>0?allComments.map((c,i)=>{
                return(
                  editing==c.id?
                  <Media
                  avatar={c.creatorImageUrl?c.creatorImageUrl:profile1}
                  title={
                    <span>
            {c.creatorUsername} <small> {c.creationDate}</small>
          </span>
                  }
                  body={
                    <CustomInput
                      id="nice"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value:editingValue,
                        placeholder:"Write a comment!",
                        onChange: (e)=>{setEditingValue(e.target.value)},
                        multiline: true,
                      }}
                    />
                  }
                  footer={
                    <Button color="primary" onClick={()=>{
                      const commentRequest = {
                        text:editingValue
                      }
                      updateComment(c.id,commentRequest).then(()=>getCommentsData(props.param).then((response)=>{setAllComments(response.content)}).then(()=>{setEditingComment(-1)}));
                    }} round className={classes.footerButtons}>
                      Edit comment
                    </Button>
                  }
                />
                  :<Media key={c.id}
                  
                  avatar={c.creatorImageUrl?c.creatorImageUrl:profile4}
                  title={
                    <span>
            <Link to={`/profile/${c.creatorId}`}>{c.creatorUsername}</Link> <small> {c.creationDate.substr(0,10)}</small>
          </span>
                  }
                  body={
                    <p className={classes.color555}>
                      {c.text}
                    </p>
                  }
                  footer={
                    c.createdByCurrentUser?
                    <div>
                      <Button onClick={()=>{deleteComment(c.id).then(()=>getCommentsData(props.param).then((response)=>{setAllComments(response.content);}))}} color="danger" simple round style={{marginRight: "px"}}>Delete</Button>
                      <Button onClick={()=>{setEditingComment(c.id);setEditingValue(c.text)}} color="primary" simple round  style={{marginRight: "100px"}}>Edit</Button>
                    </div>:null
                  }
              />)
          }):null
            }
          </div>
          <h3 className={classes.title} style={{marginTop: "0px"}} >Post your comment</h3>
          <Media
            avatar={currentUserProfileImage?currentUserProfileImage:profile4}
            body={
              <CustomInput
                id="nice"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  value:commentData,
                  placeholder:"Write a comment!",
                  onChange: onCommentTextChangeHandler,
                  multiline: true,
                }}
              />
            }
            footer={
              <Button color="primary" onClick={()=>{
                const createCommentRequest = {
                  text:commentData
                }
                createComment(createCommentRequest, props.param).then(()=>{
                  getCommentsData(props.param).then(response=>{
                    setAllComments(response.content);
                    setCommentData("");
                    setIsEmptyCommentText(true);
                  })
                })}} disabled = {isEmptyCommentText} round className={classes.footerButtons}>
                Post comment
              </Button>
            }
          />
        </GridItem>
      </GridContainer>
    </div>
  );
}
