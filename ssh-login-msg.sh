#!/usr/bin/env bash
#set -vux
#
# ssh-login-msg
# send message on ssh login via messenger bot
# © Olivetti 2020-2024
#
# dependencies: curl
# ipinfo.io?token=: no use of token

version="v1.0"

#SSH_CLIENT="23.123.123.123" # testing purpose

[[ -n "${SSH_CLIENT}" ]] && {

 isodate=$(date +'%FT%T%z')
 logfile=~/"${0##*/}.log" # ~/ssh-login-msg.log

  ip_srv=$(hostname -I		| awk '{print $1}')
  ip_usr=$(echo "${SSH_CLIENT}"	| awk '{print $1}')

  ipinfo=$(curl -s "https://ipinfo.io/${ip_usr}")

  ipinfo=$(echo "${isodate}" && echo "${ipinfo}" | sed -e '/^[{}]/d' -e 's/^  //' -e '/readme.*missingauth/d' -e 's/"//g' -e 's/,$//g')
     log=$(echo $(echo "${ipinfo}"))
     echo "${log}" >>"${logfile}"

 send_telegram() {
  # telegram
  # telegram_bot_token="" # not used anymore
  # telegram_chat_id=""   # not used anymore
  # telegram bot credentials in ~/.ssh-login-msg.env # use chmod 600
  source ~/".${0##*/}.env"
  [[ -n "${telegram_bot_token}" ]] && [[ -n "${telegram_chat_id}" ]]			&& \
	telegram_url="https://api.telegram.org/bot${telegram_bot_token}/sendMessage"	|| \
		{ echo "Error: Telegram - No token/chat_id" && exit 1; }

  ip_padding() { echo "${1}" | sed 's/[0-9]\{1,\}/00&/g;s/0*\([0-9]\{3,\}\)/\1/g'; }
  ip_srv_pad=$(ip_padding "${ip_srv}")
  ip_usr_pad=$(ip_padding "${ip_usr}")

  url_encode() { echo "${1}" | sed -e 's/+/%2b/g' -e 's/&/%26/g' -e 's/</%3c/g' -e 's/>/%3e/g'; }
      ipinfo=$(url_encode "${ipinfo}")
     isodate=$(url_encode "${isodate}")

  msg="<pre>SSH Login</pre><code>Date: ${isodate}%0aUser: ${USER}@${HOSTNAME}%0aHost: ${ip_srv_pad}%0aFrom: ${ip_usr_pad}</code><pre>${ipinfo}</pre>"

  curl -s --connect-timeout 10 -d "chat_id=${telegram_chat_id}&disable_web_page_preview=1&parse_mode=HTML&text=${msg}" "${telegram_url}" >/dev/null
 }

 send_telegram

}
