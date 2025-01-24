import React, { useState } from 'react';
import './Home.css';
import Header from '../../component/Header/Header';
import ExploreList from '../../component/ExploreList/ExploreList';
import BookDisplay from '../../component/BookDisplay/BookDisplay';
import AppDownload from '../../component/AppDownload/AppDownload';

const Home = () => {
    const [category, setCategory] = useState("All");  

    return (
        <div>
            <Header />
            <ExploreList category={category} setCategory={setCategory} />
            
            <BookDisplay category={category} />

            <AppDownload />
        </div>
    );
}

export default Home;
