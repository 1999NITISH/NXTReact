// ListContainer.js
import React from 'react';

const ListComponents = ({ list, onSelect, selected, moveItem }) => {
  return (
    <div>
      <h3>{list.name}</h3>
      <input
        type="checkbox"
        checked={selected}
        onChange={() => onSelect(list.id)}
      />
      {list.items.map((item) => (
        <div key={item.id}>
          <span>{item.name}</span>
          <button onClick={() => moveItem(item, list.id)}>Move</button>
        </div>
      ))}
    </div>)}
 export default ListComponents