package ignet

type IConnMan interface {
	// AddConn 添加连接
	AddConn(conn IConn)

	// DelConn 删除连接
	DelConn(conn IConn)

	// GetConnById 通过 connId 获取连接
	GetConnById(connId uint32) (IConn, error)

	// GetConnNum 获取当前连接数
	GetConnNum() int

	// DelAllConn 停止并删除所有连接
	DelAllConn()
}
