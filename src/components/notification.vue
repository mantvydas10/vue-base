<template>
  <article :class="['message is-success', type]">
    <div class="message-header">
      <button
        @click="$emit('closeNotificationModal')"
        class="delete"
        aria-label="delete"
      ></button>
    </div>
    <div class="message-body">
      {{ message }}
    </div>
  </article>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      default: "info"
     
    },
    message: {
      type: String,
      default: "Information"
    }
  },
  data() {
    return {
      notification: this.message,
      alertClass: this.type
      
    };
  }

  
};


</script>

<style scoped>

</style>


