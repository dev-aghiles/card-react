import React from "react";
import { Button, Paper } from "@mui/material";
import { Product } from "../../Api/api";
import { Wrapper } from "./Items.styles";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
type Props = {
  item: Product;
  handleAddToCart: (clickedItem: Product) => void;
};

const Item: React.FC<Props> = ({ item, handleAddToCart }: Props) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  return (
    <Paper>
      <Wrapper>
        <img src={item.image} alt={item.title} />
        <div>
          <h3 style={{ minHeight: "65px", padding: "0 15px" }}>{item.title}</h3>
          <Accordion
            expanded={isExpanded}
            sx={{ boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.2)" }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <Typography>Description</Typography>
            </AccordionSummary>
            <AccordionDetails
              style={{ display: isExpanded ? "block" : "none" }}
            >
              <Typography>{item.description}</Typography>
            </AccordionDetails>
          </Accordion>
          <span
            style={{
              display: "block",
              padding: "10px",
              textAlign: "center",
              color: "#66ec62",
              fontWeight: "800",
            }}
          >
            ${item.price}
          </span>
        </div>
        <Button onClick={() => handleAddToCart(item)} variant="contained">
          Add Product
        </Button>
      </Wrapper>
    </Paper>
  );
};

export default Item;
