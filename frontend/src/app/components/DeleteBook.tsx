import React from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import {
  handleHidePopup,
  selectCurrentBook,
  selectMobileView,
} from "../redux/popupSlice";
import { useDeleteBookMutation } from "../redux/apiSlice";
import { handleShowAlert } from "../redux/alertSlice";
import { baseUrl } from "../utils";

const DeleteBook = () => {
  const dispatch = useAppDispatch();
  const [deleteBook, deleteBookRes] = useDeleteBookMutation();
  const mobileView = useAppSelector(selectMobileView);
  const book = useAppSelector(selectCurrentBook);

  const onHidePopup = () => {
    dispatch(handleHidePopup());
  };

  const onDelete = async () => {
    try {
      await deleteBook({ bookId: book.bookId }).unwrap();
      dispatch(
        handleShowAlert({
          success: true,
          message: "Book deleted successfully!",
        })
      );
      onHidePopup();
    } catch (error) {
      dispatch(
        handleShowAlert({
          success: false,
          message: "Error deleting book!",
        })
      );
    }
  };

  return (
    <div id="delete_container" className="w-full flex flex-col items-center">
      <div
        id="info_and_buttons"
        className="w-full flex flex-col items-center justify-center gap-8"
      >
        <div
          id="info_container"
          className="flex w-full items-center justify-center"
        >
          <div
            className={`flex ${
              mobileView ? "flex-col" : ""
            } w-5/6 h-fit gap-4 gap-8 lg:gap-12`}
          >
            <img
              style={{ aspectRatio: "2/3" }}
              src={baseUrl + book.image}
              className={`${
                mobileView ? "w-2/3" : "w-2/5"
              } self-center h-full drop-shadow-[6px_6px_0px_rgba(0,0,0,0.25)]`}
            />
            <div
              id="book_info"
              className={`flex flex-col ${
                mobileView ? "w-full" : "w-3/5"
              } items-start justify-between`}
            >
              <div id="info_container" className="flex flex-col gap-2">
                <div id="basic_info" className="flex flex-col">
                  <p className="text-gray-600 text-body4 lg:text-body3">
                    {book.isbn}
                  </p>
                  <p className="text-h5 md:text-h4 lg:text-h3 text-blue-cta">
                    {book.name}
                  </p>
                </div>
                <p className="text-body3 lg:text-body2">
                  {book.author} / {book.category}
                </p>
                <p className="text-h3 md:text-h2">${book.price}</p>
              </div>
            </div>
          </div>
        </div>
        <div id="buttons_row" className="w-full flex justify-end">
          <div id="buttons_container" className="w-fit flex gap-4">
            <button
              className={`secondary-btn ${mobileView ? "p-2" : ""}`}
              type="button"
              onClick={onHidePopup}
            >
              Cancel
            </button>
            <button
              className={`primary-btn ${mobileView ? "p-2" : ""}`}
              type="button"
              onClick={onDelete}
            >
              Delete Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteBook;
