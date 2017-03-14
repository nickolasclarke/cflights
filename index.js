'use strict'
const request = require('request-promise-native')

const headers = {
    'origin': 'https://english.ctrip.com',
    'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'en-US,en;q=0.8,fr;q=0.6,zh-CN;q=0.4,zh;q=0.2',
    'pragma': 'no-cache',
    'cache-control': 'no-cache',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'accept': '*/*',
    'authority': 'english.ctrip.com'
}

const buildOptions = (params) => {
    const options = {
        url: 'https://english.ctrip.com/flights/Ajax/FirstV3',
        method: 'POST',
        headers: headers,
        body: '',
        gzip: true
    }
    let queryString = []

    for (var prop in params) queryString.push(encodeURIComponent(prop) + '=' + encodeURIComponent(params[prop]))
    options.body = queryString.join('&')
    console.log(options)
    return options
}

function fetch(params){
    
    request()
    .then(results => console.log(JSON.parse(results)))
    .catch(error => console.error(error))
}

class cflights {
    oneWay(params){}
    roundTrip(params){}

}



const dataString = 'MultDcity0=SHA&MultAcity0=TPE&MultDDate0=2017-03-10&FlightWay=OW&DSeatClass=Y&DSeatSelect=Y&ChildType=ADT&Quantity=1&ChildQty=0&BabyQty=0&CurrentSeqNO=1&DCity=SHA&ACity=TPE&DDatePeriod1=2017-03-10&ADatePeriod1=&filter_ddate=%40&filter_adate=%40&ptype=ADT&Transfer_Type=-1&PartitionSearchToken=3&NonstopOnly=';

let dataObj = {
MultDcity0:'SHA',
MultAcity0:'TPE',
MultDDate0:'2017-03-10',
FlightWay:'OW',
DSeatClass:'Y',
DSeatSelect:'Y',
ChildType:'ADT',
Quantity:1,
ChildQty:0,
BabyQty:0,
CurrentSeqNO:1,
DCity:'SHA',
ACity:'TPE',
DDatePeriod1:'2017-03-10',
ADatePeriod1:'',
filter_ddate:'@',
filter_adate:'@',
ptype:'ADT',
Transfer_Type:-1,
PartitionSearchToken:3,
NonstopOnly:'',
}

buildOptions(dataObj)
