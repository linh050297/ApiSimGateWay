const {apiGatewayReturn} = require('./../DataDBFake/dataFromGateway');
const {getNumberOfEachSim} = require('./../helpers/checkWhichSimNeed');
const db = require('../models');
const { FormPortSimService } = require('./../services/set_form_port_sim.service')
const { checkPhoneNB } = require('./../helpers/checkPhoneNumber');


let apiGateway = async()=>{
    let formPortSim = await FormPortSimService.getOne();
    // console.log('1',apiGatewayReturn);
    // console.log('2',formPortSim);
    let numberOfEachPhone = getNumberOfEachSim(formPortSim, apiGatewayReturn);
    // console.log(numberOfEachPhone['mobi']);
    console.log('sadada',numberOfEachPhone);
    

    //get list of phone number in DB
    let phoneNumbers = await db.phone_number.findAll({where: { isCall: false } , raw: true,  attributes: ['id','phoneNumber']});
    // console.log('phoneNumbers: ', phoneNumbers);
    let arrayIdToUpdate = phoneNumbers.map((ele)=>{ return ele.id });
    //get number of each phone push to array
    let kq = await checkPhoneNB(phoneNumbers, numberOfEachPhone);
    console.log('kq: ', kq);//[ '01235498547', '01246987456', '0971785209', '0991795209' ]

    //call api gateWay to send a array of phone number 

    //update phonenumber iscall = true if call api gateway successful

    // if(kq){
    //     let phoneNumberIsCall = await db.phone_number.update({
    //         isCall: true
    //     },{
    //         where: { id: arrayIdToUpdate }
    //     });

    //     if(!phoneNumberIsCall){
    //         return {error:'Không thể cập nhật trạng thái số điện thoại'};
    //     }else{
    //         return {message: 'successful!!!'};
    //     }
    // }

}

module.exports = { apiGateway: apiGateway };