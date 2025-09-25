CREATE TABLE products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

-- Insert some sample data
INSERT INTO products (name, price) VALUES 
('Laptop', 1200.00),
('Mouse', 25.50),
('Keyboard', 75.00);
