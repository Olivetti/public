#!/usr/bin/env bash
#set -vux
#
# ssh-login-msg.sh
# send message on ssh login via messenger bot
# © Olivetti 2020-2024
#
# dependencies: curl
#
# mostly we were sourced (${0} -> ${BASH_SOURCE} / exit -> return)

version="v1.0"

#SSH_CLIENT="23.123.123.123" # testing purpose

[[ -n "${SSH_CLIENT}" ]] && {

   [[ -n "${BASH_SOURCE}" ]] && myname="${BASH_SOURCE[0]##*/}" || myname="${0##*/}"

   isodate=$(date +'%FT%T%z')
   logfile=~/"${myname}.log" # ~/ssh-login-msg.sh.log

    ip_srv=$(hostname -I		| awk '{print $1}')
    ip_usr=$(echo "${SSH_CLIENT}"	| awk '{print $1}')

 tokenfile=~/.config/ipinfo/config.json
 [[ -f "${tokenfile}" ]] && token=$(sed -Ee 's/.*,"token":"(.*)",.*/\1/' "${tokenfile}")

    ipinfo=$(curl -s "https://ipinfo.io/${ip_usr}?token=${token}")

    ipinfo=$(echo "${isodate}" && echo "${ipinfo}" | sed -e '/^[{}]/d' -e 's/^  //' -e '/readme.*missingauth/d' -e 's/"//g' -e 's/,$//g')
       log=$(echo $(echo "${ipinfo}"))
       echo "${log}" >>"${logfile}" # writing logfile

 send_telegram() {
  # telegram
  # telegram_bot_token="" # we use env file
  # telegram_chat_id=""   # we use env file
  # telegram bot credentials in ~/.ssh-login-msg.sh.env # use chmod 600

  _error() { echo "Error: Telegram - ${1}" && return; }

  [[ -f ~/".${myname}.env" ]] && source ~/".${myname}.env" || _error "No env file"

  [[ -n "${telegram_bot_token}" ]] && [[ -n "${telegram_chat_id}" ]]			&& \
	telegram_url="https://api.telegram.org/bot${telegram_bot_token}/sendMessage"	|| \
		_error "No token/chat_id"

  ip_padding() { echo "${1}" | sed 's/[0-9]\{1,\}/00&/g;s/0*\([0-9]\{3,\}\)/\1/g'; }
  ip_srv_pad=$(ip_padding "${ip_srv}")
  ip_usr_pad=$(ip_padding "${ip_usr}")

  url_encode() { echo "${1}" | sed -e 's/+/%2b/g' -e 's/&/%26/g' -e 's/</%3c/g' -e 's/>/%3e/g'; }
     isodate=$(url_encode "${isodate}")
      ipinfo=$(url_encode "${ipinfo}")

  msg="<pre>SSH Login ${USER}@${HOSTNAME}</pre><code>Date: ${isodate}%0aUser: ${USER}@${HOSTNAME}%0aHost: ${ip_srv_pad}%0aFrom: ${ip_usr_pad}</code> \
	<pre>${ipinfo}</pre>"

  curl -s --connect-timeout 10 -d "chat_id=${telegram_chat_id}&disable_web_page_preview=1&parse_mode=HTML&text=${msg}" \
	"${telegram_url}" >/dev/null
 }

 send_telegram &

}
