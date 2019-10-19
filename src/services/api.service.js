const {apiGatewayReturn} = require('./../DataDBFake/dataFromGateway');
const {getNumberOfEachSim} = require('./../helpers/checkWhichSimNeed');
const db = require('../models');
const { FormPortSimService } = require('./../services/set_form_port_sim.service')


let apiGateway = async()=>{
    let formPortSim = await FormPortSimService.getOne();
    console.log('1',apiGatewayReturn);
    console.log('2',formPortSim);
    let numberOfEachPhone = getNumberOfEachSim(formPortSim, apiGatewayReturn);
    // console.log(numberOfEachPhone['mobi']);
    let aa ={ vittel: 2, vina: 2, mobi: 1 };
    console.log(numberOfEachPhone);
    

    //get list of phone number in DB
    let phoneNumbers = await db.phone_number.findAll({where: { isCall: null } , raw: true,  attributes: ['phoneNumber']});
    console.log('phoneNumbers: ', phoneNumbers);
    

    //get number of each phone push to array

    //call api gateWay to send a array of phone number 

}

module.exports = { apiGateway: apiGateway };