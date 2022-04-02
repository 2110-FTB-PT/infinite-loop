import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/SearchBar.css";

const SearchBar = ({ products }) => {
  const navigate = useNavigate();
  const [searchPlant, setSearchPlant] = useState("");
  const filteredPlant = products.filter((product) => {
    return product.name.toLowerCase().includes(searchPlant.toLowerCase());
  });

  return (
    <div>
      <input
        className="global-search-input"
        type="text"
        placeholder="Search plants..."
        value={searchPlant}
        onChange={(event) => {
          setSearchPlant(event.target.value);
        }}
      />
      <div
        className={
          searchPlant.length ? "search-results active" : "search-results"
        }
      >
        <p></p>
        {filteredPlant.length != 0 && searchPlant ? (
          <div>
            {filteredPlant.slice(0, 3).map((plant) => {
              return (
                <div
                  className="search-query"
                  onClick={() => {
                    setSearchPlant("");
                    navigate(`/products/${plant.id}`);
                  }}
                >
                  <span>
                    <img className="search-photo" src={plant.photo} />
                  </span>
                  <span className="product-title">{plant.name}</span>
                </div>
              );
            })}
          </div>
        ) : (
          <div>No plants found</div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
