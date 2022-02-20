package util

import (
	"fmt"
	"log"

	"github.com/jmoiron/sqlx"
)

func MustExec(err error) {
	if err != nil {
		panic(err)
	}
}

func MustTransact(err error, tx *sqlx.Tx) {
	if err != nil {
		err := tx.Rollback()
		if err != nil {
			panic(err)
		}
		panic(err)
	}
}

func CheckFatal(err error) {
	if err != nil {
		fmt.Println(err)
		log.Fatal("Failed to start cellar API.")
	}
}
