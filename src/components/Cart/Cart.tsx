import React from "react";
import { Wrapper } from "./Cart.styles";
import CartItem from "../CartItem/CartItem";
import { Product } from "../../Api/api";

type Props = {
  cartItems: Product[];
  addToCart: (clickedItem: Product) => void;
  removeFromCart: (id: number) => void;
};
const Cart: React.FC<Props> = ({
  cartItems,
  addToCart,
  removeFromCart,
}: Props) => {
  const calculateTotal = (items: Product[]): number => {
    return items.reduce((acc, cur) => acc + cur.amount * cur.price, 0);
  };
  return (
    <Wrapper>
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? <p>No items in cart.</p> : null}
      {cartItems.map((cartItem) => (
        <CartItem
          key={cartItem.id}
          item={cartItem}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <h2>Total:${calculateTotal(cartItems).toFixed(2)}</h2>
    </Wrapper>
  );
};

export default Cart;
