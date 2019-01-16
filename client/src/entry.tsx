import 'react-hot-loader/patch';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from 'client/components/App';
import { BrowserRouter, withRouter } from 'react-router-dom';
//import '../../globals'; // global function definitions

const AppWithRouter = withRouter(props => <App {...props} />);

ReactDOM.render(
  <AppContainer>
    <BrowserRouter>
      <AppWithRouter />
    </BrowserRouter>
  </AppContainer>,
  document.getElementById('root')
);

// Hot Module Replacement API 
// Note: React Router v4 will throw an error saying you can't replace routes or history on the Router object
// This is unavoidable for now.
if (module.hot) {
  module.hot.accept('./components/App', () => {
    //const App = require('./components/App');
    ReactDOM.render(
	  <AppContainer>
      <BrowserRouter>
	      <AppWithRouter />
      </BrowserRouter>
	  </AppContainer>,
      document.getElementById('root')
    );
  });
}
