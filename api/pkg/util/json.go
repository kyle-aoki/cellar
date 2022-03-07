package util

import "encoding/json"

func JSON(arg interface{}) []byte {
	bytes, err := json.Marshal(arg)
	MustExec(err)
	return bytes
}
