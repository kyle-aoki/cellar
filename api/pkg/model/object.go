package model

type Object struct {
	Id   int64  `json:"Id" db:"id"`
	Name string `json:"Name" db:"name"`
	Path string `json:"Path" db:"path"`
	File bool   `json:"File" db:"file"`
}

func (o Object) Create() Object {
	return Object{}
}

func (o Object) FindPath() (*Object, string) {
	return &o, `SELECT id, name, path, file FROM cellar.object
	WHERE path = :path`
}

func (o Object) Exists() (*Object, string) {
	return &o, `SELECT id, name, path, file FROM cellar.object
	WHERE path = :path
	AND name = :name`
}

func (o Object) New() (*Object, string) {
	return &o, `INSERT INTO cellar.object (name, path, file) VALUES (:name, :path, :file)`
}
