package cfg

import (
	"api/pkg/util"
	"encoding/json"
	"io/ioutil"
)

var Vars ConfigVars

func Init() {
	bytes, err := ioutil.ReadFile("config.json")
	util.MustExec(err)

	err = json.Unmarshal(bytes, &Vars)
	util.MustExec(err)
}
