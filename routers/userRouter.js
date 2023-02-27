const router = require('express').Router();
const{signUp,verify,employeeCreate,employeeDelete,employeeGet,employeeUpdate} = require('../controllers/userController')

router.route('/signup')
    .post(signUp);
router.route('/signup/verify')
    .post(verify);
router.route('/signup/create')
    .post(employeeCreate);
router.route('/signup/delete')
    .post(employeeDelete);
router.route('/signup/get')
    .get(employeeGet);
router.route('/signup/update')
    .post(employeeUpdate);


module.exports = router;