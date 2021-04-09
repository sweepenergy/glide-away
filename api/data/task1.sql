CREATE TABLE simon (
  modbusIdentity int,
  modbusData int,
  modbusPort int,
  dateRead int,
  sweepAPI int
);

SELECT * FROM simon; 
  
CREATE TABLE elastic SELECT * FROM simon;

SELECT * FROM elastic;
