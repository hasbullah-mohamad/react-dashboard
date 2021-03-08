import React from 'react';

import { connect } from 'react-redux'

import { Card, CardBody } from 'reactstrap';


const Home = ({profile}) => {
  return (
    <Card>
      <CardBody>
        <h2>
          Hello, { profile.user.firstName } {profile.user.lastName}
        </h2>
      </CardBody>
    </Card>
  )
}

function mapStateToProps(state) {
  return {
    profile: state.profile,
  }
}

export default connect(
  mapStateToProps
)(Home);
