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
    this.handleReset();
  }

  handleReset() {
    this.setState({ name: '', course: '', grade: '' });
    event.target.reset();
    this.props.resetSingleGrade();
  }

  render() {
    const iconStyle = {
      width: '20px',
      height: '16px'
    };
    return (
      <form onSubmit={this.handleSubmit} onReset={this.handleReset}>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1"><i className="fas fa-user" style={iconStyle}></i></span>
          </div>
          <input type="text" className="form-control" placeholder="Name" name="name" aria-label="name"
            aria-describedby="basic-addon1" defaultValue={this.props.singleGrade.name} onChange={this.handleChange} />
        </div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon2"><i className="fas fa-chalkboard" style={iconStyle}></i></span>
          </div>
          <input type="text" className="form-control" placeholder="Course" name="course" aria-label="course"
            aria-describedby="basic-addon2" defaultValue={this.props.singleGrade.course} onChange={this.handleChange} />
        </div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon3"><i className="fas fa-graduation-cap" style={iconStyle}></i></span>
          </div>
          <input type="text" className="form-control" placeholder="Grade" name="grade" aria-label="grade"
            aria-describedby="basic-addon3" defaultValue={this.props.singleGrade.grade} onChange={this.handleChange} />
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
