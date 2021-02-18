import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getSingleEntryThunk } from '../store'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { DateTime } from 'luxon'

export class SingleEntry extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const userId = this.props.userId
    const entryId = this.props.match.params.entryId
    this.props.getEntry(userId, entryId)
  }

  render() {
    const entry = this.props.entry
    const time = DateTime.fromISO(entry.updatedAt)
    return (
      <div>
        {entry && time.c && (
          <Card>
            <CardContent>
              <h1>{entry.title}</h1>
              <h2>{`${time.c.month}/${time.c.day}/${time.c.year}`}</h2>
              <p>{entry.content}</p>
            </CardContent>
          </Card>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.user.me.id,
    entry: state.entry.single
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getEntry(userId, entryId) {
      dispatch(getSingleEntryThunk(userId, entryId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleEntry)

SingleEntry.propTypes = {
  userId: PropTypes.number.isRequired
}
