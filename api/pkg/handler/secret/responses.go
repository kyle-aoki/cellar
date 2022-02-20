package secret

import (
	"api/pkg/util"
	"encoding/json"
)

type ErrorMessage struct {
	Message string `json:"message"`
}

func AlreadyExists() string {
	return JSON(ErrorMessage{Message: "Object already exists."})
}

func JSON(a any) string {
	json, err := json.Marshal(a)
	util.MustExec(err)
	return string(json)
}
