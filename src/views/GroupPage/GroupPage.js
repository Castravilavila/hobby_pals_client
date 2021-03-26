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
// sections for this page
import CardBody from "components/Card/CardBody.js";
import Quote from "components/Typography/Quote.js";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


import blogPostsPageStyle from "assets/jss/material-kit-pro-react/views/blogPostsPageStyle.js";
import sectionInterestedStyle from "assets/jss/material-kit-pro-react/views/blogPostsSections/sectionInterestedStyle.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import Pagination from '@material-ui/lab/Pagination';
import InputLabel from '@material-ui/core/InputLabel';

import Button from "components/CustomButtons/Button.js";

import CustomInput from "components/CustomInput/CustomInput.js";

import {getPostsByGroupId,getGroupData,followGroup, leaveGroup, deleteGroup,createJoinRequest} from "../../util/ApiUtils";
import { CircularProgress} from "@material-ui/core";

import {Link,useHistory} from "react-router-dom";
import { PostCard } from "components/PostCard/PostCard.js";
import FormControl from '@material-ui/core/FormControl';

import JoinRequestsList from "../../components/JoinRequestsList/JoinRequestsList";

const useStyles = makeStyles(blogPostsPageStyle);
const useSectionStyles = makeStyles(sectionInterestedStyle);


export default function GroupPage(props) {

    const [posts,setPosts] = React.useState([]);
    const [groupData,setGroupData] = React.useState({});
    const [isJoinRequestOpen,setIsJoinRequestOpen] = React.useState(false);
    const [joinRequestMessage,setJoinRequestMessage] = React.useState("");
    const [loading,setLoading] = React.useState(false);
    const [page,setPage] = React.useState(0);
    const [pageCount,setPageCount] = React.useState(0);
    const [cardsPerRow,setCardsPerRow] = React.useState();

    const history = useHistory();

    const handlePageChange = (e,value) =>{
        setPage(value);
        getPostsByGroupId(props.match.params.id,value-1).then((response)=>{
            setPageCount(response.totalPages);
            setPosts(response.content);
        });
    }

    const handleChange = (event) => {
        setLoading(true);
        getGroupData(props.match.params.id).then((response)=>{
            setGroupData(response);
        })
        getPostsByGroupId(props.match.params.id).then((response)=>{
            setPosts(response.content);
            setPageCount(response.totalPages);
            setLoading(false);});
            setCardsPerRow(event.target.value)
    };

    React.useEffect(() => {
        setLoading(true);
        getGroupData(props.match.params.id).then((response)=>{
            setGroupData(response);
        })
        getPostsByGroupId(props.match.params.id).then((response)=>{
            setPosts(response.content);
            setPageCount(response.totalPages);
            setLoading(false);});
    },[]);
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
                {(groupData.currentUserRole=="ROLE_ADMIN")?<JoinRequestsList groupId={groupData.id}/>:null}
                <div className={classes.container}>
                    <GridContainer style={{justifyContent:"center"}}>
                        <GridItem className={classes.textCenter}>
                            <h2 className={classes.title}>
                                {groupData.name}
                            </h2>
                        </GridItem>

                        {groupData.currentUserRole!='ROLE_GUEST'?
                        <GridItem xs={8} sm={2} md={2} style={{marginRight:"50px", fontSize: "27px"}} className={classes.textCenter}>
                                 <Link to={`/newPost/${props.match.params.id}`}>
                                    <Button>
                                        Create Post
                                    </Button>
                                </Link>
                        </GridItem>:null}
                        <GridItem xs={8} sm={3} md={3} style={{marginLeft:"50px", fontSize: "27px"}} className={classes.textCenter}>
                            {(groupData.currentUserRole=="ROLE_GUEST"&&groupData.accessType=="public")?
                             <Button onClick={()=>{followGroup(props.match.params.id).then(()=>{getGroupData(props.match.params.id).then((response)=>setGroupData(response))})}}>
                                Follow Group
                              </Button>:null}
                            {groupData.currentUserRole=="ROLE_MEMBER"?
                             <Button onClick={()=>{leaveGroup(props.match.params.id).then(()=>{getGroupData(props.match.params.id).then((response)=>setGroupData(response))})}}>
                                Leave Group
                             </Button>:null}
                            {groupData.currentUserRole=="ROLE_ADMIN"?
                              <Button onClick={()=>{deleteGroup(props.match.params.id).then(()=>history.push(`/categoryPage/${groupData.categoryId}`))}}>
                                 Delete Group
                              </Button>:null}
                            {(groupData.currentUserRole=="ROLE_GUEST"&&groupData.accessType=="private"&&!groupData.pendingRequest)?
                              <Button onClick={()=>{setIsJoinRequestOpen(true);}}>
                                    Request Join
                                </Button>:null}
                        </GridItem>
                        {loading?<CircularProgress style={{margin:"auto auto"}}/>:null}
                    </GridContainer>
                </div>
            </Parallax>
            <div className={classes.main}>
            {isJoinRequestOpen?
                <GridContainer style={{justifyContent:"center"}}>
                    <GridItem xs={10} sm={6} md={6} className={classes.textCenter}>
                    <div>
                <CustomInput
            id="nice"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              value:joinRequestMessage,
              placeholder:"Please provide a request description",
              onChange: (e)=>{setJoinRequestMessage(e.target.value)},
              multiline: true,
            }}
          />
             <Button onClick={()=>{createJoinRequest(props.match.params.id,joinRequestMessage).then(()=>{
                 getGroupData(props.match.params.id).then((response)=>{
                     setGroupData(response);
                     setIsJoinRequestOpen(false);
                 })
             })}}>Submit join request</Button>
            </div>
                    </GridItem>
                </GridContainer>
                    :null}
            {groupData.pendingRequest?
                (
                    <GridContainer style={{justifyContent:"center"}}>
                        <GridItem xs={10} sm={6} md={6} className={classes.textCenter}>
                            <br/>
                            <Card >
                    <CardHeader color="success">Request sent!</CardHeader>
                    <CardBody>
                        <Quote
                            author="A join request is pending, wait for the admin to accept or decline :)"
                        />
                    </CardBody>
                     </Card>
                            </GridItem>
                        </GridContainer>

                ) :null}
                <div className={classes.container}>
                    <div className={sectionClasses.section}>
                        {posts.length>0 && (groupData.currentUserRole!="ROLE_GUEST"&&groupData.accessType=="private")?
                        <FormControl style={{width: "200px"}} className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label">Number of Cards in a Row</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={cardsPerRow}
                                onChange={handleChange}
                            >
                                <MenuItem value={1}>One</MenuItem>
                                <MenuItem value={2}>Two</MenuItem>
                                <MenuItem value={3}>Three</MenuItem>
                                <MenuItem value={4}>Four</MenuItem>
                                <MenuItem value={6}>Six</MenuItem>
                            </Select>
                        </FormControl>:null}

                        <h3 className={sectionClasses.title + " " + sectionClasses.textCenter}
                            style={{marginTop: "0px", marginBottom: "0px"}}>
                            {(groupData.currentUserRole=="ROLE_GUEST"&&groupData.accessType=="private")?null: "Group Posts"}
                        </h3>
                        <br/>
                        <GridContainer >
                            {(groupData.currentUserRole=="ROLE_GUEST"&&groupData.accessType=="private")?
                                null:posts.map((p, i) => {
                                    return (
                                        <PostCard post={p} nr={cardsPerRow}/>);
                                })}
                        </GridContainer>
                    </div>
                    <Pagination style={{width:'100%',margin:"auto auto",justifyContent:"center !important"}} count={pageCount} page={page} onChange={handlePageChange} />
                </div>
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
