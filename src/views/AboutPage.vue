<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/tabs/tab1" />
        </ion-buttons>
        <ion-title>Sobre</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-card>
        <ion-card-header>
          <ion-card-title>{{ appName }}</ion-card-title>
          <ion-card-subtitle>Versão {{ version }}</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <p>Aplicativo para organizar seus álbuns de música.</p>
        </ion-card-content>
      </ion-card>

      <ion-item>
        <ion-label class="item-label">Termos de Uso</ion-label>
      </ion-item>
      <ion-card>
        <ion-card-content>
          <p>
            Estes Termos de Uso descrevem as regras para utilização do aplicativo. Ao usar o aplicativo,
            você concorda em não violar direitos de terceiros, não publicar conteúdo ilegal e respeitar a
            propriedade intelectual.
          </p>
        </ion-card-content>
      </ion-card>

      <ion-item>
        <ion-label class="item-label">Política de Privacidade</ion-label>
      </ion-item>
      <ion-card>
        <ion-card-content>
          <p>
            Este aplicativo armazena dados localmente no dispositivo (localStorage). Não enviamos dados a
            servidores por padrão. Se integrar um backend, revise as práticas de privacidade.
          </p>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { APP_VERSION, APP_NAME } from '@/app.config';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonItem,
  IonLabel,
} from '@ionic/vue';
const version = APP_VERSION;
const appName = APP_NAME;
</script>

<style scoped>
.item-label { font-weight: 600; }
</style>
