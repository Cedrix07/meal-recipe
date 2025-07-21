<script setup>
import { computed } from 'vue';
import { useToast } from 'vue-toastification';
import { useStore } from 'vuex';

const props = defineProps({
    meal:{
        type: Object,
        required: true
    }
});

const store = useStore();
const toast = useToast();

const isFavorite = computed(()=> store.getters['favorites/isFavorite'](props.meal.idMeal));

const toggleFavorite = () => {
  if (isFavorite.value) {
    store.commit('favorites/REMOVE_FROM_FAVORITES', props.meal.idMeal)
    toast.error(`${props.meal.strMeal} removed from favorites`, { timeout: 2000 })
  } else {
    store.commit('favorites/ADD_TO_FAVORITES', props.meal)
    toast.success(`${props.meal.strMeal} added to favorites`, { timeout: 2000 })
  }
}
</script>
<template>
    <button class="px-2 py-1 rounded-md "
        @click="toggleFavorite">
        <i :class="['pi', isFavorite ? 'pi-heart-fill' : 'pi-heart', 'text-orange-600']"></i>
    </button>
</template>