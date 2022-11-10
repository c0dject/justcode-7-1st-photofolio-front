import React, { useEffect, useRef, useState } from 'react';
import './CardDetailContent.scss';
import Tag from './Tag/Tag';
import Reply from './Reply/Reply';
import { Link, useNavigate, useParams } from 'react-router-dom';

const CardDetailContents = () => {
  const [cardDetailContents, setcardDetailContents] = useState([]);
  const [tags, setTags] = useState([]); //태그
  const [feedImg, setFeedImg] = useState([]);
  let [sympathys, setSympathys] = useState([]); //공감배열
  const [userId, setUserId] = useState([]); //user_id

  const { id } = useParams();

  //카드 상세페이지 정보 fetch
  useEffect(() => {
    fetch('http://localhost:8000/works/' + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        token: localStorage.getItem('token'),
      },
    })
      .then(res => res.json())
      .then(res => {
        setcardDetailContents(res.feedWithTags[0]);
        setUserId(res.feedWithTags[0].user_id);
        setTags(res.feedWithTags[0].tagInfo);
        setSympathys(res.sympathySortCount[0]);
        setReplyArray(res.feedCommentInfo);
        setFeedImg(res.feedImgArr[0].fileInfo[0]);
      });
  }, [id]);

  const reply = useRef(); //현재 댓글의 value
  const [replyArray, setReplyArray] = useState([]); //댓글배열

  //새로운 댓글 저장 fetch
  const saveReply = () => {
    fetch('http://localhost:8000/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: localStorage.getItem('token'),
      },
      body: JSON.stringify({ id: id, comment: reply.current.value }),
    })
      .then(res => res.json())
      .then(res => setReplyArray(res.data));
  };

  const navigate = useNavigate();

  //로그인하지 않았을 때 댓글창 누르면, 메인으로 이동
  const movePage = () => {
    alert('로그인한 다음 이용해 주세요.');
    navigate('/works');
  };

  // //클릭시 좋아요 수 변화 함수
  // const changeLike = () => {
  //   if (likeBtn === true) {
  //     sympathys.sympathy_cnt++;
  //   } else {
  //     sympathys.sympathy_cnt--;
  //   }
  // };

  //현재 좋아요 버튼의 상태
  // const [likeBtn, setLikeBtn] = useState(false);

  //좋아요 기능
  // const LikeCnt = () => {
  //   fetch('http://localhost:8000/sympathy', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       token: localStorage.getItem('token'),
  //     },
  //     body: JSON.stringify({ posting_id: id, sympathy_id: 1 }),
  //   })
  //     .then(res => res.json())
  //     .then(res => setLikeBtn(res.data));
  // };

  return (
    <div>
      <div className="detail-out-wrapper">
        <div className="detail-header-wrapper">
          <div className="detail-title-wrapper">
            <h3 className="detail-title">{cardDetailContents.title}</h3>
          </div>
          <span className="detail-writer-by">by</span>
          <button
            className="detail-writer-nickname"
            onClick={() => navigate(`/channel/${userId}`)}
          >
            {cardDetailContents.kor_name}
          </button>
          <span className="detail-date">{cardDetailContents.created_at}</span>
          <span className="detail-inquiry-count">
            조회수{cardDetailContents.view_count}
          </span>
        </div>
        <div className="detail-content-wrapper">
          <div className="detail-content-pictures">
            <img src={feedImg.img_url} alt="" />
          </div>
          {/* 태그 컴포넌트 */}
          <div className="detail-tag-wrapper">
            {tags.map((tag, index) => {
              return <Tag key={index} tag_name={tag.tag_name} />;
            })}
          </div>
          <div className="detail-copy-right">
            Copyright © {cardDetailContents.kor_name} All Rights Reserved.
          </div>
        </div>
        {/* 공감 */}
        <div className="detail-reaction-wrapper">
          <div className="detail-reaction-inner-wrapper">
            <div className="detail-reaction-icon-wrapper">
              <button className="detail-icon">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1062/1062573.png"
                  alt=""
                />
              </button>
            </div>
            <div className="detail-reaction-icon-second-wrapper">
              <div className="detail-reaction-icon-title-wrapper">
                <div className="detail-icon-title">좋아요</div>
              </div>
              <div className="detail-reaction-icon-count-wrapper">
                <div className="detail-icon-count">
                  {sympathys.sympathy_cnt}
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="detail-reply-out-wrapper">
          <div className="detail-reply-wrapper">
            <span className="detail-reply-icon">
              <img
                src="https://cdn-icons-png.flaticon.com/512/6460/6460733.png"
                alt=""
              />
            </span>
          </div>
        </div>
        <details>
          <summary />
          <div className="detail-reply-input-out-wrapper">
            <div className="detail-reply-input-wrapper">
              <div className="detail-reply-input-inner-wrapper">
                <div className="detail-reply-title">
                  {localStorage.getItem('kor_name')}
                </div>
                <div className="detail-reply-text-area-wrapper">
                  {localStorage.getItem('token') ? (
                    <textarea
                      type="text"
                      placeholder="주제와 무관한 댓글, 악플은 삭제될 수 있습니다."
                      ref={reply}
                    />
                  ) : (
                    <textarea
                      type="text"
                      placeholder="댓글을 작성하려면 로그인 해주세요."
                      onClick={movePage}
                    />
                  )}
                </div>
                <div className="detail-reply-text-limit">최대 1000자</div>
              </div>
              <div className="detail-reply-apload-btn">
                <button onClick={saveReply}>등록</button>
              </div>
            </div>
            <div className="detail-reply-list">
              {/* 댓글 컴포넌트 */}
              {replyArray.map(reply => {
                return (
                  <Reply
                    key={reply.id}
                    user_id={reply.user_id}
                    kor_name={reply.kor_name}
                    comment={reply.comment}
                    created_at={reply.created_at}
                  />
                );
              })}
            </div>
          </div>
        </details>
      </div>
    </div>
  );
};

export default CardDetailContents;
