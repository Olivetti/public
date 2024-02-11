# ssh-login-msg.sh v1.0
**ssh-login-msg.sh** is a ssh login message tool & logger (uses telegram messenger)

### Dependencies
- [curl](https://github.com/curl/curl)

### Recommended

- telegram bot
- get bot token	      In telegram.app: go to **@BotFather**, enter `/mybots`, press `@your-bot-name`, press `API Token`.
- get chat id	      In telegram.app: `/start` a »trustworthy« bot like **@Olivettis_Bot** or **@MissRose_bot** and send `/id`.

### Installation
1. [Download & unpack/save ](https://github.com/Olivetti/public/raw/master/ssh-login-msg.sh)
.  [(cli)                  ](#) `curl -LO "https://github.com/Olivetti/public/raw/master/ssh-login-msg.sh"`
2. Copy to /etc/profile.d/ `cp ssh-login-msg.sh /etc/profile.d/`
3. Create env file	   `echo -e "# telegram\ntelegram_bot_token=\"\"\ntelegram_chat_id=\"\"" > ~/.ssh-login-msg.sh.env`
4. Change file mode	   `chmod 600 ~/.ssh-login-msg.sh.env`
5. Edit credentials	   `nano ~/.ssh-login-msg.sh.env`

### Usage
- Log into your host and see

## Contributing
Issues can be made in [**GitHub** project](https://github.com/Olivetti/public)

## Contact
[Mastodon](https://mastodon.social/@Olivetti)
