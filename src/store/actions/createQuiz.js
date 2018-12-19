import {ADD_QUESTION, RESET_QUIZ} from './actionTypes';
import axios from '../../axios/axios';

export function addQuestion(item) {
  return {
    type: ADD_QUESTION,
    payload: item
  }
}

export function createQuiz() {
  return async (dispatch, getState) => {
    await axios.post('/quiz.json', getState().createQuiz.quiz);
    dispatch(resetQuiz())
  }
}

export function resetQuiz() {
  return {
    type: RESET_QUIZ
  }
}
