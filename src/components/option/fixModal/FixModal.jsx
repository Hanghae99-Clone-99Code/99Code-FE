import axios from 'axios';
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import styles from '../fixModal/FixModal.module.css';
import image from './../../../img/006.png';
export default function FixModal({ nickName, introduce }) {
  const [modal, setModal] = useState(true);
  const [name, setName] = useState();
  const [text, setText] = useState();
  const authorization = sessionStorage.getItem('Authorization');
  const refresh_token = sessionStorage.getItem('Refresh-Token');
  // const nickname = sessionStorage.getItem('nickname');
  // const introduce = sessionStorage.getItem('introduce');

  const nameChangeHandler = (e) => {
    setName(e.target.value);
  };

  const textChangeHandler = (e) => {
    setText(e.target.value);
  };

  const saveOnClickHandler = () => {
    axios({
      url: 'https://code99-dev.pyuri.dev/api/auth/members/profiles/edit',
      method: 'put',
      headers: {
        Authorization: authorization,
        'Refresh-Token': refresh_token,
      },
      data: {
        introduce: text,
        nickname: name,
      },
      responseType: 'text',
    })
      .then((res) => {
        if (res.success) {
          alert('수정되었습니다.');
        }
        window.location.reload();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <>
      {modal == true ? (
        <div className={styles.fixModalBox}>
          <img className={styles.img} src={image}></img>

          <p className={styles.fixText}>닉네임</p>
          <input
            className={styles.nameInput}
            onChange={nameChangeHandler}
            placeholder={sessionStorage.getItem('nickname')}
          />
          <p className={styles.fixText}>상태 메세지</p>
          <input
            className={styles.textInput}
            onChange={textChangeHandler}
            placeholder={sessionStorage.getItem('introduce')}
          />
          <div className={styles.btnBox}>
            <button className={styles.fixBtn} onClick={saveOnClickHandler}>
              확인
            </button>
            <button
              className={styles.fixBtn}
              onClick={() => {
                setModal(false);
              }}
            >
              취소
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
