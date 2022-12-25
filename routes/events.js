//  Event Routes
//  /api/envents

const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();
const { getEvents, createEvent, updateEvent, deleteEvent } = require("../controllers/events");
const { isDate } = require("../helpers/isDate");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");



//Todas tienen que pasar por la validacion del JWT
router.use(validateJWT)

router.get(
    '/',
    [
        check('title','El titulo es obligatorio')
    ],
    getEvents)

router.post(
    '/',
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatorio').custom(isDate),
        check('end','Fecha de finalizacion es obligatorio').custom(isDate),
        validateFields
    ],
    createEvent)

router.put('/:id',updateEvent)

router.delete('/:id',deleteEvent)

module.exports = router