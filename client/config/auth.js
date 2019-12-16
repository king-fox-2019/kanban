const firebase = require('firebase')

require("firebase/auth");

const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

module.exports = {
    auth, provider
}