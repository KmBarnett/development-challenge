import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
// eslint-disable-next-line max-len

// Components
import Launch from '../Launch';
import Allergies from '../Allergies';

const App = () => (
  <div>
    <Switch>
      <Route path="/launch" component={Launch} />
      <Route path="/allergies" component={Allergies} />
      <Route path="*">
        <Redirect to="/launch?launch=eyJhIjoiMSJ9&iss=https%3A%2F%2Flaunch.smarthealthit.org%2Fv%2Fr4%2Ffhir" />
      </Route>
    </Switch>
  </div>
);

export default App;
