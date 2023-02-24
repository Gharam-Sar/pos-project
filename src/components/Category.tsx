import React from "react";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { EditCategoryBackdrop } from "./EditCategoryBackdrop";

interface CategoryProps {
  categoryId: number;
  categoryName: string;
  handleDelete: Function;
  setCategories: Function;
}

export const Category: React.FC<CategoryProps> = ({
  categoryName,
  handleDelete,
  categoryId,
  setCategories,
}) => {
  const [openEditBackdrop, setOpenEditBackdrop] =
    React.useState<boolean>(false);

  const handleEditBackdropOpen = () => {
    setOpenEditBackdrop(true);
  };

  const handleEditBackdropClose = () => {
    setOpenEditBackdrop(false);
  };
  const editCategory = async (categoryId: number, categoryName: string) => {
    try {
      let str = "/editCategories/" + categoryId + "/" + categoryName;
      const response = await fetch(str, {
        method: "PUT",
        body: JSON.stringify({
          id: categoryId,
          name: categoryName,
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();
      setCategories(result);
      handleEditBackdropClose();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <tr>
        <th>{categoryId}</th>
        <th>{categoryName}</th>
        <th>
          <FaTrash
            onClick={() => handleDelete(categoryId)}
            color="black"
            fontSize="25px"
          />
        </th>
        <th>
          <FaEdit
            onClick={() => handleEditBackdropOpen()}
            color="black"
            fontSize="25px"
          />
          {openEditBackdrop ? (
            <EditCategoryBackdrop
              handleBackdropClose={handleEditBackdropClose}
              editCategory={editCategory}
              categoryId={categoryId}
              categoryName={categoryName}
            />
          ) : null}
        </th>
      </tr>
    </>
  );
};
