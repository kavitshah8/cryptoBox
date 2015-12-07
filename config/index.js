module.exports = {

  development : {
    PORT: process.env.port || 3000
  },

  production:{
    PORT: process.env.port || 80
  }
}
