package src

import "sync"

type Singleton struct {
	money int
}

var instance *Singleton
var mut sync.Mutex

func (singleton *Singleton) GetMoney() int {
	singleton.money++
	return singleton.money
}

// GetInstance 使用双重检查锁实现单例模式
func GetInstance() *Singleton {
	if instance == nil {
		mut.Lock()
		defer mut.Unlock()
		if instance == nil {
			instance = &Singleton{
				money: 10_000,
			}
		}
	}
	return instance
}
