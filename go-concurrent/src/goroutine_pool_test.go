package src

import (
	"fmt"
	"testing"
)

// 工作: 计算 id^2
type Work struct {
	id int // 工作的 id
}

type Res struct {
	work *Work
	pow  int // id^id
}

// go gopher -run TestGoroutinePool -v
func TestGoroutinePool(t *testing.T) {
	workChan := make(chan *Work, 128)
	resChan := make(chan *Res, 128)
	// 启动 3 个协程的协程池
	startPool(3, workChan, resChan)

	go func(resChan chan *Res) {
		for res := range resChan {
			fmt.Printf("workId: %d res: %d\n", res.work.id, res.pow)
		}
	}(resChan)

	for id := 0; id < 30; id++ {
		// work := Work{id}
		work := Work{id: id}
		workChan <- &work
	}
	// close(workChan)

	//! 没有协程从没有新数据的空通道 workChan 中读数据
	//! 因此 workChan 未关闭不会导致阻塞/死锁
}

func startPool(size int, workChan chan *Work, resChan chan *Res) {
	for i := 0; i < size; i++ {
		go func(workChan chan *Work, resChan chan *Res) {
			for work := range workChan {
				pow := work.id * work.id
				// resChan <- &Res{work: work, pow: pow}
				resChan <- &Res{work, pow}
			}
		}(workChan, resChan)
	}
}
