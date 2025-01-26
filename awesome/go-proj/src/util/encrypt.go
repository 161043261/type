package util

import "golang.org/x/crypto/bcrypt"

func Encrypt(password string) (hashStr string, err error) {
	hashByteArr, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.MinCost)
	if err != nil {
		return "", err
	}
	hashStr = string(hashByteArr)
	return hashStr, err
}

func IsEquivalent(hashStr, password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hashStr), []byte(password))
	return err == nil
}
