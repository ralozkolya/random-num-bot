## **Twitter Random Number Bot**

Twitter bot that pulls random number from Random.org (in a range of 1 to 100) and tweets it on Twitter. It's configured to do so everyday.

It expects these environmental variables to be defined:

    Random.org:
        RANDOM_TOKEN: Random.org API access token

    Twitter
        KEY: Twitter app consumer key
        SECRET: Twitter app consumer secret
        TOKEN: access token of an account on which tweet is gonna end up
        TOKEN_SECRET: access token secret of an account on which tweet is gonna end up

### **Dependencies:**
Twitter library by desmondmorris: https://www.npmjs.com/package/twitter

### **Example:**
This bot currently posts to this Twiter account: https://twitter.com/spam_random_num