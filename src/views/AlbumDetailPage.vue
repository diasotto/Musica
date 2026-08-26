<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/tabs/tab1" />
        </ion-buttons>
        <ion-title>{{ album?.title || 'Álbum' }}</ion-title>
        <ion-buttons slot="end">
            <ion-button @click="toggleFavorite">
              <ion-icon :icon="album?.favorite ? starIcon : starOutlineIcon" slot="icon-only"></ion-icon>
            </ion-button>
          <ion-button color="danger" @click="remove">
            <ion-icon :icon="trashIcon" slot="icon-only"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-card v-if="album">
        <img v-if="album.cover" :src="album.cover" alt="cover" class="cover" />
        <ion-card-header>
          <ion-card-subtitle>{{ album.artist }}</ion-card-subtitle>
          <ion-card-title>{{ album.title }}</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p><strong>Ano:</strong> {{ album.year || '—' }}</p>
          <p><strong>Músicas:</strong></p>
          <ol>
            <li v-for="(s, i) in album.songs || []" :key="i">{{ s }}</li>
          </ol>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonButton,
  IonIcon,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
} from '@ionic/vue';
import { star, starOutline, trash } from 'ionicons/icons';

const router = useRouter();
const route = useRoute();
const album = ref<any | null>(null);

function loadAlbums() {
  const raw = localStorage.getItem('albums');
  return raw ? JSON.parse(raw) : [];
}

function saveAlbums(arr: any[]) {
  localStorage.setItem('albums', JSON.stringify(arr));
}

function findAlbum(id: string) {
  const albums = loadAlbums();
  return albums.find((a: any) => a.id === id) || null;
}

function toggleFavorite() {
  if (!album.value) return;
  const albums = loadAlbums();
  const idx = albums.findIndex((a: any) => a.id === album.value.id);
  if (idx === -1) return;
  albums[idx].favorite = !albums[idx].favorite;
  saveAlbums(albums);
  album.value = albums[idx];
}

function remove() {
  if (!album.value) return;
  const albums = loadAlbums();
  const idx = albums.findIndex((a: any) => a.id === album.value.id);
  if (idx === -1) return;
  albums.splice(idx, 1);
  saveAlbums(albums);
  router.replace('/tabs/tab1');
}

onMounted(() => {
  const id = route.params.id as string;
  if (!id) {
    router.replace('/tabs/tab1');
    return;
  }
  album.value = findAlbum(id) || null;
});

const starIcon = star;
const starOutlineIcon = starOutline;
const trashIcon = trash;
</script>

<style scoped>
.cover { width: 100%; height: 240px; object-fit: cover; border-radius: 6px; }
</style>
