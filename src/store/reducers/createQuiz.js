import {ADD_QUESTION, RESET_QUIZ} from '../actions/actionTypes';

const initialState = {
  quiz: []
}

export default function createQuizReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_QUESTION:
      return {
        ...state,
        quiz: [...state.quiz, action.payload]
      }
    case RESET_QUIZ:
      return {
        ...state,
        quiz: []
      }
    default:
      return state;
  }
}
