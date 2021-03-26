/*eslint-disable*/
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";
import Header from "components/Header/Header.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";
import Footer from "components/Footer/Footer.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import aboutUsStyle from "assets/jss/material-kit-pro-react/views/aboutUsStyle.js";
import CustomInput from "../../components/CustomInput/CustomInput";
import Button from "../../components/CustomButtons/Button";
import Paper from '@material-ui/core/Paper';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

import { green } from '@material-ui/core/colors';
import clsx from 'clsx';

import {notification} from "antd";

import {POST_TEXT_MAX_LENGTH,POST_TEXT_MIN_LENGTH,POST_TITLE_MIN_LENGTH,POST_TITLE_MAX_LENGTH} from "../../constants";
import {createPost,bucketConfig} from "../../util/ApiUtils";

import {useHistory} from "react-router-dom";

import S3FileUpload from "react-s3";
import { CircularProgress } from "@material-ui/core";

import 'antd/es/input/style/index.css';
import 'antd/es/select/style/index.css';
import 'antd/es/cascader/style/index.css';


const useStyles = makeStyles(aboutUsStyle);


const useStyle = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}));

export default function AddPostPage(props) {

  const [title,setTitle] = React.useState("");
  const [faultyTitle,setFaultyTitle] = React.useState(false);
  const [text,setText] = React.useState("");
  const [faultyText,setFaultyText] = React.useState(false);
  const [imagePayload,setImagePayload] = React.useState("");
  const [loading,setLoading] = React.useState(false);
  const [imageChanged,setImageChanged] = React.useState(false);

  const classes = useStyles();
    
 

  const onTitleChangeHandler = event => {
    setTitle(event.target.value);
    if(event.target.value.length>=POST_TITLE_MAX_LENGTH||event.target.value.length<=POST_TITLE_MIN_LENGTH){
      setFaultyTitle(true);
    }else setFaultyTitle(false);
  };

  const onTextChangeHandler = event => {
    setText(event.target.value);
    if(event.target.value.length>=POST_TEXT_MAX_LENGTH||event.target.value.length<=POST_TEXT_MIN_LENGTH){
      setFaultyText(true);
    }else setFaultyText(false);
  };
  const cls = useStyle();

  const history = useHistory();
  return (
      <div>
        <Header
            brand="Hobby Pals"
            links={<HeaderLinks dropdownHoverColor="info" />}
            fixed
            color="#1781cb"
            changeColorOnScroll={{
              height: 300,
              color: "info"
            }}
        />
        <Parallax image={require("assets/img/bg9.jpg")} filter="dark" small>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem
                  md={8}
                  sm={8}
                  className={classNames(
                      classes.mlAuto,
                      classes.mrAuto,
                      classes.textCenter
                  )}
              >
                <h1 className={classes.title}>Create a Post</h1>

              </GridItem>
            </GridContainer>
          </div>
        </Parallax>

        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.contactContent}>
            <div className={classes.container}>
              <h2 className={classes.title}>Send us a message</h2>
              <GridContainer>
                <GridItem md={8} sm={8} style={{margin:"auto"}}>

                  <form>
                    <CustomInput
                        inputProps={
                          {
                            value:title,
                            error:faultyTitle,
                            placeholder:"Post title",
                            helperText: faultyTitle?"Post title should contain between 3 and 20 characters":"",
                            onChange:onTitleChangeHandler
                          }
                        }
                        id="float"
                        formControlProps={{
                          fullWidth: true
                        }}
                    />
                    <CustomInput
                        id="float"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          multiline: true,
                          placeholder:"Post description",
                          value:text,
                          error:faultyText,
                          helperText: (text.length===0 && imagePayload.length<1)? "You need to provide either an image or post description": (faultyText?"Post description should contain between 3 and 200 characters":""),
                          onChange:onTextChangeHandler
                        }}
                    />

                    <div className={cls.root} style={{width: "50%", margin:"auto", marginBottom:"20px", textAlign: "center"}}>
                      <input
                          onChange={(e)=>{setImageChanged(true);document.getElementById('placeHolder').src = window.URL.createObjectURL(e.target.files[0]);setImagePayload(e.target.files[0]);setImageChanged(true);}}
                          accept="image/*"
                          className={cls.input}
                          id="contained-button-file"
                          multiple
                          type="file"
                      />
                      <label htmlFor="contained-button-file">
                        <Button variant="contained" component="span">
                          Upload image
                        </Button>
                      </label>
                      <input
                          accept="image/*"
                          className={cls.input}
                          id="icon-button-file"
                          type="file"
                      />
                    </div>


                    <Paper style={{width: "50%", margin:"auto"}} elevation={3} >
                      <img id="placeHolder"  style={{width: "100%"}} src="https://demos.creative-tim.com/material-kit-pro-react/static/media/image_placeholder.ebe9884b.jpg" />
                    </Paper>

                    <div className={classes.textCenter} style={{marginTop:"20px"}}>
                      {loading?<CircularProgress/>:
                                            <Button disabled={faultyText || faultyTitle || title.length===0 || (text.length===0 && imagePayload.length<1)} onClick={()=>{
                                              setLoading(true);
                                              if (imageChanged){
                                                S3FileUpload.uploadFile(imagePayload,bucketConfig).then((data)=>{
                                                  const postPayload = {
                                                    title,
                                                    text,
                                                    imageUrl:data.location
                                                  };
                                                  createPost(props.match.params.id,postPayload).then(()=>{
                                                    notification.success({
                                                      message:'Hobby Pals',
                                                      description:'Post created successfully',
                                                      placement:"bottomRight"
                                                    })

                                                  }).catch(error=>{
                                                    notification.error({
                                                      message:'Hobby Pals',
                                                      description:error,
                                                      placement:"bottomRight"
                                                    })
                                                  })
                                                }).then(()=>{history.push(`/groupPage/${props.match.params.id}`)});
                                              } else {
                                                  const postPayload = {
                                                    title,
                                                    text,
                                                    imageUrl:""
                                                  };
                                                  createPost(props.match.params.id,postPayload).then(()=>{
                                                    notification.success({
                                                      message:'Hobby Pals',
                                                      description:'Post created successfully',
                                                      placement:"bottomRight"
                                                    })

                                                  }).catch(error=>{
                                                    notification.error({
                                                      message:'Hobby Pals',
                                                      description:error,
                                                      placement:"bottomRight"
                                                    })
                                                  }).then(()=>{history.push(`/groupPage/${props.match.params.id}`)})
                                                ;
                                              }
                                            }} color="primary" round>
                                              Create Post
                                            </Button>}
                    </div>
                  </form>
                </GridItem>

              </GridContainer>
            </div>
          </div>
        </div>

        <Footer
            content={
              <div>
                <div className={classes.left}>
                  <List className={classes.list}>

                    <ListItem className={classes.inlineBlock}>
                      <a
                          href="/about"
                          className={classes.block}
                          target="_blank"
                      >
                        About Us
                      </a>
                    </ListItem>

                  </List>
                </div>
                <div className={classes.right}>
                  &copy; {1900 + new Date().getYear()} , made with{" "}
                  <Favorite className={classes.icon} /> by{" "}
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
