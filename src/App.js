import React from 'react';
import { Route, Switch } from 'react-router-dom';

// HOC
import PrivateRoute from '~hoc/PrivateRoute';
import PublicRoute from '~hoc/PublicRoute';

// Routes
import Landing from '~containers/Intro/Landing';
import Login from '~containers/Auth/Login';
import ForgetPassword from '~containers/Auth/ForgetPassword';
import Dashboard from '~containers/Dashboard/Dashboard';
import Registration from '~containers/Registration/Registration';
import Membership from '~containers/Dashboard/Membership';
import Settings from '~containers/Settings/Settings';
import Job from '~containers/Jobs/Job';
import AddJob from '~containers/Jobs/AddJob';
import ActivateUser from '~containers/Auth/ActivateUser';
import UpdatePassword from '~containers/Auth/UpdatePassword';
import JobDetail from '~containers/Jobs/JobDetail';
import RegistrationChoosePlan from '~containers/Registration/RegistrationChoosePlan';
import CoWorkers from '~containers/Dashboard/CoWorkers';
import Pay from '~containers/Pay/Pay';
import CheckPayment from '~containers/Pay/CheckPayment';
import MyWebsite from '~containers/Dashboard/MyWebsite';
import VerificationCompany from '~containers/Dashboard/VerificationCompany';

function App() {
  return (
    <>
      <Switch>
        <PublicRoute exact path="/" component={Landing} />
        <PublicRoute exact path="/login" component={Login} />
        <PublicRoute exact path="/forget-password" component={ForgetPassword} />
        <Route exact path="/activate" component={ActivateUser} />
        <Route exact path="/update-password" component={UpdatePassword} />
        <PublicRoute exact path="/registration" component={Registration} />
        <PublicRoute
          exact
          path="/registration/plan"
          component={RegistrationChoosePlan}
        />
        <Route exact path="/pay" component={Pay} />
        <Route exact path="/check-status" component={CheckPayment} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/membership" component={Membership} />
        <PrivateRoute path="/coworkers" component={CoWorkers} />
        <PrivateRoute path="/settings" component={Settings} />
        <PrivateRoute path="/my-website" component={MyWebsite} />
        <Route path="/iframe/:id" component={MyWebsite} />
        <PrivateRoute path="/verification" component={VerificationCompany} />
        <PrivateRoute exact path="/jobs" component={Job} />
        <PrivateRoute exact path="/jobs/add" component={AddJob} />
        <PrivateRoute exact path="/job/detail/:id" component={JobDetail} />
        <Route path="" component={() => <h2>not found</h2>} />
      </Switch>
    </>
  );
}

export default App;
