import React from "react";
import { InputIcon } from "components";
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';

export default {
  component: InputIcon,
  title: 'InputIcon',
};

export const basic = () => <InputIcon icon={<AccountCircleOutlinedIcon color="disabled" />} />;
export const password = () => <InputIcon type="password" icon={<VpnKeyOutlinedIcon color="disabled" />} />;
export const remove = () => <InputIcon icon={<ClearOutlinedIcon color="disabled" />}/>;