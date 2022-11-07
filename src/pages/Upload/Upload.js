import React, { useRef, useState, useEffect } from 'react';
import './upload.scss';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

function App() {
  const [image, setImage] = useState();

  function uploadImageClick(event) {
    event.preventDefault();
    imgInputRef.current.click();
  }
  function onImgChange(event) {
    console.log(Object.values(event.target.files));
    const formData = new FormData();
    formData.append('file', event.target.files[0]);
    console.log(formData);
    console.log(event.target.files[0]);
  }
  const imgInputRef = useRef();

  useEffect(() => {}, [imgInputRef]);

  return (
    <>
      <Header />
      <div className="uploadComponent">
        <span className="typeSelectSpan">업로드 타입을 선택해주세요 :)</span>
        <div className="selectBox">
          <div className="selectBoxComponent">
            이미지
            <form>
              <input
                type="file"
                name="userfile"
                id="userfileInput"
                accept="image/*"
                ref={imgInputRef}
                onChange={onImgChange}
                multiple
                style={{ display: 'none' }}
              ></input>
              <label className="inpuLabel" for="userfileInput"></label>
            </form>
          </div>
          <div className="selectBoxComponent">사운드</div>
          <div className="selectBoxComponent">동영상</div>
          <div className="selectBoxComponent">그림책</div>
          <div className="selectBoxComponent">배경화면</div>
        </div>
        <div className="alertBox">
          <img className="alertImg" src="" alt="" />
          <div className="alertSpanBox">
            <span className="alertSpan">
              업로드 시, 이 콘텐츠의 저작권 소유자이며서비스 운영원칙에 동의한
              것으로 간주합니다.
            </span>
            <span className="alertSpan">
              * 저작권 등 타인의 권리를 침해하거나 명예를 훼손하는 이미지,
              동영상, 음원 등을 게시하는 경우이용약관 및 관련 법률에 의하여
              제재를 받으실 수 있습니다.
            </span>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
