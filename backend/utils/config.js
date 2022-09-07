require('dotenv').config()

const CLIENT_SECRET = process.env.CLIENT_SECRET
const CLIENT_ID = process.env.CLIENT_ID
const ACCESS_TOKEN = process.env.ACCESS_TOKEN
const PORT = 3004
module.exports = {
    CLIENT_ID, CLIENT_SECRET, ACCESS_TOKEN, PORT
}