import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class LandingPage extends Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <h1> Welcome </h1>
        <p>
          Have you ever wanted to journal but needed help getting started? The
          Why Journal is designed to make it easier to start journaling. We can
          help you get started by asking you a prompt each day, and we'll keep
          track of your progress so you can keep journaling!
        </p>
      </div>
    );
  }
}
