<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">

        <ion-tab-button tab="home" href="/tabs/tab1">
          <ion-icon aria-hidden="true" :icon="homeIcon" />
          <ion-label>Início</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="favorites" href="/favorites">
          <ion-icon aria-hidden="true" :icon="heartIcon" />
          <ion-label>Favoritos</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="about" href="/about">
          <ion-icon aria-hidden="true" :icon="infoIcon" />
          <ion-label>Sobre</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { home, heart, informationCircle } from 'ionicons/icons';

// expose icons for template
const homeIcon = home;
const heartIcon = heart;
const infoIcon = informationCircle;
</script>
