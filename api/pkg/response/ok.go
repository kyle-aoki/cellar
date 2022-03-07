package response

import (
	"api/pkg/util"
	"encoding/json"
)

type OkResponse struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
	Data    any    `json:"data"`
}

func Ok(message string, data any) []byte {
	or := OkResponse{
		Code:    200,
		Message: message,
		Data:    data,
	}
	j, err := json.Marshal(or)
	util.MustExec(err)
	return j
}
