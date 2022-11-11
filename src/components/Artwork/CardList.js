import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Card from './Card';
import './cardList.scss';

function CardList({ filter }) {
  const [data, setData] = useState([]);
  let param = useParams();
  let params = param.user_id;
  let location = useLocation();
  useEffect(() => {
    if (location.pathname === '/works') {
      fetch('http://localhost:8000/works')
        .then(res => res.json())
        .then(data => {
          setData(data.worksFeedList);
        });
    } else if (location.pathname === '/feeds') {
      fetch('http://localhost:8000/feeds/list')
        .then(res => res.json())
        .then(data => {
          setData(data.feedsList);
        });
    } else if (location.pathname === '/searchlist') {
      // let params = new URLSearchParams(location.search);
      let params = window.location.search;
      fetch('http://localhost:8000/searchlist' + params)
        .then(res => res.json())
        .then(data => {
          setData(data.searchResult);
        });
    } else if (location.pathname === '/category/fashion') {
      fetch('http://localhost:8000/category/fashion')
        .then(res => res.json())
        .then(data => {
          setData(data);
        });
    } else if (location.pathname === '/category/travel') {
      fetch('http://localhost:8000/category/travel')
        .then(res => res.json())
        .then(data => {
          setData(data);
        });
    } else if (location.pathname === '/category/pattern') {
      fetch('http://localhost:8000/category/pattern')
        .then(res => res.json())
        .then(data => {
          setData(data);
        });
    } else if (location.pathname === '/category/animal') {
      fetch('http://localhost:8000/category/animal')
        .then(res => res.json())
        .then(data => {
          setData(data);
        });
    }
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="cardList">
      {data.map((elem, idx) => {
        return (
          <div style={{ cursor: 'pointer' }}>
            <Card
              key={idx}
              id={elem.id}
              nickname={elem.nickname}
              profile_image={elem.profile_image}
              img_url={elem.img_url}
              title={elem.title}
              view_count={elem.view_count}
              created_at={elem.created_at}
              sympathy_cnt={elem.sympathy_cnt}
              comment_cnt={elem.comment_cnt}
            />
          </div>
        );
      })}
    </div>
  );
}

export default CardList;
