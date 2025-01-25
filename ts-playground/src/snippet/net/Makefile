.PHONY: all clean

all:
	deno compile -A -o ./proxy  ./udp_proxy.ts
	deno compile -A -o ./client ./udp_client.ts

clean:
	rm -f ./proxy
	rm -f ./client
