<script setup lang="ts">
import HelloWorld from "@/components/HelloWorld.vue";
const alert = (value: number) => {
  window.alert(value)
}
</script>

<template>
    <HelloWorld title="hello world" message="123" @test-emit="alert" />
</template>
