type Paginate = {
  query: string;
  page: string;
  size: string;
  sortBy: string;
  sortDirection: "ASC" | "DESC";
};

export default Paginate;
