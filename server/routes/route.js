const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const webRequest = require('../controllers/webRequest');

router.post('/signup', userController.signup); //done

router.post('/login', userController.login); //done

router.get('/import/:userId', webRequest.allowIfLoggedin, webRequest.grantAccess('readAny', 'basic'), webRequest.import); // admin extends basic

router.get('/username/:userName', webRequest.allowIfLoggedin, webRequest.grantAccess('readAny', 'basic'), webRequest.filterByUsername);

router.get('/filterPolicybyUser/:userName', webRequest.allowIfLoggedin, webRequest.grantAccess('readAny', 'profile'), webRequest.filterPolicybyUser);

router.get('/listPoliciesbyUser/:userName', webRequest.allowIfLoggedin, webRequest.grantAccess('readAny', 'profile'), webRequest.listPoliciesbyUser);

router.get('/user/:userId', userController.allowIfLoggedin, userController.getUser);

router.get('/users', userController.allowIfLoggedin, userController.grantAccess('readAny', 'profile'), userController.getUsers);

router.put('/user/:userId', userController.allowIfLoggedin, userController.grantAccess('updateAny', 'profile'), userController.updateUser);

router.delete('/user/:userId', userController.allowIfLoggedin, userController.grantAccess('deleteAny', 'profile'), userController.deleteUser);

module.exports = router;