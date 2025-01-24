import React, { useContext } from 'react';
import './Bookitem.css';
import { assets } from '../../assets/assets';
import { StorContext } from '../../context/StorContext';

const Bookitem = ({ 
    book_id, 
    title, 
    price, 
    description, 
    image, 
    author, 
    quantity,
    category 
}) => {
    const { cartItems, addToCart, removeCart } = useContext(StorContext);

    const imageUrl = image 
        ? image.startsWith('http') 
            ? image 
            : `http://127.0.0.1:8000/uploads/${image}`
        : assets.default_book;

    const truncateDescription = (desc, maxLength = 100) => {
        return desc.length > maxLength 
            ? `${desc.substring(0, maxLength)}...` 
            : desc;
    };

    return (
        <div className='book-item'>
            <div className="book-item-img-container">
                <img
                    className='book-item-image'
                    src={imageUrl}
                    alt={title}
                    onError={(e) => {
                        e.target.src = assets.default_book;
                        e.target.onerror = null;
                    }}
                />
                
                {!cartItems[book_id] ? (
                    <img
                        className='add'
                        onClick={() => addToCart(book_id)}
                        src={assets.add}
                        alt='Add to cart'
                    />
                ) : (
                    <div className='book-item-counter'>
                        <img
                            onClick={() => removeCart(book_id)}
                            src={assets.remove}
                            alt="Remove from cart"
                        />
                        <p>{cartItems[book_id]}</p>
                        <img
                            onClick={() => addToCart(book_id)}
                            src={assets.add}
                            alt="Add to cart"
                        />
                    </div>
                )}
            </div>
            
            <div className="book-item-info">
                <div className="book-item-name">
                    <p>{title}</p>
                </div>
                <p className="book-item-writer">{author}</p>
                <p className="book-item-price">${price.toFixed(2)}</p>
                <p className="book-item-desc">{truncateDescription(description)}</p>
                
                {category && (
                    <div className="book-item-meta">
                        <span className="book-category">Category: {category}</span>
                        <span className="book-quantity">In Stock: {quantity}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Bookitem;