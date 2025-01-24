import React from 'react';
import './ExploreList.css';
import { genre_list } from '../../assets/assets';

const ExploreList = ({ category, setCategory }) => {

    return (
        <div className='explore-list' id='explore-list'>
            <h1>Explore our list</h1>
            <p className='explore-list-text'>Choose your fantasy world!</p>
            <div className="explore-list-list">
                {genre_list.map((item, index) => {
                    return (
                        <div 
                            onClick={() => setCategory(prev => prev === item.genre_name ? "All" : item.genre_name)} 
                            key={index} 
                            className="explore-list-list-item"
                        >
                            <img 
                                className={category === item.genre_name ? "active" : ""} 
                                src={item.genre_img} 
                                alt={item.genre_name}
                            />
                            <p>{item.genre_name}</p>
                        </div>
                    )
                })}
            </div>
            <hr />
        </div>
    )
}

export default ExploreList;
