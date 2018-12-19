import axios from '../../axios/axios';
import {
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZES_END,
  FETCH_QUIZ_BY_ID_SUCCESS,
  QUIZ_SET_STATE,
  FINISH_QUIZ,
  NEXT_QUESTION,
  RETRY_QUIZ
} from './actionTypes';

export function fetchQuizes() {
  return async (dispatch) => {
    dispatch(fetchQuizesStart());

    try {
      const {data} = await axios.get('/quiz.json');
      const quizes = [];

      Object.keys(data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `Тест №${index + 1}`
        })
      });

      dispatch(fetchQuizesSuccess(quizes));
    } catch (e) {
      dispatch(fetchQuizesError(e));
      console.error(e);
    }
  }
}

export function fetchQuizById(quizId) {
  return async (dispatch) => {
    dispatch(fetchQuizesStart());

    try {
      const {data} = await axios.get(`/quiz/${quizId}.json`);
      dispatch(fetchQuizByIdSuccess(data));
    } catch (e) {
      dispatch(fetchQuizesError(e));
      console.error(e);
    }
  }
}

export function fetchQuizesStart() {
  return {
    type: FETCH_QUIZES_START
  }
}

export function fetchQuizesSuccess(quizes) {
  return {
    type: FETCH_QUIZES_SUCCESS,
    payload: quizes
  }
}

export function fetchQuizesError(error) {
  return {
    type: FETCH_QUIZES_END,
    payload: error
  }
}

export function fetchQuizByIdSuccess(quiz) {
  return {
    type: FETCH_QUIZ_BY_ID_SUCCESS,
    payload: quiz
  }
}

export function answerClick(answerId) {
  return (dispatch, getState) => {
    const state = getState().quiz;

    if (state.answerState) {
      const key = Object.keys(state.answerState)[0];
      if (state.answerState[key] === 'success') return;
    }

    const question = state.quiz[state.activeQuestion];
    const results = state.results;

    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = 'success';
      }

      dispatch(quizSetState(
        {[answerId]: 'success'},
        results
      ));

      const timeOut = window.setTimeout(() => {
        if (state.activeQuestion + 1 === state.quiz.length) {
          dispatch(finishQuiz())
        } else {
          dispatch(nextQuestion(state.activeQuestion + 1))
        }

        window.clearTimeout(timeOut);
      }, 1000);
    } else {
      results[question.id] = 'error';
      dispatch(quizSetState(
        {[answerId]: 'error'},
        results
      ));
    }
  }
}

export function quizSetState(answerState, results) {
  return {
    type: QUIZ_SET_STATE,
    payload: {
      answerState,
      results
    }
  }
}

export function finishQuiz() {
  return {
    type: FINISH_QUIZ
  }
}

export function nextQuestion(activeQuestion) {
  return {
    type: NEXT_QUESTION,
    payload: activeQuestion
  }
}

export function retryQuiz() {
  return {
    type: RETRY_QUIZ
  }
}
