package util

import (
	"fmt"
	"strconv"
)

func Int(s string) int {
	i, err := strconv.ParseInt(s, 10, 32)
	MustExec(err)
	return int(i)
}

func Bool(s string) bool {
	if s == "true" {
		return true
	} else if s == "false" {
		return false
	} else {
		panic(fmt.Sprintf("Cannot parse '%s' into a boolean.", s))
	}
}
