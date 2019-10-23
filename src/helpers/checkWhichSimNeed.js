
let getNumberOfEachSim = (formPortSim, dataFromApiGateway)=>{
    let numberOfEachSim = [];
    let arrayPositionOfEmptyPort = [];

    // var a = {result:"ok","content":"total:8;portstate:0,0,0,0,0,0,0,0"};
    //get contain from gateway Api
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
//  [
//         {name: 'vittel', value: [1,2]}, 
//         {name: 'vina', value: [3,4]}, 
//         {name: 'mobi', value: [5,6]},
//         {name: 'kata', value: [10,11]}
// ];
    var l = dataFormPort.length-1;
    console.log('arrayPositionOfEmptyPort: ', arrayPositionOfEmptyPort);
    arrayPositionOfEmptyPort.forEach((ele)=>{
        for( var i = 0 ; i <= l ; i++ ){
            if( dataFormPort[i].value.includes(ele) === true ){
                (function addAndGenerateNumberOfEachNetworkIsNeed(numberOfEachSim, name) {
                    const found = numberOfEachSim.some(el => el.name == name);
                    if (!found) numberOfEachSim.push({ name: name, value: 1 });
                    if(found){
                      let index = numberOfEachSim.findIndex(x => x.name == name);
                      numberOfEachSim[index].value++
                    }
                    return numberOfEachSim;
                })(numberOfEachSim, dataFormPort[i].name);
            }
        };
    });
    console.log("numberOfEachSim",numberOfEachSim);
    return numberOfEachSim
}



module.exports = { getNumberOfEachSim:getNumberOfEachSim }

  
