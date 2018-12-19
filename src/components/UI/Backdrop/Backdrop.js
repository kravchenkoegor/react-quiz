import React from 'react';
import PropTypes from 'prop-types';
import './Backdrop.scss';

const Backdrop = (props) => (
  <div className={'backdrop'} onClick={props.onClick} />
)

Backdrop.propTypes = {
  onClick: PropTypes.func
}

export default Backdrop;
