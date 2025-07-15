
export default{
    namespaced: true,
    state: () => ({
        favorites: [],
    }),
    mutations: {
        ADD_TO_FAVORITES(state, meal){
            const isExist = state.favorites.find(fav => fav.idMeal === meal.idMeal);
            if(!isExist){
                state.favorites.push(meal);
            }
        }
    },
    actions: { 
    },
    getters: {
        getFavorites(state){
            return state.favorites
        },
        totalFavorites(state){
            return state.favorites.length;
        }
    }
}