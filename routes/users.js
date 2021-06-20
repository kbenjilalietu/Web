var express = require('express');
var router = express.Router();
const usersRepo = require('../respositories/users');
const config = require('../config/config.json');
const jwt = require('jsonwebtoken');

/* GET users listing. */
  router.get('/', async function(req, res, next) {  
  res.send(await usersRepo.getUsers( req.query.offset, req.query.limit)) 
  });
  
  router.post('/',async function(req, res, next) {
    const { role } = req.user;
    if(role == "admin" || role == "author"){
      const retrievedUser = await usersRepo.getUserByEmail(user.email) 
      if(!retrievedUser){
        res.send( await usersRepo.addUser( req.body.user ) );
      }else{
        res.status(400).json({ message: 'Email already exists!' })
      }
    }else{
      res.status(403).json({ message: 'unauthorised access!' })
    }
  });
  
  router.post('/authenticate', async function(req, res, next) {
    const credentials = req.body
    console.log(req.body);
    const retrievedUser = await usersRepo.getUserByEmail(credentials.email) 
    if(!retrievedUser) res.status(400).json({ message: 'incorrect Email!' })
    else if(retrievedUser.dataValues.password != credentials.password) res.status(400).json({ message: 'password incorrect!' })
    else{
      const {password,...authenticatedUser} = retrievedUser.dataValues
      const token = jwt.sign({username: authenticatedUser.username,  role: authenticatedUser.role}, config.secret, { expiresIn: '1m' });
      res.status(200).send({authenticatedUser,token})
    } 
  })

  router.put('/',async function(req, res, next) {
    const { role } = req.user;
  if(role == "admin" || role == "author"){
    res.send( await usersRepo.updateUser( req.body.user ) );
  }else{
    res.status(403).json({ message: 'unauthorised access!' })
  }
  });
  
  router.get('/:id',async function(req, res, next) {
  
  res.send( await usersRepo.getUser( req.params.id) );
  
  });
  
  router.delete('/:id',async function(req, res, next) {
    const { role } = req.user;
    if(role == "admin" || role == "author"){
      res.send( await usersRepo.deleteUser( req.params.id ) );
    }else{
      res.status(403).json({ message: 'unauthorised access!' })
    } 
  });

module.exports = router;