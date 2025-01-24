<script lang="ts" setup></script>

<template>
  <div class="card">
    <header>
      <div>Title</div>
      <div>Tagline</div>
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
    min-height: 200px;
  }
}
</style>
