import React, { useState } from "react";
import Image from "next/image";
import plusImg from "../public/plus-svgrepo-com.svg";
import { ShoppingItemDraft } from "./types/types";

interface Props {
  getShoppingItems: () => {};
}

const AddItemForm: React.FC<Props> = ({ getShoppingItems }) => {
  const [newItemName, setNewItemName] = useState("");

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newItemName.length > 2) {
      const newItem: ShoppingItemDraft = {
        name: newItemName,
        picked: false,
      };
      const response = await fetch("/api/add-item", {
        method: "POST",
        body: JSON.stringify(newItem),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      setNewItemName("");
      getShoppingItems();
    }
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewItemName(e.target.value);
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="flex bg-green-500 mb-4 shadow rounded">
        <input
          className="p-2 text-gray-700 w-full focus:outline-none focus:shadow-outline rounded-l"
          id="item"
          type="text"
          placeholder="Add new Item"
          value={newItemName}
          onChange={changeHandler}
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center ml-auto p-3 text-xs font-medium text-gray-500 bg-green-500 rounded-r"
        >
          <Image src={plusImg} />
        </button>
      </div>
    </form>
  );
};

export default AddItemForm;