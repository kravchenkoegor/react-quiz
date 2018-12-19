import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import './FinishedQuiz.scss';
import Button from '../UI/Button/Button';

const FinishedQuiz = (props) => {
  const successCount = Object.keys(props.results).reduce((total, key) => {
    if (props.results[key] === 'success') total++;
    return total;
  }, 0)

  return (
    <div className={'finishedQuiz'}>
      <ul>
        {
          props.quiz.map((quizItem, index) => {
            const iconClasses = [
              'fas',
              props.results[quizItem.id] === 'success' ? 'fa-check success' : 'fa-times error',
            ];

            return (
              <li key={index}>
                <strong>{index + 1}.&nbsp;</strong>
                {quizItem.question}
                <i className={iconClasses.join(' ')}/>
              </li>
            )
          })
        }
      </ul>

      <p>Правильных ответов: {successCount} из {props.quiz.length}</p>

      <div>
        <Button type={'primary'} onClick={props.onRetry}>
          Повторить
        </Button>

        <Link to={'/'}>
          <Button type={'success'}>
            К списку тестов
          </Button>
        </Link>
      </div>
    </div>
  )
}

FinishedQuiz.propTypes = {
  quiz: PropTypes.array,
  results: PropTypes.object,
  onRetry: PropTypes.func
}

export default FinishedQuiz;
