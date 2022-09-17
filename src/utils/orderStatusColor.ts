import { colors } from "../modules";

// type StatusProps =
//   | "PENDING"
//   | "ACCEPTED"
//   | "DISPATCHED"
//   | "DELIVERED"
//   | "CANCELLED"
//   | "REJECTED";
export const orderStatusColor = (status: string) => {
  switch (status?.toUpperCase()) {
    case "PENDING":
      return colors.light.blue;

    case "ACCEPTED":
      return colors.light.green;

    case "DISPATCHED":
      return "#f5cb5c";

    case "DELIVERED":
      return "#fe5d26";

    case "CANCELLED":
      return "#ff6b6b";

    case "REJECTED":
      return colors.light.red;

    default:
      return null;
  }
};
