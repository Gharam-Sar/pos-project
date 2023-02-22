import * as React from "react";
import "react-app-polyfill/ie11";
import { Formik, Field, Form, FormikHelpers } from "formik";
interface AddBackdropProps {
  handleBackdropClose: Function;
  addCategory: Function;
}

interface CategoryValues {
  categoryName: string;
}
export const AddCategoryBackdrop: React.FC<AddBackdropProps> = ({
  handleBackdropClose,
  addCategory,
}) => {
  return (
    <div className="backdrop" onClick={() => handleBackdropClose()}>
      <div onClick={(e) => e.stopPropagation()} className="backdrop-content">
        <Formik
          initialValues={{
            categoryName: "",
          }}
          onSubmit={(
            values: CategoryValues,
            { setSubmitting }: FormikHelpers<CategoryValues>
          ) => {
            setTimeout(() => {
              addCategory(values.categoryName);
              // handleLogin();
              setSubmitting(false);
            }, 500);
          }}
        >
          <Form className="add-edit-section">
            <label htmlFor="categoryName">Category Name</label>
            <Field id="categoryName" name="categoryName" />
            <button type="submit">ADD</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
