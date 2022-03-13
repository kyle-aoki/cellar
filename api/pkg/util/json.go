package util

import "encoding/json"

func JSON(arg interface{}) []byte {
	bytes, err := json.Marshal(arg)
	MustExec(err)
	return bytes
}

func ErrorJson(err error) []byte {
	errMsg := make(map[string]string)
	errMsg["error"] = err.Error()
	return JSON(errMsg)
}
