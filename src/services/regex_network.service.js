const db = require('../models');

class RegexPhoneNetworkService {
    static async create( networkName, isActive, arrayOfFirstNumber, minLong, maxLong ) {
        try {
            //check input
            if ( arrayOfFirstNumber.length <= 0 ) {
                return {error:'Vui lòng điền đầy đủ đầu số nhà mạng'}
            }
            if(!isActive){
                isActive = 1;
            }

            if ( !networkName || (typeof networkName) != 'string' ) {
                return {error:'Vui lòng điền đầy đủ tên của nhà mạng'};
            }else{
                networkName = networkName.toUpperCase();
            }

            if( !minLong && (typeof minLong === 'number' &&  isFinite(minLong)) === false ){
                return {error:'Vui lòng điền đầy đủ độ dài ngắn nhất của SĐT'};
            };
            if( !maxLong && (typeof maxLong === 'number' &&  isFinite(maxLong)) === false ){
                return {error:'Vui lòng điền đầy đủ độ dài dài nhất của SĐT'};
            }

            //generate regex
            const flags = 'g';
            let longestPhoneNumber = (arrayOfFirstNumber.reduce(function (a, b) { return a.length > b.length ? a : b; })).length;
            let longest = +maxLong - +longestPhoneNumber;
            let shortest = +minLong - +longestPhoneNumber;
            let regexFirstNumber = arrayOfFirstNumber.join('|');
            let generatedRegex = `(^${regexFirstNumber})+([0-9]{${shortest},${longest}})\\b`; // to save DB
            // let strFilterRegEx = new RegExp(generatedRegex, flags); // to generate regex from DB

            //change to string to save DB
            let arrayOfFirstNumbers = JSON.stringify(arrayOfFirstNumber);
            
            const createRegex = await db.regex_sim.create({
                networkName: networkName,
                arrayOfFirstPhoneNumber: arrayOfFirstNumbers,
                isActive,
                regex: generatedRegex
            });

            if (createRegex) {
                return createRegex;
            }
            else {
                return {error:'Không thể tạo'}
            }

        } catch (error) {
            console.log('error: ', error);
            return {error:'Có lỗi hệ thống'}
        }
    }

    static async update( id, networkName, isActive, arrayOfFirstNumber, minLong, maxLong) {
        try {

            if( !id && (typeof id === 'number' &&  isFinite(id)) === false ){
                return {error:'Thiếu ID'};
            };

            if( minLong && (typeof minLong === 'number' &&  isFinite(minLong)) === false ){
                return {error:'Vui lòng điền đầy đủ độ dài ngắn nhất của SĐT'};
            };

            if( maxLong && (typeof maxLong === 'number' &&  isFinite(maxLong)) === false ){
                return {error:'Vui lòng điền đầy đủ độ dài dài nhất của SĐT'};
            }
            
            if ( networkName && (typeof networkName) != 'string' ) {
                return {error:'Vui lòng điền đầy đủ tên của nhà mạng'};
            }else{
                networkName = networkName.toUpperCase();
            }

            if(!isActive){
                isActive = 1;
            }

            if ( arrayOfFirstNumber ) {

                 //generate regex
                const flags = 'g';
                let longestPhoneNumber = (arrayOfFirstNumber.reduce(function (a, b) { return a.length > b.length ? a : b; })).length;
                let longest = +maxLong - +longestPhoneNumber;
                let shortest = +minLong - +longestPhoneNumber;
                let regexFirstNumber = arrayOfFirstNumber.join('|');
                var generatedRegex = `(^${regexFirstNumber})+([0-9]{${shortest},${longest}})\\b`; // to save DB
                // let strFilterRegEx = new RegExp(generatedRegex, flags); // to generate regex from DB

                //change to string to save DB
                var arrayOfFirstNumbers = JSON.stringify(arrayOfFirstNumber);
            }
            

            const form = await db.regex_sim.findOne( { where: { id: id }, raw : true } ); // Check have data
            if( !networkName ){
                networkName = form.networkName
            }
            
            if (form) {
                let update = await db.regex_sim.update({
                    networkName,
                    arrayOfFirstPhoneNumber: arrayOfFirstNumbers,
                    isActive,
                    regex: generatedRegex
                },
                { 
                    where: { id: id }
                });

                return update;
            }
            else {
                return {error:'ID không tồn tại'};
            }
        
        } catch (error) {
            console.log('error: ', error);
            return {error:'Có lỗi hệ thống'}
        }
        
    }

    static async getOne(networkName) {
        try {

            if ( networkName && (typeof networkName) != 'string' ) {
                return {error:'Vui lòng điền đầy đủ tên của nhà mạng'};
            }else{
                networkName = networkName.toUpperCase();
            }
            
            const form = await db.regex_sim.findOne( { where: { networkName }, raw : true } );

            if (form) {
                return form;
            }
            else {
                return {error:'ID không tồn tại'};
            }
            
        } catch (error) {
            console.log('error: ', error);
            return {error:'Có lỗi hệ thống'}
        }
    }

}

module.exports = { RegexPhoneNetworkService };