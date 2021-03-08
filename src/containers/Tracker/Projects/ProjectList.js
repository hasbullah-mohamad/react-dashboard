import React from 'react';
import { connect } from 'react-redux'
import Item from './ProjectItem'

class List extends React.Component {

  render() {
    const { projects } = this.props;

    return (
      <div>
        {
          projects
          .sort((a, b) => {
            a = new Date(a.lastDate)
            b = new Date(b.lastDate)
            return a>b ? -1 : a<b ? 1 : 0;
          })
          .map((item, id) => {
            return <Item key={id} item={item}/>
          })
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    projects: state.tracker.projects
  }
}

export default connect(
  mapStateToProps
)(List)
