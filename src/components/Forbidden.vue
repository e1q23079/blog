<template>
    <div className="center">
        <img src=@/assets/icon.png width='200px' alt='icon'></img>
        <p className='notFound'>Forbidden</p>
        <p className='message'>アクセス権限がありません．</p>
        <a href='/' className='message'>トップ</a>
    </div>
</template>

<script setup>
</script>

<style scoped>
    .center {
        min-height: 80vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .notFound {
        padding: 10px;
        font-size: x-large;
        font-weight: bold;
    }

    .message {
        font-size: large;
    }
</style>