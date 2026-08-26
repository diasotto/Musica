<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/tabs/tab1" />
        </ion-buttons>
        <ion-title>Novo Álbum</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-list>
        <ion-item>
          <ion-label position="stacked">Título</ion-label>
          <ion-input v-model="title" placeholder="Nome do álbum"></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">Artista</ion-label>
          <ion-input v-model="artist" placeholder="Artista"></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">Ano</ion-label>
          <ion-input v-model="year" type="number" placeholder="2020"></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">Músicas (uma por linha)</ion-label>
          <ion-textarea v-model="songsText" placeholder="Faixa 1\nFaixa 2"></ion-textarea>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">URL da capa (opcional)</ion-label>
          <ion-input v-model="cover" placeholder="https://..."></ion-input>
        </ion-item>
      </ion-list>

      <div class="ion-margin-top">
        <ion-button expand="block" @click="save">Salvar álbum</ion-button>
      </div>
      <ion-toast :is-open="showToast" :message="toastMessage" duration="2200" @did-dismiss="showToast = false" />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonButton,
  IonToast,
} from '@ionic/vue';

const router = useRouter();
const title = ref('');
const artist = ref('');
const year = ref('');
const songsText = ref('');
const cover = ref('');
const showToast = ref(false);
const toastMessage = ref('');

function loadAlbums() {
  const raw = localStorage.getItem('albums');
  try {
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveAlbums(arr: any[]) {
  localStorage.setItem('albums', JSON.stringify(arr));
}

function save() {
  if (!title.value.trim() || !artist.value.trim()) {
    toastMessage.value = 'Preencha o título e o artista.';
    showToast.value = true;
    return;
  }
  const albums = loadAlbums();
  const songs = String(songsText.value || '')
    .split('\n')
    .map((s) => s.trim())
    .filter((s) => s.length);
  const album = {
    id: Date.now().toString(),
    title: title.value,
    artist: artist.value,
    year: year.value,
    cover: cover.value,
    songs,
    favorite: false,
  };
  albums.unshift(album);
  saveAlbums(albums);
  router.replace('/tabs/tab1');
}
</script>

<style scoped>
.ion-margin-top { margin-top: 16px; }
</style>
