package dao

import (
	"bronya.com/go-proj/src/data"
	"bronya.com/go-proj/src/dto"
	"bronya.com/go-proj/src/global"
	"errors"
	"gorm.io/gorm"
)

// ! ==================== DAO, Data Access Object 数据访问对象 ====================

type UserDao struct {
	database *gorm.DB
}

// ! UserDao 单例
var userDao *UserDao

func NewUserDao() *UserDao {
	if userDao == nil {
		userDao = &UserDao{
			database: global.Database,
		}
	}
	return userDao
}

// InsertUser
// ! Save
func (userDao *UserDao) InsertUser(userInsertDto *dto.UserInsertDto) error {
	var user data.User
	userInsertDto.AssignToUser(&user)
	//? Save is a combination function.
	//? If save value does not contain primary key, it will execute Create, otherwise it will execute Update (with all fields).
	//? Don’t use Save with Model, it’s an Undefined Behavior.
	err := userDao.database.Save(&user).Error
	if err == nil {
		userInsertDto.Id = user.ID  //! 接收 gorm 生成的主键 Id
		userInsertDto.Password = "" //! json 编解码时忽略该字段
	}
	return err
}

// SelectUserByUsername
// ! Where, First
func (userDao *UserDao) SelectUserByUsername(username string) (data.User, error) {
	var user data.User
	err := userDao.database.
		// Model(&data.User{}).
		Where("username = ?", username).First(&user).Error
	if err != nil {
		return user, err
	}
	if user.ID == 0 {
		return user, errors.New("username doesn't exist")
	}
	return user, nil
}

// SelectUserById
// ! First
func (userDao *UserDao) SelectUserById(id uint) (data.User, error) {
	var user data.User
	//* Select with primary key
	err := userDao.database.
		// Model(&data.User{}).
		First(&user, id).Error
	return user, err
}

// SelectPaginatedUsers
// ! Scopes, Find, Offset, Limit, Count
func (userDao *UserDao) SelectPaginatedUsers(paginateDto *dto.PaginateDto) ([]data.User, int64, error) {
	var userArr []data.User //! 接收分页查询结果
	var total int64         //! 接收总记录数
	err := userDao.database.
		// Model(&data.User{}).
		Scopes(GetPaginateFunc(paginateDto)). //! 传递分页函数
		Find(&userArr).                       //! 分页查询
		Offset(-1).Limit(-1).                 //! 取消分页查询条件
		Count(&total).Error                   //! 总记录数
	return userArr, total, err
}

// UpdateUser
// ! Save
func (userDao *UserDao) UpdateUser(userUpdateDto *dto.UserUpdateDto) error {
	user, err := userDao.SelectUserById(userUpdateDto.Id)
	if err != nil {
		return err
	}
	userUpdateDto.AssignToUser(&user)
	//? Save is a combination function.
	//? If save value does not contain primary key, it will execute Create, otherwise it will execute Update (with all fields).
	//! Don’t use Save with Model, it’s an Undefined Behavior.
	return userDao.database.Save(&user).Error
}

// DeleteUserById
// ! Where, Delete
func (userDao *UserDao) DeleteUserById(id uint) (data.User, error) {
	var user data.User
	err := userDao.database.
		// Model(&data.User{}).
		Where("id = ?", id).
		Delete(&user).Error
	//* Delete with primary key
	//// err := userDao.database.Delete(&user, id).Error
	return user, err
}
