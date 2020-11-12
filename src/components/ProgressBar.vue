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
          :style="progress!=100?{'width':`${progress}%`,'background-color':'#75cce8'}:{'width':`${progress}%`,'background-color':'#94e277'}"
        > {{ progress }}</span>
        <span
          class="progress"
          :style="{'width':`${ 100 - progress - progressDelay}%`,'background-color':'#dcdccc','position': 'absolute','left':`${progress}%`}"
        > {{ 100 - progress - progressDelay }}</span>

        <span
          class="progress"
          :style="{'width':`${progressDelay}%`,'background-color':'#D07473','position': 'absolute','left':`${100 - progressDelay}%`}"
        > {{ progressDelay }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgressBar',
  props: {
    progress: {
      type:Number,
      default:()=> 90
    },
    progressDelay:{
      type:Number,
      default:() => 0
    }
  },

}
</script>

<style lang="scss" scoped>
.haoroomflex{display: flex; margin:1vh 15px;}
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
    width: 600px;
    margin: 5px auto;
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
