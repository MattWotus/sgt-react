import React from 'react';

function Grade(props) {
  const name = props.name;
  const course = props.course;
  const grade = props.grade;
  const deleteGrade = <button onClick={() => props.deleteGrade(props.gradeId)} className="btn btn-danger">Delete</button>;
  const updateGrade = <button onClick={() => props.updateGrade(props.gradeId)} className="btn btn-info">Update</button>;
  return (
    <tr>
      <td>{name}</td>
      <td>{course}</td>
      <td>{grade}</td>
      <td><div className='buttons'>{deleteGrade} {updateGrade}</div></td>
    </tr>
  );
}

function GradeTable(props) {
  if (props.students.length === 0) {
    return (
      <div>
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Student</th>
              <th>Course</th>
              <th>Grade</th>
              <th>Operations</th>
            </tr>
          </thead>
        </table>
        <p>No Grades Recorded</p>
      </div>
    );
  } else {
    return (
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Student</th>
            <th>Course</th>
            <th>Grade</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {
            props.students.map(grade => {
              return (
                <Grade
                  key={grade.gradeId}
                  gradeId={grade.gradeId}
                  name={grade.name}
                  course={grade.course}
                  grade={grade.grade}
                  deleteGrade={props.onDelete}
                  updateGrade={props.onUpdate} />
              );
            })
          }
        </tbody>
      </table>
    );
  }
}

export default GradeTable;
