<template>
  <ContactForm :mode="'add'"/>
</template>
<script>
import EventBus from "../EventBus.js";
import ContactForm from "./ContactForm";
export default {
  name: "AddContact",
  components: {
    ContactForm
  }
};
</script>
<style lang="scss" scoped>
.modal {
  position: absolute;
  width: 50%;
  left: 50%;
  top: 0;
  right: auto;
  bottom: auto;
  display: block;
  transform: translateX(-50%);
  background-color: #fff;
  border: 1px solid #000;
}
</style>
