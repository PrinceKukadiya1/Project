import React, { useState, useRef } from 'react';
import './list.scss';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import ListItem from '../listitem/ListItem';

const List = ({ list }) => {
  const [isMoved, setIsMoved] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);
  const listRef = useRef();

  const handleClick = (direction) => {
    setIsMoved(true);
    let distance = listRef.current.getBoundingClientRect().x - 50;

    if (direction === 'left' && slideNumber > 0) {
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
      setSlideNumber(slideNumber - 1);
    }
    if (direction === 'right' && slideNumber < 4) {
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
      setSlideNumber(slideNumber + 1);
    }
  };

  return (
    <div className='list'>
      <span className="listTitle">{list.title}</span>
      <div className="wrapper">
        <ArrowBackIos className='SliderArrow left' onClick={() => handleClick("left")} style={{ display: !isMoved && 'none' }} />
        <div className="container" ref={listRef}>
          {Array.isArray(list.content) && list.content.length > 0 ? (
            list.content.map((item, i) => (
              <ListItem key={`${item._id || item}-${i}`} index={i} item={item} />
            ))
          ) : (
            <p style={{ color: '#aaa', fontSize: '14px', marginLeft: '20px' }}>
              No movies in this list.
            </p>
          )}
        </div>
        <ArrowForwardIos className='SliderArrow right' onClick={() => handleClick("right")} />
      </div>
    </div>
  );
};

export default List;
