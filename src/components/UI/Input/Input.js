import React from 'react';
import PropTypes from 'prop-types';
import './Input.scss';

function isInvalid({valid, touched, shouldValidate}) {
  return !valid && shouldValidate && touched;
}

const Input = (props) => {
  const inputType = props.type || 'text';
  const classes = ['input'];
  const htmlFor = `${inputType}-${Math.random()}`

  // if (true) {
  //   classes.push('invalid')
  // }

  return (
    <div className={classes.join(' ')}>
      <label htmlFor={htmlFor}>{props.label}</label>
      <input
        id={htmlFor}
        type={inputType}
        value={props.value}
        onChange={props.onChange}
      />

      {
        isInvalid(props)
          ? <span>{props.errorMessage || 'Введите верное значение'}</span>
          : null
      }
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  errorMessage: PropTypes.string,
  valid: PropTypes.bool,
  touched: PropTypes.bool,
  shouldValidate: PropTypes.bool
}

export default Input;
