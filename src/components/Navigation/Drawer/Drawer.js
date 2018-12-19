import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import './Drawer.scss';
import Backdrop from '../../UI/Backdrop/Backdrop';

class Drawer extends Component {
  clickHandler = () => {
    this.props.onClose()
  }

  renderLinks(links) {
    return (
      links.map((link, index) => {
        return (
          <li key={index}>
            <NavLink
              to={link.to}
              exact={link.exact}
              onClick={this.clickHandler}
            >{link.label}</NavLink>
          </li>
        )
      })
    )
  }

  render() {
    const classes = ['drawer'];

    if (!this.props.isOpen) classes.push('closed');

    let links = [{to: '/', label: 'Все тесты', exact: true}]

    if (this.props.isLoggedIn) {
      links.push(
        {to: '/create', label: 'Создать тест', exact: false},
        {to: '/logout', label: 'Выйти', exact: false},
      )
    } else {
      links.push({to: '/auth', label: 'Авторизация', exact: false})
    }

    return (
      <React.Fragment>
        <nav className={classes.join(' ')}>
          <ul>
            {this.renderLinks(links)}
          </ul>
        </nav>

        {this.props.isOpen ? <Backdrop onClick={this.props.onClose}/> : null}
      </React.Fragment>

    )
  }
}

Drawer.propTypes = {
  onClose: PropTypes.func,
  isOpen: PropTypes.bool,
  isLoggedIn: PropTypes.bool
}

export default Drawer;
