<template>
    <!-- About -->
    <div class="center color">
        <img src='@/assets/icon.png' width='200px' alt='icon'></img>
        <p className='userName'>Q23079</p>
        <p className='userMessage'>日々挑戦し続ける，情報系学生の記録</p>
    </div>
</template>

<script>
</script>

<style scoped>
    .center {
        min-height: 80vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .userName {
        padding: 5px;
        font-size: x-large;
        font-weight: bold;
    }

    .userMessage {
        font-size: calc(8px + 2vmin);
    }

    /* 文字色 */
    .color {
        color: #0E2841;
        /* 文字色 */
    }

</style>