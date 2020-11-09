import {request} from '../utils/request'

export function testRequest(testStr) {
    return request({
      method:'GET',
      url: 'api/chart/test?testStr=' + testStr
    })
}
export function getResourceGantt(date){
  return request({
    method: 'GET',
    url: 'api/chart/getResourceGanttChart?date=' + date
  })
}

export function getOrderGantt(date){
  return request({
    method: 'GET',
    url: 'api/chart/getOrderGanttChart?date=' + date
  })
}

export function getResourceLoad(start_date){
  return request({
    method: 'GET',
    url: 'api/chart/getResourceLoadChart?startDate=' + start_date
  })
}
