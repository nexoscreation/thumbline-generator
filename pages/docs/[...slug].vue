<template>
    <div>
        <ContentDoc>
            <template #not-found>
                <h1>This is Example of Generated og image</h1>
            </template>
            <template #empty>
                <h1>Page is empty</h1>
            </template>
        </ContentDoc>
    </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: 'default'
})
</script>

<style scoped>
    /* Add styles specific to the Post component if needed */
</style>