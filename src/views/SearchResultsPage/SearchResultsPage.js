/*eslint-disable*/
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/icons
import People from "@material-ui/icons/People";
import PublicIcon from '@material-ui/icons/Public';
import Favorite from "@material-ui/icons/Favorite";
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import NavPills from "components/NavPills/NavPills.js";
import Parallax from "components/Parallax/Parallax.js";
import Clearfix from "components/Clearfix/Clearfix.js";

import profilePageStyle from "assets/jss/material-kit-pro-react/views/profilePageStyle.js";
import {getGroupsData, getGroupsByUserCategories} from "../../util/ApiUtils";
import sectionInterestedStyle
    from "../../assets/jss/material-kit-pro-react/views/blogPostsSections/sectionInterestedStyle";
import Pagination from "../../components/Pagination/Pagination";
import ResultBlocks from "../../components/Search/ResultBlocks";

const useStyles = makeStyles(profilePageStyle);
const useSectionStyles = makeStyles(sectionInterestedStyle);

export default function SearchResultsPage(props) {

    const [groups, setGroups] = React.useState({});
    const [groupsByUserCategories, setGroupsByUserCategories] = React.useState({});
    const sectionClasses = useSectionStyles();
    const searchQuery = props.match.params.keyword;

    React.useEffect(() => {
        getGroupsData(searchQuery, pageNumber).then((response) => {
            setGroups(response);
        })

        getGroupsByUserCategories(searchQuery, pageNumber).then((response)=>{
            setGroupsByUserCategories(response);
        })
    }, [searchQuery]);

     let pageNumber=0;

    const classes = useStyles();
    const imageClasses = classNames(
        classes.imgRaised,
        classes.imgRoundedCircle,
        classes.imgFluid
    );
    const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
    return (
        <div>
            <Header
                color="transparent"
                brand="Hobby Pals"
                links={<HeaderLinks dropdownHoverColor="info" />}
                fixed
                changeColorOnScroll={{
                    height: 200,
                    color: "info"
                }}
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
                                    <h2>
                                        SEARCH RESULTS
                                    </h2>
                                </div>
                            </div>
                        </GridItem>
                    </GridContainer>
                    <div className={classNames(classes.description, classes.textCenter)}>
                        <p>
                            Browse through all the posts and find people with same interests as you!
                        </p>
                    </div>
                    <div style={{marginTop:"0px"}} className={classes.profileTabs}>
                        <NavPills
                            alignCenter
                            color="primary"
                            tabs={[
                                {
                                    tabButton: "All Groups",
                                    tabIcon: PublicIcon,
                                    tabContent: (
                                        <ResultBlocks groups={groups}/>
                                    )
                                },
                                {
                                    tabButton: "My Categories Groups",
                                    tabIcon: People,
                                    tabContent: (
                                        <ResultBlocks groups={groupsByUserCategories}/>
                                    )
                                },
                            ]}
                        />
                    </div>
                    <Clearfix />
                </div>
                <Pagination pages={[
                    { disabled: true, text: "Previous",onClick:pageNumber-- },
                    { text: 1,onClick: pageNumber===1 },
                    { active: true, text: 2,onClick: pageNumber===2 },
                    { text: 3, onClick: pageNumber===3},
                    { text: "Next",onClick: pageNumber+=1}
                ]}/>
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
                            <a>
                                Speed Team
                            </a>
                        </div>
                    </div>
                }
            />
        </div>
    );
}
