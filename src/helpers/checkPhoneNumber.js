const {RegexPhoneNetworkService} = require('./../services/regex_network.service');

let checkPhoneNB = async (phoneNumbers, phoneNumberEachNetwork)=>{
    let arrayOfPhoneNumberReturn = [];
    let nameNetworkArray = Object.keys(phoneNumberEachNetwork); //get keyvalue of object
    let arrayNameNetworkWithRegex = await RegexPhoneNetworkService.getAll();
    // console.log('nameNetworkArray: ', nameNetworkArray);
    for (const number of phoneNumbers) {
        // console.log('nameNetworkArray: ', nameNetworkArray);
        for (const name of nameNetworkArray) {
            // let kq = await RegexPhoneNetworkService.getOne(name);//get regex by nameNetwork
            let findNetworkName = arrayNameNetworkWithRegex.find(function(element) {
                return element.networkName == name;
            });
            // console.log('found.regex',findNetworkName)

            if( findNetworkName != undefined ){
                let flags = 'g';
                let strFilterRegEx = new RegExp(findNetworkName.regex, flags); // to generate regex from DB
                // console.log('strFilterRegEx: ', strFilterRegEx);
                if( strFilterRegEx.test(number.phoneNumber) === true ){ //check phone number with regex
                    arrayOfPhoneNumberReturn.push(number.phoneNumber);
                }
            }  
        }
    }
    return arrayOfPhoneNumberReturn;
}

module.exports = {checkPhoneNB};
