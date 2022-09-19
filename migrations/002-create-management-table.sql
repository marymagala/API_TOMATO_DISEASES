CREATE TABLE
  management (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    management_type TEXT,
    description TEXT,
    disease_id INT,
    FOREIGN KEY (disease_id) REFERENCES disease (id)
  );