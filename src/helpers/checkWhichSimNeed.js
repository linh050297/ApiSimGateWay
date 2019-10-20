
let getNumberOfEachSim = (formPortSim, dataFromApiGateway)=>{
    let numberOfEachSim = {};
    let arrayPositionOfEmptyPort = [];

    // var a = {result:"ok","content":"total:8;portstate:0,0,0,0,0,0,0,0"};
    let content = dataFromApiGateway.content;
    //number of sim port
    // var total  = content.match(":(.*);")[1];
    //convert to array of portstate
    var array = JSON.parse("[" + content.split('portstate:')[1] + "]");
    for(let t = 0 ; t <= array.length - 1; t++){
        //check empty port
        if(array[t] == 0 || array[t] == 11){
            arrayPositionOfEmptyPort.push(t);
            //position of portsim in gateway is count from 0
          }
    }

    //convert string to array formPort in DB
    let dataFormPort = JSON.parse(formPortSim); //is an array
//     [
//         {name: 'vittel', value: [1,2]}, 
//         {name: 'vina', value: [3,4]}, 
//         {name: 'mobi', value: [5,6]},
//         {name: 'kata', value: [10,11]}
// ];
    var l = dataFormPort.length-1;
    arrayPositionOfEmptyPort.forEach((ele)=>{
    for( var i = 0 ; i <= l ; i++ ){
        if( dataFormPort[i].value.includes(ele) === true ){
            if(!numberOfEachSim.hasOwnProperty(dataFormPort[i].name)){
                numberOfEachSim[dataFormPort[i].name] = 1
            }
            else{
                numberOfEachSim[dataFormPort[i].name]++
            }
            
        }}
    });
    // console.log("numberOfEachSim",numberOfEachSim);
    return numberOfEachSim
    
}



module.exports = { getNumberOfEachSim:getNumberOfEachSim }

  
