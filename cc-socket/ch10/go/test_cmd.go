package main

import (
	"bytes"
	"fmt"
	"log"
	"os/exec"
)

func main() {
	var cmd *exec.Cmd

	func() { //* 只执行命令, 不获取结果
		cmd = exec.Command("ls", "/usr")
		if err := cmd.Run(); // cmd.Run() 启动新进程, 执行 ls /usr
		err != nil {
			log.Fatalf("[ERROR] %s", err.Error())
		}
	}()

	fmt.Println("**************************************************")

	func() { //* 执行命令并获取结果, 不区分 stdout 和 stderr
		cmd = exec.Command("ls", "/usr")
		out, err := cmd.CombinedOutput() // cmd.CombinedOutput() 启动新进程, 执行 ls /usr
		if err != nil {
			fmt.Printf("[OUTPUT] %s\n", string(out))
			log.Fatalf("[ERROR] %s\n", err.Error())
		}
		fmt.Printf("[OUTPUT]\n%s\n", string(out))
	}()

	fmt.Println("**************************************************")

	func() { //* 执行命令并获取结果, 区分 stdout 和 stderr
		cmd = exec.Command("ls", "/usr/*.c")
		var stdout, stderr bytes.Buffer
		cmd.Stdout = &stdout // cmd.Stdout = os.Stdout
		cmd.Stderr = &stderr // cmd.Stderr = os.Stderr
		err := cmd.Run()     // cmd.Run() 启动新进程, 执行 ls /usr/*.c
		fmt.Printf("[OUTPUT] %s\n[ERROR] %s\n", cmd.Stdout, cmd.Stderr)
		if err != nil {
			log.Fatalf("[ERROR] %s\n", err.Error())
		}
	}()
}
