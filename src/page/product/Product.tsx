import React, { useState } from "react";
import { ProductTable } from "./ProductTable";
import Photo from "../../assets/photo.jpg";
import Photo1 from "../../assets/photo1.jpg";

const Product = () => {
  interface productProps {
    id: number;
    name: string;
    price: string;
    count: string;
    file: string;
    createdAt: string;
  }
  const productList: productProps[] = [
    {
      id: 1,
      name: "Women clothes",
      price: "1000",
      count: "5",
      file: Photo,
      createdAt: "2025-04-08T10:20:30.000Z",
    },
    {
      id: 2,
      name: "Women clothes",
      price: "1000",
      count: "5",
      file: Photo1,
      createdAt: "2025-04-08T10:20:30.000Z",
    },
    {
      id: 3,
      name: "Women clothes",
      price: "1000",
      count: "5",
      file: Photo,
      createdAt: "2025-04-08T10:20:30.000Z",
    },
    {
      id: 4,
      name: "Women clothes",
      price: "1000",
      count: "5",
      file: Photo1,
      createdAt: "2025-04-08T10:20:30.000Z",
    },

    {
      id: 5,
      name: "Women clothes",
      price: "1000",
      count: "5",
      file: Photo,
      createdAt: "2025-04-08T10:20:30.000Z",
    },
    {
      id: 6,
      name: "Women clothes",
      price: "1000",
      count: "5",
      file: Photo1,
      createdAt: "2025-04-08T10:20:30.000Z",
    },

    {
      id: 7,
      name: "Women clothes",
      price: "1000",
      count: "5",
      file: Photo,
      createdAt: "2025-04-08T10:20:30.000Z",
    },
    {
      id: 8,
      name: "Women clothes",
      price: "1000",
      count: "5",
      file: Photo1,
      createdAt: "2025-04-08T10:20:30.000Z",
    },

    {
      id: 9,
      name: "Women clothes",
      price: "1000",
      count: "5",
      file: Photo,
      createdAt: "2025-04-08T10:20:30.000Z",
    },
    {
      id: 10,
      name: "Women clothes",
      price: "1000",
      count: "5",
      file: Photo1,
      createdAt: "2025-04-08T10:20:30.000Z",
    },

    {
      id: 11,
      name: "Women clothes",
      price: "1000",
      count: "5",
      file: Photo,
      createdAt: "2025-04-08T10:20:30.000Z",
    },
    {
      id: 12,
      name: "Women clothes",
      price: "1000",
      count: "5",
      file: Photo1,
      createdAt: "2025-04-08T10:20:30.000Z",
    },
  ];

  const [data, setData] = useState(productList);
  return (
    <>
      <ProductTable data={data} itemsPerPage={5} />
    </>
  );
};

export default Product;
