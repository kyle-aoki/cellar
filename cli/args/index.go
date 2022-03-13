package args

import (
	"cli/util"
	"io/ioutil"
	"os"
)

var Arguments []string

func init() {
	Arguments = os.Args[1:]
}

func Poll() string {
	if len(Arguments) == 0 {
		panic("Not enough arguments.")
	}
	firstElement := Arguments[0]
	Arguments = Arguments[1:]
	return firstElement
}

func Collect() string {
	bytes, err := ioutil.ReadAll(os.Stdin)
	util.MustExec(err)
	return string(bytes)
}
