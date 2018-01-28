/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  res.render('app', {
    title: 'Home'
  });
};

exports.loadPoll = (req, res) => {
  res.render('voting', {
    title: 'Voting',
    id: req.params.id
  });
}
