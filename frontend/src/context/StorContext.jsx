import React, { createContext, useState, useEffect } from "react";

const API_URL = "http://localhost:8000/admin/show_all_books_details"; 

export const StorContext = createContext(null);

const StorContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [bookList, setBookList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error("در دریافت کتاب‌ها مشکلی پیش آمده است.");
                }
                const books = await response.json();
                setBookList(books); 
            } catch (error) {
                console.error("خطا در بارگذاری کتاب‌ها:", error);
                setError(error.message); 
            } finally {
                setLoading(false); 
            }
        };

        fetchBooks();
    }, []); 

    const addToCart = (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1
        }));
    };

    const removeCart = (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: Math.max((prev[itemId] || 0) - 1, 0)
        }));
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
            if (cartItems[itemId] > 0) {
                const itemInfo = bookList.find((book) => book.book_id === parseInt(itemId)); 
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[itemId];
                }
            }
        }
        return totalAmount;
    };

    const contextValue = {
        bookList,
        cartItems,
        setCartItems,
        addToCart,
        removeCart,
        getTotalCartAmount,
        loading,
        error, 
    };

    return (
        <StorContext.Provider value={contextValue}>
            {props.children}
        </StorContext.Provider>
    );
};

export default StorContextProvider;
