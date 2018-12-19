import React from 'react';
import PropTypes from 'prop-types';
import './AnswerItem.scss';

const AnswerItem = (props) => {
  const classes = ['answerItem'];

  if (props.state) {
    classes.push(props.state)
  }

  return (
    <li
      className={classes.join(' ')}
      onClick={() => props.onAnswerClick(props.answer.id)}
    >
      {props.answer.text}
    </li>
  )
}

AnswerItem.propTypes = {
  answer: PropTypes.object
}

export default AnswerItem;
