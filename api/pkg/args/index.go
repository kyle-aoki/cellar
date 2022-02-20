package args

import "os"

var args []string
var ExecutionPath string

func init() {
	args = os.Args
	ExecutionPath = Poll()
}

func Poll() (next string) {
	next, args = args[0], args[1:]
	return next
}
