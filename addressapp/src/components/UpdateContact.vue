<template>
  <ContactForm :mode="'update'" :contact="contact"/>
</template>
<script>
import ContactForm from "./ContactForm";

export default {
  name: "UpdateContact",
  components: { ContactForm },
  props: ["contact"]
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
