import React, {Component} from 'react';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import './App.scss';
import Layout from './hoc/Layout/Layout';
import Quiz from './containers/Quiz/Quiz';
import Auth from './containers/Auth/Auth';
import QuizCreator from './containers/QuizCreator/QuizCreator';
import QuizList from './containers/QuizList/QuizList';
import Logout from './components/Logout/Logout';
import {autoLogin} from './store/actions/auth';

class App extends Component {
  componentDidMount() {
    this.props.autoLogin()
  }

  render() {
    let routes = (
      <Switch>
        <Route path={'/'} exact component={QuizList} />
        <Route path={'/quiz/:id'} component={Quiz} />
        <Route path={'/auth'} component={Auth} />
        <Redirect to={'/'} />
      </Switch>
    );

    if (this.props.isLoggedIn) {
      routes = (
        <Switch>
          <Route path={'/'} exact component={QuizList} />
          <Route path={'/quiz/:id'} component={Quiz} />
          <Route path={'/create'} component={QuizCreator} />
          <Route path={'/logout'} component={Logout} />
          <Redirect to={'/'} />
        </Switch>
      );
    }

    return (
      <Layout>
        {routes}
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: Boolean(state.auth.token)
  }
}
function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
