import React from "react";
import { CategoryType } from "../App";
import { AddCategoryBackdrop } from "../components/AddCategoryBackdrop";
import { Category } from "../components/Category";
import { FaPlusCircle } from "react-icons/fa";
import useCategoryTable from "../components/useCategoryTable";
import { TableCategoryFooter } from "../components/TableCategoryFooter";
import SearchBar from "../components/SearchBar";

interface CategoriesProps {
  setCategories: Function;
  categories: CategoryType[];
  getCategories: Function;
  isLoading: boolean;
  setIsLoading: Function;
  somethingWrong: boolean;
  setSomethingWrong: Function;
}

const Categories: React.FC<CategoriesProps> = ({
  setCategories,
  categories,
  getCategories,
  isLoading,
  setIsLoading,
  somethingWrong,
  setSomethingWrong,
}) => {
  const [openAddBackdrop, setOpenAddBackdrop] = React.useState<boolean>(false);

  const [page, setPage] = React.useState<number>(1);
  const [size, setSize] = React.useState<number>(5);
  const [filterValue, setFilterValue] = React.useState<string>("");
  const { slice, range } = useCategoryTable(categories, page, size);
  const renderdCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(filterValue)
  );
  const handleAddBackdropOpen = () => {
    setOpenAddBackdrop(true);
  };

  const handleAddBackdropClose = () => {
    setOpenAddBackdrop(false);
  };

  const handleDelete = async (id: string) => {
    try {
      let str = "/deleteCategories/" + id;
      const response = await fetch(str, {
        method: "DELETE",
        body: JSON.stringify({
          id: id,
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
      setSomethingWrong(false);

      setCategories(result);
    } catch (err) {
      console.log(err);
      setSomethingWrong(true);
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
      setSomethingWrong(false);

      setCategories(result);
      handleAddBackdropClose();
    } catch (err) {
      console.log(err);
      setSomethingWrong(true);
    }
  };

  React.useEffect(() => {
    if (categories.length === 0) {
      setIsLoading(true);
    }
    getCategories();
  });
  return (
    <>
      {isLoading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : somethingWrong ? (
        <span className="server-err">
          Something went Wrong with the server, try refreshing the page{" "}
        </span>
      ) : (
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
              {filterValue !== ""
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
          {filterValue !== "" ? null : (
            <TableCategoryFooter
              range={range}
              slice={slice}
              setPage={setPage}
              page={page}
              setSize={setSize}
              size={size}
            />
          )}
        </div>
      )}
    </>
  );
};
export default Categories;
