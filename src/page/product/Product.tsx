import { useEffect, useState } from "react";
import { ProductTable } from "./ProductTable";
import Photo from "../../assets/photo.jpg";
import { useProductFetch } from "../../api/useProductFetch";

const Product = () => {
  const { products, loading } = useProductFetch();
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
  // const productList: productProps[] = [
  //   {
  //     id: 1,
  //     name: "Women clothes",
  //     price: "1000",
  //     count: "5",
  //     file: Photo,
  //     createdAt: "2025-04-08T10:20:30.000Z",
  //   },
  //   {
  //     id: 2,
  //     name: "Women clothes",
  //     price: "1000",
  //     count: "5",
  //     file: Photo,
  //     createdAt: "2025-04-08T10:20:30.000Z",
  //   },
  //   {
  //     id: 3,
  //     name: "Women clothes",
  //     price: "1000",
  //     count: "5",
  //     file: Photo,
  //     createdAt: "2025-04-08T10:20:30.000Z",
  //   },
  //   {
  //     id: 4,
  //     name: "Women clothes",
  //     price: "1000",
  //     count: "5",
  //     file: Photo,
  //     createdAt: "2025-04-08T10:20:30.000Z",
  //   },
  // ];
  const [data, setData] = useState(products);

  useEffect(() => {
    setData(products);
  }, [products]);

  console.log("data", data);
  return (
    <>
      <ProductTable data={data} itemsPerPage={5} />
    </>
  );
};

export default Product;
