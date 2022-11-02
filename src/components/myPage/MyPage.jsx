import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import FixModal from '../common/fixModal/FixModal';
import styles from '../myPage/MyPage.module.css';
export default function MyPage() {
  const [modal, setModal] = useState(false);
  const [cookie, setCookie, removeCookie] = useCookies();
  const fixClick = () => {
    setModal(true);
  };

  useEffect(() => {
    axios.defaults.headers.common['authorization'] = cookie.token;
    axios.defaults.headers.common['refresh-token'] = cookie.refreshtoken;
    axios
      .get('https://code99-dev.pyuri.dev/api/auth/members/profiles')
      .then((response) => {
        console.log(response);
      }, []);
  });
  //토큰 실어주기

  // axios
  //   .get('https://code99-dev.pyuri.dev/api/auth/members/profiles')
  //   .then(function(responce) {
  //     console.log('1', responce);
  //   })
  //   .catch(function(error) {});
  return (
    <>
      <div className={styles.myPageMain}>
        <div className={styles.img}></div>
        <div className={styles.name}>닉네임</div>
        <div className={styles.textBox}>헛소리</div>
        <button className={styles.fixBtn} onClick={fixClick}>
          수정
        </button>
        {modal == true ? <FixModal /> : null}
      </div>
    </>
  );
}
