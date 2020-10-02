import React from 'react';

function Grade(props) {
  const name = props.name;
  const course = props.course;
  const grade = props.grade;
  const deleteGrade = <button onClick={() => props.deleteGrade(props.gradeId)} className="btn btn-danger">Delete</button>;
  const updateGrade = <button className="btn btn-info">Update</button>;
  return (
    <tr>
      <td>{name}</td>
      <td>{course}</td>
      <td>{grade}</td>
      <td>{deleteGrade} {updateGrade}</td>
    </tr>
  );
}

function GradeTable(props) {
  return (
    <table className="table table-striped table-bordered">
      <thead className="thead-dark">
        <tr>
          <th>Student Name</th>
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
                deleteGrade={props.onDelete} />
            );
          })
        }
      </tbody>
    </table>
  );
}

export default GradeTable;
