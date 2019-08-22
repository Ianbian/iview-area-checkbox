<template>
  <div>
    <Modal
      v-model="ShowAreaModel"
      title="城市多选"
      :mask-closable="false"
      :scrollable="false"
      :closeable="false"
    >
      <div class="area clearfix">
        <div class="region-wrapper" v-for="(province,index) in data" :key="index">
          <Poptip placement="right-start" width="250" trigger="hover">
            <div class="provice-wrapper">
              <Checkbox
                :value="province.checkAll"
                @click.prevent.native="handleCheckProvince(province)"
                :disabled="province.disabled"
              >{{province.label}}</Checkbox>
            </div>
            <div class="city-wrapper" slot="content">
              <Checkbox
                class="city-item"
                v-for="(city,childIndex) in province.children"
                :key="childIndex"
                :value="city.isCheck"
                @click.prevent.native="handleCheckCity(province,city)"
                :disabled="city.disabled"
              >{{city.label}}</Checkbox>
            </div>
          </Poptip>
          <span
            class="select-count"
            v-if="province.childrenCount !== province.isCheckChildrenCount"
          >{{province.isCheckChildrenCount}} / {{province.childrenCount}}</span>
        </div>
      </div>
      <div slot="footer">
        <Button style="font-size:14px;" @click="closeModal">取消</Button>
        <Button class="addBtn" style="margin:0 0 0 10px " @click="confirmModal">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import areaData from "./area-producer";

export default {
  name: "area-multi-selection",
  props: {
    AreaData: Array,
    disData: Array,
    isShowAreaModel: Boolean
  },
  data() {
    return {
      data: [],
      rstAreaData: [],
      ShowAreaModel: false,
      click: true
      // tdata: ['北京']
    };
  },
  mounted() {
    this.data = areaData.get2LevelArea(this.AreaData, this.disData);
    this.ShowAreaModel = this.isShowAreaModel;
    // if (this.AreaData.length !== 0 && this.AreaData.length !== 397) {
    //   for (let j in this.data) {
    //     let curValue = this.data[j].label
    //     if (this.AreaData.indexOf(curValue) < 0) {
    //       this.data[j].checkAll = false;
    //     }
    //     let count = 0;
    //     for (let k in this.data[j].children) {
    //       let curChildValue = this.data[j].children[k].label
    //       if (this.AreaData.indexOf(curChildValue) < 0) {
    //         this.data[j].children[k].isCheck = false;
    //       } else {
    //         ++count;
    //       }
    //     }
    //     this.data[j].isCheckChildrenCount = count;
    //   }
    // }
  },
  methods: {
    handleCheckProvince(param) {
      let disCount = 0;
      if (!param.checkAll) {
        // children的isCheck全部设为true
        for (let i in param.children) {
          if (param.children[i].disabled) {
            disCount++;
            continue;
          }
          param.children[i].isCheck = true;
        }
        param.isCheckChildrenCount = param.childrenCount - disCount;
      } else {
        for (let i in param.children) {
          if (param.children[i].disabled) {
            continue;
          }
          param.children[i].isCheck = false;
        }
        param.isCheckChildrenCount = 0;
      }
      param.checkAll = !param.checkAll;
      // this.emitData();
    },
    handleCheckCity(parent, param) {
      param.isCheck = !param.isCheck;
      let childrenLen = parent.children.length;
      let count = 0;
      for (let i in parent.children) {
        if (parent.children[i].isCheck === true) {
          ++count;
        }
      }
      if (count === childrenLen) {
        parent.checkAll = true;
      } else {
        parent.checkAll = false;
      }
      parent.isCheckChildrenCount = count;
      // this.emitData();
    },
    emitData() {
      let vm = this;
      let rstAreaData = {
        show: [],
        name: []
      };
      for (let j in vm.data) {
        if (vm.data[j].checkAll === true) {
          // rstAreaData.index.push(vm.data[j].value);
          rstAreaData.show.push(vm.data[j].label);
        }
        for (let k in vm.data[j].children) {
          if (vm.data[j].children[k].isCheck === true) {
            if (!vm.data[j].checkAll) {
              rstAreaData.show.push(vm.data[j].children[k].label);
            }
            // rstAreaData.show.push(vm.data[j].children[k].value);
            rstAreaData.name.push(vm.data[j].children[k].label);
          }
        }
      }
      this.$emit("areaData", rstAreaData);
      this.click = true;
      this.closeModal();
    },
    closeModal() {
      this.ShowAreaModel = false;
      this.$emit("changeShowModal", this.ShowAreaModel);
    },
    confirmModal() {
      if (this.click) {
        this.click = false;
        this.emitData();
      }
    }
  }
};
</script>
<style lang="less">
.clearfix {
  zoom: 1;

  &:after {
    content: " ";
    display: block;
    height: 0;
    clear: both;
    overflow: hidden;
  }
}

.region-wrapper {
  float: left;
  margin-bottom: 15px;
  width: 25%;

  .city-pop {
    width: 200px;
  }

  .city-wrapper {
    overflow: hidden;
  }

  .city-item {
    float: left;
    margin: 5px 0 5px 10px;
    width: 80px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .select-count {
    color: #2d8cf0;
  }
}
</style>
