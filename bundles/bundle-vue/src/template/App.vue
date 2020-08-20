<template lang="pug">
  .container Hello {{bundler}}
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    data() {
        return {
            bundler: 'Parcel'
        };
    }
});
</script>

<style lang="scss" scoped>
.container {
    color: green;
}
</style>
