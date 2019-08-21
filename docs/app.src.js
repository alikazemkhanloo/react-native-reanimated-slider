
import React from 'react';
import ReactDOM from 'react-dom';
import RedBox from 'redbox-react';
import App from 'D:\react\react-native-reanimated-slider\node_modules\component-docs\dist\templates\App.js';
import data from './app.data';
import 'D:\react\react-native-reanimated-slider\node_modules\component-docs\dist\styles\reset.css';
import 'D:\react\react-native-reanimated-slider\node_modules\component-docs\dist\styles\globals.css';

import 'D:\react\react-native-reanimated-slider\assets\apsp.css';

const root = document.getElementById('root');
const render = () => {
  try {
    ReactDOM.hydrate(
      <App
        name={window.__INITIAL_PATH__}
        data={data}
        github={undefined}
        logo={undefined}
      />,
      root
    );
  } catch (e) {
    ReactDOM.render(
      <RedBox error={e} />,
      root
    );
  }
};

if (module.hot) {
  module.hot.accept(() => {
    render();
  });
}

render();
