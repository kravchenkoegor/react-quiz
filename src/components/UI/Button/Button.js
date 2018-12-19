import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

const Button = (props) => {
  const classes = ['button', props.type];

  return (
    <button
      onClick={props.onClick}
      className={classes.join(' ')}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  )
}

Button.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool
}

export default Button;
