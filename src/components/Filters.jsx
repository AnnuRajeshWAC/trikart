import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

const Filters = ({ products,handleCheck }) => {
  const [searchParam, setSearchParam] = useSearchParams();
  const [searchquery, setSearchQuery] = useState({});
  const [visibilityCount, setVisibilityCount] = useState({});
 
  const handlesearch = (e, category) => {
    setSearchQuery({
      ...searchquery,
      [category]: e.target.value,
    });
  };
  const handletoggle = (categoryName, optionsLength) => {
    setVisibilityCount((prev) => {
      const newCount = prev[categoryName] >= optionsLength ? 5 : optionsLength;
      return {
        ...prev,
        [categoryName]: newCount,
      };
    });
  };
  

  const isChecked = (category, value) => {
    return searchParam.getAll(category).includes(value);
  };
  return (
    <div>
      {products?.map((category) => {
        const visibleOptions = visibilityCount[category.label] || 5;

        const filteredOptions =
          Array.isArray(category.options) &&
          category?.options?.filter((option) => {
            const query = searchquery[category.label] || "";
            return (
              query === "" ||
              option.label.toLowerCase().includes(query.toLowerCase())
            );
          });

        return (
          <div className="p-2" key={category.attribute}>
            <h3>{category.label}</h3>
            {category.options.length > 5 && (
              <input
                type="text"
                placeholder="Search..."
                className="m-2"
                onChange={(e) => handlesearch(e, category.label)}
              />
            )}
            {Array.isArray(category.options) &&
            category.attribute !== "price" ? (
              <div className="">
                {filteredOptions?.slice(0, visibleOptions).map((option) => (
                  <div className="" key={option.name}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      checked={isChecked(category.attribute, option.label)}
                      onChange={() =>
                        handleCheck(category.attribute, option.label)
                      }
                    />
                    <label htmlFor="">{option.label}</label>
                  </div>
                ))}
                {filteredOptions.length > 5 && (
                  <button
                    onClick={() =>
                      handletoggle(category.label, category.options.length)
                    }
                  >
                    load more
                  </button>
                )}
              </div>
            ) : (
              <input
                type="range"
                min={category.options.min_price}
                max={category.options.max_price}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Filters;
