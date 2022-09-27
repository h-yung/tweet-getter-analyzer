module.exports = {
    getIndex: async (req, res) => {
      try {
        res.send('hi')
      } catch (err) {
        console.log(err);
      }
    }
}