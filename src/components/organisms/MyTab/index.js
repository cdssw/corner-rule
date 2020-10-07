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
        <CardList items={[{"id":1,"title":"지고메고 백패킹","content":"자연속에서 LNT를 실천하고 트레킹과 비박을 통해 힐링하는, 특별한 즐거움","recruitment":3,"application":2,"cost":1000,"address":{"address1":"강남구 대치동","address2":"Startbucks"},"term":{"startDt":"2020-08-20 16:08:56","endDt":"2020-08-20 16:08:56","startTm":"16:08","endTm":"16:08","detailDay":128}, "imgList": [], "inputDt":"2020-08-20 16:08:56","modifyDt":"2020-08-20 16:08:56","user":{"inputDt":"2020-08-20 16:08:55","modifyDt":"2020-08-20 16:08:55","id":1,"userNm":"Andrew","phone":"010-1111-1111","hibernateLazyInitializer":{}}}]} />
      </TabPanel>
      <TabPanel value={value} index={1}>
      <CardList items={[{"id":1,"title":"어린이집","content":"자연속에서 LNT를 실천하고 트레킹과 비박을 통해 힐링하는, 특별한 즐거움","recruitment":3,"application":2,"cost":1000,"address":{"address1":"강남구 대치동","address2":"Startbucks"},"term":{"startDt":"2020-08-20 16:08:56","endDt":"2020-08-20 16:08:56","startTm":"16:08","endTm":"16:08","detailDay":128},"imgList": [], "inputDt":"2020-08-20 16:08:56","modifyDt":"2020-08-20 16:08:56","user":{"inputDt":"2020-08-20 16:08:55","modifyDt":"2020-08-20 16:08:55","id":1,"userNm":"Andrew","phone":"010-1111-1111","hibernateLazyInitializer":{}}}]} />
      </TabPanel>
    </div>
  );
}
