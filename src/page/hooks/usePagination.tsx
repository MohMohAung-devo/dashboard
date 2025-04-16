import React, { useEffect, useState } from "react";

interface productProps {
  id: number;
  name: string;
  price: string;
  count: string;
  file: string;
  createdAt: string;
}
interface typeInitial {
  itemsPerPage: number;
  data: productProps[];
  startFrom: number;
}

const usePagination = (initialState: typeInitial) => {
  const { itemsPerPage, data, startFrom = 1 } = initialState;

  const perPage = itemsPerPage ? itemsPerPage : 5;

  const pages = Math.ceil(data.length / perPage);

  const pagination = [];

  const [currentPage, setCurrentPage] = useState(
    startFrom <= pages ? startFrom : 1
  );

  // const [slicedData, setSlicedData] = useState(
  //   [...data].slice((currentPage - 1) * perPage, currentPage * perPage)
  // );

  const [slicedData, setSlicedData] = useState<productProps[]>([]);

  useEffect(() => {
    setSlicedData(
      [...data].slice((currentPage - 1) * perPage, currentPage * perPage)
    );
  }, [data, currentPage, itemsPerPage]);

  let ellipsisLeft = false;
  let ellipsisRight = false;

  for (let i = 1; i <= pages; i++) {
    if (i === currentPage) {
      pagination.push({ id: i, current: true, ellipsis: false });
    } else {
      if (
        i < 2 ||
        i > pages - 1 ||
        i === currentPage - 1 ||
        i === currentPage + 1
      ) {
        pagination.push({ id: i, current: false, ellipsis: false });
      } else if (i > 1 && i < currentPage && !ellipsisLeft) {
        pagination.push({ id: i, current: false, ellipsis: true });
        ellipsisLeft = true;
      } else if (i < pages && i > currentPage && !ellipsisRight) {
        pagination.push({ id: i, current: false, ellipsis: true });
        ellipsisRight = true;
      }
    }
  }

  const changePage = (page: number, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (page !== currentPage) {
      setCurrentPage(page);
      setSlicedData([...data].slice((page - 1) * perPage, page * perPage));
    }
  };

  const gotToNextPage = (e: React.MouseEvent<SVGAElement>) => {
    e.preventDefault();
    setCurrentPage((prv) => (prv === pages ? prv : prv + 1));

    if (currentPage !== pages) {
      setSlicedData(
        [...data].slice(currentPage * perPage, (currentPage + 1) * perPage)
      );
    }
  };

  const gotToPrvPage = (e: React.MouseEvent<SVGAElement>) => {
    e.preventDefault();
    setCurrentPage((prv) => (prv - 1 === 0 ? prv : prv - 1));
    if (currentPage !== 1) {
      setSlicedData(
        [...data].slice(
          (currentPage - 2) * perPage,
          (currentPage - 1) * perPage
        )
      );
    }
  };

  return {
    slicedData,
    pagination,
    prvPage: gotToPrvPage,
    nextPage: gotToNextPage,
    changePage,
  };
};

export default usePagination;
