require('dotenv').config();
const { OpenAI } = require("openai");
const { TwitterApi } = require('twitter-api-v2');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

async function generateTweet(prompt) {
  try {
    const response = await openai.completions.create({
      model: "text-davinci-003", // Use the desired model
      prompt: prompt,
      max_tokens: 50, // Adjust as needed
    });

    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error('Error generating tweet:', error);
    return null;
  }
}

async function postTweet(content) {
  try {
    await twitterClient.v2.tweet(content);
    console.log('Tweet posted successfully:', content);
  } catch (error) {
    console.error('Error posting tweet:', error);
  }
}

async function run() {
  const prompt = 'As a web developer/designer, I believe that...'; // Modify the prompt for web developers and designers
  const tweetContent = await generateTweet(prompt);
  if (tweetContent) {
    await postTweet(tweetContent);
  }
}

run();
