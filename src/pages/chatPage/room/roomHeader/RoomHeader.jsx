import React, { useContext, useState } from 'react';
import { UserDisplayContext } from '../../../../context/UserDisplayContext';
import styles from './RoomHeader.module.css';

import Dropdown from '../../../../components/common/dropDown/Dropdown';
import { useDispatch } from 'react-redux';
import { __exitChannel } from '../../../../redux/modules/ChatSlice';
import { useNavigate } from 'react-router-dom';

export default function RoomHeader({ channel }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropOpen, setDropOpen] = useState(false);
  const { isUserDisplay, toggleIsUserDisplay } = useContext(UserDisplayContext);
  const authorization = sessionStorage.getItem('Authorization');
  const refresh_token = sessionStorage.getItem('Refresh-Token');
  //console.log(channel.roomId);
  const toggleDrop = () => {
    setDropOpen((prev) => !prev);
  };

  const onExitHandler = () => {
    dispatch(
      __exitChannel({
        authorization: authorization,
        refresh_token: refresh_token,
        roomId: parseInt(`${channel.roomId}`),
      })
    );
    navigate('/');
  };

  return (
    <>
      <div className={styles.box}>
        <div className={styles.name} onClick={toggleDrop}>
          <span>{channel.roomName}</span>
          <div
            className={styles.nameBtn}
            style={{
              color: dropOpen
                ? 'var(--color-light-blue)'
                : 'var(--color-black)',
            }}
          >
            <i className='fa-solid fa-caret-down' />
          </div>
        </div>

        <div className={styles.search}>
          {/* search box */}
          <div className={styles.btnSet}>
            {/* <i className="fa-solid fa-bell-slash"></i> */}
            <button className={styles.barBtn}>
              <i className='fa-solid fa-bell'></i>
            </button>
            <button
              className={styles.barBtn}
              style={{
                color: isUserDisplay
                  ? 'var(--color-light-blue)'
                  : 'var(--color-black)',
              }}
              onClick={toggleIsUserDisplay}
            >
              <i className='fa-solid fa-user-group'></i>
            </button>
          </div>

          <input type='text' placeholder='검색하기' className={styles.input} />
        </div>
      </div>

      {/*  DropDown  */}
      <Dropdown dropOpen={dropOpen}>
        <ul className={styles.dropBox}>
          <li className={styles.dropList} onClick={onExitHandler}>
            <i
              style={{ color: 'red' }}
              className='fa-solid fa-right-from-bracket'
            />
            채널 나가기
          </li>
        </ul>
      </Dropdown>
    </>
  );
}
