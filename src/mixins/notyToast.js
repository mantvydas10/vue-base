import Vue from "vue";

export default {
  methods: {
    notyToast(message, type) {
      Vue.$toast.open({
        message: message,
        type: type
      });
    }
  }
};
