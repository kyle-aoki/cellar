package response

import (
	"api/pkg/util"
	"encoding/json"
)

func Ok(data any) []byte {
	j, err := json.Marshal(data)
	util.MustExec(err)
	return j
}
