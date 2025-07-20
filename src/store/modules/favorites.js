
export default{
    namespaced: true,
    state: () => ({
        favorites: JSON.parse(localStorage.getItem('favorites')) || [],
        filteredFavorites: JSON.parse(localStorage.getItem('favorites')) || [],
    }),
    mutations: {
        ADD_TO_FAVORITES(state, meal){
            const isExist = state.favorites.find(fav => fav.idMeal === meal.idMeal);
            if(!isExist){
                state.favorites.push(meal);
                state.filteredFavorites = state.favorites;
                // update local storage
                localStorage.setItem('favorites', JSON.stringify(state.favorites));
            }
        },
        REMOVE_FROM_FAVORITES(state, idMeal){
            const findIndex = state.favorites.findIndex(fav => fav.idMeal === idMeal);
            if(findIndex !== -1){
                state.favorites.splice(findIndex, 1);
                state.filteredFavorites = state.favorites;
                // update local storage
                localStorage.setItem('favorites', JSON.stringify(state.favorites));
            }
        },
        SEARCH_FAVORITES(state, query){
            if(!query.trim()){
               state.filteredFavorites = state.favorites;
            } else{
               state.filteredFavorites = state.favorites.filter((fav) =>
                    fav.strMeal.toLowerCase().includes(query.toLowerCase())
                );
            }
        },
        IS_FAVORITE(state, idMeal){
            return state.favorites.some(fav => fav.idMeal === idMeal);
        }
    },
    actions: { 
    },
    getters: {
        getFavorites(state){
            return state.filteredFavorites
        },
        totalFavorites(state){
            return state.favorites.length;
        },
    }
}