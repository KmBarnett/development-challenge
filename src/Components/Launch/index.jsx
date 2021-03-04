import React, { useEffect } from 'react';
import FHIR from 'fhirclient';
// launch=eyJhIjoiMSJ9&iss=https%3A%2F%2Flaunch.smarthealthit.org%2Fv%2Fr4%2Ffhir
const Launch = () => {
  useEffect(() => {
    FHIR.oauth2.authorize({
      clientId: 'my_web_app',
      redirectUri: '/allergies',
      scope: 'launch openid fhirUser patient/*.read',
    });
  }, []);
  return <></>;
};

export default Launch;
