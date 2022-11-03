import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from '../../pages/mainPage/MainPage';
import ChatPage from '../../pages/chatPage/ChatPage';
import JoinPage from '../../pages/joinPage/JoinPage';
import InvitePage from '../../pages/invitePage/InvitePage';
import Mode from '../../components/option/mode/Mode';
import MyPage from '../../components/option/mypage/MyPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/channel/:id" element={<ChatPage />} />
        <Route path="/invite/:id" element={<InvitePage />} />
        {/* <Route path='*' element={<MainPage />} /> */}
        <Route path="/join" element={<JoinPage />} />
        <Route path="/mode" element={<Mode />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
