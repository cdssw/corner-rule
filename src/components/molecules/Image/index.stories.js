import React from "react";
import { Image } from "components";

export default {
  component: Image,
  title: 'Image',
};

export const basic = () => <Image file="/images/200937431.jpg" />;
export const resize = () => <Image file="/images/200937431.jpg" width="200" height="200" />;
export const noImage = () => <Image />;
export const noImageResize = () => <Image width="200" height="200" />;
