import React, { useEffect, useState } from "react";
import classes from "./Product.module.css";
import usePagination from "../hooks/usePagination";
import { RiArrowRightWideFill, RiArrowLeftWideFill } from "react-icons/ri";

interface productProps {
  id: number;
  name: string;
  description: string;
  price: number;
  count: number;
  file: string;
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
  const [product, setProduct] = useState<productProps[]>(data);
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

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [count, setCount] = useState("");
  const [file, setFile] = useState("");
  const [show, setShow] = useState(false);
  const [editItem, setEditItem] = useState<productProps | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmId, setConfirmId] = useState<number | null>(null);
  const [boxShow, setBoxShow] = useState(false);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(URL.createObjectURL(selectedFile));
    }
  };

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   setIsLoading(true);

  //   await new Promise((resolve) => setTimeout(resolve, 1000));

  //   if (editItem) {
  //     setProduct((prv) =>
  //       prv.map((item) =>
  //         item.id === editItem.id ? { ...item, name, price, count, file } : item
  //       )
  //     );
  //     setName("");
  //     setPrice("");
  //     setCount("");
  //     setFile("");
  //     setEditItem(null);
  //     setShow(false);
  //   } else {
  //     if (!name || !price || !count || !file) {
  //       alert("Please fill in all field");
  //       return;
  //     }
  //     setProduct([
  //       ...product,
  //       {
  //         id: product.length + 1,
  //         name,
  //         price,
  //         count,
  //         file,
  //         createdAt: new Date().toISOString(),
  //       },
  //     ]);

  //     setName("");
  //     setPrice("");
  //     setCount("");
  //     setFile("");
  //   }

  //   setName("");
  //   setPrice("");
  //   setCount("");
  //   setFile("");
  //   setShow(false);
  //   setIsLoading(false);
  // };
  const handelDelete = (id: number) => {
    setProduct(product.filter((item) => item.id !== id));
  };

  console.log("data", data);
  // const handleEdit = (item: productProps) => {
  //   setName(item.name);
  //   setCount(item.count);
  //   setPrice(item.price);
  //   setFile(item.file);
  //   setShow(true);
  //   setEditItem(item);
  // };
  // const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();

  //   if (editItem) {
  //     setName(editItem.name);
  //     setPrice(editItem.price);
  //     setCount(editItem.count);
  //     setFile(editItem.file);
  //     setEditItem(null);
  //     setShow(false);
  //   } else {
  //     setName("");
  //     setPrice("");
  //     setCount("");
  //     setFile("");
  //     setShow(false);
  //   }
  // };
  // const formatteDate = (isoString: string) => {
  //   const date = new Date(isoString);
  //   return date.toLocaleDateString();
  // };

  // useEffect(() => {
  //   setProduct(product);
  // }, [product]);

  // const confirmHandle = (item: productProps) => {
  //   setConfirmId(item.id);
  //   setBoxShow(true);
  // };

  // const handleConfirmCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();

  //   if (confirmId) {
  //     setConfirmId(null);
  //     setBoxShow(false);
  //     setShow(false);
  //   } else {
  //     setConfirmId(null);
  //     setBoxShow(false);
  //   }
  // };
  return (
    <div
      className={`${classes.productCol1} ${
        boxShow ? classes.boxShowBackground : ""
      }`}
    >
      <div className={classes.productCol2}>
        <div className={classes.productCol3}>
          <h1 className={classes.title}>Product</h1>
          <button
            className={classes.button}
            onClick={() => {
              setEditItem(null);
              setShow(true);
            }}
          >
            Add Product
          </button>
        </div>

        <div className={classes.productCol4}>
          <table>
            <thead>
              <tr>
                <th>ProductOwner</th>
                <th>Product Name</th>
                <th>Price</th>
                {/* <th>Count</th> */}
                <th>Photo</th>
                <th>Date</th>
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
                  <td>
                    <img
                      src={`https://images.unsplash.com/photo-1627615275530-e60209d08216?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
                      className={classes.img}
                      alt="img"
                    />
                  </td>
                  <td>{item.createdAt.toString()}</td>

                  <td>
                    <button>Edit</button>
                  </td>
                  <td>
                    <button>Delete</button>
                    {boxShow && confirmId === item.id && (
                      <div className={classes.confirmBox}>
                        <p style={{ textAlign: "center", fontSize: "18px" }}>
                          Are you sure delete this product?
                        </p>
                        <div className={classes.confirmButton}>
                          <button>Cancel</button>
                          <button>Delete</button>
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
                  // onSubmit={handleSubmit}
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
                    placeholder="Count...."
                    value={count}
                    className={classes.input}
                    onChange={(e) => setCount(e.target.value)}
                  />
                  <input type="file" onChange={handleFile} />

                  {file && <img src={file} className={classes.prvFile} />}
                  <div className={classes.addProductButton}>
                    <button
                      className={classes.cancelButton}
                      type="submit"
                      onClick={handleCancel}
                    >
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
