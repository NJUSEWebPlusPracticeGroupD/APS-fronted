<template>
  <div class="haoroomflex">
    <div
      v-for="(item,index) in barData"
      :key="index"
      class="onebar"
    >
      <div class="bar">
        <span
          class="progress"
          :style="{'height':`${item.value*10}%`}"
        />
      </div>
      <div class="sfont">
        {{ item.date }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'VerticalProgressBar',
  props: {
    barData: {
      type: Array,
      default() {
        return [
          {date: '50', value: 5},
        ]
      }
    }
  }
}
</script>

<style  lang="less" scoped>
.haoroomflex{display: flex;margin:0 15px;}
.onebar{
  flex:1;
  text-align: center;
  min-width: 30px;
  max-width: 100px;
  display: inline-block;
  .sfont{
    color:#999;
    font-size:14px;
  }
  .bar{
    height: 50px;
    width:30px;
    margin:5px auto;
    -webkit-border-radius: 24px;
    border-radius: 24px;
    overflow: hidden;
    position: relative;
    background: #e5e5e5;
    span.progress {
      position: absolute;
      bottom:0;
      height: 0;
      width: 100%;
      display: block;
      -webkit-border-radius: 24px;
      border-radius: 24px;
      -webkit-transition: height 2s ease-out;
      -o-transition: height 2s ease-out;
      transition: height 2s ease-out;
      background: #3990FF

    }
  }
}

</style>
