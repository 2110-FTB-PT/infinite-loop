import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/SearchBar.css"

const SearchBar = ({ products }) => {

    const [filteredPlant, setFilteredPlant] = useState([]);
    const [searchPlant, setSearchPlant] = useState("");
    const navigate = useNavigate();

    const handleFilter = (e) => {
        const searchedPlant = e.target.value;
        setSearchPlant(searchedPlant);
        const newFilter = products.filter((product) => {
            return product.name.toLowerCase().includes(searchedPlant.toLowerCase());
        })

        if (searchedPlant === "") {
            setFilteredPlant([]);
        } else {
            setFilteredPlant(newFilter);
        }
    }

    return (
        <div>
            <input
                type="text"
                placeholder="Search Plants..."
                value={searchPlant}
                onChange={handleFilter}
            />
            <div className={(searchPlant.length) ? "search-results active" : "search-results"} >
                <p></p>
                {filteredPlant.length != 0 && searchPlant ? (
                    <div>
                        {filteredPlant.slice(0, 3).map((plant) => {
                            return (
                                <div className="search-query" onClick={() => navigate(`/products/${plant.id}`)}>
                                    <p>{plant.name}</p>
                                </div>
                            )
                        })}
                    </div>
            ) : <div>no plants found</div> }
            </div>
        </div>
    )
};

export default SearchBar;