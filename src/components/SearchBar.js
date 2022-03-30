import React, { useState } from "react";

const SearchBar = ({products}) => {

    const [filteredPlant, setFilteredPlant] = useState([]);
    const [searchPlant, setSearchPlant] = useState("");

    const handleFilter = (e) => {
        const searchedPlant = e.target.value;
        setSearchPlant(searchedPlant);
        const newFilter = products.filter((product) => {
            return product.name.toLowerCase().includes(searchedPlant.toLowerCase());
        })

        if (searchedPlant === "") {
            setFilteredPlant([]);
        }   else {
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
            {filteredPlant.length != 0 && (
                <div>
                    {filteredPlant.slice(0, 3).map((plant) => {
                    return (
                        <div> 
                            <p>{plant.name}</p>
                        </div>
                    )
                })} 
                </div>
                )}
        </div>
    )
};

export default SearchBar;