/* eslint-disable */
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Nav from '../Nav';

const nav = [
  { text: '最新消息', href: 'newslist.php' },
  {
    text: '產品情報',
    href: 'product.php',
    subNav: [
      { text: '工業顯微鏡', href: 'product.php?type=m' },
      { text: '生物顯微鏡', href: 'product.php?type=b' },
      { text: '工業內視鏡', href: 'product.php?type=e' },
      { text: '高速攝影機', href: 'product.php?type=h' },
    ],
  },
  { text: '企業情報', href: 'about.php' },
  { text: '詢價系統', href: 'contact.php' },
];

storiesOf('Nav', module)
  .add('basic', () => (
    <Nav
      logo="http://25lol.com/olympus/yuanli/images/yuanli.svg"
      alt="logo"
      nav={nav}
      lang="lang"
      fb="fb"
      logo2="http://25lol.com/olympus/yuanli/images/nav/logo2.png"
    />
  ));
