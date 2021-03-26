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
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

import {green} from '@material-ui/core/colors';
import clsx from 'clsx';

import {
    POST_TEXT_MAX_LENGTH,
    POST_TEXT_MIN_LENGTH,
    POST_TITLE_MIN_LENGTH,
    POST_TITLE_MAX_LENGTH
} from "../../constants";
import {getPostData, updatePost, bucketConfig} from "../../util/ApiUtils";

import {useHistory} from "react-router-dom";

import S3FileUpload from "react-s3";
import { CircularProgress } from "@material-ui/core";


const useStyles = makeStyles(aboutUsStyle);

const useLoadingStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
    fabProgress: {
        color: green[500],
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}));

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

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function AboutUsPage(props) {

    const [changedImage, setChangedImage] = React.useState(false);

    const [open, setOpen] = React.useState(false);

    const [title, setTitle] = React.useState("");
    const [faultyTitle, setFaultyTitle] = React.useState("");

    const [text, setText] = React.useState("");
    const [faultyText, setFaultyText] = React.useState("");

    const [imagePayload, setImagePayload] = React.useState("");

    const [imageUrl, setImageUrl] = React.useState("");

    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);

    const classes = useStyles();
    const loadingClasses = useLoadingStyles();

    React.useEffect(() => {

        console.log("dwaawd");
        getPostData(props.match.params.postId).then(response => {
            setText(response.text);
            setTitle(response.title);
            setImageUrl(response.imageUrl);
        });
    }, []);

    const buttonClassname = clsx({
        [loadingClasses.buttonSuccess]: success,
    });


    const onTitleChangeHandler = event => {
        setTitle(event.target.value);
        if (title.length >= POST_TITLE_MAX_LENGTH || title.length <= POST_TITLE_MIN_LENGTH) {
            setFaultyTitle(true);
        } else setFaultyTitle(false);
    };

    const onTextChangeHandler = event => {
        setText(event.target.value);
        if (text.length >= POST_TEXT_MAX_LENGTH || text.length <= POST_TEXT_MIN_LENGTH) {
            setFaultyText(true);
        } else setFaultyText(false);
    };
    const cls = useStyle();

    const handleUpdate = (response) => {
        const postPayload = {
            title,
            text,
            imageUrl: response ? response.location : imageUrl
        }
        updatePost(props.match.params.postId, postPayload).then(() => {
            history.push(`/blogPost/${props.match.params.postId}`);
        })
    }

    const history = useHistory();
    return (
        <div>
            <Snackbar open={open} autoHideDuration={40000}>
                <Alert severity="success">
                    Post edited successfully!
                </Alert>
            </Snackbar>
            <Header
                brand="HobbyPalls"
                links={<HeaderLinks dropdownHoverColor="info"/>}
                fixed
                color="transparent"
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
                            <h1 className={classes.title}>Edit post</h1>
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

                                <form>
                                    <CustomInput
                                        inputProps={
                                            {
                                                value: title,
                                                placeholder: "Post title",
                                                onChange: onTitleChangeHandler
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
                                            placeholder: "Post Description",
                                            value: text,
                                            onChange: onTextChangeHandler
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
                                                setImagePayload(e.target.files[0]);
                                                setChangedImage(true)
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

                                    <Paper style={{width: "50%", margin: "auto"}} elevation={3}>
                                        <img id="placeHolder" style={{width: "100%"}}
                                             src={imageUrl.length > 0 ? imageUrl : "https://demos.creative-tim.com/material-kit-pro-react/static/media/image_placeholder.ebe9884b.jpg"}/>
                                    </Paper>

                                    <div className={classes.textCenter} style={{marginTop: "20px"}}>
                                        {loading?
                                        <CircularProgress/>
                                        :<Button onClick={() => {
                                            setLoading(true);
                                            if (changedImage&&imageUrl.length>1) {
                                                S3FileUpload.deleteFile(imageUrl.substring(41), bucketConfig).then(() => {
                                                    S3FileUpload.uploadFile(imagePayload, bucketConfig).then((response) => {
                                                        handleUpdate(response);
                                                    })
                                                })
                                            } else if(changedImage){
                                                S3FileUpload.uploadFile(imagePayload, bucketConfig).then((response) => {
                                                    handleUpdate(response);
                                                })
                                            }else{
                                                handleUpdate(null);
                                            };
                                        }} color="primary" round>
                                            Edit Post
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
