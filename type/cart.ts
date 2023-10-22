type Cart = {
  id: number;
  productVariant: {
    id: number;
    code: string;
    name: string;
    thumbnail: string;
    qty: number;
    price: number;
    active: boolean;
    created_date: string;
    updated_date: string;
    updated_user: string;
    created_user: string;
    product_id: number;
  };
  qty: number;
  created_date: string;
  updated_date: string;
  updated_user: string;
  created_user: string;
};

export default Cart;
