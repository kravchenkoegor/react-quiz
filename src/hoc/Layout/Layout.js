import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Layout.scss';
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle';
import Drawer from '../../components/Navigation/Drawer/Drawer';

class Layout extends Component {
  constructor (props) {
    super(props);

    this.state = {
      menu: false
    }
  }

  toggleMenu = () => {
    this.setState({menu: !this.state.menu})
  }

  onMenuClose = () => {
    this.setState({menu: false})
  }

  render() {
    return (
      <div className={'layout'}>
        <Drawer
          isOpen={this.state.menu}
          onClose={this.onMenuClose}
          isLoggedIn={this.props.isLoggedIn}
        />

        <MenuToggle
          isOpen={this.state.menu}
          onToggle={this.toggleMenu}
        />

        <main className={'main'}>
          {this.props.children}
        </main>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: Boolean(state.auth.token)
  }
}

export default connect(mapStateToProps)(Layout);
