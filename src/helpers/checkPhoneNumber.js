const {RegexPhoneNetworkService} = require('./../services/regex_network.service');

let checkPhoneNB = async (phoneNumbers, phoneNumberEachNetwork)=>{
    let arrayOfPhoneNumberReturn = [];
    for (const number of phoneNumbers) {
        let nameNetworkArray = Object.keys(phoneNumberEachNetwork); //get keyvalue of object
        // console.log('nameNetworkArray: ', nameNetworkArray);
        for (const name of nameNetworkArray) {
            let kq = await RegexPhoneNetworkService.getOne(name);//get regex by nameNetwork
            if( kq.regex != undefined ){
                let flags = 'g';
                let strFilterRegEx = new RegExp(kq.regex, flags); // to generate regex from DB
                if( strFilterRegEx.test(number.phoneNumber) === true ){ //check phone number with regex
                    arrayOfPhoneNumberReturn.push(number.phoneNumber);
                }
            }  
        }
    }
    return arrayOfPhoneNumberReturn;
}

module.exports = {checkPhoneNB};
