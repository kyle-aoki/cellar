package model

type Content struct {
	Name    string `json:"name" db:"name"`
	Path    string `json:"path" db:"path"`
	Version int    `json:"version" db:"version"`
	Content string `json:"content" db:"content"`
}

func (c Content) Exists() string {
	return `SELECT * FROM cellar.content
	WHERE name = :name and path = :path and version = :version`
}

func (c Content) NewContentQ() string {
	return `INSERT INTO cellar.content (name, path, version, content)
	VALUES (:name, :path, :version, :content)`
}

func (c Content) GetLatestVersion() string {
	return `select version, content from cellar.content
	WHERE name = :name and path = :path
	ORDER BY version DESC
	LIMIT 1`
}

func (c Content) UpdateContent() string {
	return `update cellar.content
	set version = :version, content = :=content
	WHERE name = :name and path = :path`
}

func (c Content) GetAllVersions() string {
	return `select version FROM cellar.content
	WHERE name = :name AND path = :path
	ORDER BY version DESC`
}
