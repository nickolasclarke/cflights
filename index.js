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
const dt = new Date()


const buildOptions = (params) => {
    const options = {
        url: 'https://english.ctrip.com/flights/Ajax/FirstV3',
        method: 'POST',
        headers: headers,
        body: '',
        gzip: true
    }
    const dataObj = (params) => {
        return {
            MultDcity0: (params.DCity ? params.DCity : ''), //Departure city, ie: SHA
            MultAcity0: (params.ACity ? params.ACity : ''), //Arrival city (Domestic or International), ie: KMG
            MultDDate0: (params.DDate ? params.DDate : today()), //Depature date string, ie: 2017-04-15
            FlightWay: (params.rt ? 'RT' : 'OW'), //OneWay || Roundtrip, options: OW or ??
            DSeatClass: 'Y', //Booking Code, FJYW options
            DSeatSelect: 'Y', //?
            ChildType: 'ADT', //?
            Quantity: (params.numPass ? params.numPass : 1), //Number of passengers
            ChildQty: 0, //Number of child passengers
            BabyQty: 0, //Number of Baby passengers
            CurrentSeqNO: 1, //?
            DCity: (params.DCity ? params.DCity : ''), //Departure city, again? how do I reuse MultDcity0 instead?
            ACity: (params.ACity ? params.ACity : ''), //Arrival city, also again? 
            DDatePeriod1: (params.DDate ? params.DDate : ''), //Departure period, again, maybe can take a range?
            ADatePeriod1: '', //Same as above
            filter_ddate: '@', //?
            filter_adate: '@', //?
            ptype: 'ADT', //?
            Transfer_Type: -1, //?
            PartitionSearchToken: params.sToken ? params.sToken : 1, //? /flights/First always fires the req 3 times, with this iterating up by one each time. /flights/Next (for rw) only ever fires once
            NonstopOnly: (params.DCity ? 'Y' : '') //Filter by nonstop, ie. Y/N ?
        }
    }
    const today = () => {
        return dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate()
    }
    let query = dataObj(params)
    let queryString = []

    for (var prop in query) queryString.push(encodeURIComponent(prop) + '=' + encodeURIComponent(query[prop]))
    console.log(query)
    options.body = queryString.join('&')
    return options
}

function fetch(params) {
    let options = buildOptions(params)
    return request(options)
        .then(results => JSON.parse(results))
        .catch(error => console.error(error))
}

class cflights {
    oneWay(params) {
        return fetch(params).then(results => results)
    }
    roundTrip(params) {}
}

module.exports = cflights


