var express = require('express');
var router = express.Router();
const router = require('express').Router();
const usersRepo = require('../repositories/users')

 /* GET users listing. */
 router.get('/', async function(req, res, next) {

   res.send(await usersRepo.getAllUsers())

 });

 module.exports = router;

