package model

type Object struct {
	Name    string `json:"name" db:"name"`
	Path    string `json:"path" db:"path"`
	File    bool   `json:"file" db:"file"`
}

func (object Object) InsertQ() string {
	return `INSERT INTO cellar.object (name, path, file)
	VALUES (:name, :path, :file);`
}

func (object Object) FindQ() string {
	return `SELECT name, path, file FROM cellar.object
	WHERE name = :name
	AND path = :path`
}

func (object Object) SearchQ() string {
	return `SELECT name, path, file FROM cellar.object
	WHERE path = :path`
}
