// compare_paradigms.js

// Directions: Rewrite the imperative code below as Object-Oriented 

// let status = 'active'
// let warp = 2
// let type = 'Dilithium Crystal'
// let status_report = 'Captain, '

// if(status === 'active' && warp <= 4) {
//     status_report += 'the engines are active and we could be going faster.'
// } else if (status === 'active' && warp > 4) {
//     status_report += 'the engines are active and we are going ' + warp + '.'
// } else if (status === 'down') {
//     status_report += 'the engines are down.'
// } else {
//     status_report += 'the comms are down and we can`t reach engineering.'
// }

// console.log(status_report)


//OOJS code

class myConstructor {

    constructor(type, recipient){
        this.type = type
        this.status = 'active'
        this.warp = 5
        this.recipient = recipient ? recipient : 'captain'
    }

     statusReport(){
        if (this.status === 'active' && this.warp <= 4){
            return this.recipient + ', the engines are active and we could be going faster'
        } else if (this.status === 'active' && this.warp > 4){
            return this.recipient + ', the engines are active and we are going' + this.warp
        } else if (this.staus === 'down'){
            return this.recipient + 'the engines are down'
        } else {
            return this.recipient + ', the comms are down and we can not reach engineering'
        }
    };

    set_status(status) {
        this.status = status
    }

    set_warp(integer) {
        this.warp = integer
    }
};

let enterprise_warp = new myConstructor('Dilithium Chrystal');

enterprise_warp.set_warp(5)

console.log(enterprise_warp.statusReport());


