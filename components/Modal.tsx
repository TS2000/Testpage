import React, { useState } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import { StandardItem } from "./types/types";
import checkImg from "../public/check-svgrepo-com.svg";
import Image from "next/image";

const StandardItemsQuery = gql`
  query StandardItemsQuery {
    standardItems {
      id
      name
    }
  }
`;

const Modal = () => {
  const [selectedItems, setSelectedItems] = useState<StandardItem[]>([]);
  const { loading, error, data } = useQuery(StandardItemsQuery);
  const standardItems = data ? data.standardItems : [];

  const toggleItemState = (selectedItem: StandardItem) => {
    setSelectedItems((prevState) => {
      let nextState: StandardItem[] = [];
      const isSelected = prevState.some((item) => item.id === selectedItem.id);
      if (isSelected) {
        nextState = prevState.filter((item) => item.id !== selectedItem.id);
      } else {
        nextState = [...prevState, selectedItem];
      }

      return nextState;
    });
  };

  return (
    <>
      <div className="fixed top-16 left-0 right-0 pb-3 w-80 m-auto bg-white rounded-lg shadow-md">
        <div className="flex px-3 py-2 border-b items-center">
          <h3>Standard items</h3>
          <button className="px-2 py-1 ml-auto rounded bg-green-500 text-white">
            Add
          </button>
        </div>
        {standardItems.map((item: StandardItem) => {
          const isSelected = selectedItems.some(
            (selectedItem) => item.id === selectedItem.id
          );
          return (
            <button
              key={item.id}
              className={`flex items-center block px-3 py-2 my-1 w-full text-left ${
                isSelected ? "bg-gray-200" : "bg-white"
              }`}
              value={item.id}
              onClick={() => {
                toggleItemState(item);
              }}
            >
              <div className="h-7 flex items-center">{item.name}</div>
              {isSelected && (
                <div className="flex p-1 ml-auto rounded-full bg-green-500">
                  <Image src={checkImg} className="scale-75" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default Modal;
