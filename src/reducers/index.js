import { combineReducers } from "redux";
import { authentication } from "./authentication.reducer";
import { registration } from "./registration.reducer";
import { products } from "./product.reducer";
import { users } from "./users.reducer";
import { alert } from "./alert.reducer";
import { options } from "./option.reducer";
import { deliveries } from "./deliveries.reducer";
import { verifications } from "./verifications.reducer";

const rootReducer = combineReducers({
  authentication,
  registration,
  products,
  options,
  users,
  alert,
  deliveries,
  verifications,
});

export default rootReducer;
