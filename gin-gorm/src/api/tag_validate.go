package api

import (
	"github.com/gin-gonic/gin/binding"
	"github.com/go-playground/validator/v10"
	"strings"
)

// UseTagValidator 使用 tag 验证器
//
//	type StructName struct {
//	    FieldName string `binding:"not_admin"`
//	}
//
// ! 类型断言 typeX, ok := x.(Type); ok 表示类型断言是否成功
func UseTagValidator() {
	if tagValidator, ok /* 类型断言是否成功 */ := binding.Validator.Engine().(*validator.Validate); ok {
		tagValidator.RegisterValidation("not_admin" /* 结构体标签名 */, func(fieldLevel validator.FieldLevel) bool {
			if fieldName, ok /* 类型断言是否成功 */ := fieldLevel.Field().Interface().(string); ok {
				// fieldName 不为空，且不以 admin 开头
				if fieldName != "" && strings.Index(fieldName, "admin") != 0 {
					return true
				}
			}
			return false
		})
	}
}
