import React, { Component } from 'react';

export default class App extends Component {
  state = { 
    quiz : [],
    currentIndex : 0,
    selectedAnswer : "",
    correctAnswers: 0,
  }

  onSiteChanged = (e) => {
    this.setState({
      selectedAnswer: e.currentTarget.value
    });
  }

  componentDidMount() {  
    var url = './scripts/quiz/quiz.json';
  
    fetch(url)
    .then(response => response.json())
    .then(responseJson => {
      this.setState({ quiz: responseJson});
    });  
  }

  getNextQuestion = () => {
    if(this.state.currentIndex < this.state.quiz.length) {
      this.setState({
        currentIndex: this.state.currentIndex + 1,
        selectedAnswer : "",
      });
    }

    if(this.state.selectedAnswer === this.state.quiz[this.state.currentIndex].correctAnswer) {
      this.setState({
        correctAnswers: this.state.correctAnswers + 1,
      });
    }
  }

  restartQuiz = () => {
    this.setState({
      currentIndex : 0,
      selectedAnswer : "",
      correctAnswers: 0,
    });
  }

  render() {

    if(this.state.currentIndex > this.state.quiz.length) return (
      <div>Slut på frågor</div>
    );
    
    if(this.state.quiz[this.state.currentIndex] === undefined) return (
      <div className="wrapper">
        <div className="content">          
          
          <p>Du hade {this.state.correctAnswers} rätt av {this.state.quiz.length} möjliga!</p>

          <button onClick={this.restartQuiz}>Kör igen</button>
        </div>
      </div>

    );

    const answers = [];

    var ArrayOfAnswers = this.state.quiz[this.state.currentIndex].answers;

    for (const [key, value] of Object.entries(ArrayOfAnswers)) {
      answers.push(<div className="radio-container" key={key}><input type="radio" name="answer" value={key} checked={this.state.selectedAnswer === key} 
        onChange={this.onSiteChanged}  id={key} /><label htmlFor={key} >{value}</label><div className="check"></div></div>);
    }

    return (
      <div className="wrapper">
        <div className="content">          
          <h1>{this.state.quiz[this.state.currentIndex].question}</h1>

          {answers}

          <button onClick={this.getNextQuestion} disabled={!this.state.selectedAnswer}>Nästa fråga</button>
        </div>
      </div>
    );
  }
}


