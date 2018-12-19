import React from 'react';
import PropTypes from 'prop-types';
import './MenuToggle.scss';

const MenuToggle = (props) => {
  const classes = ['menuToggle', 'fas'];

  if (props.isOpen === true) classes.push('fa-times', 'open');
  else classes.push('fa-bars')

  return (
    <i
      className={classes.join(' ')}
      onClick={props.onToggle}
    />
  )
}

MenuToggle.propTypes = {
  isOpen: PropTypes.bool,
  onToggle: PropTypes.func
}

export default MenuToggle;
