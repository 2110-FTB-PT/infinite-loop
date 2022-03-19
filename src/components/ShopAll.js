import React from "react";
import { fetchAllProducts  } from "../axios-services";

const ShopAll = () => {

    const handleProducts = async() => {
        const fetchedProducts = await fetchAllProducts()
    }

    return ( 
        <div>
            <h1>AllProducts</h1>
        </div>
    )
}

export default ShopAll;