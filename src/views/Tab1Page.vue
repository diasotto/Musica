<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar>
        <ion-title>Entrar</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding" :fullscreen="true">
      <ion-grid class="login-grid">
        <ion-row class="ion-justify-content-center">
          <ion-col size-md="6" size-lg="4" size-sm="12">
            <ion-card>
              <ion-card-header class="ion-text-center">
                <ion-icon :icon="musicalNotes" size="large" class="logo-icon"></ion-icon>
                <ion-text>
                  <h2>Rec Album</h2>
                  <p class="muted">Organize seus álbuns de música</p>
                </ion-text>
              </ion-card-header>

              <ion-card-content>
                <form @submit.prevent="login" novalidate>
                  <ion-item>
                    <ion-label position="stacked">E-mail</ion-label>
                    <ion-input v-model.trim="email" type="email" placeholder="seu@exemplo.com" autocomplete="email" required />
                  </ion-item>

                  <ion-item>
                    <ion-label position="stacked">Senha</ion-label>
                    <ion-input :type="showPassword ? 'text' : 'password'" v-model="password" placeholder="••••••••" autocomplete="current-password" required />
                    <ion-button slot="end" fill="clear" size="small" @click.prevent="togglePassword" :aria-pressed="showPassword">
                      <ion-icon :icon="showPassword ? eyeOff : eye"></ion-icon>
                    </ion-button>
                  </ion-item>

                  <ion-item lines="none" class="ion-margin-top small-actions">
                    <ion-checkbox slot="start" v-model="remember"></ion-checkbox>
                    <ion-label> Lembrar-me </ion-label>
                    <div class="forgot" @click="forgotPassword">Esqueceu a senha?</div>
                  </ion-item>

                  <div class="ion-margin-top">
                    <ion-button type="submit" expand="block" :disabled="loading">
                      <ion-spinner v-if="loading" name="crescent"></ion-spinner>
                      <span v-else>Entrar</span>
                    </ion-button>

                    <ion-button fill="clear" expand="block" @click="goToRegister">Criar conta</ion-button>
                  </div>
                </form>
              </ion-card-content>
            </ion-card>

            <div class="ion-text-center muted small-text">Ao entrar, você concorda com os termos.</div>
          </ion-col>
        </ion-row>
      </ion-grid>

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
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  IonToast,
  IonIcon,
  IonSpinner,
  IonText,
  IonCheckbox,
} from '@ionic/vue';
import { musicalNotes as musicalNotesIcon, eye as eyeIcon, eyeOff as eyeOffIcon } from 'ionicons/icons';

const router = useRouter();
const email = ref('');
const password = ref('');
const showPassword = ref(false);
const loading = ref(false);
const showToast = ref(false);
const toastMessage = ref('');
const remember = ref(false);

function togglePassword() {
  showPassword.value = !showPassword.value;
}

function validEmail(e: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

async function login() {
  if (!email.value || !password.value) {
    toastMessage.value = 'Preencha e-mail e senha.';
    showToast.value = true;
    return;
  }
  if (!validEmail(email.value)) {
    toastMessage.value = 'E-mail inválido.';
    showToast.value = true;
    return;
  }

  loading.value = true;
  // Simulação de chamada de autenticação — substitua por serviço real
  await new Promise((r) => setTimeout(r, 900));
  loading.value = false;

  // após autenticação bem-sucedida, redireciona para as tabs
  localStorage.setItem('auth', 'true');
  localStorage.setItem('user', JSON.stringify({ name: email.value.split('@')[0], email: email.value }));
  router.push('/tabs/tab1');
}

function goToRegister() {
  router.push('/register');
}

function forgotPassword() {
  toastMessage.value = 'Funcionalidade ainda não implementada.';
  showToast.value = true;
}

const musicalNotes = musicalNotesIcon;
const eye = eyeIcon;
const eyeOff = eyeOffIcon;
</script>

<style scoped>
.login-grid { width: 100%; max-width: 560px; min-height: calc(100vh - 56px); margin: 0 auto; padding: 16px 8px; display: flex; align-items: center; }
.logo-icon { color: var(--ion-color-primary); font-size: 56px; margin-bottom: 6px; }
.muted { color: var(--ion-color-medium); }
.small-text { font-size: 12px; margin-top: 8px; }
.small-actions { display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap; }
.small-actions .forgot { margin-left: auto; }
.forgot { color: var(--ion-color-primary); font-size: 13px; cursor: pointer; }
ion-card { box-shadow: 0 6px 18px rgba(0,0,0,0.06); border-radius: 12px; }
@media (max-width: 420px) {
  .login-grid { padding-inline: 0; }
  ion-card { margin-inline: 4px; }
  .small-actions .forgot { margin-left: 0; }
}
</style>