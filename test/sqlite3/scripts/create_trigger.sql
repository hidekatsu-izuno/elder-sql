CREATE TRIGGER update_customer_address UPDATE OF address ON customers 
BEGIN
  UPDATE orders SET address = new.address WHERE customer_name = old.name;
END;
CREATE TRIGGER cust_addr_chng
INSTEAD OF UPDATE OF cust_addr ON customer_address
BEGIN
  UPDATE customer SET cust_addr=NEW.cust_addr
   WHERE cust_id=NEW.cust_id;
END;
CREATE TEMP TRIGGER ex1 AFTER INSERT ON main.tab1 BEGIN 
  INSERT INTO sample DEFAULT VALUES;
END;