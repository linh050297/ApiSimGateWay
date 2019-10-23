const {RegexPhoneNetworkService} = require('./../services/regex_network.service');

let checkPhoneNB = async (phoneNumbers, phoneNumberEachNetwork)=>{
    let arrayOfPhoneNumberReturn = [];
    let arrayOfPhoneNumberIsMathRegex = []; //get keyvalue of object
    let arrayNameNetworkWithRegex = await RegexPhoneNetworkService.getAll();
    for (const number of phoneNumbers) {
        for (const name of phoneNumberEachNetwork) {
                //find object has contain a exactly name
                let findNetworkName = arrayNameNetworkWithRegex.find(function(element) {
                    return element.networkName == name.name;
                });
                //get regex with each name network and compare, to get list of phone nmuber is need
                if( findNetworkName != undefined ){
                    let flags = 'g';
                    let strFilterRegEx = new RegExp(findNetworkName.regex, flags); // to generate regex from DB
                    if( strFilterRegEx.test(number.phoneNumber) === true ){
                        arrayOfPhoneNumberIsMathRegex.push( {key:name.name, phone: number.phoneNumber} );
                    }
                }  
        }
    }
    //get a number of phone number each network by param phoneNumberEachNetwork
    console.log('arrayOfPhoneNumberIsMathRegex: ', arrayOfPhoneNumberIsMathRegex);
    console.log('phoneNumberEachNetwork: ', phoneNumberEachNetwork);
    for (const nameTwo of phoneNumberEachNetwork) {
        // generate a result array contain all data with same name
        let result = arrayOfPhoneNumberIsMathRegex.filter(word => word.key == nameTwo.name);
        //get a number of Phone number is need
        if(result.length > 0){
            let mang_moi = result.slice(0, nameTwo.value);
            let pushTo = mang_moi.map( x => x.phone );
            arrayOfPhoneNumberReturn.push(...pushTo);
        }  
    }        
    return arrayOfPhoneNumberReturn;
}

module.exports = {checkPhoneNB};

