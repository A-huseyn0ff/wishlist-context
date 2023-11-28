
import { useEffect, useState } from 'react';
import './App.scss';
import { WishlistProvider, useList } from './Context/WishlistContext';
import { CiHeart } from "react-icons/ci";
function App() {
  const [data, setData] = useState([]);
  const { wishlist, setWishlist } = useList([]);

  useEffect(() => {
    const fetchData = async function () {
      const res = await fetch('http://localhost:3000/products');
      const jsondata = await res.json();
      setData(jsondata);
    };
    fetchData();
  }, []);

  const addToWishlist = (product) => {
   
    if (!wishlist.find((item) => item.id === product.id)) {
      setWishlist([...wishlist, product]);
    } else {
     
      console.log('Product is already in the wishlist.');
    }
  };

  const removeFromWishlist = (itemToRemove) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== itemToRemove.id);
    setWishlist(updatedWishlist);
  };

  return (
    <>
      <div className='Cards'>
        {data &&
          data.map((product) => (
            <div className='card' key={product.id}>
              <div className='image'>
              <img src={product.image} alt='' />
              <span className='btn'><CiHeart onClick={() => addToWishlist(product)}/></span>
              </div>
              
              <div className='txt'>
                <p>{product.category}</p>
                <p>{product.brand}</p>
                {/* <button onClick={() => addToWishlist(product)}>Add to wishlist</button> */}
               
                <p style={{ color: 'green', fontSize: '20px' }}>${product.price}.00</p>
              </div>
            </div>
          ))}
      </div>

      <WishlistProvider>
        <div className='wishlist'>
          {wishlist.map((item) => (
            <div className='wished_product' key={item.id}>
              <img src={item.image} alt='' />
              <p>{item.name}</p>
              <p style={{ color: 'green', fontSize: '20px' }}>${item.price}.00</p>
              <button onClick={() => removeFromWishlist(item)}>Remove from wishlist</button>
            </div>
          ))}
        </div>
      </WishlistProvider>
    </>
  );
}

export default App;