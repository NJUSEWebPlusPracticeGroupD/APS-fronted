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
      fromDate: '2020-11-10T09:16:58.926Z',
      toDate: '2020-11-10T09:16:58.926Z',
      task: '418477',
      delay: true
    }
    datalist.push(newData)
  }
  const content = {datalist}
  const ganttData = {
    success: true,
    message: 'string',
    content: content
  }
  return ganttData
}

export default {
  getGanntChart
}
