import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Auth from 'src/lib/Auth';
import Dashboard from 'components/views/Dashboard';
//import SecureRoute from 'components/shared/SecureRoute';

//const history = createHashHistory();
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

export default function(props) {
    return (
        <Routes>
            <Route path='/' element={<Dashboard {...props} />} />
        </Routes>
    );
}

// const routes = (props) => (
//         <Routes>

//             <Route path='/' {...props}><Dashboard/></Route>
//             <Route path='/dashboard' {...props}>Dashboard</Route>

//         </Routes>
// )

// export default routes;
