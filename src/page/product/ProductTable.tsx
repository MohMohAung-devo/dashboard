import React, { useEffect, useState } from "react";
import classes from "./Product.module.css";
import usePagination from "../hooks/usePagination";
import { RiArrowRightWideFill } from "react-icons/ri";
import { RiArrowLeftWideFill } from "react-icons/ri";

interface productProps {
  id: number;
  name: string;
  price: string;
  count: string;
  file: string;
  createdAt: string;
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
  const { slicedData, pagination, prvPage, nextPage, changePage } =
    usePagination({
      data: product,
      itemsPerPage,
      startFrom: 1,
    });

  console.log(data, "data");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [count, setCount] = useState("");
  const [file, setFile] = useState("");
  const [show, setShow] = useState(false);
  const [editItem, setEditItem] = useState<productProps | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editItem) {
      setProduct((prv) =>
        prv.map((item) =>
          item.id === editItem.id ? { ...item, name, price, count, file } : item
        )
      );

      setName("");
      setPrice("");
      setCount("");
      setFile("");
      setEditItem(null);
      setShow(false);
    } else {
      setProduct([
        ...product,
        {
          id: product.length + 1,
          name,
          price,
          count,
          file,
          createdAt: new Date().toISOString(),
        },
      ]);
      setShow(false);

      setName("");
      setPrice("");
      setCount("");
      setFile("");
    }
  };
  const handelDelete = (id: number) => {
    setProduct(product.filter((item) => item.id !== id));
  };

  console.log(product, "slidedDAta");
  const handleEdit = (item: productProps) => {
    setName(item.name);
    setCount(item.count);
    setPrice(item.price);
    setFile(item.file);
    setShow(true);
    setEditItem(item);
  };
  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (editItem) {
      setName(editItem.name);
      setPrice(editItem.price);
      setCount(editItem.count);
      setFile(editItem.file);
      setEditItem(null);
      setShow(false);
    } else {
      setName("");
      setPrice("");
      setCount("");
      setFile("");
      setShow(false);
    }
  };
  const formatteDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString();
  };

  useEffect(() => {
    setProduct(product);
  }, [product]);
  return (
    <div className={classes.productCol1}>
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
                <th>Name</th>
                <th>Price</th>
                <th>Count</th>
                <th>Photo</th>
                <th>Date</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {slicedData.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.count}</td>
                  <td>
                    <img src={item.file} className={classes.img} />
                  </td>
                  <td>{formatteDate(item.createdAt)}</td>

                  <td>
                    <button onClick={() => handleEdit(item)}>Edit</button>
                  </td>
                  <td>
                    <button onClick={() => handelDelete(item.id)}>
                      Delete
                    </button>
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
                  onSubmit={handleSubmit}
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
                    <button className={classes.submitButton} type="submit">
                      {editItem ? "Update" : "Submit"}
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
