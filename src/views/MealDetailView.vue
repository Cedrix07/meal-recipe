<script setup>
import apiClient from '@/api/axios';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute();
const meal = ref({});

const fetchMealById = async () =>{
    try{
        const {data} = await apiClient.get(`lookup.php?i=${route.params.id}`);
        meal.value = data.meals[0] || {};
        console.log(meal);
    }catch(error){
        console.log(error);
    }
}

onMounted(() => {
    fetchMealById();
});

</script>
<template>
    <main>
        <h1>Meal Detail</h1>
        <p>{{ meal.strMeal }}</p>
    </main>
</template>