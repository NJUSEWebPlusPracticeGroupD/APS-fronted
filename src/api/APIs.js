import {request} from '../utils/request'

export function testRequest(testStr) {
  return request({
    method:'GET',
    url: '/api/chart/test?testStr=' + testStr
  })
}
export function getResourceGantt(date){
  return request({
    method: 'GET',
    url: '/api/chart/getResourceGanttChart?date=' + date
  })
}

export function getOrderGantt(date){
  return request({
    method: 'GET',
    url: '/api/chart/getOrderGanttChart?date=' + date
  })
}

export function getResourceLoad(start_date){
  return request({
    method: 'GET',
    url: '/api/chart/getResourceLoadChart?startDate=' + start_date
  })
}

export function getOrderPlanForm(){
  return request({
    method:'GET',
    url: '/api/form/getOrderPlanForm'
  })
}

export function getProduceRelationForm(date,orderId){
  return request({
    method:'GET',
    url: '/api/form/getOrderProduceRelationForm?date=' + date + '?orderId=' + orderId
  })
}

export function getProduceForm(date){
  return request({
    method:'GET',
    url: '/api/form/getProduceForm?date=' + date
  })
}

export function getProduceResourceForm(date){
  return request({
    method:'GET',
    url: '/api/form/getProduceResourceForm?date=' + date
  })
}

export function startAPS(currentDate){
  return request({
    method: 'POST',
    url: '/api/aps/startAps?currentDate=' + currentDate
  })
}
