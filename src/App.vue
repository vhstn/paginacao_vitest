<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import Pagination from './components/Pagination.vue';

const allItems = ref<string[]>([])
const itemsPerPage = 5
const currentPage = ref(1)

onMounted(() => {
  for (let i = 1; i <= 32; i++) {
    allItems.value.push(`Produto ${i}`)
  }
})

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return allItems.value.slice(start, end)
})

function handlePageChange(page: number) {
  currentPage.value = page;
}

</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center">
      Lista de Itens (Página {{ currentPage }})
    </h1>

    <div class="space-y-3 mb-6">
      <div 
        v-for="item in paginatedItems" 
        :key="item"
        class="p-4 bg-white shadow rounded-lg border-l-4 border-blue-500"
      >
        {{ item }}
      </div>
    </div>
    
    <Pagination
      :total-items="allItems.length"
      :items-per-page="itemsPerPage"
      :current-page="currentPage"
      @page-changed="handlePageChange"
    />
  </div>
</template>

<style></style>