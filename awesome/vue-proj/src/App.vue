<script lang="ts" setup></script>

<template>
  <header>
    <div class="wrapper">
      <router-view></router-view>
    </div>
  </header>
</template>

<style>
* {
  font-family: 'Hack', 'Fira Code', 'Menlo', 'PingFang SC', 'Microsoft YaHei', monospace;
}

body {
  margin: 0;
  background-color: lightcyan;
}

/* fade-slide */
.fade-slide-leave-active,
.fade-slide-enter-active {
  transition: all 0.3s;
}

.fade-slide-enter-from {
  transform: translateX(-30px);
  opacity: 0;
}

.fade-slide-leave-to {
  transform: translateX(30px);
  opacity: 0;
}
</style>
