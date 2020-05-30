// server ***

const http = require('http');

//headers to allows CORS requests
const headers = { // problly wanna use this
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10
};

const port = 3000;

// TODO: Fill with strings of your favorite quotes :)
const quotes = [
  'Be yourself; everyone else is already taken.',
  'So many books, so little time.',
  "Be who you are and say what you feel, because those who mind don't matter, and those who matter don't mind.",
  'You only live once, but if you do it right, once is enough.',
  "If you tell the truth, you don't have to remember anything."
];

//Utility Function to return a random integer
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function getRandomQuote(arr, cb) {
  return quotes[getRandomInt(0, quotes.length - 1)];
}

const handleRequest = function(req, res) {
  console.log(`Endpoint: ${req.url} Method: ${req.method}`);

  // redirect users to /quote if they try to hit the homepage. This should already work, no changes needed
  if (req.url == '/') {
    console.log('redirecting');
    res.writeHead(301, {...headers, Location: `http://localhost:${port}/quote`}) //redirect to quote
    res.end('what???');
  }

  // TODO: GET ONE
  if ((req.url == '/quote/' || req.url == '/quote') && req.method == "GET") {
    //YOUR CODE HERE - node docs - headers, res.writehead, res.write, res.end - not returning with keyword return, built-in response methods
    // console.log('here') // send back quote from random and quote functions
    res.writeHead(200, headers);
    res.write(getRandomQuote(quotes[getRandomInt(0, quotes.length - 1)]));
    res.end();
  }
  // TODO: POST/CREATE
  else if ((req.url == '/quote/' || req.url == '/quote') && req.method == "POST") {
    //YOUR CODE HERE
    console.log('oh')
    let body = '';
    req.on('data', function(chunk) {
      body += chunk;
    });
    req.on('end', function() {
      res.writeHead(200, headers);
      res.end(body);
    });
  }

//CATCH ALL ROUTE
  else {
    res.writeHead(404,headers);
    res.end('Page not found');

  }
}

const server = http.createServer(handleRequest);
server.listen(port);

console.log('Server is running in the terminal!');
console.log(`Listening on http://localhost:${port}`);
