import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export default class LandingPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h2>Welcome</h2>
        <p>
          Have you ever wanted to journal but needed help getting started? The
          Why Journal is designed to make it easier to start journaling. We can
          help you get started by asking you a prompt each day, and we'll keep
          track of your progress so you can keep journaling!
        </p>
        <p>
          The Why Journal was created as a collaboration between Silver Helix
          Studio LLC and The Thoughtful Beast. The development team at Silver
          Helix consisted of
          <a href="https://jonctione.github.io"> Jonathan Arreola</a> and{' '}
          <a href="https://linkedin.com/in/jsmney">Jasmine Wang</a>. The
          original conception and overall design came from{' '}
          <a href="https://thethoughtfulbeast.com">Trixi Anne Agiao</a> at The
          Thoughtful Beast.
        </p>
      </div>
    );
  }
}
