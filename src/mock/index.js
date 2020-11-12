import Mock from 'mockjs'
import chartApi from './chart'

console.log('Mock')

Mock.mock(RegExp(`/api/chart/getResourceGanttChart` + '.*'), 'get', chartApi.getGanntChart);
Mock.mock(RegExp(`/api/chart/getResourceLoadChart` + '.*'), 'get', chartApi.getLoadChart);
Mock.mock(RegExp(`/api/chart/getOrderGantt` + '.*'), 'get', chartApi.getProgress);


