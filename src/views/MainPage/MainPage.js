/*eslint-disable*/
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
// @material-ui/icons
import People from "@material-ui/icons/People";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import NavPills from "components/NavPills/NavPills.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import Clearfix from "components/Clearfix/Clearfix.js";
import CategoryIcon from '@material-ui/icons/Category';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import Pagination from '@material-ui/lab/Pagination';
import placeholder from "assets/img/placeholder.jpg";

import profilePageStyle from "assets/jss/material-kit-pro-react/views/profilePageStyle.js";
import sectionInterestedStyle from "assets/jss/material-kit-pro-react/views/blogPostsSections/sectionInterestedStyle.js";
import bg5 from "../../assets/img/bg5.jpg";

import {getFollowedGroups,getFollowedCategories,getPostsFromFollowedCategory,getPostsFromJoinedGroups} from "../../util/ApiUtils";
import { PostCard } from "components/PostCard/PostCard";
import { GroupCard } from "components/GroupCard/GroupCard";


const useStyles = makeStyles(profilePageStyle);
const useSectionStyles = makeStyles(sectionInterestedStyle);

export default function MainPage({...rest}) {


    const[categoriesPage, setCategoriesPage] = React.useState(0);
    const[categoriesPageCount,setCategoriesPageCount] = React.useState(0);

    const[groupsPage,setGroupsPage] = React.useState(0);
    const[groupsPageCount,setGroupPageCount] = React.useState(0);

    const[postsByCategoriesPage,setPostsByCategoryPage] = React.useState(0);
    const[postsByCategoryPageCount,setPostsByCateogryPageCount] = React.useState(0);

    const [categories, setCategories] = React.useState([]);
    const [groups, setGroups] = React.useState([]);

    const[postsByCategory,setPostsByCategory] = React.useState([]);
    const[postsByGroup,setPostsByGroup] = React.useState([]);

    const [postsByGroupsPage,setPostsByGroupPage] = React.useState(0);
    const [postsByGroupsPageCount,setPostsByGroupPageCount] = React.useState(0);


    React.useEffect(() => {
        getFollowedCategories(categoriesPage).then((response) => {
            setCategories(response.content);
            setCategoriesPageCount(response.totalPages);
        });
        getFollowedGroups(groupsPage).then((response) => {
            setGroups(response.content);
            setGroupPageCount(response.totalPages);
        });
        getPostsFromFollowedCategory().then((response)=>{
            setPostsByCategory(response.content);
            setPostsByCateogryPageCount(response.totalPages);
        });
        getPostsFromJoinedGroups().then((response)=>{
            setPostsByGroup(response.content);
            setPostsByGroupPageCount(response.totalPages);
        })
    },[]);

    const handleCategoriesPageChange = (e,value)=>{

        setCategoriesPage(value);
        getFollowedCategories().then((response)=>{
            setCategories(response.content);
            setCategoriesPageCount(response.totalPages);
        });
    }

    const handlePostsByGroupsPageChange = (e,value)=>{

        setPostsByGroupPage(value);
        getPostsFromJoinedGroups(value-1).then((response)=>{
            setPostsByGroup(response.content);
            setPostsByCateogryPageCount(response.totalPages);
        })
    }

    const handlePostsByCategoriesPageChange = (e,value)=>{

        setPostsByCategoryPage(value);
        getPostsFromFollowedCategory(value-1).then((response)=>{
            setPostsByCategory(response.content);
            setPostsByCateogryPageCount(response.totalPages);
        })
    }

    const handleGroupsPageChange = (e,value) =>{

        setGroupsPage(value);
        getFollowedGroups(value-1).then((response)=>{
            setGroups(response.content);
            setGroupPageCount(response.totalPages);
        })
    }

    const classes = useStyles();
    const sectionClasses = useSectionStyles();

    return (
        <div>
            <div className={classNames(classes.main, classes.mainRaised)}>
                <div className={classes.container}>
                    <div style={{marginTop: "0px"}} className={classes.profileTabs}>
                        <NavPills
                            alignCenter
                            color="primary"
                            tabs={[
                                {
                                    tabButton: "My Categories",
                                    tabIcon: CategoryIcon,
                                    tabContent: (
                                        <GridContainer>
                                            {categories.map(c => {
                                                return (
                                                    <GridItem xs={12} sm={4} md={4} lg={4} xl={4}>
                                                        <Card plain blog
                                                              style={{marginTop: "5px", marginBottom: "5px", justifyContent:'center', resizeMode:"contain"}}>
                                                            <CardHeader image plain>
                                                                <a href={`/categoryPage/${c.categoryId}`}>
                                                                    <img src={c.imageUrl?c.imageUrl:placeholder} alt="..." width={"150px"} height={"330px"} />
                                                                </a>
                                                                <div
                                                                    className={classes.coloredShadow}
                                                                    style={{
                                                                        backgroundImage: "url(" + bg5 + ")",
                                                                        opacity: "1"
                                                                    }}
                                                                />
                                                            </CardHeader>
                                                            <CardBody plain>
                                                                <h4 className={classes.cardTitle}>
                                                                    <a href={`/category/${c.categoryId}`}>
                                                                        {c.categoryName}
                                                                    </a>
                                                                </h4>
                                                            </CardBody>
                                                        </Card>
                                                    </GridItem>
                                                )
                                            })}
                                        {(categories.length>0&&categoriesPageCount!=0)?<Pagination style={{width:'50%',margin:"auto auto",justifyContent:"center !important"}} count={categoriesPageCount} page={categoriesPage} onChange={handleCategoriesPageChange} />:<h2 style={{margin:"3rem auto"}}>You have no followed categories</h2>}
                                        </GridContainer>
                                    )
                                },
                                {
                                    tabButton: "Followed Categories Feed",
                                    tabIcon: LibraryBooksIcon,
                                    tabContent: (
                                        <GridContainer>
                                            {postsByCategory.map((p)=>{
                                                return(
                                                    <PostCard post = {p}/>
                                                )
                                            })}
                                        {(postsByCategory.length>0&&postsByCategoryPageCount!=0)?<Pagination style={{width:'50%',margin:"auto auto",justifyContent:"center !important"}} count={postsByCategoryPageCount} page={postsByCategoriesPage} onChange={handlePostsByCategoriesPageChange} />:<h2 style={{margin:"3rem auto"}}>No posts from followed categories ;(</h2>}
                                        </GridContainer>
                                    )
                                },
                                {
                                    tabButton: "My groups",
                                    tabIcon: People,
                                    tabContent: (
                                        <GridContainer>
                                           {groups.map(g=>{
                                               return(
                                               <GroupCard group = {g}/>
                                               )
                                           })}
                                        {(groups.length>0&&groupsPageCount!=0)?<Pagination style={{width:'50%',margin:"auto auto",justifyContent:"center !important"}} count={groupsPageCount} page={groupsPage} onChange={handleGroupsPageChange} />:<h2 style={{margin:"3rem auto"}}>You have no created or joined groups ;(</h2>}
                                        </GridContainer>
                                    )
                                },
                                {
                                    tabButton: "Joined Groups Feed",
                                    tabIcon: LibraryAddIcon,
                                    tabContent: (
                                        <GridContainer>
                                            {postsByGroup.map(p=>{
                                                return(
                                                    <PostCard post = {p}/>
                                                )
                                            })}
                                        {(postsByGroup.length>0&&postsByGroupsPageCount!=0)?<Pagination style={{width:'50%',margin:"auto auto",justifyContent:"center !important"}} count={postsByGroupsPageCount} page={postsByGroupsPage} onChange={handlePostsByGroupsPageChange} />:<h2 style={{margin:"3rem auto"}}>No posts from joined groups ;(</h2>}
                                        </GridContainer>
                                    )
                                },
                            ]}
                        />
                    </div>
                    <Clearfix/>
                </div>
            </div>
        </div>
    );
}