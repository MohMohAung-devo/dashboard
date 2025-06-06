import React, { FormEvent, useEffect, useState } from "react";
import classes from "./Product.module.css";
import usePagination from "../hooks/usePagination";
import { RiArrowRightWideFill, RiArrowLeftWideFill } from "react-icons/ri";
import {
  useProductAdd,
  useDeleteProduct,
  useProductUpdate,
} from "../../api/useProduct";
import { useAuth } from "../../services/authContext";

interface productProps {
  _id: string;
  name: string;
  description: string;
  price: string;
  createdAt: string;
  createdBy: {
    name: string;
  };
}

interface ProductTableProps {
  data: productProps[];
  itemsPerPage: number;
}

export const ProductTable: React.FC<ProductTableProps> = ({
  data,
  itemsPerPage,
}) => {
  const { user } = useAuth();

  const [product, setProduct] = useState<productProps[]>(data);
  const { addProduct } = useProductAdd();
  const { deleteProduct } = useDeleteProduct();
  const { updateProduct, updateData } = useProductUpdate();

  useEffect(() => {
    if (data.length > 0) {
      setProduct(data);
    }
  }, [data]);
  const { slicedData, pagination, prvPage, nextPage, changePage } =
    usePagination<productProps>({
      data: product,
      itemsPerPage,
      startFrom: 1,
    });

  console.log(data);

  const [name, setName] = useState("");

  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [show, setShow] = useState(false);
  const [editItem, setEditItem] = useState<productProps | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmId, setConfirmId] = useState<number | null>(null);
  const [boxShow, setBoxShow] = useState(false);
  const [pending, setPending] = useState(false);

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const result = await addProduct({ name, price, description });

      if (result?.config) {
        setShow(false);
      }
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  const handelDelete = async (_id: string) => {
    try {
      const response = await deleteProduct(_id);
      console.log("response", response);
      setProduct((prev) => prev.filter((user) => user._id !== _id));
      setBoxShow(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleBoxShow = (item: productProps) => {
    setBoxShow(true);
    setConfirmId(item._id);
  };

  const handleAddShow = () => {
    setEditItem(null);
    setShow(!show);
  };

  const handleEditShow = (product: productProps) => {
    setEditItem(product);
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
    setShow(true);
  };

  const handleEdit = async (e: FormEvent) => {
    e.preventDefault();
    if (!editItem) return null;
    try {
      const updatedProducts = await updateProduct(editItem?._id, {
        name,
        price,
        description,
        // createdAt,
        // createdBy,
      });

      setProduct((prv) =>
        prv.map((p) =>
          p._id === editItem._id ? { ...p, ...updatedProducts } : p
        )
      );

      setShow(false);
      setEditItem(null);
      setName("");
      setPrice("");
      setDescription("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className={`${classes.productCol1} ${
        boxShow ? classes.boxShowBackground : ""
      }`}
    >
      <div className={classes.productCol2}>
        <div className={classes.productCol3}>
          <h1 className={classes.title}>Product</h1>
          <button className={classes.button} onClick={handleAddShow}>
            Add Product
          </button>
        </div>

        <div className={classes.productCol4}>
          <table>
            <thead>
              <tr>
                {user?.role === "admin" ? <th>ProductOwner</th> : ""}
                <th>Product Name</th>
                <th>Price</th>
                <th>Description</th>
                {/* <th>Count</th> */}
                <th>Photo</th>

                <th>Date</th>
                <th>Status</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {slicedData.map((item, index) => (
                <tr key={index}>
                  <td>{item.createdBy.name}</td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.description}</td>
                  <td>
                    <img
                      src={`https://images.unsplash.com/photo-1627615275530-e60209d08216?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
                      className={classes.img}
                      alt="img"
                    />
                  </td>
                  <td>{item.createdAt.toString()}</td>
                  <td>
                    {pending ? (
                      <button
                        style={{
                          color: "blue",
                          border: "none",
                          padding: "5px",
                          borderRadius: "3px",
                        }}
                      >
                        Pending
                      </button>
                    ) : (
                      <button
                        style={{
                          color: "green",
                          borderRadius: "3px",
                          padding: "5px",
                          border: "none",
                        }}
                      >
                        Approved
                      </button>
                    )}
                  </td>

                  <td>
                    <button onClick={() => handleEditShow(item)}>Edit</button>
                  </td>
                  <td>
                    <button onClick={() => handleBoxShow(item)}>Delete</button>
                    {boxShow && confirmId === item._id && (
                      <div className={classes.confirmBox}>
                        <p style={{ textAlign: "center", fontSize: "18px" }}>
                          Are you sure delete this product?
                        </p>
                        <div className={classes.confirmButton}>
                          <button onClick={() => setBoxShow(false)}>
                            Cancel
                          </button>
                          <button onClick={() => handelDelete(item._id)}>
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {show ? (
          <div className={classes.addProductCol1}>
            <div className={classes.productCol1}>
              <h1 className={classes.boxTitle}>
                {editItem ? "Edit Product Form" : " Add Product Form"}
              </h1>
              <div className={classes.addProductCol2}>
                <form
                  className={classes.addProductCol3}
                  onSubmit={editItem ? handleEdit : handleAdd}
                >
                  <input
                    placeholder="Name....."
                    value={name}
                    className={classes.input}
                    onChange={(e) => setName(e.target.value)}
                  />

                  <input
                    placeholder="Price...."
                    value={price}
                    className={classes.input}
                    onChange={(e) => setPrice(e.target.value)}
                  />

                  <input
                    placeholder="Description...."
                    value={description}
                    className={classes.input}
                    onChange={(e) => setDescription(e.target.value)}
                  />

                  <div className={classes.addProductButton}>
                    <button className={classes.cancelButton} type="submit">
                      Cancel
                    </button>
                    <button
                      className={classes.submitButton}
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading
                        ? "Submitting...."
                        : editItem
                        ? "Update"
                        : "Submit"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className={classes.pagination}>
          <div className={classes.paginationWraper}>
            <RiArrowLeftWideFill
              onClick={prvPage}
              style={{ cursor: "pointer" }}
            />
            <div className={classes.paginationList}>
              {pagination.map((page) => {
                if (!page.ellipsis) {
                  return (
                    <div key={page.id} className={classes.link}>
                      <a
                        href="/#"
                        onClick={(e) => changePage(page.id, e)}
                        className={`${classes.paginationLink} ${
                          page.current ? classes.isCurrent : ""
                        }`}
                      >
                        {page.id}
                      </a>
                    </div>
                  );
                }
              })}
            </div>
            <RiArrowRightWideFill
              onClick={nextPage}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
