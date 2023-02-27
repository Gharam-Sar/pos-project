import * as React from "react";
import "react-app-polyfill/ie11";
import { Formik, Field, Form, FormikHelpers } from "formik";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { SelectChangeEvent } from "@mui/material";
import { CategoryType } from "../types";
interface AddBackdropProps {
  handleBackdropClose: Function;
  addProduct: Function;
  categories: CategoryType[];
}

interface ProductValues {
  productName: string;
  productCode: string;
  productPrice: number;
  file: string;
}
export const AddProductBackdrop: React.FC<AddBackdropProps> = ({
  handleBackdropClose,
  addProduct,
  categories,
}) => {
  const [chosenCategory, setChosenCategory] = React.useState<string>("");
  const handleChange = (event: SelectChangeEvent<unknown>) => {
    setChosenCategory(event.target.value as string);
  };
  return (
    <div className="backdrop" onClick={() => handleBackdropClose()}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="product-backdrop-content"
      >
        <Formik
          initialValues={{
            productName: "",
            productCode: "",
            productPrice: 0,
            file: "",
          }}
          onSubmit={(
            values: ProductValues,

            { setSubmitting }: FormikHelpers<ProductValues>
          ) => {
            setTimeout(() => {
              addProduct(
                values.productName,
                values.productCode,
                values.productPrice,
                chosenCategory,
                values.file.replace("C:\\fakepath\\", "")
              );
              setSubmitting(false);
            }, 500);
          }}
        >
          <Form className="add-edit-product-section">
            <label htmlFor="productName">Product Name</label>
            <Field id="productName" name="productName" />

            <Field type="file" name="file" />

            <Select
              sx={{ width: "200px", height: "30px", backgroundColor: "white" }}
              value={chosenCategory}
              label="Display"
              onChange={handleChange}
            >
              {categories.map((category) => (
                <MenuItem value={category.name}>{category.name}</MenuItem>
              ))}
            </Select>
            <label htmlFor="productPrice">Product Price</label>
            <Field type="number" id="productPrice" name="productPrice" />
            <label htmlFor="productCode">Product Code</label>
            <Field id="productCode" name="productCode" />
            <button type="submit">ADD</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
