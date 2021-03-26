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
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Badge from "components/Badge/Badge.js";
import Parallax from "components/Parallax/Parallax.js";
import Clearfix from "components/Clearfix/Clearfix.js";
import Button from "components/CustomButtons/Button.js";

import christian from "assets/img/faces/christian.jpg";
import {getProfileData,updateProfilePageImage,bucketConfig} from "util/ApiUtils"
import { Link } from 'react-router-dom'

import profilePageStyle from "assets/jss/material-kit-pro-react/views/profilePageStyle.js";
import S3FileUpload from "react-s3/lib/ReactS3";
import { CircularProgress } from "@material-ui/core";


const useStyles = makeStyles(profilePageStyle);

const useStylePls = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}));

export default function ProfilePage(props) {


 const cls = useStylePls();

  const [profile, setProfile] = React.useState({});
  const [groups, setGroups] = React.useState([]);
  const [uniqueCategories, setUniqueCategories] = React.useState([]);
  const [imagePayload,setImagePayload] = React.useState("");
  const [openEdit,setOpenEdit] = React.useState(false);
  const [loading,setLoading] = React.useState(false);

  const handleImageChangeSubmit = ()=>{

    setLoading(true);
    if(profile.imageUrl){
      S3FileUpload.deleteFile(profile.imageUrl.substring(41), bucketConfig).then(() => {
        S3FileUpload.uploadFile(imagePayload, bucketConfig).then((response)=>{
          updateProfilePageImage(props.match.params.id,response.location).then(()=>{
            getProfileData(props.match.params.id).then((response)=>{
              setProfile(response);
              setOpenEdit(false);
              setLoading(false);
            })
          });
        })
    })
    }else{
      S3FileUpload.uploadFile(imagePayload, bucketConfig).then((response)=>{
        updateProfilePageImage(props.match.params.id,response.location).then(()=>{
          getProfileData(props.match.params.id).then((response)=>{
            setProfile(response);
            setOpenEdit(false);
            setLoading(false);
          })
        });
      })
    }
}

  React.useEffect(() => {
    getProfileData(props.match.params.id).then(response=>{
      setProfile(response);
      setGroups(response.groups);
      setUniqueCategories(Array.from(new Set(response.groups.map(group => group.categoryId.categoryName))));
    })
  }, []);


  const classes = useStyles();
  const imageClasses = classNames(
      classes.imgRaised,
      classes.imgRoundedCircle,
      classes.imgFluid
  );
  return (
    <div>
      <Header
        color="#1781cb"
        brand="Hobby Pals"
        links={<HeaderLinks dropdownHoverColor="info" />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "info"
        }}
        {...props}
      />
      <Parallax
        image={require("assets/img/examples/city.jpg")}
        filter="dark"
        className={classes.parallax}
      />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={6}>
              <div className={classes.profile}>
                <div>
                  <img id="profile_image" src={(profile.imageUrl&&profile.imageUrl.length>1)?profile.imageUrl:christian} alt="..." className={imageClasses} />
                </div>
                <div className={classes.name}>
                  <h3 className={classes.title}>{profile.name} {profile.surname}</h3>
                </div>
              </div>
            </GridItem>
            {props.match.params.id==-1?
            <GridItem >
            <div className={cls.root} style={{width: "50%", margin:"auto", marginBottom:"20px", textAlign: "center"}}>
                      <input
                          onChange={(e)=>{document.getElementById('profile_image').src = window.URL.createObjectURL(e.target.files[0]);setImagePayload(e.target.files[0])}}
                          accept="image/*"
                          className={cls.input}
                          id="contained-button-file"
                          multiple
                          type="file"
                      />
                      {loading?
                      <CircularProgress/>:
                      <div>
                      <label htmlFor="contained-button-file">
                      <Button variant="contained" component="span" onClick={()=>setOpenEdit(true)}>
                        Edit image
                      </Button>
                    </label>
                    {openEdit?
                    <Button variant="contained" component="span" onClick={handleImageChangeSubmit}>
                      Submit changes
                    </Button>:null}
                    <input
                        accept="image/*"
                        className={cls.input}
                        id="icon-button-file"
                        type="file"
                    />
                    </div>}
                    </div>
          </GridItem>:null}
          </GridContainer>
          <div className={classNames(classes.description, classes.textCenter)}>
            {/*<p>*/}
            {/*  An artist of considerable range, Chet Faker — the name taken by*/}
            {/*  Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs*/}
            {/*  and records all of his own music, giving it a warm, intimate feel*/}
            {/*  with a solid groove structure.{" "}*/}
            {/*</p>*/}
          </div>
          <div className={classes.profileTabs}>
                    <GridContainer>
                      <GridItem
                        xs={12}
                        sm={12}
                        md={7}
                        className={classes.gridItem}
                      >
                        <h3 className={classes.title}>My groups:</h3>
                        <GridContainer className={classes.collections}>
                          {groups.map((g,i)=>{
                            return(
                                <GridItem xs={12} sm={12} md={6}>
                                  <Card
                                      background
                                      style={{
                                        backgroundImage: "url(" + g.imageUrl + ")"
                                      }}
                                  >
                                    <CardBody background className={classes.cardBody}>

                                      <a href={`/groupPage/${g.groupId}`}>
                                        <h2 className={classes.cardTitleWhite}>
                                          {g.groupTitle}
                                        </h2>
                                      </a>
                                      <Badge
                                          color="info"
                                          className={classes.badge}
                                      >
                                        {g.categoryId.categoryName}
                                      </Badge>
                                    </CardBody>
                                  </Card>
                                </GridItem>
                            )
                          })}
                        </GridContainer>
                      </GridItem>
                      <GridItem
                        xs={12}
                        sm={12}
                        md={2}
                        className={classes.gridItem}
                      >
                        <h4 className={classes.title}>Stats</h4>
                        <ul className={classes.listUnstyled}>
                          <li>
                            <b>{groups.length}</b> Groups
                          </li>
                          <hr />
                          <li>
                            <b>{uniqueCategories.length}</b> Categories
                          </li>
                        </ul>
                        <hr />
                        <h4 className={classes.title}>Categories: </h4>
                        {uniqueCategories.map((c,i)=>{
                          return(
                              <Link to={`/categoryPage/${c}`}>
                                <Badge color="primary">{c}</Badge>
                              </Link>
                          )
                        })}
                      </GridItem>
                    </GridContainer>
          </div>
          <Clearfix />
        </div>
      </div>
      <Footer
        content={
          <div>
            <div className={classes.left}>
              <List className={classes.list}>
                <ListItem className={classes.inlineBlock}>
                  <a
                    href="https://hobby-pals2front.herokuapp.com/about"
                    target="_blank"
                    className={classes.block}
                  >
                    About us
                  </a>
                </ListItem>

                <ListItem className={classes.inlineBlock}>
                  <a href="//blog.creative-tim.com/" className={classes.block}>
                    Blog
                  </a>
                </ListItem>
                <ListItem className={classes.inlineBlock}>
                  <a
                    href="/about"
                    target="_blank"
                    className={classes.block}
                  >
                    Licenses
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
                Spid Tim
              </a>
            </div>
          </div>
        }
      />
    </div>
  );
}