import Mock from 'mockjs'

const Random = Mock.Random
const getGanntChart = function (opt) {
  console.log(opt)
  const datalist = []
  for (let i = 0; i < 1; i++) {
    const newData = {
      // value: Random.float(100, 10000, 0, 2),
      // title: Random.csentence(5, 20), //  Random.csentence( min, max )
      // thumbnail_pic_s: Random.dataImage('300x250', 'mock的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
      // author_name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
      // date: Random.date() + ' ' + Random.time() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
      name: 'line1',
      fromDate: '2020-11-10 09:16',
      toDate: '2020-11-10 10:16',
      task: '418477',
      delay: true
    }
    datalist.push(newData)
  }
  //const content = {datalist}
  const ganttData = {
    success: true,
    message: 'string',
    content: datalist
  }
  return ganttData
}

const getProgress = function (date) {
  console.log(date)
  const onTimeDelivery = 0.5
  const GanttItem = {
    orderId: '418477',
    progress: 60,
    progressDelay: 40
  }
  const orderGanttItems = []
  orderGanttItems.push(GanttItem)
  return {
    success: true,
    message: 'mock success',
    content: {
      onTimeDelivery: onTimeDelivery,
      orderGanttItems: orderGanttItems
    }
  }
}

const getLoadChart = function (date) {

  var content
  if(date.url.toString().indexOf('2018-08-13')!=-1) {
    content = {
      totalEquipmentLoadRate: 50,
      totalPersonnelLoadRate: 80,
      startDate: '2018-08-13',
      resourceLoadItems: [{
        name: 'line1',
        rates: [30, 20, 40, 50, 80, 20, 10]
      }]
    }
  }
  else{
    content={
      totalEquipmentLoadRate: 100,
      totalPersonnelLoadRate: 80,
      resourceLoadItems:[]
    }
  }


return {
success: true,
message: 'string',
content: content
}

}

export default {
  getGanntChart,
  getProgress,
  getLoadChart
}
