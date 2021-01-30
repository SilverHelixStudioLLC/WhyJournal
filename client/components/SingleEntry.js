import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSingleEntryThunk } from '../store';

export class SingleEntry extends React.Component{
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const userId = this.props.userId;
    const entryId = this.props.match.params.entryId;
    this.props.getEntry(userId, entryId);
  }

  render() {
    const title = this.props.entry.title;
    const content = this.props.entry.content;
    const updatedAt = this.props.entry.updatedAt;
    return <div>
      <h1>{title}</h1>
      <h2>{updatedAt}</h2>
      <p>{content}</p>
    </div>;
  }
}

const mapStateToProps = state => {
  return {
    userId: state.user.me.id,
    entry: state.entry.single,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getEntry(userId, entryId) {dispatch(getSingleEntryThunk(userId, entryId))},
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleEntry)

SingleEntry.propTypes = {

}
