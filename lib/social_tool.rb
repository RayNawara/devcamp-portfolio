module SocialTool
  def self.twitter_search
    client = Twitter::REST::Client.new do |config|
      config.consumer_key        = Rails.application.credentials.twitter[:"API key"]
      config.consumer_secret     = Rails.application.credentials.twitter[:"API secret key"]
      config.access_token        = Rails.application.credentials.twitter[:"Access token"]
      config.access_token_secret = Rails.application.credentials.twitter[:"Access token secret"]
    end

    client.search("#rubyonrails", result_type: "recent").take(10).collect do |tweet|
      "#{tweet.user.screen_name}: #{tweet.text}"
    end
  end
  
end