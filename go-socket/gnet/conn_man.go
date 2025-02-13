package gnet

import (
	"errors"
	"fmt"
	"log"
	"sync"

	"bronya.com/go-socket/ignet"
)

type ConnMan struct {
	connDict map[uint32]ignet.IConn // 键: 连接 id, 值: 连接
	rwLock   sync.RWMutex           // 读写 connDict 时使用的 rwLock 读写锁
}

var connMan *ConnMan

// NewConnMan 创建 ConnMan 结构体变量, 单例
func NewConnMan() *ConnMan {
	if connMan == nil {
		connMan = &ConnMan{
			connDict: make(map[uint32]ignet.IConn),
			// rwLock:  sync.RWMutex{},
		}
	}
	return connMan
}

// AddConn 添加连接
func (connMan *ConnMan) AddConn(conn ignet.IConn) {
	connMan.rwLock.Lock() // ! Lock 加写锁
	defer connMan.rwLock.Unlock()
	// 向 connDict 中添加连接 conn
	connMan.connDict[conn.GetId()] = conn
	log.Printf("Connection [%v/%v], add connection", conn.GetId(), connMan.GetConnNum())
}

// DelConn 删除连接
func (connMan *ConnMan) DelConn(conn ignet.IConn) {
	connMan.rwLock.Lock() // ! Lock 加写锁
	defer connMan.rwLock.Unlock()
	// 从 connDict 中删除连接 conn
	delete(connMan.connDict, conn.GetId())
	log.Printf("Connection [%v/%v], remove connection", conn.GetId(), connMan.GetConnNum())
}

// GetConnById 通过 connId 获取连接
func (connMan *ConnMan) GetConnById(connId uint32) (ignet.IConn, error) {
	connMan.rwLock.RLock() // ! RLock 加读锁
	defer connMan.rwLock.RUnlock()
	if conn, ok := connMan.connDict[connId]; ok {
		return conn, nil
	}
	return nil, errors.New(fmt.Sprintf("Connection ID = %v not found", connId))
}

// GetConnNum 获取当前连接数
func (connMan *ConnMan) GetConnNum() int {
	return len(connMan.connDict)
}

// DelAllConn 停止并删除所有连接
func (connMan *ConnMan) DelAllConn() {
	connMan.rwLock.Lock() // ! Lock加写锁
	defer connMan.rwLock.Unlock()
	for connId, conn := range connMan.connDict {
		conn.Stop()                      // 停止连接
		delete(connMan.connDict, connId) // 删除连接
	}
	log.Printf("Remove all connections")
}
