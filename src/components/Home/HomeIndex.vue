<template>
    <div>
        <HomeFeature/>
        <HomeContent />
    </div>
</template>


<script>
    import HomeFeature from './HomeFeature.vue';
    import HomeContent from './HomeContent.vue';

    export default {
        components:{
            HomeFeature,
            HomeContent
        }
    }

</script>