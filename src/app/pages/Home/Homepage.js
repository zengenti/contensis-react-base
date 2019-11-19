import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setRoute } from '~/core/redux/actions/routing';

const Homepage = ({ entry, setRoute }) => {
  const changeRoute = () => {
    setRoute('/zenInfo');
  };
  return (
    <>
      <h1>Hello world {entry && entry.entryTitle}</h1>
      <Link to="/zenInfo">ZenInfo</Link>
      <button onClick={e => changeRoute(e)}>Change Route</button>
    </>
  );
};

Homepage.propTypes = {
  entry: PropTypes.object,
  setRoute: PropTypes.func,
};

const mapDispatchToProps = {
  setRoute: (path, state) => setRoute(path, state),
};
export default connect(
  null,
  mapDispatchToProps
)(Homepage);
