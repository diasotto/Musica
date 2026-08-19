<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/tabs/tab1" />
        </ion-buttons>
        <ion-title>Favoritos</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-grid>
        <ion-row>
          <ion-col size="12" class="ion-text-center">
            <p class="muted">Álbuns marcados como favoritos</p>
          </ion-col>
        </ion-row>

        <ion-row>
          <ion-col v-if="favorites.length === 0" size="12" class="ion-text-center">
            <ion-card>
              <ion-card-content>
                <p>Nenhum favorito ainda.</p>
              </ion-card-content>
            </ion-card>
          </ion-col>

          <ion-col v-for="(a, i) in favorites" :key="a.id" size-sm="6" size-md="4" size-lg="3">
            <ion-card class="clickable" @click="openAlbum(a.id)">
              <img v-if="a.cover" :src="a.cover" alt="cover" class="cover" />
              <ion-card-header>
                <ion-card-subtitle>{{ a.artist }}</ion-card-subtitle>
                <ion-card-title>{{ a.title }}</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <div class="actions">
                  <div class="muted small">{{ a.year }}</div>
                  <div>
                    <ion-button fill="clear" size="small" @click.stop="toggleFavorite(a.id)">
                      <ion-icon :icon="starIcon" slot="icon-only"></ion-icon>
                    </ion-button>
                    <ion-button fill="clear" size="small" color="danger" @click.stop="removeAlbum(a.id)">
                      <ion-icon :icon="trash" slot="icon-only"></ion-icon>
                    </ion-button>
                  </div>
                </div>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { star, trash } from 'ionicons/icons';

const router = useRouter();
const favorites = ref<Array<any>>([]);

function loadAlbums() {
  const raw = localStorage.getItem('albums');
  return raw ? JSON.parse(raw) : [];
}

function saveAlbums(arr: any[]) {
  localStorage.setItem('albums', JSON.stringify(arr));
}

function refresh() {
  const albums = loadAlbums();
  favorites.value = albums.filter((a: any) => a.favorite);
}

function toggleFavorite(id: string) {
  const albums = loadAlbums();
  const idx = albums.findIndex((a: any) => a.id === id);
  if (idx === -1) return;
  albums[idx].favorite = !albums[idx].favorite;
  saveAlbums(albums);
  refresh();
}

function removeAlbum(id: string) {
  const albums = loadAlbums();
  const idx = albums.findIndex((a: any) => a.id === id);
  if (idx === -1) return;
  albums.splice(idx, 1);
  saveAlbums(albums);
  refresh();
}

function openAlbum(id: string) {
  router.push(`/albums/${id}`);
}

onMounted(() => refresh());

const starIcon = star;
const trashIcon = trash;
</script>

<style scoped>
.cover { width:100%; height:140px; object-fit:cover; border-radius:6px; }
.muted { color: var(--ion-color-medium); }
.actions { display:flex; justify-content:space-between; align-items:center; }
</style>
