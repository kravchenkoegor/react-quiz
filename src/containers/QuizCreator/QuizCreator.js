import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addQuestion, createQuiz} from '../../store/actions/createQuiz';
import './QuizCreator.scss';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Select from '../../components/UI/Select/Select';
import {createControl, validate, validateForm} from '../../form/formControls';

function createOptionControl(number) {
  return createControl({
    label: `Вариант ${number}`,
    errorMessage: 'Введите значение',
    id: number
  }, {required: true})
}

function createFormControls() {
  return {
    question: createControl({
      label: 'Введите вопрос',
      errorMessage: 'Вопрос не может быть пустым'
    }, {required: true}),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),
  }
}

class QuizCreator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFormValid: false,
      formControls: createFormControls(),
      rightAnswerId: 1
    }
  }

  submitHandler = (event) => {
    event.preventDefault();
  }

  changeHandler = (value, controlName) => {
    const formControls = {...this.state.formControls};
    const control = {...formControls[controlName]};

    control.touched = true;
    control.value = value;
    control.valid = validate(control.value, control.validation);
    formControls[controlName] = control;

    this.setState({formControls, isFormValid: validateForm(formControls)})
  }

  addQuestionHandler = () => {
    const {question, option1, option2, option3, option4} = this.state.formControls;

    const questionItem = {
      id: this.props.quiz.length + 1,
      question: question.value,
      rightAnswerId: this.state.rightAnswerId,
      answers: [
        {text: option1.value, id: option1.id},
        {text: option2.value, id: option2.id},
        {text: option3.value, id: option3.id},
        {text: option4.value, id: option4.id},
      ]
    };

    this.props.addQuestion(questionItem);

    this.setState({
      isFormValid: false,
      formControls: createFormControls(),
      rightAnswerId: 1
    })
  }

  createQuizHandler = () => {
    this.setState({
      isFormValid: false,
      formControls: createFormControls(),
      rightAnswerId: 1
    });

    this.props.createQuiz();
  }

  selectChangeHandler = (event) => {
    this.setState({
      rightAnswerId: Number(event.target.value)
    })
  }

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];

      return (
        <React.Fragment key={controlName + index}>
          <Input
            label={control.label}
            value={control.value}
            valid={control.valid}
            shouldValidate={!!control.validation}
            touched={control.touched}
            errorMessage={control.errorMessage}
            onChange={event => this.changeHandler(event.target.value, controlName)}
          />

          {index === 0 ? <hr/> : null}
        </React.Fragment>
      )
    })
  }

  render() {
    return (
      <div className={'quizCreator'}>
        <div className={'quizCreator__wrapper'}>
          <h1>Создание теста</h1>

          <form
            className={'quizCreator__form'}
            onSubmit={this.submitHandler}
          >

            {this.renderInputs()}

            <Select
              label={'Выберите правильный ответ'}
              value={this.state.rightAnswerId}
              onChange={this.selectChangeHandler}
              options={[
                {text: '1', value: 1},
                {text: '2', value: 2},
                {text: '3', value: 3},
                {text: '4', value: 4},
              ]}
            />

            <div className={'quizCreator__buttons'}>
              <Button
                type={'success'}
                onClick={this.addQuestionHandler}
                disabled={!this.state.isFormValid}
              >
                Добавить вопрос
              </Button>

              <Button
                type={'secondary'}
                onClick={this.createQuizHandler}
                disabled={!this.props.quiz.length}
              >
                Создать тест
              </Button>
            </div>
          </form>
        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    quiz: state.createQuiz.quiz
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addQuestion: (item) => dispatch(addQuestion(item)),
    createQuiz: () => dispatch(createQuiz())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);
