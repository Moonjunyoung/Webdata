import React, { Component } from "react";
import { forwardRef } from "react";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import "../css/FailureOptiontable.css";
import { withStyles } from "@material-ui/core/styles";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const SelectedUserView = (Selectedarray, PmbdData) => {
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

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto",
  },
  table: {
    maxWidth: 50,
  },
});

const FailureOptionTable = ({ PmbdData, selecteditem }) => {
  const [columntitle, setcolumntitle] = React.useState({
    columns: [
      { title: "ComponentTypeID", field: "ComponentTypeID", type: "numeric" },
      { title: "Counter", field: "Counter", type: "numeric" },
      { title: "ComponentTypeName", field: "ComponentTypeName" },
      {
        title: "LastChangedInVersion",
        field: "LastChangedInVersion",
        type: "numeric",
      },
      { title: "FailureLocation", field: "FailureLocation" },
      { title: "DegradationMechanism", field: "DegradationMechanism" },
      { title: "DegradationInfluence", field: "Poor seal design" },
      { title: "Graphics", field: "Graphics" },
      { title: "DegradationProgression", field: "DegradationProgression" },
      { title: "FailureTiming", field: "FailureTiming" },
      { title: "TimeCode", field: "TimeCode" },
      { title: "DiscoveryMethods", field: "DiscoveryMethods" },
      { title: "CommonDegradation", field: "CommonDegradation" },
      {
        title: "RelativeFrequency",
        field: "RelativeFrequency",
        type: "numeric",
      },
      { title: "Strength", field: "Strength", type: "numeric" },
      { title: "DefColor", field: "DefColor" },
      { title: "NewVulnerability", field: "NewVulnerability", type: "numeric" },
      { title: "RepairTime", field: "RepairTime", type: "numeric" },
      { title: "FailWeight", field: "FailWeight", type: "numeric" },
      { title: "InstCol", field: "InstCol" },
      { title: "DefFailWeight", field: "DefFailWeight", type: "numeric" },
      { title: "TaskMetric", field: "TaskMetric", type: "numeric" },
      { title: "Attenuation", field: "Attenuation", type: "numeric" },
      { title: "AddToList", field: "AddToList", type: "numeric" },
    ],
  });

  return (
    <MaterialTable
      icons={tableIcons}
      title="Search Datas"
      columns={columntitle.columns}
      data={selecteditem.map(item => ({
        ComponentTypeID: item.ComponentTypeID,
        Counter: item.Counter,
        ComponentTypeName: item.ComponentTypeName,
        LastChangedInVersion: item.LastChangedInVersion,
        FailureLocation: item.FailureLocation,
        DegradationMechanism: item.DegradationMechanism,
        DegradationInfluence: item.DegradationInfluence,
        Graphics: item.Graphics,
        DegradationProgression: item.DegradationProgression,
        FailureTiming: item.FailureTiming,
        TimeCode: item.TimeCode,
        DiscoveryMethods: item.DiscoveryMethods,
        CommonDegradation: item.CommonDegradation,
        RelativeFrequency: item.RelativeFrequency,
        Strength: item.Strength,
        DefColor: item.DefColor,
        NewVulnerability: item.NewVulnerability,
        RepairTime: item.RepairTime,
        FailWeight: item.FailWeight,
        InstCol: item.InstCol,
        DefFailWeight: item.DefFailWeight,
        TaskMetric: item.TaskMetric,
        Attenuation: item.Attenuation,
        AddToList: item.AddToList,
      }))}
    />
  );
};

export default withStyles(styles)(FailureOptionTable);
