<template>
  <div id="app">
    <div v-for="(item,index) in cityTemplateList" :key="index">
      <Button type="primary" @click="ShowAreaModel(index)">城市多选</Button>
      <div v-if="isShowAreaModel">
        <area-multi-selection
          @areaData="receiveAreaData"
          @changeShowModal="changeShowModal"
          :AreaData="cityTemplateList[index].city"
          :disData="disData"
          :isShowAreaModel="isShowAreaModel"
        ></area-multi-selection>
      </div>
      <div class="result-pannel">
        <h2 class="title">选择结果</h2>
        <div class="index-wrapper">
          <span class="label">省：</span>
          <p class="result">{{cityTemplateList[index].showCity}}</p>
        </div>
        <div class="name-wrapper">
          <span class="label">市：</span>
          <p class="result">{{cityTemplateList[index].city}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import areaMultiSelection from "./components/area/area";
export default {
  name: "app",
  components: {
    "area-multi-selection": areaMultiSelection
  },
  data() {
    return {
      isShowAreaModel: false,
      areaIndexArr: [],
      // areaNameArr: ["南京", "上海", "长沙"],
      // disData: ["苏州", "北京", "澳门"],
      cityTemplateList: [
        { city: [], showCity: [] },
        { city: [], showCity: [] }
      ],
      disData: [],
      index: 0
    };
  },
  methods: {
    receiveAreaData(data) {
      // this.cityTemplateList[index].areaIndexArr = data.index;
      this.cityTemplateList[this.index].city = data.name;
      this.cityTemplateList[this.index].showCity = data.show;
      console.log(data.name.join());
    },
    changeShowModal(data) {
      this.isShowAreaModel = data;
    },
    ShowAreaModel(index) {
      this.isShowAreaModel = true;
      this.index = index;
      let tmp = [];
      this.cityTemplateList.forEach((item, itemIndex) => {
        if (itemIndex != this.index) {
          tmp = tmp.concat(item.city);
        }
      });
      this.disData = tmp;
    }
  }
};
</script>

<style lang="stylus">
body {
  background: #f0f2f5;
}

#app {
  padding: 20px;

  .result-pannel {
    margin-top: 20px;
    padding: 20px;
    background: #fff;
    border: 1px solid #dde2e8;

    .title {
      margin-bottom: 20px;
    }

    .index-wrapper, .name-wrapper {
      display: flex;

      .label {
        flex: 80px 0 0;
      }
    }

    .name-wrapper {
      margin-top: 20px;
    }
  }
}
</style>


