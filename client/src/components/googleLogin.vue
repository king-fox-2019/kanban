<template>
  <div style="display: flex; justify-content: center; cursor: pointer">
    <br />
    <div
      class="g-signin-button"
      :params="googleSignInParams"
      @click="googleAuth"
      style="display: flex; justify-content: center; cursor: pointer; aligin-items:center"
    >
      sign-in with
      <br />
      <img
        src="https://img.icons8.com/plasticine/100/000000/google-logo.png"
        alt="Google"
        width="30"
      />
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { auth, provider } from "../../config/auth";
import firebase from "firebase";

export default {
  data() {
    return {
      /**
       * The Auth2 parameters, as seen on
       * https://developers.google.com/identity/sign-in/web/reference#gapiauth2initparams.
       * As the very least, a valid client_id must present.
       * @type {Object}
       */
      googleSignInParams: {
        client_id:
          "967359795205-vt6fs7mqktkq3vgrh09okt8n94f4qur7.apps.googleusercontent.com"
      }
    };
  },
  components: {
    // g-signin-button
  },
  methods: {
    googleLogin() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          this.$router.replace("/");
        })
        .catch(err => {
          this.notif = err;
        });
    },
    googleAuth() {
      auth
        .signInWithPopup(provider)
        .then(result => {
          let token = result.credential.accessToken;
          let user = result.user;
          console.log(user);
          localStorage.setItem("token", user.uid);
          localStorage.setItem("user", user.displayName);
          let zzz = user.displayName;
          Swal.fire("Welcome", `have a nice day ${zzz}`, "success");
          this.$router.push({ path: "/" });
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }
};
</script>

<style>
.g-signin-button {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  color: rgb(93, 90, 90);
}
</style>