/*eslint-disable*/
import React from "react";
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
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";
import Pagination from '@material-ui/lab/Pagination';

import blogPostsPageStyle from "assets/jss/material-kit-pro-react/views/blogPostsPageStyle.js";
import sectionInterestedStyle from "assets/jss/material-kit-pro-react/views/blogPostsSections/sectionInterestedStyle.js";

import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import Button from "components/CustomButtons/Button.js";

import bg5 from "assets/img/bg2.jpg";

import {getAllCategories} from "../../util/ApiUtils";
import {Link} from "react-router-dom";

const useStyles = makeStyles(blogPostsPageStyle);
const useSectionStyles = makeStyles(sectionInterestedStyle);

export default function CategoriesGroupPage(props) {

    const [categories,setCategories] = React.useState([]);
    const [categoriesPage,setCategoriesPage] = React.useState(0);
    const [categoriesPageCount,setCategoriesPageCount] = React.useState(0);

    const classes = useStyles();
    const sectionClasses = useSectionStyles();

    React.useEffect(() => {
        getAllCategories().then((response)=>{
            setCategories(response.content);
            setCategoriesPageCount(response.totalPages);
            console.log(categories)});
    },[]);

    const handleCategoriesPageChange = (e,value)=>{

        setCategoriesPage(value);
        getAllCategories(value-1).then((response)=>{
            setCategories(response.content);
            setCategoriesPageCount(response.totalPages);
        });

    }

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
            <Parallax image={require("assets/img/categories.jpg")} filter="dark" small>
                <div className={classes.container}>
                    <GridContainer justify="center">
                        <GridItem xs={12} sm={12} md={8} className={classes.textCenter}>
                            <h2 className={classes.title}>
                                Categories
                            </h2>
                        </GridItem>
                        <GridItem xs={8} sm={12} md={8} style={{marginTop:"50px",marginCenter:"auto", fontSize: "27px"}} className={classes.textCenter}>
                            <Link to={`/newCategory`}>
                                <Button>
                                    Create category
                                </Button>
                            </Link>
                        </GridItem>
                    </GridContainer>
                </div>
            </Parallax>
            <div className={classes.main}>
                <div className={classes.container}>
                    <div className={sectionClasses.section}>
                        <br/>
                        <GridContainer >
                            {categories?categories.map((c, i) => {
                                return (
                                    <GridItem id={i} xs={12} sm={3} md={3} lg={3} xl={3}>
                                        <Card plain blog style={{marginTop: "0px", marginBottom: "0px"}}>
                                            <CardHeader image plain style={{resizeMode:"contain"}}>
                                                <a style={{resizeMode:"scale-down"}} href={`/categoryPage/${c.id}`} >
                                                    <img src={c.imageUrl} alt="..." width={"150px"} height={"250px"} />
                                                </a>
                                                <div
                                                    className={sectionClasses.coloredShadow}
                                                    style={{
                                                        backgroundImage: "url(" + bg5 + ")",
                                                        opacity: "1"
                                                    }}
                                                />
                                            </CardHeader>
                                            <CardBody plain style={{resizeMode:"scale-down"}}>
                                                <h4 className={sectionClasses.cardTitle}>
                                                    <a href={`/categoryPage/${c.id}`}>
                                                        {c.name}
                                                    </a>
                                                </h4>
                                            </CardBody>
                                        </Card>
                                    </GridItem>)
                            }):null}
                        </GridContainer>
                    </div>
                    <Pagination style={{width:'50%',margin:"auto auto",justifyContent:"center !important"}} count={categoriesPageCount} page={categoriesPage} onChange={handleCategoriesPageChange} />
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
                                        Speed Team
                                    </a>
                                </ListItem>
                                <ListItem className={classes.inlineBlock}>
                                    <a
                                        href="https://hobby-pals2front.herokuapp.com/about"
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
