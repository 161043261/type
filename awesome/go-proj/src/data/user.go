package data

import (
	"bronya.com/go-proj/src/util"
	"gorm.io/gorm"
)

// ! ==================== Data 数据对象 ====================

type User struct {
	//* Id
	//* CreatedAt 创建时间
	//* UpdatedAt 更新时间
	//* DeletedAt 删除时间; 是否删除
	gorm.Model
	Username string `json:"username" gorm:"size:64;not null"`  // 用户名: 非空
	Password string `json:"-"        gorm:"size:255;not null"` // 密码: 非空; json 编解码时忽略该字段
	Name     string `json:"name"     gorm:"size:128"`          // 姓名
	Phone    string `json:"phone"    gorm:"size:11"`           // 电话
	Email    string `json:"email"    gorm:"size:128"`          // 邮箱
	Avatar   string `json:"avatar"   gorm:"size:255"`          // 头像
}

func (user *User) BeforeCreate(db *gorm.DB) error {
	hashStr, err := util.Encrypt(user.Password)
	if err == nil {
		user.Password = hashStr
	}
	return err
}
