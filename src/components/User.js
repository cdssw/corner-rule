import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: "white",
    margin: "10px auto",
    padding: "10px",
    borderRadius: "5px",
    alignItems: "center",
    flexDirection: "column",
    maxWidth: 600,
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  userImage: {
    margin: "10px",
  },
  table: {
  },
}));

export default function User() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.userImage}>
        <Avatar alt="Remy Sharp" src={process.env.PUBLIC_URL + "/images/foreigner1.png"} className={classes.large} />
      </div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell>이름</TableCell>
              <TableCell align="right">홍길동</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>아이디</TableCell>
              <TableCell align="right">cdssw@naver.com</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>전화번호</TableCell>
              <TableCell align="right">010-1111-1111</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>주소</TableCell>
              <TableCell align="right">서울특별시 강남구 강남대로 1</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>      
    </div>      
  );
}
