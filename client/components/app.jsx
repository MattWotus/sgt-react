import React from 'react';
import Header from './header';
import GradeTable from './grade-table';
import GradeForm from './grade-form';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { grades: [] };
    this.getAllGrades = this.getAllGrades.bind(this);
    this.getAverageGrade = this.getAverageGrade.bind(this);
    this.addGrade = this.addGrade.bind(this);
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

  addGrade(newGrade) {
    const newArray = this.state.grades.slice(0, this.state.grades.length);
    fetch('/api/grades', {
      method: 'POST',
      body: JSON.stringify(newGrade)
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        newArray.push(data);
      })
      .then(() => this.setState({ grades: newArray }));
  }

  render() {
    const calculatedAverage = this.getAverageGrade();
    if (this.state.grades.length === 0) {
      return <h3>No grades Recorded</h3>;
    } else {
      return (
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <Header text="Student Grade Table" average={calculatedAverage} />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 col-xl-9">
              <GradeTable students={this.state.grades} />
            </div>
            <div className="col-lg-12 col-xl-3">
              <GradeForm onSubmit={ this.addGrade }/>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default App;
