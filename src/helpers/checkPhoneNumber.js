const {RegexPhoneNetworkService} = require('./../services/regex_network.service');

let checkPhoneNB = async (phoneNumbers, phoneNumberEachNetwork)=>{
    // console.log('phoneNumberEachNetwork: ', phoneNumberEachNetwork);
    let arrayOfPhoneNumberReturn = [];
    let nameNetworkArray = Object.keys(phoneNumberEachNetwork);
    let arrayOfPhoneNumberIsMathRegex = []; //get keyvalue of object
    // console.log('nameNetworkArray: ', nameNetworkArray);
    let arrayNameNetworkWithRegex = await RegexPhoneNetworkService.getAll();
    // console.log('nameNetworkArray: ', nameNetworkArray);
    for (const number of phoneNumbers) {
        // console.log('nameNetworkArray: ', nameNetworkArray);
        for (const name of nameNetworkArray) {
            //add a mount of phonenumber each network
                let findNetworkName = arrayNameNetworkWithRegex.find(function(element) {
                    return element.networkName == name;
                });
                // console.log('found.regex',findNetworkName)
    
                if( findNetworkName != undefined ){
                    let flags = 'g';
                    let strFilterRegEx = new RegExp(findNetworkName.regex, flags); // to generate regex from DB
                    // console.log('strFilterRegEx: ', strFilterRegEx);
                    if( strFilterRegEx.test(number.phoneNumber) === true ){
                        arrayOfPhoneNumberIsMathRegex.push( {key:name, phone: number.phoneNumber} );
                    }
                }  
                
        }
    }
    //get a number of phone number each network by param phoneNumberEachNetwork
    for (const nameTwo of nameNetworkArray) {
        
        let result = arrayOfPhoneNumberIsMathRegex.filter(word => word.key == nameTwo);
        if(result.length > 0){
            let mang_moi = result.slice(0, phoneNumberEachNetwork[nameTwo]);
            let pushTo = mang_moi.map(x=> x.phone)
            arrayOfPhoneNumberReturn.push(...pushTo);
        }  
    }        
    return arrayOfPhoneNumberReturn;
}

module.exports = {checkPhoneNB};
