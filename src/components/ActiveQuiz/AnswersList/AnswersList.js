import React from 'react';
import PropTypes from 'prop-types';
import './AnswersList.scss';
import AnswerItem from './AnswerItem/AnswerItem';

const AnswersList = (props) => (
  <ul className={'answersList'}>
    {props.answers.map((answer, index) => {
      return (
        <AnswerItem
          key={index}
          answer={answer}
          state={props.state ? props.state[answer.id] : null}
          onAnswerClick={props.onAnswerClick}
        />
      )
    })}
  </ul>
);

AnswersList.propTypes = {
  answers: PropTypes.array
}

export default AnswersList;
