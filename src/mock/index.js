import Mock from 'mockjs'
import chartApi from './chart'

Mock.mock(RegExp(`/api/chart/getResourceGanttChart` + '.*'), 'get', chartApi.getGanntChart)

