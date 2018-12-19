import React from 'react';
import './Loader.scss'

const Loader = props => {
  return (
    <div style={{textAlign: 'center'}}>
      <div className={'lds-ripple'}>
        <div/>
        <div/>
      </div>
    </div>
  );
};

Loader.propTypes = {

};

export default Loader;
