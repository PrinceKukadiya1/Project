import React from 'react'
import './list.scss'
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import ListItem from '../listitem/ListItem';


const List = ({list}) => {

    const [isMoved, setIsMoved] = React.useState(false);

    const [slideNumber , setSlideNumber] = React.useState(0);

    const listRef = React.useRef();

    const handleClick = (direction) => {
        setIsMoved(true);
        let distance = listRef.current.getBoundingClientRect().x - 50;

        if(direction === 'left' && slideNumber > 0) {
            listRef.current.style.transform = `translateX(${230 + distance}px)`;
            setSlideNumber(slideNumber - 1);
        }
        if(direction === 'right' && slideNumber < 4) {
            listRef.current.style.transform = `translateX(${-230 + distance}px)`;
            setSlideNumber(slideNumber + 1);
        }
    };


    return (
        <div className='list'>
            <span className="listTitle">{list.title}</span>
            <div className="wrapper">
                <ArrowBackIos className='SliderArrow left' onClick={() => handleClick("left")} style={{display : !isMoved && 'none'}} />
                <div className="container" ref={listRef}>
                    {list.content.map((item , i) => (
                    <ListItem key={`${item._id || item}-${i}`} index={i} item={item}/>
                    )
                    )}
                    
                    
                </div>
                <ArrowForwardIos className='SliderArrow right' onClick={() => handleClick("right")} />
            </div>
        </div>
    )
}

export default List
