/*eslint-disable*/
import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import Favorite from "@material-ui/icons/Favorite";

import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CustomInput from "components/CustomInput/CustomInput.js";


import loginPageStyle from "assets/jss/material-kit-pro-react/views/loginPageStyle.js";
import navbarsStyle from "assets/jss/material-kit-pro-react/views/componentsSections/navbarsStyle.js";

import image from "assets/img/bg7.jpg";
import {PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH} from "../../constants";

import {  Link,useHistory } from "react-router-dom";

import {login} from "../../util/ApiUtils";
import { CircularProgress } from "@material-ui/core";
import { notification } from "antd";





const useStyles = makeStyles(loginPageStyle);
const useStyles1 = makeStyles(navbarsStyle)


export default function LoginPage() {

  const history = useHistory();

  const [usernameOrEmail, setUsernameOrEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [errMsg,setErrMsg] = React.useState("");

  const [faultyUsernameOrEmail, setFaultyUsernameOrEmail] = React.useState("");
  const [faultyPassword, setFaultyPassword] = React.useState("");

  const [loading,SetLoading] = React.useState(false);


  const onUsernameOrEmailChangeHandler = event => {
    setUsernameOrEmail(event.target.value);
  }

  const onPasswordChangeHandler = event => {
    setPassword(event.target.value);
    if (event.target.value.length > PASSWORD_MAX_LENGTH || event.target.value.length < PASSWORD_MIN_LENGTH) {
      setFaultyPassword(true);
    }else
      setFaultyPassword(false);
  }

  const handleSubmit = event =>{

    SetLoading(true);
    const loginRequest = {
      usernameOrEmail,
      password
    }
    login(loginRequest).then(response=>{
      SetLoading(false);
      if(response.accessToken){
        localStorage.setItem("accessToken",response.accessToken);
        notification.success({
          message:"Hobby Pals",
          description:"Logged in successfully!"
        });
        history.push("/");
      }
    }).catch((err)=>{
      SetLoading(false);
      notification.error({
        message:"Hobby Pals",
        description:err.message?err.message:err.error
      })
    })
  }

    const classes = useStyles();
    const navBarClasses = useStyles1();
    return (
        <div>
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
                <GridItem xs={12} sm={12} md={4}>
                  <Card>
                    <form className={classes.form}>
                      <CardHeader
                          color="primary"
                          signup
                          className={classes.cardHeader}
                      >
                        <h4 className={classes.cardTitle}>Login</h4>
                      </CardHeader>
                      <CardBody signup>
                        <CustomInput
                            id="email"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              placeholder: "Email or Username...",
                              type:"email",
                              helperText : faultyUsernameOrEmail?errMsg:" ",
                              value: usernameOrEmail,
                              error: faultyUsernameOrEmail,
                              onChange: onUsernameOrEmailChangeHandler,
                              startAdornment: (
                              <InputAdornment position="start">
                                    <Email className={classes.inputIconsColor}/>
                                  </InputAdornment>
                              )
                            }}
                        />
                        <CustomInput
                            id="pass"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              placeholder: "Password",
                              type: "password",
                              value: password,
                              error: faultyPassword,
                              helperText : faultyPassword? "Password length must be between 9 and 30":"",
                              onChange: onPasswordChangeHandler,
                              startAdornment: (
                                  <InputAdornment position="start">
                                    <Icon className={classes.inputIconsColor}>
                                      lock_utline
                                    </Icon>
                                  </InputAdornment>
                              ),
                              autoComplete: "off"
                            }}
                        />
                      </CardBody>
                      <div className={classes.textCenter}>
                        {loading?
                        <CircularProgress/>:
                        <Button onClick ={handleSubmit}  round disabled={faultyUsernameOrEmail || faultyPassword || usernameOrEmail.length ===0 || password.length===0} color="primary">
                        Get started
                      </Button>}
                        <Link style={{marginLeft: "20px"}} to="/signUp">Register</Link>
                      </div>
                    </form>
                  </Card>
                </GridItem>
              </GridContainer>
            </div>
            <Footer
                className={classes.footer}
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
                      </a>{" "}
                      for ISD
                    </div>
                  </div>
                }
            />
          </div>
        </div>
    );
  }
