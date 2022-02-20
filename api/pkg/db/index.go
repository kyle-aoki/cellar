package db

import (
	"api/pkg/cfg"
	"api/pkg/util"
	"context"
	"database/sql"
	"fmt"
	"log"

	"github.com/jmoiron/sqlx"
)

type Transaction struct {
	Ptr *sqlx.Tx
}

func BeginTransaction() *Transaction {
	tx, err := Conn.BeginTxx(context.Background(), nil)
	if err != nil {
		panic(err)
	}
	return &Transaction{Ptr: tx}
}

func (t Transaction) Rollback(message string) string {
	t.rollback()
	return message
}

func (t Transaction) rollback() {
	rollbackErr := t.Ptr.Rollback()
	if rollbackErr != nil {
		panic(rollbackErr)
	}
}

func (t Transaction) Commit() {
	err := t.Ptr.Commit()
	t.MustTransact(err)
}

func (t Transaction) MustTransact(err error) {
	if err != nil {
		rollbackErr := t.Ptr.Rollback()
		if rollbackErr != nil {
			panic(rollbackErr)
		}
		panic(err)
	}
}

func (t Transaction) NamedQuery(query string, arg interface{}) *sqlx.Rows {
	rows, err := t.Ptr.NamedQuery(query, arg)
	t.MustTransact(err)
	return rows
}

func (t Transaction) NamedExec(query string, arg interface{}) sql.Result {
	result, err := t.Ptr.NamedExec(query, arg)
	t.MustTransact(err)
	return result
}

var Conn *sqlx.DB

func InitDatabase() {
	var credentials string
	if cfg.Vars.Password == "" {
		credentials = cfg.Vars.Username
	} else {
		credentials = fmt.Sprintf("%s:%s", cfg.Vars.Username, cfg.Vars.Password)
	}
	connString := fmt.Sprintf("%s@tcp(%s:3306)/cellar", credentials, cfg.Vars.DbHost)
	db, err := sqlx.Open("mysql", connString)
	util.CheckFatal(err)

	err = db.Ping()
	util.CheckFatal(err)

	log.Print("Successfully pinged database.")

	Conn = db
}
