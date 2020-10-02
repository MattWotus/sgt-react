require('dotenv/config');
const express = require('express');
const pg = require('pg');
const app = express();

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL
});

const json = express.json();

app.use(json);

app.get('/api/grades', (req, res, next) => {
  const sql = `
    select *
      from "grades"
  `;
  db.query(sql)
    .then(result => {
      return res.status(200).json(result.rows);
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({
        error: 'An unexpected error occured.'
      });
    });
});

app.post('/api/grades', (req, res, next) => {
  if (req.body.name && req.body.course) {
    const grade = parseInt(req.body.grade, 10);
    if (!Number.isInteger(grade) || grade < 0) {
      return res.status(400).json({
        error: '"grade" must be a positive integer'
      });
    }
    const sql = `
    insert into "grades" ("name", "course", "grade")
    values ($1, $2, $3)
    returning *
  `;
    const params = [req.body.name, req.body.course, req.body.grade];
    db.query(sql, params)
      .then(result => {
        return res.status(201).json(result.rows[0]);
      })
      .catch(err => {
        console.error(err);
        return res.status(500).json({
          error: 'An unexpected error occured.'
        });
      });
  } else {
    return res.status(400).send();
  }
});

app.put('/api/grades/:gradeId', (req, res, next) => {
  if (req.body.name && req.body.course) {
    const gradeId = parseInt(req.params.gradeId, 10);
    if (!Number.isInteger(gradeId) || gradeId <= 0) {
      return res.status(400).json({
        error: '"gradeId" must be a positive integer'
      });
    }
    const sql = `
    update "grades"
      set "name" = $1,
          "course" = $2,
          "grade" = $3
    where "gradeId" = $4
    returning *
  `;
    const params = [req.body.name, req.body.course, req.body.grade, gradeId];
    db.query(sql, params)
      .then(result => {
        const grade = result.rows[0];
        if (!grade) {
          return res.status(404).json({
            error: `Cannot find grade with "gradeId" ${gradeId}`
          });
        } else {
          return res.status(200).json(grade);
        }
      })
      .catch(err => {
        console.error(err);
        return res.status(500).json({
          error: 'An unexpected error occured.'
        });
      });
  } else {
    return res.status(400).send();
  }
});

app.delete('/api/grades/:gradeId', (req, res, next) => {
  const gradeId = parseInt(req.params.gradeId, 10);
  if (!Number.isInteger(gradeId) || gradeId <= 0) {
    return res.status(400).json({
      error: '"gradeId" must be a positive integer'
    });
  }
  const sql = `
    delete from "grades"
      where "gradeId" = $1
    returning *
  `;
  const params = [gradeId];
  db.query(sql, params)
    .then(result => {
      const grade = result.rows[0];
      if (!grade) {
        return res.status(404).json({
          error: `Cannot find grade with "gradeId" ${gradeId}`
        });
      } else {
        return res.status(204).send();
      }
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({
        error: 'An unexpected error occured.'
      });
    });
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express server listening on port ${process.env.PORT}`);
});
