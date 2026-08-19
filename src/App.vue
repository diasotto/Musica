<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
</script>

<style>
/* global app styles can go here */
body { margin: 0; font-family: var(--ion-font-family, Arial, sans-serif); }
</style>
