import React, { useEffect } from "react";
import { Route, Switch, Router } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
import { ToastContainer } from "react-toastify";

// HOC
import PrivateRoute from "~hoc/PrivateRoute";
import PublicRoute from "~hoc/PublicRoute";

// Routes
import Landing from "~containers/Intro/Landing";
import LandingDemo from "~containers/Intro/LandingDemo";
import ViewJobs from "~containers/Intro/ViewJobs";
import Login from "~containers/Auth/Login";
import ForgetPassword from "~containers/Auth/ForgetPassword";
import Dashboard from "~containers/Dashboard/Dashboard";
import Registration from "~containers/Registration/Registration";
import Membership from "~containers/Dashboard/Membership";
import Settings from "~containers/Settings/Settings";
import Job from "~containers/Jobs/Job";
import Carear from "~containers/Jobs/Carear";
import AddJob from "~containers/Jobs/AddJob";
import ActivateUser from "~containers/Auth/ActivateUser";
import UpdatePassword from "~containers/Auth/UpdatePassword";
import JobDetail from "~containers/Jobs/JobDetail";
import RegistrationChoosePlan from "~containers/Registration/RegistrationChoosePlan";
import Pricing from "~containers/Registration/Pricing";
import CoWorkers from "~containers/Dashboard/CoWorkers";
import Pay from "~containers/Pay/Pay";
import CheckPayment from "~containers/Pay/CheckPayment";
import MyWebsite from "~containers/Dashboard/MyWebsite";
import VerificationCompany from "~containers/Dashboard/VerificationCompany";
import AllJobs from "../src/containers/Intro/AllJobs/AllJobs";
import StartUpHub from "../src/containers/Intro/StartJobs/StartUpHub";
import history from "./history";
import StartHiring from "../src/containers/Intro/StartHiring";
import SponserdCompany from "~components/sponserd";
import CreateSponserd from "~components/sponserd/createSponserd";
function App() {
  // This function to imit AOS library which creates animation in the landing page
  useEffect(() => {
    AOS.init({
      duration: 1500,
    });
  });

  return (
    <>
      <ToastContainer />

      <Router history={history}>
        <Switch>
          <Route exact path="/demo" component={Landing} />
          <Route exact path="/alljobs" component={AllJobs} />
          <Route exact path="/company/carear/:id" component={Carear} />
          <Route exact path="/startuphubkhobar" component={StartUpHub} />
          <Route exact path="/starthiring" component={StartHiring} />
          <Route exact path="/view" component={ViewJobs} />
          <PublicRoute exact path="/" component={LandingDemo} />
          <PublicRoute exact path="/login" component={Login} />
          <PublicRoute
            exact
            path="/forget-password"
            component={ForgetPassword}
          />
          <Route exact path="/activate" component={ActivateUser} />
          <Route exact path="/update-password" component={UpdatePassword} />
          <Route exact path="/registration" component={Registration} />
          <Route
            exact
            path="/plans"
            component={RegistrationChoosePlan}
          />
          <Route
            exact
            path="/pricing"
            component={Pricing}
          />
          <Route exact path="/pay" component={Pay} />
          <Route exact path="/check-status" component={CheckPayment} />
          <PrivateRoute path="/dashboard" component={Job} />
          <PrivateRoute path="/sponserd/create" component={CreateSponserd} />
          <PrivateRoute path="/sponserd" component={SponserdCompany} />
          <PrivateRoute path="/membership" component={Membership} />
          <PrivateRoute path="/coworkers" component={CoWorkers} />
          <PrivateRoute path="/settings" component={Settings} />
          <PrivateRoute path="/my-website" component={MyWebsite} />
          <Route path="/iframe/:id" component={MyWebsite} />
          <PrivateRoute path="/verification" component={VerificationCompany} />
          {/* <PrivateRoute exact path='/jobs' component={Job} /> */}
          <PrivateRoute exact path="/jobs/add" component={AddJob} />
          <PrivateRoute exact path="/jobs/edit/:id" component={AddJob} />
          <PrivateRoute exact path="/jobs/repost/:id" component={AddJob} />
          <PrivateRoute exact path="/job/detail/:id" component={JobDetail} />
          <Route path="" component={() => <h2>not found</h2>} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
