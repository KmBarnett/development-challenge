import React from 'react';
import PropTypes from 'prop-types';
import FHIR from 'fhirclient';

const Allergies = ({ location }) => {
  const query = location.search;
  const client = FHIR.client('https://r4.smarthealthit.org');

  console.log(query, client);
  return <></>;
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
