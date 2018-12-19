import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Quiz.scss';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import Loader from '../../components/UI/Loader/Loader';
import {answerClick, fetchQuizById, retryQuiz} from '../../store/actions/quiz';

class Quiz extends Component {
  componentDidMount() {
    this.props.fetchQuizById(this.props.match.params.id)
  }

  componentWillUnmount() {
    this.props.retryQuiz()
  }

  render() {
    return (
      <div className={'quiz'}>
        <div className={'quiz__wrapper'}>
          <h1>Ответьте на вопросы</h1>

          {
            this.props.loading || !this.props.quiz
            ? <Loader/>
            : this.props.isFinished
              ? <FinishedQuiz
                  quiz={this.props.quiz}
                  results={this.props.results}
                  onRetry={this.props.retryQuiz}
                />
              : <ActiveQuiz
                  question={this.props.quiz[this.props.activeQuestion].question}
                  answers={this.props.quiz[this.props.activeQuestion].answers}
                  onAnswerClick={this.props.answerClick}
                  quizLength={this.props.quiz.length}
                  activeQuestion={this.props.activeQuestion + 1}
                  state={this.props.answerState}
                />

          }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isFinished: state.quiz.isFinished,
    activeQuestion: state.quiz.activeQuestion,
    answerState: state.quiz.answerState,
    quiz: state.quiz.quiz,
    results: state.quiz.results,
    loading: state.quiz.loading
  }
}


function mapDispatchToProps(dispatch) {
  return {
    fetchQuizById: (id) => dispatch(fetchQuizById(id)),
    answerClick: (answerId) => dispatch(answerClick(answerId)),
    retryQuiz: () => dispatch(retryQuiz())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
