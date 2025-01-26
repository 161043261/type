package main

import (
	"fmt"
	"net"
	"os"
)

func main() {
	if len(os.Args) != 3 {
		fmt.Fprintf(os.Stderr, "Usage: %v <domain> <addrStr>\n", os.Args[0])
		os.Exit(1)
	}

	domain := os.Args[1]
	addrStr := os.Args[2]

	fmt.Printf("net.LookupHost(%v)\n", domain)
	names, err := net.LookupHost(domain)
	if err != nil {
		fmt.Fprintf(os.Stderr, "[ERROR] %s\n", err.Error())
	}
	for idx, addr := range names {
		fmt.Printf("addrs[%v] = %v\n", idx, addr)
	}

	fmt.Printf("\nnet.LookupAddr(%v)\n", addrStr)
	names, err = net.LookupAddr(addrStr)
	if err != nil {
		fmt.Fprintf(os.Stderr, "[ERROR] %s\n", err.Error())
	}
	for idx, host := range names {
		fmt.Printf("hosts[%v] = %v\n", idx, host)
	}
}
