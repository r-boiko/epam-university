const express = require('express');
const router = express.Router();
const log = require(INCPATH + "/log")(module); //log is a function. which is called with the current model to which
const fs = require("fs");
const ArticleModel = require(INCPATH + '/mongoose').Article;
let list;

fs.readFile("./config/articles.json", "utf8", function (err, data) {
  if (err) {
    return console.log(err);
  }
  list = data;
  list = JSON.parse(list);
});

router.route('/articles')
  .post((req, res) => {
    new ArticleModel(req.body).save((err, article) => {
      if (err) {
        log.error('==Error post article in Mongo==');
      } else {
        log.info("==Save article==");
        res.end(JSON.stringify(article));
      }
    });
  })
  .get((req, res) => {
    ArticleModel.find((err, article) => {
      if (err) {
        log.error('==Error find article in Mongo==');
      } else {
        log.info("==Get all list articles==");
        res.end(JSON.stringify(article));
      }
    });
  })
  .delete((req, res) => {
    ArticleModel.remove((err, response) => {
      if (err) {
        log.error('==Error delete all articles in collection==');
      } else {
        log.info("==Delete all articles==");
        res.end(JSON.stringify(response));
      }
    });
  });

router.route('/articles/:id')
  .get(async function (req, res) {
    log.info("==Get article by id==");
    const articleById = await ArticleModel.find({id: req.params.id});
    res.end(JSON.stringify(articleById));
  })
  .put(async function (req, res) {
    log.info("==Put article by id==");
    // const articleById = await ArticleModel.updateOne({id: req.params.id}, {body: req.body.description});
    res.send(JSON.stringify(articleById));
  })
  .delete(async function (req, res) {
    log.info('==Delete article by id==');
    const result = await ArticleModel.deleteOne({id: req.params.id});
    res.end(JSON.stringify(result));
  });

module.exports = router;
