/*eslint-disable*/
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
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

import {notification} from 'antd';

import {CATEGORY_NAME_MAX_LENGTH, CATEGORY_NAME_MIN_LENGTH} from "../../constants";
import {createCategory, bucketConfig} from "../../util/ApiUtils";

import {useHistory} from "react-router-dom";

import S3FileUpload from "react-s3";
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

export default function AddCategoryPage() {

    const [name, setName] = React.useState("");
    const [faultyName, setFaultyName] = React.useState(false);
    const [imagePayload, setImagePayload] = React.useState("");
    const [loading,setLoading] = React.useState(false);

    const onNameChangeHandler = event => {
        setName(event.target.value);
        if (event.target.value.length >= CATEGORY_NAME_MAX_LENGTH || event.target.value.length <= CATEGORY_NAME_MIN_LENGTH) {
            setFaultyName(true);
        } else setFaultyName(false);
    };

    const cls = useStyle();

    const classes = useStyles();
    const history = useHistory();
    return (
        <div>
            <Header
                brand="Hobby Pals"
                links={<HeaderLinks dropdownHoverColor="info"/>}
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
                            <h1 className={classes.title}>Create a Category</h1>

                        </GridItem>
                    </GridContainer>
                </div>
            </Parallax>

            <div className={classNames(classes.main, classes.mainRaised)}>
                <div className={classes.contactContent}>
                    <div className={classes.container}>
                        <h2 className={classes.title}>Send us a message</h2>
                        <GridContainer>
                            <GridItem md={8} sm={8} style={{margin: "auto"}}>
                                <p>
                                    <br/>
                                    <br/>
                                </p>
                                <form>
                                    <CustomInput
                                        inputProps={
                                            {
                                                error:faultyName,
                                                value: name,
                                                placeholder:"Category name",
                                                helperText: faultyName?"Category name should contain between 3 and 30 characters":"",
                                                onChange: onNameChangeHandler
                                            }
                                        }
                                        id="float"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />

                                    <div className={cls.root} style={{
                                        width: "50%",
                                        margin: "auto",
                                        marginBottom: "20px",
                                        textAlign: "center"
                                    }}>
                                        <input
                                            onChange={(e) => {
                                                document.getElementById('placeHolder').src = window.URL.createObjectURL(e.target.files[0]);
                                                setImagePayload(e.target.files[0])
                                            }}
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

                                    <Paper style={imagePayload.length<1? {width: "50%", margin: "auto" ,border: "2px solid red"}: {width: "50%", margin: "auto"}} elevation={3}>
                                        <img id="placeHolder" style={{width: "100%"}}
                                             src="https://demos.creative-tim.com/material-kit-pro-react/static/media/image_placeholder.ebe9884b.jpg"/>
                                    </Paper>

                                    <div className={classes.textCenter} style={{marginTop: "20px"}}>
                                        {loading?<CircularProgress/>:
                                                                                <Button disabled={faultyName || imagePayload.length<1} onClick={() => {
                                                                                    setLoading(true);
                                                                                    S3FileUpload.uploadFile(imagePayload, bucketConfig).then((data) => {
                                                                                        const categoryPayload = {
                                                                                            categoryName: name,
                                                                                            imageUrl: data.location
                                                                                        };
                                                                                        createCategory(categoryPayload)
                                                                                    }).then(()=>{
                                                                                        notification.success({
                                                                                          message:'Hobby Pals',
                                                                                          description:'Category created successfully',
                                                                                          placement:"bottomRight"
                                                                                        })

                                                                                      }).catch(error=>{
                                                                                        notification.error({
                                                                                          message:'Hobby Pals',
                                                                                          description:error,
                                                                                          placement:"bottomRight"
                                                                                        })
                                                                                      }).then(()=>{history.push(`/categories`)});
                                                                                }} color="primary" round>
                                                                                    Create Category
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
                            <Favorite className={classes.icon}/> by{" "}
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
