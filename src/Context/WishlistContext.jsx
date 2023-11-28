import React, { createContext, useContext, useState } from 'react'

const  wishlistContext=createContext()

export const WishlistProvider=({children})=>{
    const [wishlist,setWishlist]=useState([])
    const datas={
        wishlist,
        setWishlist
    }
    return(
        <wishlistContext.Provider value={datas}>
{children}
        </wishlistContext.Provider>
    )
}
export const useList=()=>useContext(wishlistContext)
export default WishlistProvider

