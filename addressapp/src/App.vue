<template>
  <div id="app">
    <ContactList :contactList="contactList"/>
    <component :is="currentView" :contact="contact"></component>
  </div>
</template>

<script>
import EventBus from "./EventBus.js";
// import axios from "axios";
import ContactList from "./components/ContactList";
import AddContact from "./components/AddContact";
import UpdateContact from "./components/UpdateContact";
export default {
  name: "app",
  components: {
    ContactList,
    AddContact,
    UpdateContact
  },
  data() {
    return {
      currentView: null,
      contactList: {
        pageno: 1,
        pagesize: 5,
        totalcount: 0,
        contacts: []
      },
      contact: {
        no: 0,
        name: "",
        address: "",
        tel: "",
        photo: ""
      }
    };
  },
  mounted() {
    this.fetchContact();

    EventBus.$on("addContactView", () => (this.currentView = "AddContact"));
    EventBus.$on("addContact", contact => this.addContact(contact));
    EventBus.$on("updateContact", no => {
      // debugger;
      this.currentView = "updateContact";
      this.updateContact(no);
    });
    EventBus.$on("cancelForm", () => (this.currentView = null));
    EventBus.$on("updateContactSubmit", contact => this.updateSubmit(contact));
    EventBus.$on("delContact", no => this.delContact(no));
    EventBus.$on("changePage", no => this.changePage(no));
  },
  methods: {
    changedPage() {
      this.contactList.pageno = 1;
      this.fetchContact();
    },
    fetchContact() {
      this.$axios
        .get("/api/contacts", {
          params: {
            pageno: 1,
            pagesize: 5
          }
        })
        .then(res => {
          console.log(res.data);
          this.contactList = res.data;
        })
        .catch(err => console.log("fetchContact Err: ", err));
    },
    addContact(contact) {
      // debugger;
      // console.log(contact);
      this.$axios
        .post("/api/contacts", contact)
        .then(res => {
          console.log(res);
          if (res.data.status === "success") {
            this.changedPage();
            this.currentView = null;
          }
        })
        .catch(err => console.log("addcontact Err: ", err));
    },
    updateContact(no) {
      this.$axios
        .get(`/api/contacts/${no}`)
        .then(res => {
          console.log(res);
          this.contact = res.data;
        })
        .catch(err => console.log("updateContact Err: ", err));
    },
    updateSubmit(contact) {
      this.$axios
        .put("/api/contacts/${no}".replace("${no}", contact.no), contact)
        .then(res => {
          this.fetchContact();
          this.currentView = null;
        })
        .catch(err => console.log("updateSubmit Err: ", err));
    },
    delContact(no) {
      this.$axios
        .delete("/api/contacts/${no}".replace("${no}", no))
        .then(res => {
          console.log(res);
          this.changedPage();
        })
        .catch(err => console.log("delContact Err: ", err));
    },
    changePage(no) {
      this.contactList.pageno = no;
      this.$axios
        .get(`/api/contacts`, {
          params: {
            pageno: no
          }
        })
        .then(res => (this.contactList.contacts = res.data.contacts))
        .catch(err => console.log("changePage Err: ", err));
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
