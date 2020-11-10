import Mock from 'mockjs'
import chartApi from './chart'

const domain = process.env.VUE_APP_BASE_API
Mock.mock(`${domain}/api/chart/getResourceGanttChart`, 'get', chartApi.getGanntChart)
