import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";
// import { useEffect } from "react/cjs/react.production.min";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  const serverURL = 'http://localhost:4000/items'
  useEffect(() => {
    fetch(serverURL)
      .then(r => r.json())
      .then(items => setItems(items))
  }, [])

  function addItemToList(newItem) {
    setItems([...items, newItem])
  }

  function handleIsInCartChange(id, isInCart) {
    const updateItemsArr = items.map((item) => {
      if (item.id === id) {
        return ({
          ...item,
          isInCart: isInCart
        })
      } else {
        return item
      }
    })
    setItems(updateItemsArr)
  }

  function handleDelete(id) {
    const updateItemsArr = items.filter((item) => item.id !== id)
    setItems(updateItemsArr)
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm updateItems={addItemToList} items={items} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} onIsInCartChange={handleIsInCartChange} onDelete={handleDelete} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
