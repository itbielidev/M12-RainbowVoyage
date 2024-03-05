<script setup lang="ts">
import {useTodosStore} from "@/stores/todos";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";


const todosStore = useTodosStore();
const {todos} = storeToRefs(todosStore); //importante para no perder la reactividad!!!
const {getTodos} = todosStore;

onMounted(()=> {
    getTodos();
})
</script> 
<template>
    {{ todos }}
</template>