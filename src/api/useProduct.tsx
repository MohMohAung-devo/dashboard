import axios from "axios";
import { useState, useEffect } from "react";

interface ProductProps {
  _id: string;
  name: string;
  description: string;
  price: string;
  // count: number;
  // file: string;
  createdAt: string;
  createdBy: {
    name: string;
  };
}

export const useProductFetch = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const result = await axios.get<ProductProps[]>(
        "http://localhost:3000/api/product/getProduct",
        {
          withCredentials: true,
        }
      );
      setProducts(result.data);
      // console.log(result.data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      console.error("Error fetching products:", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchProduct();
  }, []);

  return { products, loading, error };
};

export const useProductAdd = () => {
  const [loading, setLoading] = useState(true);
  const [addProducts, setAddProducts] = useState<ProductProps[]>([]);
  const [error, setError] = useState<string | null>(null);

  const addProduct = async (
    productData: Omit<ProductProps, "id" | "createdAt" | "createdBy">
  ) => {
    setLoading(true);
    try {
      const data = await axios.post<ProductProps[]>(
        "http://localhost:3000/api/product/addProduct",
        productData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return data;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      console.error("Error fetching products:", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { addProduct, loading, error };
};

export const useProductUpdate = () => {
  const [loading, setLoading] = useState(true);
  const [updateData, setUpdateData] = useState<ProductProps | null>(null);
  const [error, setError] = useState<string | null>(null);
  const updateProduct = async (_id: string, partialData: ProductProps) => {
    try {
      const result = await axios.put<ProductProps[]>(
        `http://localhost:3000/api/product/updateProduct/${_id}`,
        partialData,
        {
          withCredentials: true,
        }
      );
      setUpdateData(result.data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      console.error("Error fetching products:", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void updateProduct();
  }, []);

  return {
    updateData,
    loading,
    error,
  };
};

export const useDeleteProduct = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const deleteProduct = async (id: string) => {
    try {
      const result = await axios.delete(
        `http://localhost:3000/api/product/deleteProduct/${id}`,
        {
          withCredentials: true,
        }
      );

      console.log(result);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      console.error("Error fetching products:", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { deleteProduct };
};
