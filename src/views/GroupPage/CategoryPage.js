/*eslint-disable*/
import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";

import {Link} from 'react-router-dom';

// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";
import Pagination from '@material-ui/lab/Pagination';

import blogPostsPageStyle from "assets/jss/material-kit-pro-react/views/blogPostsPageStyle.js";
import sectionInterestedStyle from "assets/jss/material-kit-pro-react/views/blogPostsSections/sectionInterestedStyle.js";

import Button from "components/CustomButtons/Button.js";

import {getGroupsByCategoryId,getCategoryData,followCategory,unfollowCategory} from "../../util/ApiUtils";
import { GroupCard } from "components/GroupCard/GroupCard.js";

const useStyles = makeStyles(blogPostsPageStyle);
const useSectionStyles = makeStyles(sectionInterestedStyle);


export default function CategoryPage(props) {

    const [groups,setGroups] = React.useState([]);
    const [categoryData, setCategoryData] = React.useState({});
    const [page,setPage] = React.useState(0);
    const [pageCount,setPageCount] = React.useState(0);

    React.useEffect(() => {
        getCategoryData(props.match.params.id).then((response)=>{
            setCategoryData(response);
        })
        getGroupsByCategoryId(props.match.params.id).then((response)=>{
            setGroups(response.content);
            setPageCount(response.totalPages);
        });
    },[]);

    const handlePageChange = (e,value) =>{

        setPage(value);
        getGroupsByCategoryId(props.match.params.id,value-1).then((response)=>{
            setGroups(response.content);
            setPageCount(response.totalPages);
        });
    }

    const classes = useStyles();
    const sectionClasses = useSectionStyles();
    return (
        <div>
            <Header
                brand="Hobby Pals"
                links={<HeaderLinks dropdownHoverColor="info"/>}
                fixed
                color="#1781cb"
                changeColorOnScroll={{
                    height: 400,
                    color: "info"
                }}
            />
            <Parallax image={require("assets/img/hero-bg.jpg")} filter="dark" small>
                <div className={classes.container}>
                    <GridContainer style={{justifyContent:"center"}}>
                        <GridItem className={classes.textCenter}>
                            <h2 className={classes.title}>
                                {categoryData.name}
                            </h2>
                        </GridItem>
                        <GridItem xs={8} sm={2} md={2} style={{marginRight:"50px", fontSize: "27px"}} className={classes.textCenter}>
                                <Link to={`/newGroup/${props.match.params.id}`}>
                                    <Button>
                                        Create group
                                    </Button>
                                </Link>
                        </GridItem>
                        <GridItem xs={8} sm={3} md={3} style={{marginLeft:"50px", fontSize: "27px"}} className={classes.textCenter}>
                            {categoryData.followedByCurrentUser?
                            <Button onClick={()=>{unfollowCategory(props.match.params.id).then(()=>{getCategoryData(props.match.params.id).then((response)=>setCategoryData(response))})}}>
                            Unfollow Category
                        </Button>:
                        <Button onClick={()=>{followCategory(props.match.params.id).then(()=>{getCategoryData(props.match.params.id).then(response=>{setCategoryData(response)})})}}>
                        Follow Category
                    </Button>}
                        </GridItem>
                    </GridContainer>
                </div>
            </Parallax>
            <div className={classes.main}>
                <div className={classes.container}>
                    {/*<SectionPills />*/}
                    <div className={sectionClasses.section}>
                        <h3 className={sectionClasses.title + " " + sectionClasses.textCenter}
                            style={{marginTop: "0px", marginBottom: "0px"}}>
                            Groups from this category:
                        </h3>
                        <br/>
                        <GridContainer>
                            {groups.map((g, i) => {
                                return (
                                    <GroupCard group={g}/>
                                    );
                            })}
                        </GridContainer>
                    </div>
                    <Pagination style={{width:'50%',margin:"auto auto",justifyContent:"center !important"}} count={pageCount} page={page} onChange={handlePageChange} />
                </div>
                {/*<SectionImage />*/}
                {/*<SubscribeLine />*/}
            </div>
            <Footer
                content={
                    <div>
                        <div className={classes.left}>
                            <List className={classes.list}>
                                <ListItem className={classes.inlineBlock}>
                                    <a
                                        href="https://hobby-pals-frontend.herokuapp.com/about"
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
                            </a>
                        </div>
                    </div>
                }
            />
        </div>
    );
}
