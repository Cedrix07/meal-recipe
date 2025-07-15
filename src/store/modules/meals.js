import apiClient from "@/api/axios";

export default{
    namespaced: true,
    state: () => ({
        meals: [],
        isLoading: false,
        error: null
    }),
    mutations: {
        SET_MEALS(state, meals){
            state.meals = meals
        },
        SET_LOADING(state, isLoading){
            state.isLoading = isLoading
        },
        SET_ERROR(state, error){
            state.error = error
        }
    },
    actions:{
        async fetchMealByName({commit}, query){
            if(!query.trim()){
                commit('SET_MEALS', []);
                commit('SET_LOADING', false);
                return;
            }
            commit('SET_LOADING', true);
            commit('SET_ERROR', null);

            try{
                const {data} = await apiClient.get(`search.php?s=${query}`);
                commit('SET_MEALS', data.meals || []);
            }catch(error){
                console.error('Error Fetching Meals', error);
                commit('SET_ERROR', 'Failed to fetch meals'); 
                commit('SET_MEALS', []);
            }finally{
                commit('SET_LOADING', false);
            }
        }
    },
    getters: {
        getMeals(state){
            return state.meals
        },
        isLoading(state){
            return state.isLoading
        },
        error(state){
            return state.error
        }
    }
}