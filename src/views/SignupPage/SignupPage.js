/*eslint-disable*/
import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Icon from "@material-ui/core/Icon";
import CardHeader from "components/Card/CardHeader.js";
// @material-ui/icons
import Group from "@material-ui/icons/Group";
import { PostCard } from "components/PostCard/PostCard.js";
import Quote from "components/Typography/Quote.js";
import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";
import Check from "@material-ui/icons/Check";
import Favorite from "@material-ui/icons/Favorite";
// core components
import Footer from "components/Footer/Footer.js";
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import InfoArea from "components/InfoArea/InfoArea.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Paper from '@material-ui/core/Paper';


import signupPageStyle from "assets/jss/material-kit-pro-react/views/signupPageStyle.js";

import {NAME_MAX_LENGTH,NAME_MIN_LENGTH,USERNAME_MIN_LENGTH,USERNAME_MAX_LENGTH,PASSWORD_MIN_LENGTH,PASSWORD_MAX_LENGTH,EMAIL_MIN_LENGTH,EMAIL_MAX_LENGTH} from "../../constants";

import {useHistory} from 'react-router-dom';
import image from "assets/img/bg7.jpg";
import { Category, GolfCourse, LocalDining } from "@material-ui/icons";
import { signup,checkEmailAvailability,checkUsernameAvailability } from "util/ApiUtils";

import S3FileUpload from 'react-s3';
import ImageUpload from "components/CustomUpload/ImageUpload";
import { bucketConfig } from "util/ApiUtils";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles(signupPageStyle);

const useStyleImage = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}));
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SignUpPage({ ...rest }) {

  const history = useHistory();

  const cls = useStyleImage();

  const [checked, setChecked ] = React.useState([1]);
  const [name,setName] = React.useState("");
  const [surname,setSurname] = React.useState("");
  const [email,setMail] = React.useState("");
  const [password,setPassword] = React.useState("");
  const [username,setUsername] = React.useState("");
  const [faultyName,setFaultyName] = React.useState("");
  const [faultyUsername,setFaultyUsername] = React.useState("");
  const [faultyEmail,setFaultyEmail] = React.useState("");
  const [faultyPassword,setFaultyPassword] = React.useState("");
  const [faultySurname, setFaultySurname] = React.useState("");
  const [open, setOpen] = React.useState("");
  const [errMess, setErrMess] = React.useState("");
  const [imagePayload,setImagePayload] = React.useState("");
  const [loading,setLoading] = React.useState(false);
  const [sentMailNotification,setSentMailNotification] = React.useState(false);

  const onNameChangeHandler = event => {
    setName(event.target.value);
    if(event.target.value.length<NAME_MIN_LENGTH||event.target.value.length>NAME_MAX_LENGTH){
      setFaultyName(true);
    }else setFaultyName(false);
  };

  const onSurnameChangeHandler = event => {
    setSurname(event.target.value);
    if(event.target.value.length<NAME_MIN_LENGTH||event.target.value.length>NAME_MAX_LENGTH){
      setFaultySurname(true);
    }else setFaultySurname(false);
  };

  const onEmailChangeHandler = event => {
    setMail(event.target.value);
    if(event.target.value.length<EMAIL_MIN_LENGTH||event.target.value.length>EMAIL_MAX_LENGTH||!emailValidation()){
      setFaultyEmail(true);
    }else setFaultyEmail(false);
  };

  const onUsernameChangeHandler = event => {
    setUsername(event.target.value);
    if(event.target.value.length<USERNAME_MIN_LENGTH||event.target.value.length>USERNAME_MAX_LENGTH){
      setFaultyUsername(true);
    }else setFaultyUsername(false);
  };

  const onPasswordChangeHandler = event => {
    setPassword(event.target.value);
    if(event.target.value.length<PASSWORD_MIN_LENGTH||event.target.value.length>PASSWORD_MAX_LENGTH){
      setFaultyPassword(true);
    }else setFaultyPassword(false);
  };

  const emailValidation = ()=>{

    return (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email));
  }

  const handleSubmit = ()=>{

    setLoading(true);
    checkEmailAvailability(email).then(response=>{if(response){
      checkUsernameAvailability(username).then(response1=>{
        if(response1){
          if(imagePayload.length<1){
            const signUpRequest = {
              name,username,email,password,surname,imageUrl:null
            }
          signup(signUpRequest).then(()=>{setLoading(false);setSentMailNotification(true)});}
          else{
            S3FileUpload.uploadFile(imagePayload,bucketConfig).then((response)=>{
              const signUpRequest = {
                name,username,email,password,surname,imageUrl:response.location
              };
              signup(signUpRequest).then(()=>{setLoading(false);setSentMailNotification(true)});
            })
          }
        }else{setOpen(true);setErrMess("Username not available");}
      })
    }else{setOpen(true);setErrMess("Email not available");}})
  }

  const handleClose = ()=>{
    setOpen(false);
  }

  const handleToggle = value => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };
  
  const classes = useStyles();
  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {errMess}
        </Alert>
      </Snackbar>
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={10} md={10}>
              <Card className={classes.cardSignup}>
                <h2 className={classes.cardTitle}>Register</h2>
                <CardBody>
                  <GridContainer justify="center">
                    <GridItem xs={12} sm={5} md={5}>
                      <InfoArea
                        className={classes.infoArea}
                        title="Hobbies"
                        description="Connect with people that share similar interests, or hobby pals as we call them, and let the fun begin."
                        icon={GolfCourse}
                        iconColor="rose"
                      />
                      <InfoArea
                        className={classes.infoArea}
                        title="Lots of categories"
                        description="Yeah, we've got them."
                        icon={Category}
                        iconColor="primary"
                      />
                      <InfoArea
                        className={classes.infoArea}
                        title="Build a network"
                        description="Connect with people all around the world with the same interests."
                        icon={Group}
                        iconColor="info"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={5} md={5}>
                      <form className={classes.form}>
                        <CustomInput 
                          formControlProps={{
                            fullWidth: true,
                            className: classes.customFormControlClasses
                          }}
                          inputProps={{
                            error:faultyName,
                            onChange: onNameChangeHandler,
                            value: name,
                            helperText: faultyName?"Name should contain between 3 and 20 characters":"",
                            startAdornment: (
                              <InputAdornment
                                position="start"
                                className={classes.inputAdornment}
                              >
                                <Face className={classes.inputAdornmentIcon} />
                              </InputAdornment>
                            ),
                            placeholder: "First Name..."
                          }}
                        />
                        <CustomInput 
                          formControlProps={{
                            fullWidth: true,
                            className: classes.customFormControlClasses
                          }}
                          inputProps={{
                            error:faultySurname,
                            onChange: onSurnameChangeHandler,
                            value: surname,
                            helperText: faultySurname?"Surname should contain between 3 and 20 characters":"",
                            startAdornment: (
                              <InputAdornment
                                position="start"
                                className={classes.inputAdornment}
                              >
                                <Face className={classes.inputAdornmentIcon} />
                              </InputAdornment>
                            ),
                            placeholder: "Last Name..."
                          }}
                        />
                        <CustomInput 
                          formControlProps={{
                            fullWidth: true,
                            className: classes.customFormControlClasses
                          }}
                          inputProps={{
                            onChange: onUsernameChangeHandler,
                            error:faultyUsername,
                            value: username,
                            helperText: faultyUsername?"Username should contain between 5 and 16 characters":"",
                            startAdornment: (
                              <InputAdornment
                                position="start"
                                className={classes.inputAdornment}
                              >
                                <Face className={classes.inputAdornmentIcon} />
                              </InputAdornment>
                            ),
                            placeholder: "Username..."
                          }}
                        />
                        <CustomInput 
                          formControlProps={{
                            fullWidth: true,
                            className: classes.customFormControlClasses
                          }}
                          inputProps={{
                            error:faultyEmail,
                            onChange: onEmailChangeHandler,
                            value: email,
                            helperText: faultyEmail?"Email should contain between 5 and 30 characters":"",
                            startAdornment: (
                              <InputAdornment 
                                position="start"
                                className={classes.inputAdornment}
                              >
                                <Email  className={classes.inputAdornmentIcon} />
                              </InputAdornment>
                            ),
                            placeholder: "Email..."
                          }}
                        />
                        <div className={cls.root} style={{width: "50%", margin:"auto", marginBottom:"20px", textAlign: "center"}}>
                      <input
                          onChange={(e)=>{document.getElementById('placeHolder').src = window.URL.createObjectURL(e.target.files[0]);setImagePayload(e.target.files[0])}}
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
                        <CustomInput
                          formControlProps={{
                            fullWidth: true,
                            className: classes.customFormControlClasses,
                          }}
                          inputProps={{
                            type:"password",
                            error:faultyPassword,
                            onChange: onPasswordChangeHandler,
                            helperText: faultyPassword?"Password should contain between 9 and 30 characters":"",
                            value: password,
                            startAdornment: (
                              <InputAdornment
                                position="start"
                                className={classes.inputAdornment}
                              >
                                <Icon className={classes.inputAdornmentIcon}>
                                  lock_outline
                                </Icon>
                              </InputAdornment>
                            ),
                            placeholder: "Password..."
                          }}
                        />
                        <FormControlLabel
                          classes={{
                            label: classes.label
                          }}
                          control={
                            <Checkbox
                              tabIndex={-1}
                              onClick={() => handleToggle(1)}
                              checkedIcon={
                                <Check className={classes.checkedIcon} />
                              }
                              icon={<Check className={classes.uncheckedIcon} />}
                              classes={{
                                checked: classes.checked,
                                root: classes.checkRoot
                              }}
                              checked={checked.indexOf(1) !== -1 ? true : false}
                            />
                          }
                          
                        />
                        <div className={classes.textCenter}>
                          {loading?
                          <CircularProgress/>:
                          sentMailNotification?null:
                          <Button round color="primary" disabled = {faultyPassword||faultyUsername||faultyEmail||faultyName||name.length==0||username.length==0||email.length==0||password.length==0} onClick={handleSubmit}>
                          Get started
                        </Button>}
                        </div>
                      </form>
                    </GridItem>
                    {sentMailNotification?
            <GridContainer style={{justifyContent:"center",width:"100%"}}>
            <GridItem xs={10} sm={6} md={6} className={classes.textCenter}>
                <br/>
                <Card >
        <CardHeader color="success">You're almost done!</CardHeader>
        <CardBody>
            <Quote
                author="A verification letter was sent to your mail!"
            />
        </CardBody>
         </Card>
                </GridItem>
            </GridContainer>:null}
                  </GridContainer>
                </CardBody>
              </Card>
            </GridItem>
          
          </GridContainer>
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
                      href="/about"
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
    </div>
  );
}
