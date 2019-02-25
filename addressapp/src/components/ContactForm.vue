<template>
  <div class="modal" @keyup.esc="cancelForm">
    <h2>{{headerText}}</h2>
    <p v-if="mode === 'update'">
      <em>no</em>
      <span>{{contact.no}}</span>
    </p>
    <p>
      <label for="name">name</label>
      <input ref="name" id="name" type="text" v-model="contact.name">
    </p>
    <p>
      <label for="tel">tel</label>
      <input id="tel" type="text" v-model="contact.tel">
    </p>
    <p>
      <label for="address">address</label>
      <input id="address" type="text" v-model="contact.address">
    </p>
    <div>
      <button type="button" @click="addSubmit">{{btnText}}</button>
      <button type="button" @click="cancelForm">취소</button>
    </div>
  </div>
</template>
<script>
import EventBus from "../EventBus.js";
export default {
  name: "ContactForm",
  props: {
    mode: {
      type: String,
      default: "add"
    },
    contact: {
      type: Object,
      default() {
        return { no: 0, name: "", tel: "", address: "", photo: "" };
      }
    }
  },
  computed: {
    headerText() {
      return this.mode === "update" ? "Update Contact" : "Add Contact";
    },
    btnText() {
      return this.mode === "update" ? "수정" : "추가";
    }
  },
  mounted() {
    this.$refs.name.focus();
  },
  methods: {
    addSubmit() {
      // debugger;
      // console.log(this.contact);
      this.mode === "add"
        ? EventBus.$emit("addContact", this.contact)
        : EventBus.$emit("updateContactSubmit", this.contact);
    },
    cancelForm() {
      // console.log(this.contact);
      EventBus.$emit("cancelForm");
    }
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
