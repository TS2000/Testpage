import React, { useState } from "react";
import Image from "next/image";
import checkImg from "../public/check-svgrepo-com.svg";
import trashImg from "../public/garbage-svgrepo-com.svg";
import { ShoppingItem } from "./types/types";

interface Props {
  item: ShoppingItem;
  getShoppingItems: () => {};
}

const ShoppingListItem: React.FC<Props> = ({ item, getShoppingItems }) => {
  const [pickedState, setPickedState] = useState(item.picked);

  const setPickedHandler = async () => {
    setPickedState(!pickedState);
    const changedItem = { ...item, picked: !pickedState };
    const response = await fetch("/api/set-picked", {
      method: "PUT",
      body: JSON.stringify(changedItem),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
  };

  const deleteHandler = async () => {
    const response = await fetch("/api/delete-item", {
      method: "DELETE",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    getShoppingItems();
  };

  return (
    <div
      className={`flex pl-3 rounded bg-white ${pickedState && "opacity-60"}`}
    >
      <p
        className={`inline-flex items-center ${pickedState && "line-through"}`}
      >
        {item.name}
      </p>
      <button
        onClick={setPickedHandler}
        className="inline-flex items-center justify-center ml-auto p-3 text-xs font-medium text-gray-500 bg-green-500"
      >
        <Image src={checkImg} />
      </button>
      <button
        onClick={deleteHandler}
        className="inline-flex items-center justify-center p-3 text-xs font-medium text-gray-500 bg-orange-500 rounded-r"
      >
        <Image src={trashImg} />
      </button>
    </div>
  );
};

export default ShoppingListItem;
