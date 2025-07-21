import apiClient from "@/api/axios";

export default{
    namespaced: true,
    state: () => ({
        meals: [],
        categories: [],
        isLoading: false,
        error: null,
        searchQuery: '', // Add this to store the search query
    }),
    mutations: {
        SET_MEALS(state, meals){
            state.meals = meals
        },
        SET_CATEGORIES(state, categories){
            state.categories = categories
        },
        SET_LOADING(state, isLoading){
            state.isLoading = isLoading
        },
        SET_ERROR(state, error){
            state.error = error
        },
        SET_SEARCH_QUERY(state, query) {
            state.searchQuery = query; // Mutation to set the search query
        },
    },
    actions:{
       async fetchRandomMeals({ commit }) {
            commit('SET_LOADING', true);
            commit('SET_ERROR', null);
            commit('SET_SEARCH_QUERY', '');
            try {
                // Fetch 8 random meals in parallel
                const requests = Array.from({ length: 9 }, () =>
                    apiClient.get('random.php')
                );
                const responses = await Promise.all(requests);

                // Flatten the responses into an array of meals
                const randomMeals = responses.map(res => res.data.meals[0]);
                commit('SET_MEALS', randomMeals);
            } catch (error) {
                console.error('Error fetching random meals', error);
                commit('SET_ERROR', 'Failed to fetch random meals');
                commit('SET_MEALS', []);
            } finally {
                commit('SET_LOADING', false);
            }
        },
        async fetchMealByName({commit}, query){
            if(!query.trim()){
                commit('SET_MEALS', []);
                commit('SET_LOADING', false);
                return;
            }
            commit('SET_LOADING', true);
            commit('SET_ERROR', null);
            commit('SET_SEARCH_QUERY', query); // Store the search query
            try{
                const {data} = await apiClient.get(`search.php?s=${query}`);
                commit('SET_MEALS', data.meals || []);
            }catch(error){
                console.error('Error Fetching Meals', error);
                commit('SET_ERROR', 'Failed to fetch meals'); 
                commit('SET_MEALS', []);    
                commit('SET_SEARCH_QUERY', query); // Store the search query
            }finally{
                commit('SET_LOADING', false);
            }
        },
        async fetchCategory({commit}){
            try{
                const { data } = await apiClient.get('categories.php');
                console.log(data);
                commit('SET_CATEGORIES', data.categories || []);
            }catch(error){
                console.error('Error Fetching Categories', error);
                commit('SET_CATEGORIES', []);
            }
        }
    },
    getters: {
        getMeals(state){
            return state.meals
        },
        getCategories(state){
            return state.categories
        },
        isLoading(state){
            return state.isLoading
        },
        error(state){
            return state.error
        },
        getSearchQuery(state) {
            return state.searchQuery; // Getter for the search query
        },
    }
}