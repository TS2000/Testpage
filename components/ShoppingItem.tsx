import React, { useState } from "react";
import Image from "next/image";
import checkImg from "../public/check-svgrepo-com.svg";
import trashImg from "../public/garbage-svgrepo-com.svg";
import { ShoppingItem } from "../pages";

interface Props {
  item: ShoppingItem;
}

const ShoppingItem: React.FC<Props> = ({ item }) => {
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
        className="inline-flex items-center justify-center ml-auto px-3 py-3 text-xs font-medium text-gray-500 bg-green-500"
      >
        <Image src={checkImg} />
      </button>
      <button className="inline-flex items-center justify-center px-3 py-3 text-xs font-medium text-gray-500 bg-orange-500 rounded-r">
        <Image src={trashImg} />
      </button>
    </div>
  );
};

export default ShoppingItem;
