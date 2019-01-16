import * as React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import createHashHistory from 'history/createHashHistory';
import Auth from 'client/lib/Auth';
import Dashboard from 'client/components/views/Dashboard';
//import SecureRoute from 'components/shared/SecureRoute';

const history = createHashHistory();
/* 
const SecureRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => {	
		return (
			Auth.isAuthenticated() ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/signin',
        state: { from: props.location }
      }}/>
    )
  )}}/>
) */

// import libs
const Routes = () => (
		<Switch>

			<Route path='/' component={Dashboard} />
			<Route path='/dashboard' component={Dashboard} />

		</Switch>
)

export default Routes;
