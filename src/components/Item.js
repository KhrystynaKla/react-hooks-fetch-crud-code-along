import React from "react";

function Item({ item, setItems, items }) {

  function handleAddToCartClick(){
    fetch(`http://localhost:4000/items/${item.id}`,{
      method: 'PATCH',
      headers: {
        'Content-Type':'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({isInCart:!item.isInCart})
    })
    .then(res=> res.json())
    .then(data=> updateItems(data))
  }

  function updateItems(item){
    const updtedList = items.map(it=>{
      if (it.id===item.id){
        return item;
      } return it;
    })
    console.log(updtedList)
    setItems(updtedList)
  }

  function handleDelete(){
    fetch(`http://localhost:4000/items/${item.id}`,{
      method: 'DELETE'
    })
    const newList = items.filter(it=>{
      return (it!==item)
    })
    console.log(newList)
    setItems(newList)

  
  }

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button onClick ={handleAddToCartClick} className={item.isInCart ? "remove" : "add"}>
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button onClick={handleDelete} className="remove">Delete</button>
    </li>
  );
}

export default Item;
