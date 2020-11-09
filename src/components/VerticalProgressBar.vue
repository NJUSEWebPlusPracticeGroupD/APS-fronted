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
          :style="item.value<=2?{'height':`${item.value*10}%`,'background-color':'#d6a3dc'}:item.value<=4?{'height':`${item.value*10}%`,'background-color':'#f7db70'}:item.value<=6?{'height':`${item.value*10}%`,'background-color':'#eabebf'}:item.value<=8?{'height':`${item.value*10}%`,'background-color':'#75cce8'}:
            {'height':`${item.value*10}%`,'background-color':'#94e277'}"
        />
      </div>
      <div class="sfont">
        {{ item.data }}%
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
          {data: '50', value: 5},
        ]
      }
    }
  }
}
</script>

<style  lang="less" scoped>
.haoroomflex{display: flex;margin:0;}
.onebar{
  flex:1;
  text-align: center;
  min-width: 30px;
  max-width: 100px;
  display: inline-block;
  .sfont{
    color:#999;
    font-size:22px;
  }
  .bar{
    height: 50px;
    width:35px;
    margin:5px auto;
    overflow: hidden;
    position: relative;
    background: #e5e5e5;
    span.progress {
      position: absolute;
      bottom:0;
      height: 0;
      width: 100%;
      display: block;
      -webkit-transition: height 2s ease-out;
      -o-transition: height 2s ease-out;
      transition: height 2s ease-out;

    }
  }
}

</style>
