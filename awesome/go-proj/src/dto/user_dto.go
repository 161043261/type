package dto

import (
	"bronya.com/go-proj/src/data"
)

//! ==================== DTO, Data Transfer Object 数据传输对象 ====================

type LoginDto struct {
	//* json:"username"
	//! username  - json 中的字段名为 username
	//* form:"username"
	//! username  - HTML 表单中, input 标签的 id 为 username
	//* binding:"required,not_admin"
	//! required  - 必填字段, 绑定时如果 name 为空则报错
	//! not_admin - tag 验证器 ../../data/tag_validate.go
	Username string `json:"username" form:"username" binding:"required,not_admin"`
	Password string `json:"password" form:"password" binding:"required"`
}

type UserInsertDto struct {
	Id       uint   //! 接收 gorm 生成的主键 Id
	Username string `json:"username"           form:"username" binding:"required"`
	Password string `json:"password,omitempty" form:"password" binding:"required"`
	Name     string `json:"name"               form:"name"`
	Phone    string `json:"phone"              form:"phone"`
	Email    string `json:"email"              form:"email"`
	Avatar   string `json:"avatar"`
}

func (userInsertDto *UserInsertDto) AssignToUser(user *data.User) {
	user.Username = userInsertDto.Username
	user.Password = userInsertDto.Password
	//! 使用 gorm 钩子
	// user.Password, _ = util.Encrypt(userInsertDto.Password)
	user.Name = userInsertDto.Name
	user.Phone = userInsertDto.Phone
	user.Email = userInsertDto.Email
	user.Avatar = userInsertDto.Avatar
}

type UserUpdateDto struct {
	Id       uint   `json:"id"       form:"id"       uri:"id" binding:"required"`
	Username string `json:"username" form:"username"`
	Name     string `json:"name"     form:"name"`
	Phone    string `json:"phone"    form:"phone"`
	Email    string `json:"email"    form:"email"`
}

func (userUpdateDto *UserUpdateDto) AssignToUser(user *data.User) {
	user.ID = userUpdateDto.Id
	user.Username = userUpdateDto.Username
	user.Name = userUpdateDto.Name
	user.Phone = userUpdateDto.Phone
	user.Email = userUpdateDto.Email
}
