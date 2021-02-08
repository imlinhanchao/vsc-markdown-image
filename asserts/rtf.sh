command -v xclip >/dev/null 2>&1 || { echo >&1 "no xclip"; exit 1; }

xclip -selection clipboard -o -t text/html
