import React from "react";
import { CategoryType } from "../App";
import { AddCategoryBackdrop } from "../components/AddCategoryBackdrop";
import { Category } from "../components/Category";
import { FaPlusCircle } from "react-icons/fa";
import useTable from "../components/useTable";
import { TableFooter } from "../components/TableFooter";
import SearchBar from "../components/SearchBar";

interface CategoriesProps {
  setCategories: Function;
  categories: CategoryType[];
}

const Categories: React.FC<CategoriesProps> = ({
  setCategories,
  categories,
}) => {
  const [openAddBackdrop, setOpenAddBackdrop] = React.useState<boolean>(false);
  const [page, setPage] = React.useState<number>(1);
  const [size, setSize] = React.useState<number>(5);
  const [filterValue, setFilterValue] = React.useState<string>("");
  const { slice, range } = useTable(categories, page, size);
  const renderdCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(filterValue)
  );
  const handleAddBackdropOpen = () => {
    setOpenAddBackdrop(true);
  };

  const handleAddBackdropClose = () => {
    setOpenAddBackdrop(false);
  };
  const getCategories = async () => {
    try {
      const response = await fetch("/categories", {
        method: "GET",
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
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (name: string) => {
    try {
      let str = "/categories/" + name;
      const response = await fetch(str, {
        method: "DELETE",
        body: JSON.stringify({
          name: name,
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
    } catch (err) {
      console.log(err);
    }
  };
  const addCategory = async (categoryName: string) => {
    try {
      let str = "/addCategories/" + categoryName;
      const response = await fetch(str, {
        method: "POST",
        body: JSON.stringify({
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
      handleAddBackdropClose();
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    getCategories();
  }, []);
  return (
    <div className="category-table">
      <div className="add-category">
        <SearchBar
          filterValue={filterValue}
          onFilterValueChange={setFilterValue}
        />
        <div className="add-category-btn">
          <span>ADD NEW CATEGORY</span>
          <span>
            <FaPlusCircle
              onClick={() => handleAddBackdropOpen()}
              color="black"
              fontSize="30px"
            />
          </span>
        </div>
      </div>
      {openAddBackdrop ? (
        <AddCategoryBackdrop
          handleBackdropClose={handleAddBackdropClose}
          addCategory={addCategory}
        />
      ) : null}

      <table>
        <thead>
          <tr>
            <th>Category ID</th>
            <th>Category Name</th>
            <th>Delete Category</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {filterValue != ""
            ? renderdCategories.map((category) => (
                <Category
                  key={category.id}
                  categoryId={category.id}
                  categoryName={category.name}
                  handleDelete={handleDelete}
                  setCategories={setCategories}
                />
              ))
            : slice.map((category) => (
                <Category
                  key={category.id}
                  categoryId={category.id}
                  categoryName={category.name}
                  handleDelete={handleDelete}
                  setCategories={setCategories}
                />
              ))}
        </tbody>
      </table>
      {filterValue != "" ? null : (
        <TableFooter
          range={range}
          slice={slice}
          setPage={setPage}
          page={page}
          setSize={setSize}
          size={size}
        />
      )}
    </div>
  );
};
export default Categories;
