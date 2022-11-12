import React, { useEffect, useState } from 'react';
import DaumPostcode from 'react-daum-postcode';

export default function Temp(props) {
  const [address, setAddress] = useState('');
  const [addressDetail, setAddressDetail] = useState('');
  const [isOpenPost, setIsOpenPost] = useState(true);

  const onChangeOpenPost = () => {
    setIsOpenPost(!isOpenPost);
  };

  const onCompletePost = (data) => {
    let fullAddr = data.address;
    let extraAddr = '';
    console.log(data);
    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddr += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddr +=
          extraAddr !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddr += extraAddr !== '' ? ` (${extraAddr})` : '';
    }

    setAddress(data.zonecode);
    setAddressDetail(fullAddr);
    //setIsOpenPost(false);
  };

  const postCodeStyle = {
    border: '5px solid black',
    display: 'block',
    position: 'relative',
    top: '0%',
    width: '400px',
    height: '500px',
    padding: '7px',
  };

  useEffect(() => {
    console.log(address);
    console.log(addressDetail);
  }, [address, addressDetail]);

  return (
    <>
      <button onClick={onChangeOpenPost}>주소창</button>
      {isOpenPost ? (
        <>
          <div>
            <DaumPostcode style={postCodeStyle} onComplete={onCompletePost} />
          </div>

          <h1>fdf</h1>
        </>
      ) : null}
      <h1>하하호호</h1>
    </>
  );
}
