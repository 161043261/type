package dao

import (
	"bronya.com/go-proj/src/dto"
	"gorm.io/gorm"
)

type PaginateFunc func(*gorm.DB) *gorm.DB

// GetPaginateFunc 获取分页函数
func GetPaginateFunc(paginateDto *dto.PaginateDto) PaginateFunc {
	return func(db *gorm.DB) *gorm.DB {
		return db.Offset((paginateDto.GetPage() - 1) * paginateDto.Limit).Limit(paginateDto.GetLimit())
	}
}
