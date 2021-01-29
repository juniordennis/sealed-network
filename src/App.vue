<template>
    <div id="app">
        <router-link to="/list">List Employee</router-link>
        <router-link to="/create">Create Employee</router-link>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    data() {
        return {
            message: 'Hello World',
        };
    },
};
</script>

<style>
#app {
    /*font-size: 18px;*/
    /*font-family: 'Roboto', sans-serif;*/
}
</style>