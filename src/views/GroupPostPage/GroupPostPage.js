/*eslint-disable*/ import React from "react";
// nodejs library to set properties for components
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";

// sections for this page
import SectionText from "./Sections/SectionText.js";
import SectionBlogInfo from "./Sections/SectionBlogInfo.js";
import SectionComments from "./Sections/SectionComments.js";

import blogPostPageStyle from "assets/jss/material-kit-pro-react/views/blogPostPageStyle.js";

import {getPostData,getUserProfileImage} from "../../util/ApiUtils";

const useStyles = makeStyles(blogPostPageStyle);

export default function GroupPostPage(props) {

  const [postData,setPostData] = React.useState({});

  React.useEffect(() => {
    getPostData(props.match.params.id).then(response=>{
      setPostData(response);
    });
  },[]);

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
      <div className={classes.main}>
        <div className={classes.container} >
          <SectionText post={postData}/>
          <SectionBlogInfo post={postData}/>
          <SectionComments param={props.match.params.id}/>
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
  );
}
