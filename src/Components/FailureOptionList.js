import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Select from "react-select";
import { emphasize, makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import NoSsr from "@material-ui/core/NoSsr";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";
import CancelIcon from "@material-ui/icons/Cancel";
import * as _ from "lodash";

//선택한 컴포넌트 이름 반환
const SelectedComponentData = array => {
  const userdata = [];
  for (let i = 0; i < array.length; i++) {
    userdata.push(array[i]);
  }
  return userdata;
};

//선택한 컴포넌트 타입의 FailureOption 반환
const SeletedUserFailureationData = (array, userSelect) => {
  const tmp = array[0];
  let totaldata = [];
  userSelect = String(userSelect.value);

  let tmpstore = [];
  for (let i = 0; i < tmp.length; i++) {
    if (tmp[i].ComponentTypeName == userSelect) {
      let uniqdata = tmp[i].FailureLocation.trim();
      tmpstore.push(uniqdata);
    }
  }
  totaldata = _.uniq(tmpstore);
  let finaldata = [];
  for (let i = 0; i < totaldata.length; i++) {
    finaldata.push({
      value: totaldata[i],
      label: totaldata[i],
    });
  }
  return finaldata;
};

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),

    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 20,
    width: 807,
    height: 55,
    fontSize: 20,
    backgroundColor: "black",
  },

  root: {
    flexGrow: 1,
    height: 250,
    minWidth: 290,
    width: 800,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 50,
    marginBottom: 100,
  },
  input: {
    display: "flex",
    padding: 0,
    height: "auto",
  },
  valueContainer: {
    display: "flex",
    flexWrap: "wrap",
    flex: 1,
    alignItems: "center",
    overflow: "hidden",
  },
  chip: {
    margin: theme.spacing(0.5, 0.25),
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === "light"
        ? theme.palette.grey[300]
        : theme.palette.grey[700],
      0.08
    ),
  },
  noOptionsMessage: {
    padding: theme.spacing(1, 2),
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: "absolute",
    left: 2,
    bottom: 6,
    fontSize: 16,
  },
  paper: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
  divider: {
    height: theme.spacing(2),
  },
}));

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

NoOptionsMessage.propTypes = {
  /**
   * The children to be rendered.
   */
  children: PropTypes.node,
  /**
   * Props to be passed on to the wrapper.
   */
  innerProps: PropTypes.object.isRequired,
  selectProps: PropTypes.object.isRequired,
};

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

inputComponent.propTypes = {
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.any.isRequired,
    }),
  ]),
};

function Control(props) {
  const {
    children,
    innerProps,
    innerRef,
    selectProps: { classes, TextFieldProps },
  } = props;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: classes.input,
          ref: innerRef,
          children,
          ...innerProps,
        },
      }}
      {...TextFieldProps}
    />
  );
}

Control.propTypes = {
  /**
   * Children to render.
   */
  children: PropTypes.node,
  /**
   * The mouse down event and the innerRef to pass down to the controller element.
   */
  innerProps: PropTypes.shape({
    onMouseDown: PropTypes.func.isRequired,
  }).isRequired,
  innerRef: PropTypes.oneOfType([
    PropTypes.oneOf([null]),
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.any.isRequired,
    }),
  ]).isRequired,
  selectProps: PropTypes.object.isRequired,
};

function Option(props) {
  return (
    <MenuItem
      ref={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

Option.propTypes = {
  /**
   * The children to be rendered.
   */
  children: PropTypes.node,
  /**
   * props passed to the wrapping element for the group.
   */
  innerProps: PropTypes.shape({
    id: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    onMouseMove: PropTypes.func.isRequired,
    onMouseOver: PropTypes.func.isRequired,
    tabIndex: PropTypes.number.isRequired,
  }).isRequired,
  /**
   * Inner ref to DOM Node
   */
  innerRef: PropTypes.oneOfType([
    PropTypes.oneOf([null]),
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.any.isRequired,
    }),
  ]).isRequired,
  /**
   * Whether the option is focused.
   */
  isFocused: PropTypes.bool.isRequired,
  /**
   * Whether the option is selected.
   */
  isSelected: PropTypes.bool.isRequired,
};

function Placeholder(props) {
  const { selectProps, innerProps = {}, children } = props;
  return (
    <Typography
      color="textSecondary"
      className={selectProps.classes.placeholder}
      {...innerProps}
    >
      {children}
    </Typography>
  );
}

Placeholder.propTypes = {
  /**
   * The children to be rendered.
   */
  children: PropTypes.node,
  /**
   * props passed to the wrapping element for the group.
   */
  innerProps: PropTypes.object,
  selectProps: PropTypes.object.isRequired,
};

function SingleValue(props) {
  return (
    <Typography
      className={props.selectProps.classes.singleValue}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

SingleValue.propTypes = {
  /**
   * The children to be rendered.
   */
  children: PropTypes.node,
  /**
   * Props passed to the wrapping element for the group.
   */
  innerProps: PropTypes.any.isRequired,
  selectProps: PropTypes.object.isRequired,
};

function ValueContainer(props) {
  return (
    <div className={props.selectProps.classes.valueContainer}>
      {props.children}
    </div>
  );
}

ValueContainer.propTypes = {
  /**
   * The children to be rendered.
   */
  children: PropTypes.node,
  selectProps: PropTypes.object.isRequired,
};

function MultiValue(props) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={clsx(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused,
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  );
}

MultiValue.propTypes = {
  children: PropTypes.node,
  isFocused: PropTypes.bool.isRequired,
  removeProps: PropTypes.shape({
    onClick: PropTypes.func.isRequired,
    onMouseDown: PropTypes.func.isRequired,
    onTouchEnd: PropTypes.func.isRequired,
  }).isRequired,
  selectProps: PropTypes.object.isRequired,
};

function Menu(props) {
  return (
    <Paper
      square
      className={props.selectProps.classes.paper}
      {...props.innerProps}
    >
      {props.children}
    </Paper>
  );
}

Menu.propTypes = {
  /**
   * The children to be rendered.
   */
  children: PropTypes.element.isRequired,
  /**
   * Props to be passed to the menu wrapper.
   */
  innerProps: PropTypes.object.isRequired,
  selectProps: PropTypes.object.isRequired,
};

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
};

const FailureOptionList = ({ data, PmbdData, selecteditem }) => {
  let FailureOptionitem = [];

  const Seleteditems = SelectedComponentData(data);
  const [selecteddata, setselecteddata] = React.useState([]);
  const [single, setSingle] = React.useState(null);
  const [multi, setMulti] = React.useState(null);
  const [Failuredata, setFailuredata] = React.useState([]);

  const classes = useStyles();
  const theme = useTheme();

  const handleChangeSingle = value => {
    if (multi != null) {
      //아이템 요소가 존재하면
      //초기화
      setMulti(null);
      setFailuredata([]);
    }
    setSingle(value);
    FailureOptionitem = SeletedUserFailureationData(PmbdData, value);
    setFailuredata(FailureOptionitem);
  };

  const handleChangeMulti = value => {
    setMulti(value);
  };

  const onClick = () => {
    selecteditem(multi);
  };

  const selectStyles = {
    input: base => ({
      ...base,
      color: theme.palette.text.primary,
      "& input": {
        font: "inherit",
      },
    }),
  };

  return (
    <div className={classes.root}>
      <NoSsr>
        <Select
          classes={classes}
          styles={selectStyles}
          inputId="react-select-single"
          TextFieldProps={{
            label: "Component Type Name",
            InputLabelProps: {
              htmlFor: "react-select-single",
              shrink: true,
            },
          }}
          placeholder="Select ComponentName"
          options={Seleteditems}
          components={components}
          value={single}
          onChange={handleChangeSingle}
        />
        <div className={classes.divider} />
        <Select
          classes={classes}
          styles={selectStyles}
          inputId="react-select-multiple"
          TextFieldProps={{
            label: "Failure Option",
            InputLabelProps: {
              htmlFor: "react-select-multiple",
              shrink: true,
            },
          }}
          placeholder="Select Failure Option"
          options={Failuredata}
          components={components}
          value={multi}
          onChange={handleChangeMulti}
          isMulti
        />
      </NoSsr>
      <div className="search-container">
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={onClick}
        >
          Search
        </Button>
      </div>
    </div>
  );
};
export default FailureOptionList;
