const router = require('express').Router();
const{signUp,verify,employeeCreate,employeeDelete,employeeGet,employeeUpdate,searchEmployee} = require('../controllers/userController')
const { checkToken } = require("../auth/token_validation")

router.route('/signup')
    .post(signUp);
router.route('/signup/verify')
    .post(verify);
router.route('/signup/create')
    .post(checkToken ,employeeCreate);
router.route('/signup/delete')
    .post(checkToken ,employeeDelete);
router.route('/signup/get')
    .get(checkToken ,employeeGet);
router.route('/signup/update')
    .post(checkToken ,employeeUpdate);
router.route('/signup/:emp_name')
    .get(checkToken ,searchEmployee);

module.exports = router;