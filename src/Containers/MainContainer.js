import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { SelectedComponentItems } from "../modules/MainContainer";
import { SelectedFailureOptions } from "../modules/MainContainer";

import SearchBar from "../Components/SearchBar";
import FailureOptionList from "../Components/FailureOptionList";
import FailureOptionTable from "../Components/FailureOptionTable";

const MainContainer = ({
  ComponentName,
  SelectedComponentItems,
  PmbdData,
  data,
  SelectedFailureOptions,
  SelectedFailureOptionDatas,
}) => {
  return (
    <>
      <SearchBar
        ComponentName={ComponentName}
        selecteditem={SelectedComponentItems}
      />
      <FailureOptionList
        data={data}
        PmbdData={PmbdData}
        selecteditem={SelectedFailureOptions}
      />
      <FailureOptionTable
        PmbdData={PmbdData}
        selecteditem={SelectedFailureOptionDatas}
      />
    </>
  );
};

// state값들
const mapStateToProps = state => ({
  PmbdData: state.MainContainer.PmbdData,
  ComponentName: state.MainContainer.ComponentNameData,
  data: state.MainContainer.Selecteditem,
  SelectedFailureOptionDatas: state.MainContainer.SelectedFailureOptionDatas,
});

// 액션생성함수
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      SelectedComponentItems,
      SelectedFailureOptions,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContainer);
