import React, { useState } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import { StandardItem } from "./types/types";
import checkImg from "../public/check-svgrepo-com.svg";
import Image from "next/image";
import LoadingSpinner from "./LoadingSpinner";

const StandardItemsQuery = gql`
  query StandardItemsQuery {
    standardItems {
      id
      name
    }
  }
`;

interface Props {
  onAddHandler: (selectedItems: StandardItem[]) => void;
  onCloseHandler: (showModal: boolean) => void;
}

const Modal: React.FC<Props> = ({ onAddHandler, onCloseHandler }) => {
  const [selectedItems, setSelectedItems] = useState<StandardItem[]>([]);
  const { loading, error, data } = useQuery(StandardItemsQuery);
  const standardItems = data ? data.standardItems : [];

  const toggleItemState = (selectedItem: StandardItem) => {
    setSelectedItems((prevState) => {
      const isSelected = prevState.some((item) => item.id === selectedItem.id);
      return isSelected
        ? prevState.filter((item) => item.id !== selectedItem.id)
        : [...prevState, selectedItem];
    });
  };

  const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    onCloseHandler(false);
  };

  return (
    <>
      <div
        className="fixed top-0 left-0 w-full h-full bg-gray-400 opacity-70"
        onClick={onBackdropClick}
      ></div>
      <div className="absolute top-16 left-0 right-0 pb-3 w-80 m-auto bg-white rounded-lg shadow-md">
        <div className="flex px-3 py-2 border-b items-center">
          <h3>Standard items</h3>
          <button
            onClick={() => {
              onAddHandler(selectedItems);
            }}
            className="px-2 py-1 ml-auto rounded bg-green-500 text-white"
          >
            Add
          </button>
        </div>
        {loading && (
          <div className="pt-2 bg-white h-24">
            <LoadingSpinner></LoadingSpinner>
          </div>
        )}
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
