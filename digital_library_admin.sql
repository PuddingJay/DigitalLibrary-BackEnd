-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: digital_library
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `refreshToken` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!30000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'Husni','admin','$2b$10$K6BIWIE6/RjDcHZyGOkbfeMmBKkSWZsDFdnoaUv19Jxzr7D.e2kMC','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoxLCJuYW1lIjoiSHVzbmkiLCJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjg4NDAyMTc4LCJleHAiOjE2ODg0ODg1Nzh9.t2jSweetWPddJcR0S1lcjlcBWckx9p1svHGxzHJrxlo'),(2,'Budi','admin2','$2b$10$vNv5l4uWZ3m4AEjv5xuwf.u1g0BsEzBNO/7S2JIixdV2cRRu3.P/6','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoyLCJuYW1lIjoiQnVkaSIsInVzZXJuYW1lIjoiYWRtaW4yIiwiaWF0IjoxNjg3NzUzNDI3LCJleHAiOjE2ODc4Mzk4Mjd9.1GbFBeGxfC_brsj6ywtLvSGazcA2jVOQZg2FTqnsxSc'),(3,'Ahmad','admin3','$2b$10$9mhbslAdIo3XBc0abdL5oeCn6yIgCqCqNdrhF0RdOEyTPZLrpRyM2','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjozLCJuYW1lIjoiQWhtYWQiLCJ1c2VybmFtZSI6ImFkbWluMyIsImlhdCI6MTY4ODQwMDczNiwiZXhwIjoxNjg4NDg3MTM2fQ.wG0ebYSrnddqfwzpKb87KIpPwmZwnOc9Js0TMO2wHc8'),(4,'Ahmad','admin3','$2b$10$bht0idOLSRsdkRwWP2dwbezija4dXv5yhagX0AFNta4d5aLcrouey',NULL),(5,'Windu','admin4','$2b$10$SvoiY8ucbBt35Ab.LProM.UWwyWHAQtMR.nBAjZuW34HkFa2d6o26',NULL),(6,'Sekar','admin5','perpustakaan1945',NULL);
/*!30000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-04 16:15:56
