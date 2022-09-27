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
      // <-----Success, error, warning ----->
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

  // created() {
  //   if (this.notification) {
  //     this.showNotification();

  // window.addEventListener("showNotification", (header, type) => {
  //   this.notification = header;
  //   this.alertClass = type;
  //   this.showNotification();
  // });
};

// methods: {
//   showNotification() {
//     this.show = true;
//     this.hideNotification();
//   },
//   hideNotification() {
//     this.hideTimeout = setTimeout(() => {
//       this.show = false;
//     }, 3000);
//   },
//   destroyNotification() {
//     this.show = false;
//     clearTimeout(this.hideTimeout);
//   },
//   hide() {
//     this.show = false;
//   }
// }
</script>

<style scoped>
/* .wrapper {
  margin-bottom: 30px;
  display: inline-block;
  width: 25%;
  z-index: 1;
} */
</style>

https://github.com/vueschool/vuejs-components-fundamentals/commit/c02af5df4e52b9e1ad7c9d6917515618c56d222c
http://www.voerro.com/en/tutorials/r/user-notifications-in-laravel-5-with-vuejs-2/1
