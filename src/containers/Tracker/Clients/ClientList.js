import React from 'react';
import { connect } from 'react-redux'

import Item from './ClientItem'

class List extends React.Component {
  render() {
    const { items } = this.props;

    return (
      <div>

        {
          items.map((item, id) => {
            return <Item key={id} item={item}/>
          })
        }

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    items: state.tracker.clients
  }
}

export default connect(
  mapStateToProps,
)(List)
