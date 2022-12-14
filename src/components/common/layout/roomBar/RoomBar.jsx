import React, { useContext, useEffect } from 'react';
import styles from './RoomBar.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import instance from '../../../../shared/Request';
import useInput from '../../../../hooks/useInput';
import {
  __createChannel,
  __getChannels,
} from '../../../../redux/modules/ChatSlice';
import { TabContext } from '../../../../context/TabContext ';

export default function RoomBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const channels = useSelector((state) => state.chat.channels);
  const [channelInput, setChannelInput, channelInputHandler] = useInput('');

  const authorization = sessionStorage.getItem('Authorization');
  const refresh_token = sessionStorage.getItem('Refresh-Token');
  //console.log(authorization, refresh_token);
  //console.log(channels.data);

  useEffect(() => {
    if (authorization && refresh_token) {
      dispatch(
        __getChannels({
          authorization: authorization,
          refresh_Token: refresh_token,
        })
      );
    }
  }, []);

  const [modalOpen, setModalOpen] = useState(false);
  const toggleModal = () => {
    setModalOpen((prev) => !prev);
    setFileImage('');
  };

  const imgInput = document.querySelector(`#choosePhoto`);
  const formData = new FormData();

  const formDataHandler = async () => {
    //console.log(imgInput.files[0]);
    formData.append('file', imgInput.files[0]);
    const uploader = { channelName: channelInput };
    const uploaderString = JSON.stringify(uploader);
    formData.append(
      'uploader',
      new Blob([uploaderString], {
        type: 'application/json',
      })
    );
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!imgInput.files[0] || !channelInput) return;

    await formDataHandler();

    //console.log(formData);
    instance.defaults.headers.post['Authorization'] = authorization;
    instance.defaults.headers.post['Refresh-token'] = refresh_token;
    instance.post('/api/room', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    setChannelInput('');
    toggleModal();

    window.setTimeout(() => {
      window.location.reload();
    }, 300);
  };

  const [fileImage, setFileImage] = useState('');
  const saveFileImage = (file) => {
    if (file) setFileImage(URL.createObjectURL(file));
  };
  // const deleteFileImage = () => {
  //   URL.revokeObjectURL(fileImage);
  //   setFileImage('');
  // };
  const onImageChangeHandler = (e) => {
    saveFileImage(e.target.files[0]);
  };

  //console.log(fileImage);
  const { tab, setTab } = useContext(TabContext);

  return (
    <>
      <section className={styles.roomList}>
        <div
          className={`${styles.Logo} ${styles.main} ${tab === 'main' &&
            styles.mainActive}`}
          onClick={() => {
            setTab('main');
            navigate('/');
          }}
        >
          <i className='fa-brands fa-discord'></i>
        </div>
        <hr className={styles.line} />

        <ul>
          {/* roomlist by username  */}
          {channels.data &&
            channels.data.map((channel) => (
              <li key={channel.roomId}>
                <div
                  className={`${styles.Logo} ${styles.temp} ${tab ===
                    channel.roomId && styles.active}`}
                  onClick={() => {
                    setTab(channel.roomId);
                    navigate(`/channel/${channel.roomId}`);
                  }}
                >
                  {channel.imageUrl ? (
                    <img
                      src={channel.imageUrl}
                      className={styles.channelLogo}
                      alt={`${channel.roomName} logo`}
                    ></img>
                  ) : (
                    <h1>{channel.roomName.slice(0, 1).toUpperCase()}</h1>
                  )}
                </div>
              </li>
            ))}
        </ul>

        <div className={`${styles.Logo} ${styles.plus}`} onClick={toggleModal}>
          <i className='fa-solid fa-plus'></i>
        </div>
      </section>

      {/* + Button -> Modal Layout & Box */}
      <div
        className={modalOpen ? styles.modalLayoutOpen : styles.modalLayoutClose}
        onClick={toggleModal}
      />

      <div className={modalOpen ? styles.modalBoxOpen : styles.modalBoxClose}>
        <div className={styles.xBtn} onClick={toggleModal}>
          <i className='fa-solid fa-xmark' />
        </div>
        <form className={styles.modalForm} onSubmit={onSubmitHandler}>
          <span className={styles.formText}>?????? ?????????</span>
          <span className={styles.formServeText}>
            ????????? ?????? ???????????? ?????? ???????????? ???????????????. ??? ????????? ?????????
            ????????? ??????????????????.
          </span>
          <div className={styles.preImgBox}>
            <input
              type='file'
              id='choosePhoto'
              name='choosePhoto'
              accept='image/*'
              style={{ display: 'none' }}
              onChange={onImageChangeHandler}
              //value={fileImage}
            />
            <label className={styles.preLab} htmlFor='choosePhoto'>
              ????????? ??????
            </label>
            {fileImage && (
              <img className={styles.preImg} alt='sample' src={fileImage} />
            )}
          </div>

          <input
            type='text'
            placeholder='?????? ????????? ??????????????????'
            value={channelInput}
            onChange={channelInputHandler}
            className={styles.formInput}
          />
          <button className={styles.submitBtn}>?????? ?????????</button>
        </form>
      </div>
    </>
  );
}
