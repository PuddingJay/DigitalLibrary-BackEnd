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
-- Table structure for table `peminjaman`
--

DROP TABLE IF EXISTS `peminjaman`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `peminjaman` (
  `idPeminjaman` int NOT NULL AUTO_INCREMENT,
  `kodeBuku` varchar(45) NOT NULL,
  `NIS` int NOT NULL,
  `namaPeminjam` varchar(45) NOT NULL,
  `judulBuku` varchar(155) NOT NULL,
  `tglPinjam` date NOT NULL,
  `batasPinjam` date NOT NULL,
  `tglKembali` date DEFAULT NULL,
  `status` varchar(20) NOT NULL,
  `denda` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idPeminjaman`)
) ENGINE=InnoDB AUTO_INCREMENT=92 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `peminjaman`
--

LOCK TABLES `peminjaman` WRITE;
/*!30000 ALTER TABLE `peminjaman` DISABLE KEYS */;
INSERT INTO `peminjaman` VALUES (1,'1',101214009,'Ahmad','Good Time','2023-11-26','2023-06-27','2023-06-15','Dikembalikan','-'),(3,'3',101214009,'Katak','Macaron Macaron','2023-11-22','2023-05-04','2023-06-10','Dikembalikan','Rp. 111000'),(5,'21',101214009,'Rommy','Tips Ganteng','2023-11-20','2023-05-31','2023-06-11','Dikembalikan','Rp. 83000'),(9,'99',101214009,'Afiq','Teh Harus','2023-06-07','2023-06-17','2023-06-15','Dikembalikan','-'),(11,'55',101214009,'Tata','Glimpse of Us','2023-05-31','2023-06-07',NULL,'Belum Dikembalikan',''),(12,'17',101214009,'Hawari','Macaron Macaron','2023-11-20','2023-12-21','2023-06-04','Dikembalikan','-'),(13,'46',101214009,'Acila','Pearcy Jackson','2023-06-15','2023-06-01','2023-06-04','Dikembalikan','Rp. 9000'),(14,'78',101214009,'Saya','Garuk Kepala Terus','2023-06-08','2023-06-01','2023-06-04','Dikembalikan','Rp. 9000'),(15,'89',101214009,'Agung','MU Kalah Terus. WHY?','2023-06-04','2023-06-24','2023-06-04','Dikembalikan','-'),(16,'75',101214009,'Coba','Aduh','2023-05-31','2023-06-30','2023-06-04','Dikembalikan','-'),(17,'55',101214009,'Steve Job','Tutor Buat HandPhone','2023-06-04','2023-06-29','2023-06-05','Dikembalikan','-'),(18,'1',101214009,'SAF','Glory Glory Man City','2023-05-31','2023-05-03','2023-06-05','Dikembalikan','Rp. 99000'),(19,'71',101214009,'Agatt','Yaya anak Baik','2023-06-07','2023-05-02','2023-06-15','Dikembalikan','Rp. 132000'),(21,'55',101214009,'Alda','Mantap Mancing','2023-03-31','2023-05-24',NULL,'Belum Dikembalikan',NULL),(25,'33',101214009,'Keren Kan','Dakwah Pagi','2023-05-02','2023-05-29',NULL,'Belum Dikembalikan',NULL),(28,'C.22',101214009,'Yulio','Tempat Sampah Pemilah Otomatis','2023-06-05','2023-07-04',NULL,'Belum Dikembalikan',NULL),(30,'23',101214009,'Julianto','Tips Apa','2023-11-20','2023-05-24','2023-06-15','Dikembalikan','Rp. 66000'),(31,'1',101214009,'Muhammad Windu Aji','aawd','2023-06-02','2023-06-14',NULL,'Belum Dikembalikan',NULL),(32,'C.13',101214009,'Muhammad Pragatt Baya Windu Aji Trista Sekar','Etive Studio','2023-06-21','2023-06-29',NULL,'Belum Dikembalikan',NULL),(34,'1.2',101214009,'Windu','Apa','2023-05-31','2023-06-01',NULL,'Belum Dikembalikan',NULL),(36,'ID2',101214009,'Windu','Judul','2023-06-01','2023-06-03','2023-06-21','Dikembalikan','-'),(37,'1.2.3',123456,'AldoGian','Supernova','2023-03-31','2023-05-24','2023-07-12','Lunas','0'),(38,'1.2.2',101214009,'Brendan','Petunjuk Praktis Bertanam Sayuran','2023-03-31','2023-05-24','2023-05-30','Lunas','0'),(39,'1.2.4',101214009,'Brando','Kalkulus dan data','2023-03-31','2023-04-05','2023-06-06','Dikembalikan','Rp. 73600'),(40,'1.2.1',101214009,'Bisa','Siti Nur Baya','2023-06-01','2023-06-07',NULL,'Belum Dikembalikan','Rp. 23000'),(42,'1.2.1',101214009,'Coba','Bahasa Indonesa','2023-05-31','2023-09-01','2023-11-10','Dikembalikan','Rp. 19500'),(53,'1.2.4',105219036,'Muhammad Windu Aji','Kalkulus dan data','2023-03-31','2023-05-24','2023-07-10','Dikembalikan','Rp. 23500'),(54,'1.2.3',123123,'Tes','Supernova','2023-07-07','2023-07-20','2023-07-10','Dikembalikan','-'),(59,'1.2.2',123123,'Tes','Petunjuk Praktis Bertanam Sayuran','2023-07-01','2023-07-07',NULL,'Belum Dikembalikan',''),(60,'1.2.2',123123,'Tes','Petunjuk Praktis Bertanam Sayuran','2023-06-30','2023-07-05',NULL,'Belum Dikembalikan',''),(61,'1.2.5',105219001,'Arsyad','Ekonomi','2023-07-04','2023-07-06',NULL,'Belum Dikembalikan','Rp. 9500'),(62,'1.2.4',105219002,'Mahran','Kalkulus dan data','2023-06-30','2023-07-05','2023-07-12','Dikembalikan','Rp. 3500'),(63,'1.2.2',105219002,'Mahran','Petunjuk Praktis Bertanam Sayuran','2023-04-30','2023-05-31','2023-06-07','Dikembalikan','Rp. 3500'),(64,'1.2.4',105219036,'Muhammad Windu Aji','Kalkulus dan data','2023-06-06','2023-06-05','2023-07-13','Dikembalikan','Rp. 19000'),(65,'1.2.3',105219036,'Muhammad Windu Aji','Supernova','2023-06-30','2023-07-03','2023-07-13','Dikembalikan','Rp. 5000'),(66,'1.2.3',105228099,'halo','Supernova','2023-06-30','2023-07-07','2023-07-10','Dikembalikan','Rp. 1500'),(67,'1.2.4',105228099,'halo','Kalkulus dan data','2023-06-30','2023-07-05','2023-07-13','Lunas','0'),(68,'1.2.2',105219036,'Muhammad Windu Aji','Petunjuk Praktis Bertanam Sayuran','2023-06-30','2023-07-03','2023-07-13','Dikembalikan','Rp. 5000'),(70,'1.2.1',1231234,'Tes','Siti Nur Baya','2023-07-07','2023-07-08','2023-07-18','Lunas','0'),(72,'1.2.1',12345678,'AldoGian','Siti Nur Baya','2024-06-05','2024-07-10','2024-07-24','Dikembalikan','Rp. 42000'),(73,'1.2.2',1231234,'Tes','Petunjuk Praktis Bertanam Sayuran','2023-06-30','2023-07-01',NULL,'Belum Dikembalikan','Rp. 36000'),(75,'1.2.4',105219036,'Muhammad Windu Aji','Bahasa Indonesia','2023-06-30','2023-07-06','2023-07-18','Dikembalikan','Rp. 6000'),(77,'1.2.1',1231234,'Tes','Siti Nur Baya','2023-07-21','2023-07-24',NULL,'Belum Dikembalikan','Rp. 500'),(78,'1.2.4',1231234,'Tes','Bahasa Indonesia','2023-07-21','2023-07-24',NULL,'Belum Dikembalikan','Rp. 500'),(80,'1.2.4',1231234,'Tes','Bahasa Indonesia','2023-07-01','2023-07-09',NULL,'Belum Dikembalikan','Rp. 8000'),(85,'1.2.6',1231234,'Tes','Introduce to Software Engineering','2023-07-21','2023-07-24','2023-07-22','Dikembalikan','0'),(91,'1.2.6',1231234,'Tes','Introduce to Software Engineering','2023-07-01','2023-07-04',NULL,'Belum Dikembalikan','Rp. 10500');
/*!30000 ALTER TABLE `peminjaman` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-28 19:58:55
