package util

import (
	"fmt"
	"log"
)

func MustExec(err error) {
	if err != nil {
		fmt.Println(err)
		log.Fatal("Failed to start cellar API.")
	}
}
