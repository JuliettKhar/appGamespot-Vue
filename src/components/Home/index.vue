<template>
    <div>
        <Feature/>
        <Content />
    </div>
</template>


<script>
    import Feature from './Feature';
    import Content from './content.vue';

    export default {
        components:{
            Feature,
            Content
        }
    }

</script>