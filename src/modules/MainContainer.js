import * as _ from "lodash";

const pmbddatas = require("../Data/pmdb.json");

const ComponentNameDataCreate = array => {
  let tmp = [];
  let ComponentsName = [];
  for (let i = 0; i < array.length; i++) {
    let uniqdata = array[i].ComponentTypeName.trim();
    tmp.push(uniqdata);
  }
  ComponentsName = _.uniq(tmp);
  return ComponentsName;
};

const SelectedUserView = (Selectedarray, PmbdData) => {
  console.log(Selectedarray.length);
  PmbdData = PmbdData[0];
  let sorteddata = [];
  for (let i = 0; i < Selectedarray.length; i++) {
    let Selecteditem = Selectedarray[i].value.trim();
    for (let j = 0; j < PmbdData.length; j++) {
      let FailureData = PmbdData[j].FailureLocation;
      if (FailureData == Selecteditem) {
        sorteddata.push(PmbdData[j]);
      }
    }
  }
  sorteddata.sort();
  return sorteddata;
};

// 액션타입 정의
const SelectedComponentItem = "MainContainer/SelectedComponentItem"; // 변경된값 전달
const SelectedFailureOption = "MainContainer/SelectedFailureOption";

// 액션생성함수정의
export const SelectedComponentItems = item => ({
  type: SelectedComponentItem,
  item,
});

export const SelectedFailureOptions = item => ({
  type: SelectedFailureOption,
  item,
});

//액션생성함수

// 초기상태
const initialState = {
  PmbdData: [pmbddatas],
  ComponentNameData: ComponentNameDataCreate(pmbddatas),
  Selecteditem: [],
  SelectedFailureOptionDatas: [],
};

// 초기상태

const MainContainer = (state = initialState, action) => {
  switch (action.type) {
    case SelectedComponentItem:
      return {
        //선택시
        ComponentNameData: state.ComponentNameData,
        Selecteditem: action.item, // state 상태로 지정
        PmbdData: state.PmbdData,
        SelectedFailureOptionDatas: [],
      };

    case SelectedFailureOption:
      return {
        ComponentNameData: state.ComponentNameData,
        Selecteditem: state.Selecteditem, // state 상태로 지정
        SelectedFailureOptionDatas: SelectedUserView(
          action.item,
          state.PmbdData
        ), //선택된 아이템 value
        PmbdData: state.PmbdData,
      };

    default:
      return state;
  }
};

export default MainContainer;
