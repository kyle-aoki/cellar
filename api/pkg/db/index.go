package db

import (
	"api/pkg/cfg"
	"api/pkg/util"
	"context"
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

func (t Transaction) Rollback() {
	t.rollback()
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

func (t Transaction) NamedQuery(arg any, query string) *sqlx.Rows {
	rows, err := t.Ptr.NamedQuery(query, arg)
	t.MustTransact(err)
	return rows
}

func Row[T any](arg *T, rows *sqlx.Rows) (*T, bool) {
	defer rows.Close()
	for rows.Next() {
		rows.StructScan(arg)
		return arg, false
	}
	return arg, true
}

func Rows[T any](rows *sqlx.Rows) []*T {
	defer rows.Close()
	ts := *new([]*T)
	for rows.Next() {
		t := new(T)
		rows.StructScan(&t)
		ts = append(ts, t)
	}
	return ts
}

func (t Transaction) NamedExec(arg any, query string) int64 {
	result, err := t.Ptr.NamedExec(query, arg)
	t.MustTransact(err)
	i64, err := result.RowsAffected()
	t.MustTransact(err)
	return i64
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
