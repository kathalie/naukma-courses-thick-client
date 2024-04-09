<template>
  <div>
    <UpperBar caption="Вхід на панель адміністратора"/>

    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card mt-5">
            <div class="card-body">
              <form @submit.prevent="login">
                <div class="mb-3">
                  <label for="username" class="form-label">Ім'я користувача</label>
                  <input type="text" class="form-control" id="username" v-model="username">
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Пароль</label>
                  <input type="password" class="form-control" id="password" v-model="password">
                </div>
                <div class="d-grid">
                  <button type="submit" class="btn accent-button">Увійти</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import UpperBar from "@/components/layout-components/UpperBar.vue";
import {loginAdmin} from "@/scripts/fetch";
import {RouteNames} from "@/common/constants";

const username = ref('');
const password = ref('');
const router = useRouter();

function login() {
  loginAdmin(username.value, password.value)
      .then(data => {
        console.log(data)
        localStorage.setItem('token', data.data.access_token);
        router.push({name: RouteNames.adminHome});
      })
      .catch(err => {
        switch (err.response.data.statusCode) {
          case 404: alert("Перевірте правильність введених даних"); break;
          default: alert("Сталась непередбачувана помилка");
        }
      })
}
</script>


<style scoped>
.accent-button {
  background-color: #f30e7d;
  color: white;
}
</style>
