<template>
    <div id="container"></div>
</template>
<script setup lang="ts">
import AMapLoader from '@amap/amap-jsapi-loader';
import { onMounted, ref } from 'vue';

import icon from '@/assets/flashicon.png';
let map: any = null;
const markerList = ref([]);
onMounted(() => {
    AMapLoader.load({
        key: '7066344199d5d8c8bd499c1d4bfc1984',
        version: '1.4.15',
        plugins: [],
    }).then((AMap) => {
        map = new AMap.Map('container', {
            viewMode: '3D',
            zoom: 5,
            center: [116.397428, 39.90923],
        });
        MapList().then(({data}) => {
            console.log(data);
            markerList.value = data;
            markerList.value.forEach((markerItem: any) => {
                const marker = new AMap.Marker({
                    position: markerItem.position,
                    icon: icon,
                    title: markerItem.title,
                });
                map.add(marker);
            })
        });
    }).catch((err) => {
        console.log(err);
    });
});
</script>
<style scoped>
#container {
    width: 100%;
    height: 80vh;
}
</style>