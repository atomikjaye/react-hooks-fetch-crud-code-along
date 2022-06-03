import React from "react";

function Item({ item, onIsInCartChange, onDelete }) {
  function handleAddToCart(e) {
    console.log(e)
    const updateItem = {
      id: item.id,
      isInCart: !item.isInCart
    }
    // on click, send Patych request to server
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateItem)
    })
      .then(r => r.json())
      .then(data => {
        console.log("Updated Item", item.id, item.isInCart)
        // console.log("Updated Item", data.id, data.isInCart)
        onIsInCartChange(item.id, !item.isInCart)
      })
    // change variable being updated
    //set new change
  }

  function handleDelete(e) {
    console.log(item)
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: 'DELETE'
    })
      .then(r => r.json())
      .then(data => {
        // update state
        onDelete(item.id)
        console.log(data)
      })
  }
  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button onClick={handleAddToCart} className={item.isInCart ? "remove" : "add"}>
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button onClick={handleDelete} className="remove">Delete</button>
    </li>
  );
}

export default Item;
