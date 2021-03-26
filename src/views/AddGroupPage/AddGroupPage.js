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
import Switch from "@material-ui/core/Switch";

import {notification} from 'antd';

import {GROUP_NAME_MAX_LENGTH,GROUP_NAME_MIN_LENGTH,GROUP_DESCRIPTION_MAX_LENGTH,GROUP_DESCRIPTION_MIN_LENGTH} from "../../constants";
import {bucketConfig,createGroup} from "../../util/ApiUtils";
import S3FileUpload from "react-s3/lib/ReactS3";

import {useHistory} from "react-router-dom";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { CircularProgress } from "@material-ui/core";

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

export default function AddGroupPage(props) {

  const history = useHistory();

  const [name,setName] = React.useState("");
  const [faultyName,setFaultyName] = React.useState(false);

  const [description,setDescription] = React.useState("");
  const [faultyDescription,setFaultyDescription] = React.useState("");
  const [checked, setChecked ] = React.useState([1]);
  const [loading,setLoading] = React.useState(false)

  const [imagePayload,setImagePayload] = React.useState("");

  const onNameChangeHandler = event => {
    setName(event.target.value);
    if(event.target.value.length>=GROUP_NAME_MAX_LENGTH||event.target.value.length<=GROUP_NAME_MIN_LENGTH){
      setFaultyName(true);
    }else setFaultyName(false);
  };

  const onDescriptionChangeHandler = event => {
    setDescription(event.target.value);
    if(event.target.value.length>=GROUP_DESCRIPTION_MAX_LENGTH||event.target.value.length<=GROUP_DESCRIPTION_MIN_LENGTH){
      setFaultyDescription(true);
    }else setFaultyDescription(false);
  };

  const cls = useStyle();

  const classes = useStyles();
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
                <h1 className={classes.title}>Create a Group</h1>

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
                            placeholder:"Group name",
                            value:name,
                              error:faultyName,
                              helperText: faultyName?"Group name should contain between 3 and 30 characters":"",
                              onChange:onNameChangeHandler
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
                            placeholder:"Group description",
                            error: faultyDescription,
                            helperText: faultyDescription?"Group description should contain between 1 and 200 characters":"",
                            multiline: true,
                            value:description,
                          onChange:onDescriptionChangeHandler
                        }}
                    />

                    <FormControlLabel
                        control={
                          <Switch
                              checked={checked}
                              onChange={event => setChecked(event.target.checked)}
                              value="checked"
                              classes={{
                                switchBase: classes.switchBase,
                                checked: classes.switchChecked,
                                thumb: classes.switchIcon,
                                track: classes.switchBar
                              }}
                          />
                        }
                        classes={{
                          label: classes.label
                        }}
                        label="Private"
                    />

                    <div className={cls.root} style={{width: "50%", margin:"auto", marginBottom:"20px", textAlign: "center"}}>
                      <input
                          onChange={(e)=>{document.getElementById('placeHolder').src = window.URL.createObjectURL(e.target.files[0]);setImagePayload(e.target.files[0])}}                          accept="image/*"
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


                    <Paper style={imagePayload.length<1? {width: "50%", margin: "auto" ,border: "2px solid red"}: {width: "50%", margin: "auto"}} elevation={3} >
                      <img id="placeHolder" style={{width: "100%"}} src="https://demos.creative-tim.com/material-kit-pro-react/static/media/image_placeholder.ebe9884b.jpg" />
                    </Paper>
                    <div className={classes.textCenter} style={{marginTop:"20px"}}>
                      {loading?<CircularProgress/>:
                                            <Button disabled={faultyName||faultyDescription || name.length===0 || description.length===0 || imagePayload.length<1} onClick={()=>{
                                              setLoading(true);
                                              S3FileUpload.uploadFile(imagePayload,bucketConfig).then((data)=>{
                                                const groupPayload = {
                                                  title:name,
                                                  description,
                                                  imageUrl:data.location,
                                                  groupAccess: checked?"private":"public"
                                                };
                                                createGroup(groupPayload,props.match.params.id);
                                              }).then(()=>{
                                                notification.success({
                                                  message:'Hobby Pals',
                                                  description:'Group created successfully',
                                                  placement:"bottomRight"
                                                })

                                              }).catch(error=>{
                                                notification.error({
                                                  message:'Hobby Pals',
                                                  description:error,
                                                  placement:"bottomRight"
                                                })
                                              }).then(()=>{history.push(`/categoryPage/${props.match.params.id}`)});
                                            }} color="primary" round>
                                              Create Group
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
