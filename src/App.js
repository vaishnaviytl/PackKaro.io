import { useState } from "react";

const initialItems= [
  {
  id:1 ,
  description:"Passports",
  quantity:2 ,
  packed:false
 },
 {
  id:2 ,
  description:"Socks",
  quantity:12 ,
  packed:false
 }
  
]



export default function App(){
  const [items,setItems]=useState([])

  function handleAddItems(item){
    setItems((items)=>[...items,item]);
  }

  function handleDeleteItem(id){
    setItems((items)=>items.filter((item)=>item.id!==id))
  }

  function handleToggleItem(id){
    setItems((items)=>items.map((item)=>item.id===id ? {...item , packed:!item.packed}:item))
  }

  function handleClearList(){
    setItems([]);
  }

  return (
    <div className="app">
      <Logo/>
      <Form onAddItems={handleAddItems}/>
      <PackingList items={items} onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem} onClearList={handleClearList}/>
      <Stats items={items}/>
    </div>
  )

}

function Logo(){
  return(
    <h1>🌴Pack Karoo ✈🧳</h1>
  )
}

function Form({onAddItems}){
  const [description,setdescription]=useState("")
  const [quantity,setQuantity]=useState(1)
  

  function handleSubmit(e){
    e.preventDefault();

    if(!description)return;
    const newItem={
      description,
      quantity,
      packed:false,
      id:Date.now()
    }
    console.log(newItem)

    onAddItems(newItem);
    setdescription("");
    setQuantity(1)
  }
  return(
  <form className="add-form" onSubmit={handleSubmit}>
    <h3>What do you need for your 😍 trip</h3>
    <select value={quantity} onChange={(e)=>setQuantity(Number(e.target.value))}>
      {Array.from({length:20}, (_,i)=>i+1).map((num)=>(
        <option value={num} key={num }>{num}</option>
      ))}

    </select>
    <input type="text" placeholder="Item..." value={description} onChange={e=>setdescription(e.target.value)}/>
    <button>Add</button>
  </form>
  );
}
function PackingList({items , onDeleteItem , onToggleItem , onClearList}){
  const [sortBy,setSortBy]=useState("input")
  let sortedItems

  if (sortBy==="input") sortedItems=items
  if (sortBy==="description") 
    sortedItems=items.slice().sort((a,b)=>a.description.localeCompare(b.description))
  

  if (sortBy==="packed")
    sortedItems=items.slice().sort((a,b)=>Number(a.packed)-Number(b.packed))
  
  return(
  <div className="list">
    <ul> { sortedItems.map((item)=>(
    <Item item={item} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem} key={item.id}/>
    ))
    }
    </ul>
<div className="actions">
<select value={sortBy} onChange={(e)=>setSortBy(e.target.value)}> 
  <option value="input">Sort by input order</option>
  <option value="description">Sort by description</option>
  <option value="packed">Sort by packed status</option>
</select>
<button onClick={onClearList}>Clear List</button>
</div>
  </div>
  );
}

function Item({item,onDeleteItem ,onToggleItem}){
  return(
    
    <li>
      <input type="checkbox" value={item.packed} onChange={()=>{onToggleItem(item.id)}}></input>
      <span style={item.packed ? {textDecoration:"line-through"}:{}}  key={item.id}>{item.quantity} {item.description}</span>
      <button onClick={()=>onDeleteItem(item.id)}>✖</button>
    </li>
  )

}
function Stats({items}){
  if(!items.length)
  return(
    <p className="stats">
      <em>Start adding items to your packing list 🧳</em>
    </p>
  )
  const numItems=items.length
  const numPacked=items.filter((items)=>items.packed).length
  const percentage=Math.round((numPacked/numItems)*100)
  return(
    <footer className="stats">
      <em> { percentage === 100 ? "You got everything!Ready to go ✈" :`You have ${numItems} items in your list , You have already packed ${numPacked} (${percentage}%)` }</em>
    </footer>
  );
}