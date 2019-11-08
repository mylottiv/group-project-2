var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    // db.UserData.findAll({}).then(function(dbExamples) {
    //   res.json(dbExamples);
    // });
  });

  // Create a new example
  app.post("/api/signup", function(req, res) {
    db.UserData.create({      
      firstname:req.body.firstname,
      lastname:req.body.lastname,
      username:req.body.username,
      password:req.body.password,
      email:req.body.email,
      })
      .then(function(dbExample) {
      res.json(dbExample);
    });
  });

  app.post("/api/login", function(req, res) {
    db.UserData.count({ where: { username: req.body.username, password: req.body.password } })
    .then(count => {
      if (count != 0) {
        return res.json({username: req.body.username});
      }
      else {
        return res.json({error: "Invalid login"})
      }
      })
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.UserData.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
