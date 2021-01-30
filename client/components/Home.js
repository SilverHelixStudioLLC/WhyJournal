import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getEntryCountThunk } from '../store';

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { userId, entryCount, email, getEntryCount } = props;

  useEffect(() => {
    getEntryCount(userId);
  }, []);

  return (
    <div>
      <h3>Welcome, {email}</h3>
      <p>You have {entryCount} entries. </p>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    userId: state.user.me.id,
    entryCount: state.entry.count,
    email: state.user.me.email,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getEntryCount(userId) {
      dispatch(getEntryCountThunk(userId));
    },
  };
};

export default connect(mapState, mapDispatch)(Home);

/**
 * PROP TYPES
 */
Home.propTypes = {
  email: PropTypes.string,
};
