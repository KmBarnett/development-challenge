import React, { useCallback, useEffect, useState } from 'react';
import FHIR from 'fhirclient';

const App = () => {
  const client = FHIR.client('https://r4.smarthealthit.org/');
  const [patients, setPatient] = useState([]);

  const getPatient = useCallback(async () => {
    try {
      const patientsList = await client.request('Patient');
      setPatient(patientsList.entry);
      console.log(patients);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  });

  useEffect(() => {
    getPatient();
  }, []);

  return <div> hello world</div>;
};

export default App;
