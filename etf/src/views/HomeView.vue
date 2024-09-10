<template>
    <div class="container">
        <div class="mt-3">
            您已登入!!<button type="submit" class="btn btn-outline-danger" @click="logout">登出</button>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();

const logout = async () => {
    try {
        await axios.post('http://localhost:3000/api/logout', {}, {
            withCredentials: true
        });
        router.push({ name: 'login' });
    } catch (error) {
        console.error('登出失敗', error);
    }
}
</script>