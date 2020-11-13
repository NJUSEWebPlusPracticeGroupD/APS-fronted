<template>
  <el-main
    class="main"
    style=" background-color:rgba(255,255,255,0.8);"
  >
    <el-row>
      <el-date-picker
        v-model="value"
        class="date-picker"
        type="date"
        :placeholder="time"
        :default-value="time"
      />
      <el-button
        round
        class="button"
        @click="getResource"
      >
        确定
      </el-button>
      <el-popover
        placement="left-start"
        style="float: right;margin-right:4%;"
        width="120"
        trigger="hover"
      >
        <el-row>
          <div style="vertical-align: center;display:table-cell;height: 30px;float:left;line-height: 30px">
            延期订单:
          </div>
          <div style="margin-left:30px;background-color:#D07473;width:50px;height:30px;display: inline-block" />
        </el-row>
        <el-row>
          <div style="vertical-align: center;display:table-cell;height: 30px;float:left;line-height: 30px">
            同一订单:
            <div style="margin-left:20px;float:right;vertical-align: center;display:table-cell;height: 30px;line-height: 30px">
              相同颜色
            </div>
          </div>
        </el-row>
        <el-button slot="reference">
          颜色提示
        </el-button>
      </el-popover>
    </el-row>

    <GanttChart :datas="GanntData" />
  </el-main>
</template>

<script>
import GanttChart from '@/components/GanttChart'
import {getResourceGantt} from '../api/APIs'

export default {
  name: 'ResourceGantt',
  components: {
    GanttChart
  },
  data() {
    return {
      value: '',
      time: this.$store.getters.getTime.slice(0, 10),
      GanttFresh: false,
      GanntData: [ {
        'name': '26组-杨丽（5）',
        'fromDate': '2018-09-07 12:00',
        'toDate': '2018-09-07 19:00',
        'task': '764098',
        'delay': false
      },
      {
        'name': '27组-徐贤燕（5）',
        'fromDate': '2018-09-07 12:00',
        'toDate': '2018-09-07 19:00',
        'task': '764098',
        'delay': false
      },
      {
        'name': '40组-高海燕（5）',
        'fromDate': '2018-09-07 12:00',
        'toDate': '2018-09-07 19:00',
        'task': '764098',
        'delay': false
      },
      {
        'name': '5组-童小玲 （5）',
        'fromDate': '2018-09-07 12:00',
        'toDate': '2018-09-07 19:00',
        'task': '764098',
        'delay': false
      },
      {
        'name': 'line35',
        'fromDate': '2018-09-07 12:00',
        'toDate': '2018-09-08 06:00',
        'task': '762485',
        'delay': false
      },
      {
        'name': 'line36',
        'fromDate': '2018-09-07 12:00',
        'toDate': '2018-09-07 19:00',
        'task': '764098',
        'delay': false
      },
      {
        'name': 'line37',
        'fromDate': '2018-09-07 12:00',
        'toDate': '2018-09-07 19:00',
        'task': '764098',
        'delay': false
      },
      {
        'name': 'line38',
        'fromDate': '2018-09-07 12:00',
        'toDate': '2018-09-07 19:00',
        'task': '764098',
        'delay': false
      },
      {
        'name': '13组-刘金燕（3）',
        'fromDate': '2018-09-07 12:00',
        'toDate': '2018-09-07 19:00',
        'task': '417174',
        'delay': false
      },
      {
        'name': '14组-周清（4）',
        'fromDate': '2018-09-07 12:00',
        'toDate': '2018-09-07 19:00',
        'task': '417174',
        'delay': false
      },
      {
        'name': '24组-张娟1（3）',
        'fromDate': '2018-09-07 12:00',
        'toDate': '2018-09-07 19:00',
        'task': '417174',
        'delay': false
      },
      {
        'name': '36组-谢春霞（4）',
        'fromDate': '2018-09-07 12:00',
        'toDate': '2018-09-07 19:00',
        'task': '417174',
        'delay': false
      },
      {
        'name': '39组-刘霞（3）',
        'fromDate': '2018-09-07 12:00',
        'toDate': '2018-09-07 19:00',
        'task': '417174',
        'delay': false
      },
      {
        'name': '4组-赵东勤（3）',
        'fromDate': '2018-09-07 12:00',
        'toDate': '2018-09-07 19:00',
        'task': '417174',
        'delay': false
      },
      {
        'name': 'line33',
        'fromDate': '2018-09-07 12:00',
        'toDate': '2018-09-08 06:00',
        'task': '417174',
        'delay': false
      },
      {
        'name': 'line34',
        'fromDate': '2018-09-07 12:00',
        'toDate': '2018-09-08 06:00',
        'task': '417174',
        'delay': false
      },
      {
        'name': '自动包装机',
        'fromDate': '2018-09-07 12:00',
        'toDate': '2018-09-07 16:00',
        'task': '762838',
        'delay': false
      },
      {
        'name': '33组-许丽萍（5）',
        'fromDate': '2018-09-07 12:00',
        'toDate': '2018-09-07 16:00',
        'task': '762838',
        'delay': false
      },
      {
        'name': '10组-陈云（5）',
        'fromDate': '2018-09-07 12:00',
        'toDate': '2018-09-07 19:00',
        'task': '417830',
        'delay': false
      },
      {
        'name': '11组-张娟（4）',
        'fromDate': '2018-09-07 12:00',
        'toDate': '2018-09-07 19:00',
        'task': '417830',
        'delay': false
      },
      {
        'name': 'line06',
        'fromDate': '2018-09-07 12:00',
        'toDate': '2018-09-08 06:00',
        'task': '417830',
        'delay': false
      },
      {
        'name': '1组-彭晓慧 （5）',
        'fromDate': '2018-09-07 19:00',
        'toDate': '2018-09-08 06:00',
        'task': '764310',
        'delay': false
      },
      {
        'name': '23组-吴永凤（4）',
        'fromDate': '2018-09-07 19:00',
        'toDate': '2018-09-08 06:00',
        'task': '764310',
        'delay': false
      },
      {
        'name': 'line14',
        'fromDate': '2018-09-07 19:00',
        'toDate': '2018-09-08 06:00',
        'task': '764310',
        'delay': false
      },
      {
        'name': '15组-李长娟（5）',
        'fromDate': '2018-09-07 19:00',
        'toDate': '2018-09-08 06:00',
        'task': '762485',
        'delay': false
      },
      {
        'name': '16组-朱绍美（4）',
        'fromDate': '2018-09-07 19:00',
        'toDate': '2018-09-08 06:00',
        'task': '417174',
        'delay': false
      },
      {
        'name': '19组-王秀（3）',
        'fromDate': '2018-09-07 19:00',
        'toDate': '2018-09-08 06:00',
        'task': '417174',
        'delay': false
      },
      {
        'name': '20组-王树梅（4）',
        'fromDate': '2018-09-07 19:00',
        'toDate': '2018-09-08 06:00',
        'task': '417174',
        'delay': false
      },
      {
        'name': '2组-丁雪梅（3）',
        'fromDate': '2018-09-07 19:00',
        'toDate': '2018-09-08 06:00',
        'task': '417174',
        'delay': false
      },
      {
        'name': '30组-陈梅（4）',
        'fromDate': '2018-09-07 19:00',
        'toDate': '2018-09-08 06:00',
        'task': '417174',
        'delay': false
      },
      {
        'name': '31组-史义玲（4）',
        'fromDate': '2018-09-07 19:00',
        'toDate': '2018-09-08 06:00',
        'task': '417174',
        'delay': false
      },
      {
        'name': '12组-姚先兰（5）',
        'fromDate': '2018-09-07 19:00',
        'toDate': '2018-09-08 06:00',
        'task': '417830',
        'delay': false
      },
      {
        'name': '28组-杜碧珍（4）',
        'fromDate': '2018-09-07 19:00',
        'toDate': '2018-09-08 06:00',
        'task': '417830',
        'delay': false
      }
      ]
    }
  },
  beforeMount() {
    this.getResource()
  },
  methods: {
    getResource() {
      //获取资源甘特图需要的数据，与后端交互
      // console.log("hi1");
      //
      // console.log(GanttChart.props.datas.default().length);
      // console.log(GanttChart.props.datas.default());
      // console.log("hi2");
      // GanttChart.props.datas.default().cleanData();
      // console.log(GanttChart.props.datas);
      // console.log("hi3");


      console.log(this.value)
      let tmp_datelist = this.value.toString().split(' ')
      let final_date = tmp_datelist[3] + '-'
      const monthsBig = ['1', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      const months = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
      for (let i = 0; i <= 12; i++) {
        if (tmp_datelist[1] === monthsBig[i]) {
          final_date += months[i]
        }
      }
      final_date += '-'
      final_date += tmp_datelist[2]

      getResourceGantt(final_date).then(res => {
        //console.log(res.content)
        this.GanntData = res.content
        console.log(this.GanntData)

        // this.GanntData = [
        //   {
        //     name: 'lisi',
        //     fromDate: '2018-08-01 13:00',
        //     toDate: '2018-08-01 24:00',
        //     task: 'task2',
        //     delay: false
        //   }
        // ]
        //console.log(this.GanntData);
      })
    }
  }
}
</script>

<style scoped>

.main {
  background-color: #FFFFFF;
  margin: 20px 20px;
  padding: 60px;
  min-height: 100px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, .12), 0 0 12px rgba(0, 0, 0, .04);
}

.delay {
  padding-top: 1vh;
  float: right;
  margin-right: 10vh;
  background-color: #D07473;
  width: 50px;
  height: 30px
}

.main:hover {
  margin: 10px 20px 30px 20px;
}

.main h2 {
  font-family: serif;
  font-size: 60px;
}

.main span {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-size: 20px;
}

.date-picker {
  margin: 8px 10px 2px 10px;
  float: left;
}

.button {
  float: left;
  margin: 8px;
  color: #5daf34;
  width: 80px;
  border: 1px solid #5daf34;
  border-radius: 10px;
}

.button:hover {
  cursor: pointer;
}
</style>
