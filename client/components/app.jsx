import React from 'react';
import Header from './header';
import GradeTable from './grade-table';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { grades: [] };
    this.getAllGrades = this.getAllGrades.bind(this);
    this.getAverageGrade = this.getAverageGrade.bind(this);
  }

  componentDidMount() {
    this.getAllGrades();
  }

  getAllGrades() {
    fetch('/api/grades')
      .then(response => response.json())
      .then(data => this.setState({ grades: data }));
  }

  getAverageGrade() {
    let total = 0;
    if (this.state.grades.length === 0) {
      return 0;
    } else {
      for (let i = 0; i < this.state.grades.length; i++) {
        total = total + this.state.grades[i].grade;
      }
      const average = total / this.state.grades.length;
      return average;
    }
  }

  render() {
    const calculatedAverage = this.getAverageGrade();
    if (this.state.grades.length === 0) {
      return <h3>No grades Recorded</h3>;
    } else {
      return (
        <div className="container-fluid">
          <Header text="Student Grade Table" average={calculatedAverage} />
          <GradeTable students={this.state.grades} />
        </div>
      );
    }
  }
}

export default App;
