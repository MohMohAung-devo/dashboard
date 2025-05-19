import axios from "axios";
import { useState, useEffect } from "react";

interface ProductProps {
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
      console.log(result.data);
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

  const addProduct = async () => {
    setLoading(true);
    try {
      const result = await axios.post<ProductProps[]>(
        "http://localhost:3000/api/product/addProduct",
        {
          withCredentials: true,
        }
      );
      setAddProducts(result.data);
      console.log(result.data);
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
    void addProduct();
  }, []);

  return { addProducts, loading, error };
};
