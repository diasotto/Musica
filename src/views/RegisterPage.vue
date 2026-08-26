<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar>
        <ion-title>Cadastro</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding" :fullscreen="true">
      <ion-grid class="login-grid">
        <ion-row class="ion-justify-content-center">
          <ion-col size-md="6" size-lg="4" size-sm="12">
            <ion-card>
              <ion-card-header class="ion-text-center">
                <ion-icon :icon="personAddIcon" size="large" class="logo-icon"></ion-icon>
                <ion-text>
                  <h2>Rec Album</h2>
                  <p class="muted">Crie sua conta e organize seus álbuns</p>
                </ion-text>
              </ion-card-header>

              <ion-card-content>
                <form @submit.prevent="register" novalidate>
                  <ion-item>
                    <ion-label position="stacked">Nome</ion-label>
                    <ion-input v-model.trim="name" placeholder="Seu nome" autocomplete="name" required></ion-input>
                  </ion-item>

                  <ion-item>
                    <ion-label position="stacked">E-mail</ion-label>
                    <ion-input v-model.trim="email" type="email" placeholder="seu@exemplo.com" autocomplete="email" required></ion-input>
                  </ion-item>

                  <ion-item>
                    <ion-label position="stacked">Senha</ion-label>
                    <ion-input :type="showPassword ? 'text' : 'password'" v-model="password" placeholder="••••••••" autocomplete="new-password" required></ion-input>
                    <ion-button slot="end" fill="clear" size="small" @click.prevent="togglePassword" :aria-pressed="showPassword">
                      <ion-icon :icon="showPassword ? eyeOff : eye"></ion-icon>
                    </ion-button>
                  </ion-item>

                  <ion-item>
                    <ion-label position="stacked">Confirme a senha</ion-label>
                    <ion-input :type="showPassword ? 'text' : 'password'" v-model="confirmPassword" placeholder="••••••••" autocomplete="new-password" required></ion-input>
                  </ion-item>

                  <div class="ion-margin-top">
                    <ion-button type="submit" expand="block" :disabled="loading">
                      <ion-spinner v-if="loading" name="crescent"></ion-spinner>
                      <span v-else>Cadastrar</span>
                    </ion-button>

                    <ion-button type="button" fill="clear" expand="block" @click="goToLogin">Já tenho conta</ion-button>
                  </div>
                </form>
              </ion-card-content>
            </ion-card>

            <div class="ion-text-center muted small-text">Ao criar a conta, você concorda com os termos.</div>
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
} from '@ionic/vue';
import { personAdd, eye as eyeIcon, eyeOff as eyeOffIcon } from 'ionicons/icons';

const router = useRouter();
const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const showPassword = ref(false);
const loading = ref(false);
const showToast = ref(false);
const toastMessage = ref('');

function togglePassword() {
  showPassword.value = !showPassword.value;
}

function validEmail(e: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

async function register() {
  if (!name.value || !email.value || !password.value || !confirmPassword.value) {
    toastMessage.value = 'Preencha todos os campos.';
    showToast.value = true;
    return;
  }
  if (!validEmail(email.value)) {
    toastMessage.value = 'E-mail inválido.';
    showToast.value = true;
    return;
  }
  if (password.value !== confirmPassword.value) {
    toastMessage.value = 'As senhas não conferem.';
    showToast.value = true;
    return;
  }
  if (password.value.length < 6) {
    toastMessage.value = 'A senha precisa ter ao menos 6 caracteres.';
    showToast.value = true;
    return;
  }

  loading.value = true;
  // Simulação de chamada de cadastro — substitua por serviço real
  await new Promise((r) => setTimeout(r, 900));
  loading.value = false;

  // salva usuário localmente e marca auth
  localStorage.setItem('user', JSON.stringify({ name: name.value, email: email.value }));
  localStorage.setItem('auth', 'true');
  router.push('/tabs/tab1');
}

function goToLogin() {
  router.push('/login');
}

const personAddIcon = personAdd;
const eye = eyeIcon;
const eyeOff = eyeOffIcon;
</script>

<style scoped>
.login-grid { width: 100%; max-width: 560px; min-height: calc(100vh - 56px); margin: 0 auto; padding: 16px 8px; display: flex; align-items: center; }
.logo-icon { color: var(--ion-color-primary); font-size: 56px; margin-bottom: 6px; }
.muted { color: var(--ion-color-medium); }
.small-text { font-size: 12px; margin-top: 8px; }
ion-card { box-shadow: 0 6px 18px rgba(0,0,0,0.06); border-radius: 12px; }
@media (max-width: 420px) {
  .login-grid { padding-inline: 0; }
  ion-card { margin-inline: 4px; }
}
</style>
