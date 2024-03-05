import { defineStore } from "pinia";
import { ref } from "vue";
import {useFetch} from "@/composables/useFetch";

interface Todo {
    userId : number;
    id: number;
    title: string;
    completed : boolean;
}

export const useTodosStore = defineStore('todos', () => {
    const todos = ref<Todo[] | null | undefined>([]);   

    const {get} = useFetch<Todo[]>();
    
    const getTodos = async () => {
        todos.value = await get("https://jsonplaceholder.typicode.com/todos");
    }

    return {todos, getTodos}
});