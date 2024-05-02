<script setup lang="ts">
import Breadcrumb from 'primevue/breadcrumb';


const props = defineProps<{
    items: any
}>()

</script>
<template>
    <section class="w-100 d-flex flex-row gap-5 justify-content-start">
        <Breadcrumb :model="items">
            <template #item="{ item, props }">
                <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                    <a :href="href" v-bind="props.action" @click="navigate">
                        <span :class="[item.icon, 'text-color']"></span>
                        <span class="text-color font-semibold">{{ item.label }}</span>
                    </a>
                </router-link>
                <a v-else :href="item.url" :target="item.target" v-bind="props.action">
                    <span class="text-color">{{ item.label }}</span>
                </a>
            </template>
        </Breadcrumb>
    </section>
</template>
<style>
.p-breadcrumb {
    width: fit-content;
    margin-left: 0px !important;
    padding-left: 0px !important;
    border: none;
    background: none;
}

.p-breadcrumb-home {
    display: none;
}

.p-breadcrumb-list {
    margin: 0;
    padding: 0;
}

a {
    text-decoration: none;
}

.text-color{
   color:#d90594; 
   text-decoration: none !important;
   font-size: 1.2rem;
   
}
</style>