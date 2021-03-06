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
    backgroundColor: theme.color.white,
  },
  muiTabsIndicator: {
    backgroundColor: theme.color.green,
  },
  appBar: {
    marginBottom: '10px',
    boxShadow: 'none',
    border: '1px solid ' + theme.color.border,
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

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default" className={classes.appBar}>
        <Tabs
          classes={{root: classes.muiTabsRoot, indicator: classes.muiTabsIndicator}}
          value={props.tab}
          onChange={props.onSelectTab}
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="내가 모집중" />
          <Tab label="내가 지원/문의중" />
        </Tabs>
      </AppBar>
      <TabPanel value={props.tab} index={0}>
        <CardList path="/mypage" tab={props.tab} items={props.myOpened} fetchMoreData={props.openMoreData} />
      </TabPanel>
      <TabPanel value={props.tab} index={1}>
        <CardList path="/mypage" tab={props.tab} items={props.myApplication} fetchMoreData={props.applicationMoreData} />
      </TabPanel>
    </div>
  );
}
