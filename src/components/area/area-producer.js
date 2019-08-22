import areaData from './area-source.json';

class AreaProducer {
    constructor() {
        this.arr = [];
    }

    get2LevelArea(data, disData) {
        let parent = areaData['1'];
        let parentArr = [];
        let pObj = {};
        let cObj = {};
        let tmpObj = {};
        let tmpArr = [];

        for (let i in parent) {
            let isCheckChildrenCount = 0
            let childrenCount = 0
            let isDisChildrenCount = 0
            pObj.value = i;
            pObj.label = parent[i];
            pObj.checkAll = false;
            pObj.disabled = false;

            pObj.children = areaData[i];
            tmpObj = areaData[i];
            for (let j in tmpObj) {
                cObj.value = j;
                cObj.label = tmpObj[j];
                childrenCount = childrenCount + 1
                if (data.indexOf(cObj.label) < 0) {
                    cObj.isCheck = false;
                } else {
                    cObj.isCheck = true;
                    isCheckChildrenCount = isCheckChildrenCount + 1
                }
                if (disData.indexOf(cObj.label) < 0) {
                    cObj.disabled = false;
                } else {
                    cObj.disabled = true;
                    isDisChildrenCount = isDisChildrenCount + 1
                }
                tmpArr.push(cObj);
                cObj = {};
            }
            if (childrenCount === isCheckChildrenCount) {
                pObj.checkAll = true;
            }
            if (childrenCount === isDisChildrenCount) {
                pObj.disabled = true;
            }
            pObj.children = tmpArr;
            pObj.childrenCount = childrenCount;
            pObj.isCheckChildrenCount = isCheckChildrenCount;

            parentArr.push(pObj);
            pObj = {};
            cObj = {};
            tmpObj = {};
            tmpArr = [];
        }
        return parentArr;
    }
}

export default new AreaProducer()
