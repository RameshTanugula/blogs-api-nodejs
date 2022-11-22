const sql = require("./db/db");
// Requiring the module
const cors = require("cors");
const express = require('express');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const saltRounds = 10;
const app = express();
app.use(express.json());
var corsOptions = {
  origin: "*"
};
app.use(cors(corsOptions));
// Handling '/' request
app.post('/register', (req, res) => {
  const data = req.body;
  bcrypt.hash(data.password, saltRounds, function (err, hash) {
    if (err) {
      res.send({ error: 'something went wrong' })
    } else {
      const queryData = `('${data.name}', '${data.role}', '${data.email}', '${data.mobile}','${hash}','${data.address}')`
      let dataQuery = `insert into users(name, role, email, mobile, password, address) VALUES ${queryData};`;
      sql.query(dataQuery, (dataErr, dataResult) => {
        if (dataErr) {
          res.send({ error: `Something went wrong ${dataErr}` });
        } else {
          res.send({ res: 'Data Saved Successfully' });
        }
      });

    }
  })
});
// register
app.post('/save/posts', (req, res) => {
  const data = req.body;

  const queryData = `('${data.title}', '${data.ref_url}', '${data.category_id}', '${moment().format('YYYY-MM-DD hh:mm:ss')}', '${moment().format('YYYY-MM-DD hh:mm:ss')}', '${data.user_id}', '${data.user_name}')`
  let dataQuery = `insert into posts(title, ref_url, category_id, created_at, updated_at, user_id, user_name) VALUES ${queryData};`;
  sql.query(dataQuery, (dataErr, dataResult) => {
    if (dataErr) {
      res.send({ error: `Something went wrong ${dataErr}` });
    } else {
      res.send({ res: 'Data Saved Successfully' });
    }
  });
});
app.get('/get/categories', (req, res) => {
  let dataQuery = `select * from categories;`;
  sql.query(dataQuery, (dataErr, dataResult) => {
    if (dataErr) {
      res.send({ message: `Something went wrong ${dataErr}` });
    } else {
      res.send({ data: dataResult });
    }
  });
});
app.get('/get/posts', (req, res) => {
  let dataQuery = `select * from posts;`;
  sql.query(dataQuery, (dataErr, dataResult) => {
    if (dataErr) {
      res.send({ message: `Something went wrong ${dataErr}` });
    } else {
      res.send({ data: dataResult });
    }
  });
});
app.post('/save/categories', (req, res) => {
  const data = req.body;

  const queryData = `('${data.title}', '${moment().format('YYYY-MM-DD hh:mm:ss')}', '${moment().format('YYYY-MM-DD hh:mm:ss')}', '${data.user_id}', '${data.user_name}')`
  let dataQuery = `insert into categories(title, created_at, updated_at, user_id, user_name) VALUES ${queryData};`;
  sql.query(dataQuery, (dataErr, dataResult) => {
    if (dataErr) {
      res.send({ error: `Something went wrong ${dataErr}` });
    } else {
      res.send({ res: 'Data Saved Successfully' });
    }
  });
});
app.put('/update/categories/:id', (req, res) => {
  const data = req.body;

  const queryData = `('${data.title}', '${moment().format('YYYY-MM-DD hh:mm:ss')}', '${moment().format('YYYY-MM-DD hh:mm:ss')}', '${data.user_id}', '${data.user_name}')`
  let dataQuery = `update categories set title='${data.title}' where id=${req.params.id}`;
  sql.query(dataQuery, (dataErr, dataResult) => {
    if (dataErr) {
      res.send({ error: `Something went wrong ${dataErr}` });
    } else {
      res.send({ res: 'Data Updated Successfully' });
    }
  });
});
app.put('/update/posts/:id', (req, res) => {
  const data = req.body;
  const queryData = `('${data.title}', '${data.ref_url}', '${data.category_id}', '${moment().format('YYYY-MM-DD hh:mm:ss')}', '${moment().format('YYYY-MM-DD hh:mm:ss')}', '${data.user_id}', '${data.user_name}')`
  let dataQuery = `update posts set title='${data.title}', ref_url='${data.ref_url}', user_id='${data.user_id}', user_name='${data.user_name}'  where id=${req.params.id}`;
  sql.query(dataQuery, (dataErr, dataResult) => {
    if (dataErr) {
      res.send({ error: `Something went wrong ${dataErr}` });
    } else {
      res.send({ res: 'Data Updated Successfully' });
    }
  });
});
app.delete('/delete/categories', (req, res) => {
  const data = req.body;
  let dataQuery = `DELETE  from categories where id in (${data.ids});`;
  sql.query(dataQuery, (dataErr, dataResult) => {
    if (dataErr) {
      res.send({ error: `Something went wrong ${dataErr}` });
    } else {
      res.send({ res: 'Data Deleted Successfully' });
    }
  });
});
app.delete('/delete/posts', (req, res) => {
  const data = req.body;
  let dataQuery = `DELETE  from posts where id in (${data.ids});`;
  sql.query(dataQuery, (dataErr, dataResult) => {
    if (dataErr) {
      res.send({ error: `Something went wrong ${dataErr}` });
    } else {
      res.send({ res: 'Data Deleted Successfully' });
    }
  });
});
// login
app.post('/admin/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (email && password) {

    let query = `select * from users where email ='${email}' and password='${password}'`;
    sql.query(query, (err, result) => {
      if (result?.length > 0) {
        res.status(200);
        res.send({ message: "logged in Successfully", data: { user_id: result[0].user_id, user_name: result[0].email } });
      } else {
        res.status(400);
        res.send({ message: `Something went wrong` });
      }
    });
  } else {
    res.send({ message: 'Login falied' })
  }
});
app.listen(3000, () => {
  console.log('server listening on port 3000');
});