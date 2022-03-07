package response

import (
	"api/pkg/util"
	"encoding/json"

	"github.com/gofiber/fiber/v2"
)

func Error(code int, message string) fiber.Error {
	panic(fiber.Error{Code: code, Message: message})
}

func HandleError() {
	if r := recover(); r != nil {
		j, err := json.Marshal(r)
		util.MustExec(err)
		panic(string(j))
	}
}
