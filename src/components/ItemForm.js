import React, { useState } from "react";

function ItemForm({ updateItems }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Produce");

  //MUST PUT IN HANDLE SUBMIT FUNCTION*****
  function handleSubmit(e) {
    e.preventDefault()
    console.log(name, category)
    const formData = {
      name: name,
      category: category,
      isInCart: false
    }
    const serverURL = 'http://localhost:4000/items'
    fetch(serverURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(r => r.json())
      .then(data => {
        updateItems(data)
      })

  }

  return (
    <form className="NewItem" onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label>
        Category:
        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Dessert">Dessert</option>
        </select>
      </label>

      <button type="submit">Add to List</button>
    </form>
  );
}

export default ItemForm;
