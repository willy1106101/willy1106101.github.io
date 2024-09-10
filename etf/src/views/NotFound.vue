<template>
    <div class="container d-flex align-items-center" style="min-height: 100vh;">
        <div class="m-auto">
            <h1 class="text-center">404 - 頁面未找到</h1>
            <p class="text-danger text-center">抱歉，你所請求的頁面不存在。</p>
            <div class="d-flex justify-content-center">
                <button type="submit" class="btn btn-outline-info" @click="redirect">回登入介面</button>
            </div>
        </div>
        
    </div>
</template>

<script setup>
    import { useRouter } from 'vue-router'
    const router = useRouter();
    function redirect(){
        router.push('/');
    }
    
</script>