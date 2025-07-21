<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';


const store = useStore();
const categories = computed(() => store.getters['meals/getCategories']);

onMounted(()=>{
    store.dispatch('meals/fetchCategory');
});

</script>
<template>
    <select id="countries" class="bg-gray-50 shadow inline-block p-2.5 rounded-md">
        <option selected>Filter by Category</option>
        <option v-for="category in categories" :key="category.idCategory" :value="category.strCategory">{{ category.strCategory }}</option>
    </select>
</template>