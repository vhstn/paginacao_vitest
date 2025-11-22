<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
}>();

const emit = defineEmits<{
  (e: 'page-changed', page: number): void;
}>();

const totalPages = computed(() => {
  return Math.ceil(props.totalItems / props.itemsPerPage);
});

const pages = computed(() => {
  return Array.from({ length: totalPages.value }, (_, index) => index + 1);
});

function changePage(page: number) {
  if (page >= 1 && page <= totalPages.value) {
    emit('page-changed', page);
  }
}
</script>

<template>
  <div class="flex justify-center space-x-2 p-4">
    <button
      @click="changePage(currentPage - 1)"
      :disabled="currentPage === 1"
      class="px-3 py-1 rounded border transition duration-150"
      :class="{
        'bg-gray-200 text-gray-500 cursor-not-allowed': currentPage === 1,
        'bg-blue-500 text-white hover:bg-blue-600': currentPage !== 1
      }"
    >
      Anterior
    </button>

    <button
      v-for="page in pages"
      :key="page"
      @click="changePage(page)"
      class="px-3 py-1 rounded border transition duration-150"
      :class="{
        'bg-blue-600 text-white font-bold': page === currentPage,
        'bg-gray-100 text-gray-700 hover:bg-gray-200': page !== currentPage
      }"
    >
      {{ page }}
    </button>

    <button
      @click="changePage(currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="px-3 py-1 rounded border transition duration-150"
      :class="{
        'bg-gray-200 text-gray-500 cursor-not-allowed': currentPage === totalPages,
        'bg-blue-500 text-white hover:bg-blue-600': currentPage !== totalPages
      }"
    >
      Próximo
    </button>
  </div>
</template>