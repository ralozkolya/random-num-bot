var http = require('https');
var Twitter = require('twitter');
var env = process.env;

function check() {

    if(env.KEY
        && env.SECRET
        && env.TOKEN
        && env.TOKEN_SECRET
        && env.RANDOM_TOKEN) {
        getRandomNumber(postToTwitter);
        return;
    }

    throw new Error('Parameters KEY, SECRET, TOKEN, TOKEN_SECRET and RANDOM_TOKEN are required');
}

function getRandomNumber(callback) {
    var options = {
        hostname: 'api.random.org',
        path: '/json-rpc/2/invoke',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    };

    var request = http.request(options, function(response){
        var data = '';

        response.on('data', function(chunk){
            data += chunk;
        });

        response.on('end', function(){
            try {
                data = JSON.parse(data);
                if(callback) {
                    try {
                        var number = data.result.random.data[0];
                        callback(number);
                    }

                    catch(e) {
                        console.log('Random.org API returned unexpected value: ' + e);
                    }
                }
            }

            catch(e) {
                console.log('Invalid JSON received');
            }
        });

    });

    request.on('error', function(error){
        console.log('Random.org API request failed: ' + e);
    });

    var requestData = {
        jsonrpc: '2.0',
        id: 1, //We won't really need this identifier
        method: 'generateIntegers',
        params: {
            apiKey: env.RANDOM_TOKEN,
            n: 1, //How many numbers we need
            min: 1,
            max: 100,
        },
    };

    request.write(JSON.stringify(requestData));
    request.end();
}

function postToTwitter(number) {
    var client = new Twitter({
        consumer_key: env.KEY,
        consumer_secret: env.SECRET,
        access_token_key: env.TOKEN,
        access_token_secret: env.TOKEN_SECRET,
    });

    client.post('statuses/update.json', {status: number}, function(error){
        if(error)
            console.log('Twitter API returned error: ' + error);

        else
            console.log('Tweeted number: ' + number);
    })
};

check();