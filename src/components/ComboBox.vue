<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const categories = computed(() => store.getters['meals/getCategories'])

const search = ref('')
const showDropdown = ref(false)

const hideDropdown = () => {
  setTimeout(() => showDropdown.value = false, 150);
};

onMounted(() => {
    store.dispatch('meals/fetchCategory')
})

// Filter categories based on search text
const filteredCategories = computed(() => {
    if (!search.value) return categories.value
    return categories.value.filter(category =>
        category.strCategory.toLowerCase().includes(search.value.toLowerCase())
    )
})

const selectCategory = (category) => {
    search.value = category.strCategory
    showDropdown.value = false
}
</script>

<template>
    <div class="relative inline-block w-full">
        <input
            type="text"
            v-model="search"
            @focus="showDropdown = true"
            @blur="hideDropdown" 
            placeholder="Filter by Category"
            class="w-full p-2 border focus:outline-none focus:ring-1 focus:ring-orange-600 rounded-md shadow"
        />
        <i class="pi pi-chevron-down absolute right-2 top-1/2 transform -translate-y-1/3 h-5 w-5 text-gray-400 pointer-events-none"></i>
        <ul
            v-if="showDropdown && filteredCategories.length"
            class="absolute z-10 bg-white w-full mt-1 border rounded-md shadow max-h-40 overflow-auto"
        >
            <li
                v-for="category in filteredCategories"
                :key="category.idCategory"
                @click="selectCategory(category)"
                class="p-2 hover:bg-gray-200 cursor-pointer"
            >
                {{ category.strCategory }}
            </li>
        </ul>
    </div>
</template>

