/* eslint-disable */
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import CategoryIcon from '@material-ui/icons/Category';
import PeopleOutline from "@material-ui/icons/PeopleOutline";
import PersonIcon from '@material-ui/icons/Person';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import ExploreIcon from '@material-ui/icons/Explore';
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import Apps from "@material-ui/icons/Apps";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import ViewDay from "@material-ui/icons/ViewDay";
import Dns from "@material-ui/icons/Dns";
import Build from "@material-ui/icons/Build";
import ListIcon from "@material-ui/icons/List";
import People from "@material-ui/icons/People";
import Assignment from "@material-ui/icons/Assignment";
import MonetizationOn from "@material-ui/icons/MonetizationOn";
import Chat from "@material-ui/icons/Chat";
import Call from "@material-ui/icons/Call";
import ViewCarousel from "@material-ui/icons/ViewCarousel";
import AccountBalance from "@material-ui/icons/AccountBalance";
import ArtTrack from "@material-ui/icons/ArtTrack";
import ViewQuilt from "@material-ui/icons/ViewQuilt";
import LocationOn from "@material-ui/icons/LocationOn";
import Fingerprint from "@material-ui/icons/Fingerprint";
import AttachMoney from "@material-ui/icons/AttachMoney";
import Store from "@material-ui/icons/Store";
import AccountCircle from "@material-ui/icons/AccountCircle";
import PersonAdd from "@material-ui/icons/PersonAdd";
import Layers from "@material-ui/icons/Layers";
import ShoppingBasket from "@material-ui/icons/ShoppingBasket";
import LineStyle from "@material-ui/icons/LineStyle";
import Error from "@material-ui/icons/Error";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-pro-react/components/headerLinksStyle.js";
import SearchResults from "../Search/SearchResults";

import {useHistory} from "react-router-dom";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {

  const history = useHistory();

  const { dropdownHoverColor } = props;
  const classes = useStyles();
  return (
    <List className={classes.list + " " + classes.mlAuto}>
      {/*Search Bar*/}
      <SearchResults/>

      <ListItem className={classes.listItem}>
        <CustomDropdown
            noLiPadding
            navDropdown
            hoverColor={dropdownHoverColor}
            buttonText="Explore"
            buttonProps={{
              className: classes.navLink,
              color: "transparent",
            }}
            buttonIcon={ExploreIcon}
            dropdownList={[
              /*<Link to={`/`} className={classes.dropdownLink} >
                <GroupWorkIcon className={classes.dropdownIcons} /> Groups
              </Link>,*/
              <Link
                  to="/categories" className={classes.dropdownLink}>
                <CategoryIcon className={classes.dropdownIcons} /> Categories
              </Link>
            ]}
        />
      </ListItem>

      <ListItem className={classes.listItem}>
        <CustomDropdown
            noLiPadding
            navDropdown
            hoverColor={dropdownHoverColor}
            buttonText="My Profile"
            buttonProps={{
              className: classes.navLink,
              color: "transparent"
            }}
            buttonIcon={PersonIcon}
            dropdownList={[
              <Link to={`/profile/${-1}`} className={classes.dropdownLink}>
                <Fingerprint className={classes.dropdownIcons} /> Profile Page
              </Link>,
              <Link onClick={()=>{localStorage.removeItem("accessToken");history.push("/")}} className={classes.dropdownLink}>
                <MeetingRoomIcon className={classes.dropdownIcons} /> Log out
              </Link>
            ]}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
      </ListItem>
    </List>
  );
}

HeaderLinks.defaultProps = {
  hoverColor: "primary"
};

HeaderLinks.propTypes = {
  dropdownHoverColor: PropTypes.oneOf([
    "dark",
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "rose"
  ])
};
