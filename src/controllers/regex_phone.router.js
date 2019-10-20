const { Router } = require("express");
const { RegexPhoneNetworkService } = require('./../services/regex_network.service');

const RegexPhoneNetworkRouter = Router();


/* Router */
RegexPhoneNetworkRouter.post('/create', (req, res) => {
    const { networkName, isActive, arrayOfFirstNumber, minLong, maxLong } = req.body;
    RegexPhoneNetworkService.create( networkName, isActive, arrayOfFirstNumber, minLong, maxLong )
    .then(regexNetwork => res.send( regexNetwork ))
    .catch(res.onError);
});

RegexPhoneNetworkRouter.get('/get_one', (req, res) => {
    const { networkName } = req.body;
    RegexPhoneNetworkService.getOne( networkName )
    .then(regexNetwork => res.send( regexNetwork ))
    .catch(res.onError);
});


RegexPhoneNetworkRouter.put('/update', (req, res) => {
    const { id, networkName, isActive, arrayOfFirstNumber, minLong, maxLong } = req.body;
    RegexPhoneNetworkService.update( id, networkName, isActive, arrayOfFirstNumber, minLong, maxLong )
    .then(regexNetwork => res.send( regexNetwork ))
    .catch(res.onError);
});

module.exports = { RegexPhoneNetworkRouter };