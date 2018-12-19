import React from 'react';
import PropTypes from 'prop-types';
import './ActiveQuiz.scss';
import AnswersList from './AnswersList/AnswersList';

const ActiveQuiz = (props) => (
  <div className={'activeQuiz'}>
    <p className={'question'}>
      <span>
        <strong>{props.activeQuestion}.&nbsp;</strong>
        {props.question}
      </span>

      <span className={'text'}>{props.activeQuestion} из {props.quizLength}</span>
    </p>

    <AnswersList
      answers={props.answers}
      onAnswerClick={props.onAnswerClick}
      state={props.state}
    />
  </div>
);

ActiveQuiz.propTypes = {
  activeQuestion: PropTypes.number,
  quizLength: PropTypes.number,
  question: PropTypes.string,
  answers: PropTypes.array
}

export default ActiveQuiz;
