var router = require('express').Router();
const commentsRepo = require('../respositories/comments');

/* GET comment  listing. */
router.get('/', async function(req, res, next) {
  res.send(await commentsRepo.getAllComments() )
});
 
router.post('/',async function(req, res, next) {
  const { role } = req.user;
  if(role == "admin" || role == "author"){
    res.send( commentsRepo.addComment(req.body.comment) )
  }else{
    res.status(403).json({ message: 'unauthorised access!' })
  }
});

router.put('/',async function(req, res, next) {
  const { role } = req.user;
  if(role == "admin" || role == "author"){
    res.send( commentsRepo.updateComment(req.body.comment) )
  }else{
    res.status(403).json({ message: 'unauthorised access!' })
  }
});

router.get('/:id',async function(req, res, next) {
  res.send( await commentsRepo.getComment( req.params.id) );
});



router.get('/:id/article',async function(req, res, next) {
    res.send( await commentsRepo.getCommentArticle( req.params.id) );
});

router.delete('/:id',async function(req, res, next) {
  const { role } = req.user;
  if(role == "admin" || role == "author"){
    res.send( commentsRepo.deleteComment(req.params.id) );
  }else{
    res.status(403).json({ message: 'unauthorised access!' })
  }
});


module.exports = router;