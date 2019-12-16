<template>
    <div class="login w-full flex justify-between bg-img h-screen">
        <div class="z-10 w-full flex-col">
        <NavBar></NavBar>
            <h2 style="text-align:center">Sign In</h2>
            <div style="margin-left: 550px">
            <input v-model="email" type="email" placeholder="Email"><br>
            <input v-model="password" type="password" placeholder="Password"><br>
            <button @click="login" style="margin-left: 100px;"><u>Sign In</u></button>
            </div>
            <p style="text-align:center">
                or Sign In with Google <br><br>
                <button @click="socialLogin" class="social-button" style="margin-left: 40px;">
                    <img alt="Google Logo" src="../assets/google-logo.png">
                </button>
            </p>
            <p style="text-align:center">Don't have an account? <router-link to="/register"><u>Register</u></router-link></p>
            <p style="text-align:center"> {{ notif }} </p>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase';
import NavBar from '@/components/NavBar';

export default {
  name: 'login',
  components: {
    NavBar,
  },
  data() {
    return {
      email: '',
      password: '',
      notif: '',
    };
  },
  methods: {
    login() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          this.$router.replace('home');
        })
        .catch((err) => {
          this.notif = err;
        });
    },
    socialLogin() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider)
        .then((result) => {
          this.$router.replace('home');
        })
        .catch((err) => {
          this.notif = err;
        });
    },
  },
};
</script>

<style scoped>
    .bg-img {
    background-image: url('https://i.pinimg.com/originals/2c/ae/0b/2cae0bc2aa1fb7ea5d83f3fcd71df28c.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    }
    .social-button {
        width: 50px
    }
    .login {
        margin-top: 40px;
        display: flex;
        justify-content: center;
    }
    input {
        margin: 10px 0;
        padding: 15px;
    }
    button {
        cursor: pointer;
    }
    p {
        margin-top: 40px;
        font-size: 13px;
    }
</style>
