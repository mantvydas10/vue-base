<template>
  <div class="ui message" :class="type" v-if="!hidden">
    <i class="close icon" @click="hide"></i>
    <div class="header">
      {{ header }}
    </div>
    <slot></slot>
  </div>
</template>
<script src="https://unpkg.com/vue@2"></script>
<script>
export default {
  props: {
    type: {
      type: String,
      default: "info"
    },
    header: {
      type: String,
      default: "Information"
    }
  },
  data() {
    return {
      hidden: false
    };
  },
  methods: {
    hide() {
      this.hidden = true;
    }
  }
};
</script>

<style></style>

<!-- https://github.com/vueschool/vuejs-components-fundamentals/commit/c02af5df4e52b9e1ad7c9d6917515618c56d222c -->
