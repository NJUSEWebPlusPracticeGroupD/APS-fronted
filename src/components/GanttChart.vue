<template>
  <div
    style=" width: 100%;
  height: 100%;background-color: transparent"
  >
    <el-page-header
      v-if="!showChart1"
      content="订单详情"
      @back="backToChart1"
    />
    <div
      id="chartdiv1"
    />
  </div>
</template>

<script>
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'

am4core.useTheme(am4themes_animated)


export default {
  name: 'GanttChart',
  props:{
    datas: {
      type: Array,
      required: true
    },

  },
  data(){
    return{
      showChart1:true,
      beginTime:'',
      lastTime:''
    }
  },
  watch:{
    datas: {
      deep: true,
      handler(val) {
        this.createChart(val)
      }
    }
  },
  mounted() {
    this.createChart(this.datas)
    // this.beginTime=this.datas[0].fromDate.slice(0,10)
    // this.lastTime=this.addTime(this.beginTime,1)
  },
  methods: {
    addTime(time,num){
      var date=new Date(time)
      date.setTime(date.getTime()+num*86400000)
      return date.toString()[0,10]
    },
    backToChart1(){
      this.showChart1=true,
      this.createChart(this.datas)
    },
    createChart(datas) {
      let chart = am4core.create('chartdiv1', am4charts.XYChart)
      chart.hiddenState.properties.opacity = 0 // this creates initial fade-in


      chart.paddingRight = 30
      chart.dateFormatter.inputDateFormat = 'yyyy-MM-dd HH:mm'


      var colorSet = new am4core.ColorSet()
      colorSet.saturation = 0.5

      //datas添加颜色
      var colorMap = {}
      var nameMap={}
      var index = 0
      for (var item of datas) {
        if (!colorMap[item['task']]) {
          if(index===6){
            index=index+6
          }
          colorMap[item['task']] = colorSet.getIndex(Number(index)).brighten(0)
          index = index + 3
        }
        item['color'] = colorMap[item['task']]
        if(item['delay']==true){
          item['color'] = colorSet.getIndex(9).brighten(0)
        }
        if(!nameMap[item['name']]){
          nameMap[item['name']]=true
        }
      }

      let cellSize = 50
      chart.events.on('datavalidated', function(ev) {

        // Get objects of interest
        let chart = ev.target
        let categoryAxis = chart.yAxes.getIndex(0)

        // Calculate how we need to adjust chart height
        let adjustHeight = chart.data.length * cellSize - categoryAxis.pixelHeight

        // get current chart height
        let targetHeight = chart.pixelHeight + adjustHeight

        // Set it on chart's container
        chart.svgContainer.htmlElement.style.height = targetHeight + 'px'
      })

      chart.data = datas
      var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis())
      categoryAxis.dataFields.category = 'name'
      categoryAxis.renderer.grid.template.location = 0
      categoryAxis.renderer.inversed = true

      var dateAxis = chart.xAxes.push(new am4charts.DateAxis())
      dateAxis.dateFormatter.dateFormat = 'yyyy-MM-dd HH:mm'
      dateAxis.renderer.minGridDistance = 70
      dateAxis.baseInterval = {count: 20, timeUnit: 'minute'}
      dateAxis.min=new Date(new Date(this.beginTime)).getTime()
      dateAxis.max = new Date(new Date(this.lastTime)).getTime()
      dateAxis.strictMinMax = true
      dateAxis.renderer.tooltipLocation = 0

      var series1 = chart.series.push(new am4charts.ColumnSeries())
      series1.columns.template.width = am4core.percent(30)
      series1.columns.template.height=am4core.percent(50)
      series1.columns.template.tooltipText = '{task}: {openDateX} - {dateX}'

      series1.dataFields.openDateX = 'fromDate'
      series1.dataFields.dateX = 'toDate'
      series1.dataFields.categoryY = 'name'
      series1.columns.template.propertyFields.fill = 'color' // get color from data
      series1.columns.template.propertyFields.stroke = 'color'
      series1.columns.template.strokeOpacity = 1
      chart.scrollbarX = new am4core.Scrollbar()

      var columnTemplate = series1.columns.template
      columnTemplate.strokeOpacity = 0
      columnTemplate.propertyFields.fill = 'color'

      var label = columnTemplate.createChild(am4core.Label)
      label.text = '{task}'
      label.align = 'center'
      label.valign = 'middle'

      //点击事件
      const that = this
      series1.columns.template.events.on('hit', function (ev) {

        that.showChart1=false

        let chart = am4core.create('chartdiv1', am4charts.XYChart)
        chart.hiddenState.properties.opacity = 0 // this creates initial fade-in
        let cellSize = 50
        chart.events.on('datavalidated', function(ev) {

          // Get objects of interest
          let chart = ev.target
          let categoryAxis = chart.yAxes.getIndex(0)

          // Calculate how we need to adjust chart height
          let adjustHeight = chart.data.length * cellSize - categoryAxis.pixelHeight

          // get current chart height
          let targetHeight = chart.pixelHeight + adjustHeight

          // Set it on chart's container
          chart.svgContainer.htmlElement.style.height = targetHeight + 'px'
        })

        chart.paddingRight = 30
        chart.dateFormatter.inputDateFormat = 'yyyy-MM-dd HH:mm'


        var colorSet = new am4core.ColorSet()
        colorSet.saturation = 0.5

        var target = ev.target.dataItem.dataContext.task
        console.log(target)
        console.log(that.datas)
        var itemData=[]
        for (let item of  that.datas) {
          if(item.task===target){
            if(item['delay']===true){
              item['color'] = colorSet.getIndex(9).brighten(0)
            }
            else {
              item['color'] = colorMap[item['task']]
            }
            itemData.push(item)
          }
        }
        chart.data =itemData

        var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis())
        categoryAxis.dataFields.category = 'name'
        categoryAxis.renderer.grid.template.location = 0
        categoryAxis.renderer.inversed = true

        var dateAxis = chart.xAxes.push(new am4charts.DateAxis())
        dateAxis.dateFormatter.dateFormat = 'yyyy-MM-dd HH:mm'
        dateAxis.renderer.minGridDistance = 70
        dateAxis.baseInterval = {count: 20, timeUnit: 'minute'}
        dateAxis.min=new Date(new Date(that.beginTime)).getTime()
        dateAxis.max = new Date(new Date(that.lastTime)).getTime()
        dateAxis.strictMinMax = true
        dateAxis.renderer.tooltipLocation = 0

        var series1 = chart.series.push(new am4charts.ColumnSeries())
        series1.columns.template.width = am4core.percent(30)
        series1.columns.template.minHeight=am4core.percent(50)
        series1.columns.template.tooltipText = '{task}: {openDateX} - {dateX}'

        series1.dataFields.openDateX = 'fromDate'
        series1.dataFields.dateX = 'toDate'
        series1.dataFields.categoryY = 'name'
        series1.columns.template.propertyFields.fill = 'color' // get color from data
        series1.columns.template.propertyFields.stroke = 'color'
        series1.columns.template.strokeOpacity = 1
        chart.scrollbarX = new am4core.Scrollbar()

        var columnTemplate = series1.columns.template
        columnTemplate.strokeOpacity = 0
        columnTemplate.propertyFields.fill = 'color'

        var label = columnTemplate.createChild(am4core.Label)
        label.text = '{task}'
        label.align = 'center'
        label.valign = 'middle'
      })
    }
  },


}
</script>

<style scoped>
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
  Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  min-height:100%;
  overflow: scroll;
}
#chartdiv1 {
  width: 100%;
  min-height: 100%;
  float: left;
}
#chartdiv2 {
  width: 100%;
  height: 100%;
  float: left;
}
</style>
