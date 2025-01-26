<script lang="ts" setup></script>

<template>
  <h1>全局组件</h1>
  <div class="card">
    <header>
      <div>Global</div>
      <div>Components</div>
    </header>
    <section>Content</section>
  </div>
</template>

<style lang="scss" scoped>
$border-color: #ccc;

.card {
  border: 1px solid $border-color;
  width: 400px;

  header {
    display: flex;
    justify-content: space-between;
    padding: 5px;
    border-bottom: 1px solid $border-color;
  }

  section {
    padding: 5px;
    min-height: 100px;
  }
}
</style>
