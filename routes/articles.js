var express = require('express');
var router = express.Router();
const articlesRepo = require('../respositories/articles')
router.get('/', async function(req, res, next) {
    res.send(await articlesRepo.getArticles( req.query.offset, req.query.limit))
  });
   
  router.post('/',async function(req, res, next) {
    const { role } = req.user;
    if(role == "admin" || role == "author"){
      res.send( articlesRepo.addArticle(req.body.article) )
    }else{
      res.status(403).json({ message: 'unauthorised access!' })
    }  
  });
  
  router.put('/',async function(req, res, next) {
    const { role } = req.user;
    if(role == "admin" || role == "author"){
      res.send( articlesRepo.updateArticle(req.body.article) )
    }else{
      res.status(403).json({ message: 'unauthorised access!' })
    }
  });
  
  router.get('/count',async function(req, res, next) {
    res.send( { num: await articlesRepo.numberOfArticles() } );
  });
  
  router.get('/:id',async function(req, res, next) {
    res.send( await articlesRepo.getArticle( req.params.id).then( res=> res) );
  });
  
  router.get('/:id/user',async function(req, res, next) {
      res.send( await articlesRepo.getArticleUser( req.params.id) );
  });
  
  router.get('/:id/comments',async function(req, res, next) {
      res.send( await articlesRepo.getArticleComments( req.params.id) );
  });
  
  router.get('/:id/tags',async function(req, res, next) {
      res.send( await articlesRepo.getArticleTags( req.params.id) );
  });
  
  router.delete('/:id',async function(req, res, next) {
    const { role } = req.user;
  if(role == "admin" || role == "author"){
    res.send( articlesRepo.deleteArticle(req.params.id) );
  }else{
    res.status(403).json({ message: 'unauthorised access!' })
  }
  });
  
  
  module.exports = router;