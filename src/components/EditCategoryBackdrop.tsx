import * as React from "react";
import "react-app-polyfill/ie11";
import { Formik, Field, Form, FormikHelpers } from "formik";
interface EditBackdropProps {
  handleBackdropClose: Function;
  editCategory: Function;
  categoryId: number;
  categoryName: string;
}

interface CategoryValues {
  categoryName: string;
}
export const EditCategoryBackdrop: React.FC<EditBackdropProps> = ({
  handleBackdropClose,
  editCategory,
  categoryId,
  categoryName,
}) => {
  return (
    <div className="backdrop" onClick={() => handleBackdropClose()}>
      <div onClick={(e) => e.stopPropagation()} className="backdrop-content">
        <Formik
          initialValues={{
            categoryName: categoryName,
          }}
          onSubmit={(
            values: CategoryValues,
            { setSubmitting }: FormikHelpers<CategoryValues>
          ) => {
            setTimeout(() => {
              editCategory(categoryId, values.categoryName);
              // handleLogin();
              setSubmitting(false);
            }, 500);
          }}
        >
          <Form className="add-edit-section">
            <label htmlFor="categoryName">Category Name</label>
            <Field id="categoryName" name="categoryName" />
            <button type="submit">Edit</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
