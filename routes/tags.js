var router = require('express').Router();
const tagsRepo = require('../respositories/tags');

/* GET tags listing. */
router.get('/', async function(req, res, next) {
  res.send(await tagsRepo.getAllTags() )
});
 
router.post('/',async function(req, res, next) {
  const { role } = req.user;
  if(role == "admin" || role == "author"){
    res.send( tagsRepo.addTag(req.body.tag) )
  }else{
    res.status(403).json({ message: 'unauthorised access!' })
  }
});

router.put('/',async function(req, res, next) {
  const { role } = req.user;
  if(role == "admin" || role == "author"){
    res.send( tagsRepo.updateTag(req.body.tag) )
  }else{
    res.status(403).json({ message: 'unauthorised access!' })
  }
});

router.get('/:id',async function(req, res, next) {
  res.send( await tagsRepo.getTag( req.params.id) );
});


router.get('/:id/articles',async function(req, res, next) {
    res.send( await tagsRepo.getTagArticles( req.params.id) );
});

router.delete('/:id',async function(req, res, next) {
  const { role } = req.user;
  if(role == "admin" || role == "author"){
    res.send( commentsRepo.deleteTag(req.params.id) );
  }else{
    res.status(403).json({ message: 'unauthorised access!' })
  }
});


module.exports = router;