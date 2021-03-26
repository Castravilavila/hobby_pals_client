/*!

=========================================================
* Material Kit PRO React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-pro-react
* Copyright 2020 Speed Team (https://www.creative-tim.com)

* Coded by Speed Team

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router";

import "assets/scss/material-kit-pro-react.scss?v=1.9.0";

// pages for this product

import GroupPage from "views/GroupPage/GroupPage";
import LoginPage from "views/LoginPage/LoginPage";
import AboutUsPage from "views/AboutUsPage/AboutUsPage";
import SignUpPage from "views/SignupPage/SignupPage";
import AddPostPage from "views/AddPostPage/AddPostPage";
import AddGroupPage from "views/AddGroupPage/AddGroupPage";
import AddCategoryPage from "views/AddCategoryPage/AddCategoryPage";
import CategoryPage from "views/GroupPage/CategoryPage";
import CategoriesGroupPage from "views/GroupPage/CategoriesGroupPage";
import GroupPostPage from "views/GroupPostPage/GroupPostPage";
import MainPage from "views/MainPage/MainPage";
import PresentationPage from "views/PresentationPage/PresentationPage";
import EditPostPage from "views/EditPostPage/EditPostPage";
import SearchResultsPage from "./views/SearchResultsPage/SearchResultsPage";
import ProfilePage from "views/ProfilePage/ProfilePage";

var hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      {localStorage.getItem("accessToken")?null:hist.push("/")}
      <Route path="/" exact component={PresentationPage} />
      <Route path="/login" exact component={LoginPage} />
      <Route path="/blogPost/:id" exact component={GroupPostPage} />
      <Route path="/group/id" exact component={GroupPage} />
      <Route path="/signUp" exact component={SignUpPage} />
      <Route path="/newPost/:id" exact component={AddPostPage}/>
      <Route path="/newGroup/:id" exact component={AddGroupPage}/>
      <Route path="/newCategory" exact component={AddCategoryPage}/>
      <Route path="/groupPage/:id" exact component={GroupPage}/>
      <Route path="/categoryPage/:id" exact component={CategoryPage}/>
      <Route path="/categories" exact component={CategoriesGroupPage}/>
      <Route path="/main" exact component={MainPage}/>
      <Route path="/about" exact component={AboutUsPage}/>
      <Route path="/editPost/:groupid/:postId" exact component={EditPostPage}/>
      <Route path="/searchResults/:keyword" exact component={SearchResultsPage}/>
      <Route path="/profile/:id" exact component={ProfilePage}/>
      <Route path="/register" exact component={SignUpPage}/>
    </Switch>
  </Router>,
  document.getElementById("root")
);
