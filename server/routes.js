const express = require('express');
const router = express.Router();
const log = require(INCPATH + "/log")(module); //log is a function. which is called with the current model to which
const fs = require("fs");
let list;

fs.readFile("./config/articles.json", "utf8", function(err, data) {
  if (err) {
    return console.log(err);
  }
  list = data;
  list = JSON.parse(list);
});

router.route('/articles')
  .post((req, res) => {
    log.info("==Save article==");
    list.push(req.body);
    res.end(JSON.stringify(list));
  })
  .get((req, res) =>  {
    log.info("==Get all list articles==");
    res.end(JSON.stringify(list));
  })
  .delete((req, res) =>  {
    log.info("==Delete all list articles==");
    list = [];
    res.end(JSON.stringify(list));
  })
  .put((req, res) =>  {
    log.info("==Put article by id==");
    list = list.map(article => {
      if(+article.id === +req.body.id) {
        article.body.description = req.body.description;
      }
      return article;
    });
    res.end(JSON.stringify(list));
  });

router.route('/articles/:id')
  .delete((req, res) => {
    log.info('==Delete article by id==');
    list = list.filter(article => +article.id !== +req.params.id);
    res.end(JSON.stringify(list));
  })
  .get((req, res) =>  {
    log.info("==Get article by id==");
    const articleById = list.find(article => +article.id === +req.params.id);
    res.end(JSON.stringify(articleById));
  });

module.exports = router;
