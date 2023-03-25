import { useState } from "react";
import { Drawer, LinearProgress, Grid, Badge } from "@mui/material";
import AddShoppingCart from "@mui/icons-material/AddShoppingCart";
import { getPorducts, Product } from "./Api/api";
import { Alert } from "@mui/material";
import { useQuery } from "react-query";
import Item from "./components/Items/Item";
import { Wrapper, StyledButton } from "./App.style";
import Cart from "./components/Cart/Cart";

function App() {
  const { data, isLoading, error } = useQuery<Product[]>(
    "products",
    getPorducts
  );

  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [cartItem, setCartItems] = useState<Product[]>([]);

  const getTotalItems = (items: Product[]) => {
    if (cartItem.length > 0) {
      return items
        .map((item: Product) => {
          return item.amount;
        })
        .reduce((acc, curr) => acc + curr);
    } else return 0;
  };
  const handleAddToCart = (clickedItem: Product) => {
    setCartItems((prev) => {
      const isItemInCart = prev.findIndex((item) => item.id === clickedItem.id);
      if (isItemInCart !== -1) {
        const updatedItem = {
          ...prev[isItemInCart],
          amount: prev[isItemInCart].amount + 1,
        };
        return [
          ...prev.slice(0, isItemInCart),
          updatedItem,
          ...prev.slice(isItemInCart + 1),
        ];
      } else {
        return [...prev, { ...clickedItem, amount: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) => {
      return prev.reduce((acc, item) => {
        if (item.id === id) {
          if (item.amount === 1) {
            return acc;
          } else {
            return [...acc, { ...item, amount: item.amount - 1 }];
          }
        } else {
          return [...acc, item];
        }
      }, [] as Product[]);
    });
  };

  if (isLoading) return <LinearProgress />;
  if (error) return <Alert severity="error">Something went wrong...</Alert>;

  return (
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItem}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItem)} color="error">
          <AddShoppingCart />
        </Badge>
      </StyledButton>
      <Grid spacing={3} container>
        {data?.map((item: Product) => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={() => handleAddToCart(item)} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
}

export default App;
