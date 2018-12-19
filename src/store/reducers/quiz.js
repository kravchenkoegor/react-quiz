import {
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZES_END,
  FETCH_QUIZ_BY_ID_SUCCESS,
  QUIZ_SET_STATE,
  FINISH_QUIZ,
  NEXT_QUESTION,
  RETRY_QUIZ
} from '../actions/actionTypes';

const initialState = {
  quizes: [],
  loading: false,
  error: null,
  isFinished: false,
  activeQuestion: 0,
  answerState: null,
  quiz: null,
  results: {}
}

export default function quizReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_QUIZES_START:
      return {
        ...state,
        loading: true
      }
    case FETCH_QUIZES_SUCCESS:
      return {
        ...state,
        loading: false,
        quizes: action.payload
      }
    case FETCH_QUIZES_END:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case FETCH_QUIZ_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        quiz: action.payload
      }
    case QUIZ_SET_STATE:
      return {
        ...state,
        answerState: action.payload.answerState,
        results: action.payload.results
      }
    case FINISH_QUIZ:
      return {
        ...state,
        isFinished: true
      }
    case NEXT_QUESTION:
      return {
        ...state,
        activeQuestion: action.payload,
        answerState: null
      }
    case RETRY_QUIZ:
      return {
        ...state,
        activeQuestion: 0,
        answerState: null,
        isFinished: false,
        results: {}
      }
    default:
      return state
  }
}
