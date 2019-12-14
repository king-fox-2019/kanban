<template>
  <div class="register w-full flex bg-img h-screen">
        <div class="z-10 w-full flex-col">
        <NavBar></NavBar>
        <h2 style="text-align:center">Register</h2>
        <div style="margin-left: 550px">
        <input v-model="email" type="email" placeholder="Email"><br>
        <input v-model="password" type="password" placeholder="Password"><br>
        <button @click="signUp" style="margin-left: 100px;"><u>Sign Up</u></button>
        </div>
        <p style="text-align:center">Already have an account? <router-link to="/"><u>Sign In</u></router-link></p>
        <p style="text-align:center"> {{ notif }} </p>
      </div>
  </div>
</template>

<script>
import firebase from 'firebase';
import NavBar from '@/components/NavBar';

export default {
  name: 'SignUp',
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
    signUp() {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          this.notif = 'succes create user';
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
    .register {
        margin-top: 40px;
        display: flex;
        justify-content: center;
    }
    input {
        margin: 10px 0;
        padding: 15px;
    }
    button {
        margin-left: 100px ;
        cursor: pointer;
    }
    p {
        margin-top: 40px;
        font-size: 13px;
    }

</style>
