const db = require('../models');

class FormPortSimService {
    static async create(formPortSim) {
        try {
            if (!formPortSim) {
                console.log(formPortSim);
                return {error:'Vui lòng điền đầy đủ thông tin cấu hình port sim'}
            }
            //uppercase
            for(var i = 0; i < formPortSim.length; i++){
                formPortSim[i].name = formPortSim[i].name.toUpperCase();
            }
            //change to string to save DB
            formPortSim = JSON.stringify(formPortSim);
            
            let trustCreateOne = await db.form_port.findAndCountAll({raw:true});
            // console.log('trustCreateOne: ', trustCreateOne);
            if(trustCreateOne.count >= 1){
                return {error:'Bạn không thể tạo nhiều hơn 1 trường dữ liệu'};
            }
            
            const portSim = await db.form_port.create({
                formPortSim
            });

            if (portSim) {
                return portSim;
            }
            else {
                return {error:'Không thể tạo'}
            }

        } catch (error) {
            console.log('error: ', error);
            return {error:'Có lỗi hệ thống'}
        }
    }

    static async update(formPortSim) {
        try {

            let idData = await db.form_port.findAll({
                attributes: ['id'],
                raw:true
            });
            idData = idData[0].id
           
            // let isNB = typeof id === 'number' && isFinite(id);
        
            // if ( !id || isNB === false ) {
            //     return {error:'ID bị trống hoặc sai định dạng'};
            // }
            if(!idData){
                return {error:'ID bị trống hoặc sai định dạng'};
            }

            if (!formPortSim) {
                return {error:'Vui lòng điền đầy đủ thông tin cấu hình port sim'};
            }

            const form = await db.form_port.findOne( { where: { id: idData }, raw : true } ); // Check have data

            if (form) {
                formPortSim = JSON.stringify(formPortSim);
                let update = await db.form_port.update({
                    formPortSim
                },
                { 
                    where: { id: idData }
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

    static async getOne() {
        try {

            let idData = await db.form_port.findAll({
                attributes: ['id'],
                raw:true
            });

            idData = idData[0].id
            // let isNB = typeof id === 'number' && isFinite(id);
        
            // if ( !id || isNB === false ) {
            //     return {error:'ID bị trống hoặc sai định dạng'};
            // }
            if(!idData){
                return {error:'ID bị trống hoặc sai định dạng'};
            }

            const form = await db.form_port.findOne( { where: { id: idData }, raw : true } );

            if (form) {
                // console.log(form.formPortSim);
                return form.formPortSim;
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

module.exports = { FormPortSimService };