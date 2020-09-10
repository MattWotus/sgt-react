import React from 'react';
import Header from './header';
import GradeTable from './grade-table';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { grades: [] };
    this.getAllGrades = this.getAllGrades.bind(this);
  }

  componentDidMount() {
    this.getAllGrades();
  }

  getAllGrades() {
    fetch('/api/grades')
      .then(response => response.json())
      .then(data => this.setState({ grades: data }));
  }

  render() {
    if (this.state.grades === []) {
      return <h3>No grades Recorded</h3>;
    } else {
      return (
        <div className="container-fluid">
          <Header text="Student Grade Table" />
          <GradeTable students={this.state.grades} />
        </div>
      );
    }
  }
}

export default App;
