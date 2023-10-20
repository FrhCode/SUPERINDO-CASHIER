type Paginate = {
  query: string;
  page: number;
  size: number;
  sortBy: string;
  sortDirection: "ASC" | "DESC";
};

export default Paginate;
