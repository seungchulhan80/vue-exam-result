<template>
  <div>
    <h2>list</h2>
    <p>
      <button type="button" @click="addContact">new address</button>
    </p>
    <div>
      <table>
        <thead>
          <tr>
            <th scope="col">name</th>
            <th scope="col">address</th>
            <th scope="col">tel</th>
            <th scope="col">photo</th>
            <th scope="col">mod / del</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="contact in contactList.contacts" :key="contact.no">
            <td>{{ contact.name }}</td>
            <td>{{ contact.address }}</td>
            <td>{{ contact.tel }}</td>
            <td>
              <img :src="contact.photo" alt>
            </td>
            <td>
              <button type="button" @click="updateContact(contact.no)">수정</button>
              <button type="button" @click="delContact(contact.no)">삭제</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Paginate
      ref="pagebuttons"
      :page-count="totalCount"
      :page-range="5"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :container-class="'pagination'"
      :page-class="'page-item'"
      :click-handler="changePage"
    ></Paginate>
  </div>
</template>
<script>
import EventBus from "../EventBus.js";
import Paginate from "vuejs-paginate";
export default {
  name: "ContactList",
  props: ["contactList"],
  components: {
    Paginate
  },
  computed: {
    totalCount() {
      return Math.floor(
        this.contactList.totalcount / this.contactList.pagesize
      );
    }
  },
  methods: {
    addContact() {
      // debugger;
      EventBus.$emit("addContactView");
    },
    updateContact(no) {
      EventBus.$emit("updateContact", no);
    },
    delContact(no) {
      if (confirm("really?")) {
        EventBus.$emit("delContact", no);
      }
    },
    changePage(no) {
      EventBus.$emit("changePage", no);
    }
  }
};
</script>
<style lang="scss" scoped>
table img {
  width: 100px;
}
</style>
