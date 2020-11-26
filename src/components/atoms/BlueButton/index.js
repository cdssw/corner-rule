import { Button, withStyles } from '@material-ui/core';

const BlueButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText('#59b8dc'),
    backgroundColor: '#59b8dc',
    '&:hover': {
      backgroundColor: '#3C93B4',
    },
  },
  label: {
    color: theme.color.white,
  }
}))(Button);

export default BlueButton;