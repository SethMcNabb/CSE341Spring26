function getName(req, res) {
  res.json({
    message: 'CSE 341 API is running',
  });
}

module.exports = {
  getName,
};