<!-- template side -->
<template>
    <div class="container d-flex align-items-center" style="min-height: 100vh;">
        <!-- 登入介面 -->
        <form class="m-auto" @submit.prevent="login">
        <div class="mb-3">
            <h1 class="text-center border-bottom border-3 border-success">登入</h1>
        </div>
        <div class="mb-3 row">
            <label class="col-3 col-form-label">帳號：</label>
            <div class="col">
            <input v-model="username" type="text" class="form-control" placeholder="請輸入帳號!" required>
            </div>
        </div>
        <div class="mb-3 row">
            <label class="col-3 col-form-label">密碼：</label>
            <div class="col">
            <input v-model="password" type="password" class="form-control" placeholder="請輸入密碼!" required>
            </div>
        </div>
        <div class="mb-3 d-flex justify-content-center">
            <div class="d-inline p-2">
            <button type="submit" class="btn btn-outline-success">登入</button>
            </div>
            <div class="d-inline p-2">
            <button type="reset" class="btn btn-outline-danger">重製</button>
            </div>      
        </div>
        <div v-if="errorMsg" class="mb-3 text-center">{{ errorMsg }}</div>
        </form>
    </div>
</template>

<!-- script side -->  
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter();
const username = ref('');
const password = ref('');
const errorMsg = ref('');

async function login() {
    try {
    const response = await axios.post('http://localhost:3000/api/login', {
        username: username.value,
        password: password.value
    }, {
        withCredentials: true // 允許攜帶 Cookie
    });
        if(response.data.message){
            router.push('/home');
        }
    } catch (error) {
    errorMsg.value = error.response.data.message;
    }
}
</script>