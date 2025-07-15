import { createStore } from "vuex";
import meals from "./modules/meals";
import favorites from "./modules/favorites";

export default createStore({
    modules:{
        meals,
        favorites
    }
});