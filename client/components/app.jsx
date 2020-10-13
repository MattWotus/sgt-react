import React from 'react';
import Header from './header';
import GradeTable from './grade-table';
import GradeForm from './grade-form';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grades: [],
      singleGrade:
      {
        name: '',
        course: '',
        grade: '',
        gradeId: ''
      }
    };
    this.getAllGrades = this.getAllGrades.bind(this);
    this.getAverageGrade = this.getAverageGrade.bind(this);
    this.addGrade = this.addGrade.bind(this);
    this.deleteGrade = this.deleteGrade.bind(this);
    this.getSingleGrade = this.getSingleGrade.bind(this);
    this.resetSingleGrade = this.resetSingleGrade.bind(this);
    this.updateGrade = this.updateGrade.bind(this);
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
        const grade = parseInt(this.state.grades[i].grade);
        total = total + grade;
      }
      const average = total / this.state.grades.length;
      return Math.ceil(average);
    }
  }

  addGrade(newGrade) {
    const newArray = this.state.grades.slice(0, this.state.grades.length);
    fetch('/api/grades', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newGrade)
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        newArray.push(data);
      })
      .then(() => this.setState({
        grades: newArray,
        singleGrade:
        {
          name: '',
          course: '',
          grade: '',
          gradeId: ''
        }
      }));
  }

  deleteGrade(id) {
    const newArray = this.state.grades.slice(0, this.state.grades.length);
    const updatedGrades = [];
    fetch(`/api/grades/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        for (let i = 0; i < newArray.length; i++) {
          const grade = { ...newArray[i] };
          if (grade.gradeId !== id) {
            updatedGrades.push(grade);
          }
        }
      })
      .then(() => this.setState({ grades: updatedGrades }));
  }

  getSingleGrade(id) {
    for (let i = 0; i < this.state.grades.length; i++) {
      if (this.state.grades[i].gradeId === id) {
        this.setState({
          singleGrade: {
            name: this.state.grades[i].name,
            course: this.state.grades[i].course,
            grade: this.state.grades[i].grade,
            gradeId: id
          }
        });
      }
    }
  }

  resetSingleGrade() {
    this.setState({
      singleGrade:
      {
        name: '',
        course: '',
        grade: '',
        gradeId: ''
      }
    });
  }

  updateGrade(newGrade) {
    const newArray = this.state.grades.slice(0, this.state.grades.length);
    fetch(`/api/grades/${this.state.singleGrade.gradeId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newGrade)
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        newArray.push(data);
      })
      .then(() => this.setState({
        grades: newArray,
        singleGrade:
        {
          name: '',
          course: '',
          grade: '',
          gradeId: ''
        }
      }));
  }

  render() {
    const calculatedAverage = this.getAverageGrade();
    if (this.state.grades.length === 0) {
      return (
        <div className="container-fluid">
          <Header text="Student Grade Table" average={calculatedAverage} />
          <div className="row">
            <div className="col-lg-12 col-xl-9">
              <h3>No grades Recorded</h3>
            </div>
            <div className="col-lg-12 col-xl-3">
              <GradeForm onSubmit={this.addGrade} singleGrade={this.state.singleGrade} resetSingleGrade={this.resetSingleGrade} />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container-fluid">
          <Header text="Student Grade Table" average={calculatedAverage} />
          <div className="row">
            <div className="col-lg-12 col-xl-9">
              <GradeTable students={this.state.grades} onDelete={this.deleteGrade} onUpdate={this.getSingleGrade} />
            </div>
            <div className="col-lg-12 col-xl-3">
              <GradeForm onSubmit={this.addGrade} singleGrade={this.state.singleGrade} resetSingleGrade={this.resetSingleGrade} updateGrade={this.updateGrade} />
            </div>
          </div>
        </div>
      );
    }
  }
}

export default App;
