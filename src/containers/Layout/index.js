import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  AppBreadcrumb,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';

// routes config
import routes from '../../_routes';
import nav from '../../_nav';

import Header from './Header';
import UserFetchRetry from './UserFetchRetry';
import Spinner from './Spinner';

import { fetchUser } from '../Profile/actions';


class Layout extends Component {

  componentDidMount() {
    this.props.handleFetchUser()
  }

  render() {

    const undefinedObject = (obj) => (typeof(obj) === 'undefined')
    const emptyOject = (obj) => (Object.keys(obj).length === 0 && obj.constructor === Object)

    if (this.props.profile.userFetchError) {
      return <UserFetchRetry handleFetchUser={this.props.handleFetchUser}/>
    }

    if (undefinedObject(this.props.profile.user) || emptyOject(this.props.profile.user)) {
      return <Spinner />
    }

    return (
      <div className="app">
        <AppHeader fixed>
          <Header />
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <AppSidebarNav navConfig={nav(this.props.profile.user.groups)} {...this.props} />
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes}/>
            <Container fluid className="container-full-height">
              <Switch>
                {routes.map((route, idx) => {
                    return route.component ? (<Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
                        <route.component {...props} />
                      )} />)
                      : (null);
                  },
                )}
                <Redirect from="/" to="/home" />
              </Switch>
            </Container>
          </main>
        {/* {
          <AppAside fixed hidden>
            <Aside />
          </AppAside> 
        } */}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    profile: state.profile,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleFetchUser: bindActionCreators(fetchUser, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);
