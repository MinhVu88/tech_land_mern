import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import "./App.css";
import store from "./redux/store";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import LandingPage from "./components/layout/LandingPage";
import Navbar from "./components/layout/Navbar";
import Alert from "./components/layout/Alert";
import setAuthToken from "./utils/setAuthToken";
import { authActions } from "./redux/actions/authActions";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/private/PrivateRoute";
import CreateProfile from "./components/profileForms/CreateProfile";
import EditProfile from "./components/profileForms/EditProfile";
import WorkExperiences from "./components/profileForms/WorkExperiences";
import Education from "./components/profileForms/Education";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";

if (localStorage.getItem("token")) {
  setAuthToken(localStorage.getItem("token"));
}

const App = () => {
  useEffect(() => {
    const load_user = async () => await store.dispatch(authActions.loadUser());

    load_user();
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Route exact path="/" component={LandingPage} />
        <Alert />
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/profiles" component={Profiles} />
          <Route exact path="/profile/:userId" component={Profile} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute
            exact
            path="/create-profile"
            component={CreateProfile}
          />
          <PrivateRoute exact path="/edit-profile" component={EditProfile} />
          <PrivateRoute
            exact
            path="/add-experience"
            component={WorkExperiences}
          />
          <PrivateRoute exact path="/add-education" component={Education} />
          <PrivateRoute exact path="/posts" component={Posts} />
          <PrivateRoute exact path="/posts/:postId" component={Post} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
