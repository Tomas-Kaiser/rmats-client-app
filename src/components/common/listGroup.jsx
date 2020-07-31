import React from "react";

const ListGroup = props => {
  const { items, onItemSelect, selectedItem } = props;

  console.log("Items", items);

  return (
    <ul className="list-group mt-5" style={{ cursor: "pointer" }}>
      {items.map((item, index) => (
        <li
          onClick={() => onItemSelect(item)}
          key={index}
          className={
            item === selectedItem ? "list-group-item active" : "list-group-item"
          }
        >
          {item}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
