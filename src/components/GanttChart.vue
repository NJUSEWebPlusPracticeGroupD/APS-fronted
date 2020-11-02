<template>
  <div
    style=" {width: 100%;
  height: 100%;}"
  >
    <div
      v-if="!showChart1"
    >
      <i
        class="el-icon-back"
        @click="backToChart1"
      />
    </div>
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
    datas : {
      type: Array,
      default: () =>
        [
          {
            name: 'line1',
            fromDate: '2018-01-01 08:00',
            toDate: '2018-01-01 10:00',
            task: 'task1',
            delay:false
          },
          {
            name: 'line1',
            fromDate: '2018-01-01 12:00',
            toDate: '2018-01-01 15:00',
            task: 'task2',
            delay:true
          },
          {
            name: 'line1',
            fromDate: '2018-01-01 15:30',
            toDate: '2018-01-01 21:30',
            task: 'task4',
            delay:false
          },
          {
            name: 'line2',
            fromDate: '2018-01-01 09:00',
            toDate: '2018-01-01 11:00',
            task: 'task3',
            delay:false
          },
          {
            name: 'line2',
            fromDate: '2018-01-01 13:00',
            toDate: '2018-01-01 17:00',
            task: 'task5',
            delay:false
          },
          {
            name: 'line2',
            fromDate: '2018-01-01 11:00',
            toDate: '2018-01-01 16:00',
            task: 'task2',
            delay:false
          },
          {
            name: 'line2',
            fromDate: '2018-01-01 16:00',
            toDate: '2018-01-01 19:00',
            task: 'task4',
            delay:false
          },

          {
            name: '张三',
            fromDate: '2018-01-01 16:00',
            toDate: '2018-01-01 20:00',
            task: 'task4',
            delay:false
          },
          {
            name: '张三',
            fromDate: '2018-01-01 20:30',
            toDate: '2018-01-01 24:00',
            task: 'task3',
            delay:false
          },

          {
            name: '李四',
            fromDate: '2018-01-01 13:00',
            toDate: '2018-01-01 24:00',
            task: 'task2',
            delay:false
          }
        ]
    },
  },
  data(){
    return{
      showChart1:true,
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
    console.log(this.createChart)
    this.createChart(this.datas)
  },
  methods: {
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

      chart.data = datas
      var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis())
      categoryAxis.dataFields.category = 'name'
      categoryAxis.renderer.grid.template.location = 0
      categoryAxis.renderer.inversed = true

      var dateAxis = chart.xAxes.push(new am4charts.DateAxis())
      dateAxis.dateFormatter.dateFormat = 'yyyy-MM-dd HH:mm'
      dateAxis.renderer.minGridDistance = 70
      dateAxis.baseInterval = {count: 20, timeUnit: 'minute'}
      dateAxis.min=new Date(2018,0,1,7,0,0,0).getTime()
      dateAxis.max = new Date(2018, 0, 2, 7, 0, 0, 0).getTime()
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
        dateAxis.min=new Date(2018,0,1,7,0,0,0).getTime()
        dateAxis.max = new Date(2018, 0, 2, 7, 0, 0, 0).getTime()
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
      })
    }
  },


}
</script>

<style scoped>
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
  Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  height:100%;
}
#chartdiv1 {
  width: 100%;
  height: 100%;
  float: left;
}
#chartdiv2 {
  width: 100%;
  height: 100%;
  float: left;
}
</style>
