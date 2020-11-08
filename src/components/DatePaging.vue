<template>
  <div>
    <ul
      v-for="(item) in dates"
      :key="item"
    >
      <li class="item-date">
        {{ item }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'DatePaging',
  props:{
    beginDate:{
      type:String,
    }
  },
  data(){
    return{
      dates:[]
    }
  },
  watch:{
    beginDate: {
      deep: true,
      handler() {
        this.dates=[]
        this.getDates()
      }
    }
  },
  beforeMount() {
    this.getDates()
  },
  methods:{
    getDates(){
      for(var i=0;i<7;i++){
        this.dates.push(this.addTime(this.beginDate,i))
      }
    },
    timeFormate(timeStamp) {
      let year = new Date(timeStamp).getFullYear()
      let month =new Date(timeStamp).getMonth() + 1 < 10? '0' + (new Date(timeStamp).getMonth() + 1): new Date(timeStamp).getMonth() + 1
      let date =new Date(timeStamp).getDate() < 10? '0' + new Date(timeStamp).getDate(): new Date(timeStamp).getDate()
      return year + '-' + month + '-' + date
    },
    addTime(time,num){
      var date=new Date(time)
      date.setTime(date.getTime()+num*86400000 )
      return this.timeFormate(date)
    }
  }
}
</script>

<style scoped>
.item-date{
  display: inline-block;
  width:105px;
  height:40px;
  padding-top:20px;
  float: left;
  border: 2px solid black;
}
</style>
