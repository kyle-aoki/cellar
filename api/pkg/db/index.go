package db

import (
	"api/pkg/cfg"
	"api/pkg/util"
	"fmt"
	"log"

	"github.com/jmoiron/sqlx"
)

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
	util.MustExec(err)

	err = db.Ping()
	util.MustExec(err)

	log.Print("Successfully pinged database.")

	Conn = db
}
