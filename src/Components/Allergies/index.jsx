import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FHIR from 'fhirclient';
import moment from 'moment';
import './index.css';

const Allergies = () => {
  const [client, setClient] = useState(null);
  const [patient, setPatient] = useState(null);
  const [patientName, setPatientName] = useState('');
  const [allergies, setAllergies] = useState(null);
  const [allergiesMapped, setAllergiesMapped] = useState(null);

  useEffect(() => {
    const getClient = async () => {
      const clientData = await FHIR.oauth2.ready().catch(console.error);
      const patientData = await clientData.patient.read();
      const allergiesData = await clientData.request(
        `/AllergyIntolerance?patient=${patientData.id}`,
      );
      setClient(clientData);
      setPatient(patientData);
      setAllergies(allergiesData.entry);
    };
    getClient();
  }, []);

  useEffect(() => {
    const getName = () => {
      if (!patient) {
        return '';
      }
      const officialName = patient.name.find((name) => name.use === 'official');
      return `${officialName.given.join(' ')} ${officialName.family}`;
    };

    setPatientName(getName());
  }, [patient]);

  useEffect(() => {
    const getAllergies = () => {
      if (!allergies) return [];
      return allergies.map((allergy) => allergy.resource);
    };

    setAllergiesMapped(getAllergies());
  }, [allergies]);

  const showAllergies = () =>
    // eslint-disable-next-line implicit-arrow-linebreak
    allergiesMapped.map((allergy) => (
      <li className="allergy" key={allergy.id}>
        <div className="allergyBlock">
          <p>{`Type: ${allergy.code.text}`}</p>
          <p>{`Code: ${allergy.code.coding[0].code}`}</p>
        </div>
        <div className="allergyBlock">
          <p>{`Severity: ${allergy.criticality}`}</p>
          <p>{`Recorded on: ${moment(allergy.recordedDate).format('ll')}`}</p>
        </div>
      </li>
    ));

  return (
    <div className="paitent">
      <div className="paitentDetails">
        {patientName ? <h1>{patientName}</h1> : <h1>...Loading Patient</h1>}
        {!!patient && (
          <div className="genderDOB">
            <p>{`Gender: ${patient.gender}`}</p>
            <p>{`DOB: ${patient.birthDate}`}</p>
          </div>
        )}
      </div>
      {!!patient && !allergies && <div>This patient has no know allergies</div>}
      {!!allergies && allergies.length > 0 && (
        <ul className="allergies">
          <li className="allergiesHeader">Allergies</li>
          {showAllergies()}
        </ul>
      )}
    </div>
  );
};

export default Allergies;

Allergies.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
};

Allergies.defaultProps = {
  location: PropTypes.shape({
    search: '',
  }),
};
