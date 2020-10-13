import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CardList } from "components";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles((theme) => ({
  root: {
  },
  muiTabsRoot: {
    backgroundColor: '#f8f8f8',
  },
  muiTabsIndicator: {
    backgroundColor: '#5a6482',
  },
  appBar: {
    marginBottom: '12px',
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div>{children}</div>
      )}
    </div>
  );
}

export default function MyTab(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default" className={classes.appBar}>
        <Tabs
          classes={{root: classes.muiTabsRoot, indicator: classes.muiTabsIndicator}}
          value={value}
          onChange={handleChange}
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="내가 모집중" />
          <Tab label="내가 지원중" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <CardList path="/mypage" items={props.myOpened} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CardList path="/mypage" items={props.myApplication} />
      </TabPanel>
    </div>
  );
}
