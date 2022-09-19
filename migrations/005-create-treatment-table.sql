CREATE TABLE treatment(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    details TEXT,
    disease_id INT,
    FOREIGN KEY (disease_id) REFERENCES disease(id)
);