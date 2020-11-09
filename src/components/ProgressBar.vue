<template>
  <div
    class="haoroomflex"
    style="background-color: transparent"
  >
    <div
      class="onebar"
    >
      <div class="bar">
        <span
          class="progress"
          :style="data!=100?{'width':`${data}%`,'background-color':'#75cce8'}:{'width':`${data}%`,'background-color':'#94e277'}"
        > {{ data }}</span>
        <span
          class="progress"
          :style="{'width':`${delayData}%`,'background-color':'#D07473','position': 'absolute','left':`${data}%`}"
        > {{ delayData }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgressBar',
  props: {
    data: {
      type:Number,
      default:()=> 90
    },
    delayData:{
      type:Number,
      default:()=>0
    }
  },

}
</script>

<style  lang="less" scoped>
.haoroomflex{display: flex;margin:1vh 15px;}
.onebar{
  flex:1;
  text-align: center;
  display: inline-block;
  .sfont{
    color:#999;
    font-size:14px;
  }
  .bar{
    height: 35px;
    width:600px;
    margin:5px auto;
    -webkit-border-radius: 24px;
    border-radius: 24px;
    overflow: hidden;
    position: relative;
    background: #e5e5e5;
    span.progress {
      line-height: 30px;
      position: absolute;
      bottom:0;
      height: 100%;
      width: 0;
      display: block;
      -webkit-border-bottom-left-radiusradius: 24px;
      -webkit-border-top-left-radiusradius: 24px;
      border-bottom-left-radiusradius: 24px;
      border-top-left-radiusradius: 24px;
      -webkit-transition: height 2s ease-out;
      -o-transition: height 2s ease-out;
      transition: height 2s ease-out;
      background: #3990FF
    }
  }
}

</style>
