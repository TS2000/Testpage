import React, { useEffect, useState } from "react";
import Image from "next/image";
import checkImg from "../public/check-svgrepo-com.svg";
import trashImg from "../public/garbage-svgrepo-com.svg";
import { ShoppingItem } from "./types/types";
import { useMutation } from "@apollo/client";
import { DeleteMutation, UpdateMutation } from "./mutations/mutations";

interface Props {
  item: ShoppingItem;
  picked: boolean;
  getShoppingItems: () => void;
  setLoadingSpinner: (newSpinnerState: boolean) => void;
}

const ShoppingListItem: React.FC<Props> = ({
  item,
  picked,
  getShoppingItems,
  setLoadingSpinner,
}) => {
  if (item.name === "Äpfel") console.log(picked);
  const [pickedState, setPickedState] = useState(picked);

  const [
    deleteItemMutation,
    { data: dataDelete, loading: loadingDelete, error: errorDelete },
  ] = useMutation(DeleteMutation);

  const [
    updateItemMutation,
    { data: dataUpdate, loading: loadingUpdate, error: errorUpdate },
  ] = useMutation(UpdateMutation);

  useEffect(() => {
    setLoadingSpinner(loadingDelete || loadingUpdate);
  }, [loadingDelete, loadingUpdate]);

  useEffect(() => {
    setPickedState(picked);
  }, [picked]);

  const setPickedHandler = async () => {
    setPickedState(!pickedState);
    await updateItemMutation({
      variables: { input: { id: item.id, picked: !item.picked } },
    });
  };

  const deleteHandler = async () => {
    await deleteItemMutation({ variables: { id: item.id } });
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
