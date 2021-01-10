export default (req, res) => {
  console.log('Handled');
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;
  res.end(JSON.stringify({ text: 'pong' }));
};
