import axios from 'axios';
import React, { useEffect, useState } from 'react';
import FixModal from '../fixModal/FixModal';
import styles from '../mypage/MyPage.module.css';
import image from './../../../img/006.png';
export default function MyPage() {
  const [modal, setModal] = useState(false);
  const authorization = sessionStorage.getItem('Authorization');
  const refresh_token = sessionStorage.getItem('Refresh-Token');
  const fixClick = () => {
    setModal(true);
  };
  const nickname = sessionStorage.getItem('nickname');
  const introduce = sessionStorage.getItem('introduce');
  console.log(nickname);
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get('https://code99-dev.pyuri.dev/api/auth/members/profiles', {
        headers: {
          Authorization: authorization,
          'Refresh-Token': refresh_token,
        },
      })
      .then((response) => {
        sessionStorage.setItem('nickname', response.data.data.nickname);
        sessionStorage.setItem('introduce', response.data.data.introduce);
        console.log('성공', response.data.data);
      })
      .catch(() => {
        console.log('실패');
      });
  }, []);
  //토큰 실어주기

  return (
    <>
      <div className={styles.myPageMain}>
        <img className={styles.img} src={image}></img>

        <div className={styles.name}>{nickname}</div>
        <div className={styles.textBox}>{introduce}</div>
        <button className={styles.fixBtn} onClick={fixClick}>
          수정
        </button>
        {modal == true ? <FixModal /> : null}
      </div>
    </>
  );
}
