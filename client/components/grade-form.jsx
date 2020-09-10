import React from 'react';

class GradeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', course: '', grade: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const newGrade = {
      name: this.state.name,
      course: this.state.course,
      grade: this.state.grade
    };
    this.props.onSubmit(newGrade);
  }

  handleReset() {
    this.setState({ name: '', course: '', grade: '' });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} onReset={this.handleReset}>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1"><i className="fas fa-user"></i></span>
          </div>
          <input type="text" className="form-control" placeholder="Name" name="name" aria-label="name"
            aria-describedby="basic-addon1" value={this.state.name} onChange={this.handleChange} />
        </div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon2"><i className="fas fa-chalkboard"></i></span>
          </div>
          <input type="text" className="form-control" placeholder="Course" name="course" aria-label="course"
            aria-describedby="basic-addon2" value={this.state.course} onChange={this.handleChange} />
        </div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon3"><i className="fas fa-graduation-cap"></i></span>
          </div>
          <input type="text" className="form-control" placeholder="Grade" name="grade" aria-label="grade"
            aria-describedby="basic-addon3" value={this.state.grade} onChange={this.handleChange} />
        </div>
        <div>
          <button id="addButton" type="submit" className="btn btn-success pl-3 pr-3 mr-2">Add</button>
          <button type="reset" className="btn btn-outline-secondary pl-3 pr-3">Cancel</button>
        </div>
      </form>
    );
  }

}

export default GradeForm;
