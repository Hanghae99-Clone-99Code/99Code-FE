import Layout from '../../components/common/layout/Layout';
import Menu from '../../components/common/layout/menu/Menu';
import Room from '../chatPage/room/Room';
import React from 'react';
import MenuList from '../../components/common/layout/menuList/MenuList';
import MyPage from '../../components/myPage/MyPage';
import Option from '../../components/option/Option';

export default function MainPage() {
  return (
    <>
      <Option></Option>

      <MyPage></MyPage>
    </>
  );
}
