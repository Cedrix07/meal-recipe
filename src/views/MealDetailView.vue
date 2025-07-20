<script setup>
import apiClient from '@/api/axios';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';


const route = useRoute();
const store = useStore();
const meal = ref({});

const ingredients = ref([]);
let isLoading = ref(true);

const fetchMealById = async () =>{
    try{
        const {data} = await apiClient.get(`lookup.php?i=${route.params.id}`);
        meal.value = data.meals[0] || {};
        ingredients.value = Object.keys(meal.value).filter(key => key.startsWith('strIngredient') && meal.value[key]);
        const FormattedInstructions = meal.value.strInstructions.split('.');
        if(FormattedInstructions[FormattedInstructions.length - 1] === '') FormattedInstructions.pop();
        meal.value = {...meal.value, FormattedInstructions};
    }catch(error){
        console.log(error);
    }finally{
        isLoading.value = false;
    }
}

onMounted(() => {
    fetchMealById();
});

</script>
<template>
    <main class="p-8">
        <div v-if="isLoading" class="flex items-center justify-center w-full">
            <i class="pi pi-spin pi-spinner text-orange-600" style="font-size: 2rem"></i>
        </div>
       <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-3 border shadow p-3">
        <div>
            <img class="w-full object-cover mb-3" loading="lazy" :src="meal.strMealThumb" :alt="meal.strMeal">
        </div>
        <div>
            <div class="flex items-center justify-between">
                <h3 class="text-xl font-bold">{{ meal.strMeal }}</h3>
                <button class="px-2 py-1 rounded-md">
                   <i class="pi pi-heart text-orange-600"></i>
                </button>
            </div>
            <div class="my-3">
                <p class="font-semibold">Ingredients: </p>
                <ul class="list-disc pl-5">
                    <li v-for="ingredient in ingredients" :key="ingredient">
                        {{ meal[ingredient] }}
                    </li>
                </ul>
            </div>
            <div class="mb-3">
                <p class="font-semibold">Instructions on how to cook: </p>
                 <ol class="list-decimal pl-5">
                    <li v-for="instruction in meal.FormattedInstructions" :key="instruction">
                        {{ instruction.trim() }}
                    </li>
                </ol>
            </div>
            <a :href="meal.strYoutube" target="_blank" class="bg-orange-600 text-white px-2 py-2 rounded-md">Watch Video</a>
        </div>
       </div>
    </main>
</template>