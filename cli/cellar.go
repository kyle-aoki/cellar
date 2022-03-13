package main

import (
	"cli/args"
	"cli/client"
	"fmt"
)

func CatchPanic() {
	r := recover()
	if r != nil {
		fmt.Println(r)
	}
}

func main() {
	defer CatchPanic()

	switch args.Poll() {
	case "object":
		ObjectCommands()
	}
}

func ObjectCommands() {
	switch args.Poll() {
	case "new":
		NewObject()
	case "update":
		UpdateObject()
	}
}

func NewObject() {
	resp := client.Post("/object/new", nil)
	fmt.Println(resp)
}

func UpdateObject() {
	field := args.Poll()
	value := args.Poll()
	object := args.Collect()
	switch field {
	case "name":
		
	}
}
