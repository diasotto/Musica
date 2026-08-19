<template>
  <ion-page>
    <ion-header translucent>
        <ion-toolbar>
          <ion-title>Meus Álbuns</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="goToFavorites">
              <ion-icon :icon="heartIcon" slot="icon-only"></ion-icon>
            </ion-button>
            <ion-button @click="logout">
              <ion-icon :icon="logOut" slot="icon-only"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>

    <ion-content fullscreen>
      <ion-grid class="home-grid">
        <ion-row>
          <ion-col size="12" class="ion-text-center ion-padding">
            <h2>Bem-vindo, {{ userName || 'Usuário' }}</h2>
            <p class="muted">Colete, organize e descubra seus álbuns favoritos.</p>
          </ion-col>
        </ion-row>

        <ion-row>
          <ion-col v-if="albums.length === 0" size="12" class="ion-text-center ion-padding">
            <ion-card>
              <ion-card-content>
                <p>Nenhum álbum ainda. Toque em + para adicionar o primeiro.</p>
              </ion-card-content>
            </ion-card>
          </ion-col>

          <ion-col v-for="(a, i) in albums" :key="a.id" size-sm="6" size-md="4" size-lg="3">
            <ion-card class="clickable" @click="openAlbum(a.id)">
              <img v-if="a.cover" :src="a.cover" alt="cover" class="cover" />
              <ion-card-header>
                <ion-card-subtitle>{{ a.artist }}</ion-card-subtitle>
                <ion-card-title>{{ a.title }}</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <div class="ion-justify-content-between actions">
                  <div class="muted small">{{ a.year }}</div>
                  <div class="actions-right">
                    <ion-button fill="clear" size="small" @click.stop="toggleFavorite(a.id)">
                      <ion-icon :icon="a.favorite ? starIcon : starOutlineIcon" slot="icon-only"></ion-icon>
                    </ion-button>
                    <ion-button fill="clear" size="small" color="danger" @click.stop="removeAlbum(i)">
                      <ion-icon :icon="trash" slot="icon-only"></ion-icon>
                    </ion-button>
                  </div>
                </div>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
      <!-- FAB -->
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button @click="goToCreate">
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { add as addIcon, logOut as logOutIcon, trash as trashIcon, star as starIconImport, starOutline as starOutlineImport, heart as heartIconImport } from 'ionicons/icons';

const router = useRouter();
const albums = ref<Array<any>>([]);
const openAdd = ref(false);
const form = ref({ title: '', artist: '', year: '', cover: '' });
const userName = ref<string | null>(null);

function loadAlbums() {
  const raw = localStorage.getItem('albums');
  albums.value = raw ? JSON.parse(raw) : [];
}

function persist() {
  localStorage.setItem('albums', JSON.stringify(albums.value));
}

function saveAlbum() {
  if (!form.value.title || !form.value.artist) return;
  albums.value.unshift({
    id: Date.now().toString(),
    title: form.value.title,
    artist: form.value.artist,
    year: form.value.year,
    cover: form.value.cover,
  });
  persist();
  form.value = { title: '', artist: '', year: '', cover: '' };
  openAdd.value = false;
}

function removeAlbum(index: number) {
  albums.value.splice(index, 1);
  persist();
}

function toggleFavorite(id: string) {
  const idx = albums.value.findIndex((a: any) => a.id === id);
  if (idx === -1) return;
  albums.value[idx].favorite = !albums.value[idx].favorite;
  persist();
}

function openAlbum(id: string) {
  router.push(`/albums/${id}`);
}

function goToCreate() {
  router.push('/albums/new');
}

function goToFavorites() {
  router.push('/favorites');
}

function checkAuth() {
  const auth = localStorage.getItem('auth');
  const user = localStorage.getItem('user');
  if (auth !== 'true' && !user) {
    router.replace('/login');
    return false;
  }
  userName.value = user ? JSON.parse(user).name || null : null;
  return true;
}

function logout() {
  localStorage.removeItem('auth');
  localStorage.removeItem('user');
  router.replace('/login');
}

onMounted(() => {
  if (!checkAuth()) return;
  loadAlbums();
});

const add = addIcon;
const logOut = logOutIcon;
const trash = trashIcon;
const starIcon = starIconImport;
const starOutlineIcon = starOutlineImport;
const heartIcon = heartIconImport;
</script>

<style scoped>
.home-grid { padding: 18px; }
.muted { color: var(--ion-color-medium); }
.cover { width: 100%; height: 160px; object-fit: cover; border-top-left-radius: 8px; border-top-right-radius: 8px; }
.actions { display:flex; align-items:center; justify-content:space-between; }
.small { font-size: 13px; }
</style>
