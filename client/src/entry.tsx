import 'react-hot-loader/patch';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';
import App from 'client/components/App';

//const AppWithRouter = withRouter(props => <App {...props} />);

ReactDOM.render(
  <AppContainer>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    //const App = require('./components/App');
    ReactDOM.render(
	  <AppContainer>
        <BrowserRouter>
            <App />
        </BrowserRouter>
	  </AppContainer>,
      document.getElementById('root')
    );
  });
}
