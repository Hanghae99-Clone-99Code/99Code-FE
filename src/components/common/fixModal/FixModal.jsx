import axios from 'axios';
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import styles from '../fixModal/FixModal.module.css';
export default function FixModal({ nickName, introduce }) {
  const [modal, setModal] = useState(true);
  const [name, setName] = useState();
  const [text, setText] = useState();
  const [cookie, setCookie, removeCookie] = useCookies();

  const nameChangeHandler = (e) => {
    setName(e.target.value);
  };

  const textChangeHandler = (e) => {
    setText(e.target.value);
  };

  const saveOnClickHandler = () => {
    axios.defaults.headers.put['authorization'] = cookie.token;
    axios.defaults.headers.put['refresh-token'] = cookie.refreshtoken;
    axios
      .put('https://code99-dev.pyuri.dev/api/auth/members/profiles/edit', {
        introduce: text,
        nickname: name,
      })
      .then((response) => {
        console.log('수정', response);
        if (response.data.success) {
          alert('수정되었습니다.');
        } else {
          alert(response.data.error.message);
        }
        window.location.reload();
      });
  };
  return (
    <>
      {modal == true ? (
        <div className={styles.fixModalBox}>
          <div className={styles.img}></div>
          {/* <button className={styles.imgBtn}>사진 선택</button> */}
          <p className={styles.fixText}>닉네임</p>
          <input className={styles.nameInput} onChange={nameChangeHandler} />
          <p className={styles.fixText}>상태 메세지</p>
          <input className={styles.textInput} onChange={textChangeHandler} />
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
