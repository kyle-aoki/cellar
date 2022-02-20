package run

import (
	"api/pkg/cfg"
	"api/pkg/db"
	"api/pkg/web"
	"log"
)

func Program() {
	log.Print("Cellar API started...")
	
	cfg.Init()
	db.InitDatabase()
	web.Init()
}
