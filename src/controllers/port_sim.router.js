const { Router } = require("express");
const { FormPortSimService } = require('./../services/set_form_port_sim.service')

const FormPortSimRouter = Router();


/* Router */
FormPortSimRouter.post('/create', (req, res) => {
    const { formPortSim } = req.body;
    FormPortSimService.create( formPortSim )
    .then(formPortSim => res.send( formPortSim ))
    .catch(res.onError);
});

FormPortSimRouter.get('/get_one', (req, res) => {
    FormPortSimService.getOne( )
    .then(formPortSim => res.send( formPortSim ))
    .catch(res.onError);
});


FormPortSimRouter.put('/update', (req, res) => {
    const { formPortSim } = req.body;
    FormPortSimService.update( formPortSim )
    .then(formPortSim => res.send( formPortSim ))
    .catch(res.onError);
});

module.exports = { FormPortSimRouter };