import React, { useContext, useEffect, useState } from 'react';
import './BookDisplay.css';
import { StorContext } from '../../context/StorContext';
import Bookitem from '../Bookitem/Bookitem';

const BookDisplay = ({ category, url="http://localhost:8000" }) => {
    const { bookList, setBookList } = useContext(StorContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchBooks = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`${url}/admin/show_all_books_details`); 
            if (!response.ok) {
                throw new Error('Failed to fetch books');
            }
            const data = await response.json();
            console.log("Fetched books:", data); 
            setBookList(data); 
        } catch (err) {
            console.error("Error fetching books:", err);
            setError(err.message || 'An error occurred while fetching books.');
        } finally {
            setLoading(false); 
        }
    };

    useEffect(() => {
        fetchBooks();
    }, [url]);

    const getImageUrl = (imageName) => {
        if (!imageName) return '/placeholder-book.jpg'; 
        return `${url}/uploads/${imageName}`; 
    };

    return (
        <div className='book-display' id='book-display'>
            <h2>The top books near you</h2>
            {error && <p className="error-message">{error}</p>}
            {loading ? (
                <p>Loading books...</p>
            ) : (
                <div className='book-display-list'>
                    {bookList.length === 0 ? (
                        <p>No books available.</p> 
                    ) : (
                        bookList.map((item) => {
                            if (category === "All" || category === item.category) {
                                return (
                                    <Bookitem
                                        key={item.book_id}
                                        book_id={item.book_id}
                                        title={item.title}
                                        description={item.description || "No description available"}
                                        price={item.price}
                                        image={getImageUrl(item.image)} 
                                        author={item.author}
                                        category={item.category}
                                        quantity={item.quantity}
                                    />
                                );
                            }
                            return null; 
                        })
                    )}
                </div>
            )}
        </div>
    );
};

export default BookDisplay;
