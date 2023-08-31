-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: new_digital_library
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
-- Table structure for table `akun`
--

DROP TABLE IF EXISTS `akun`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `akun` (
  `idAkun` int NOT NULL AUTO_INCREMENT,
  `nama` varchar(45) DEFAULT NULL,
  `username` varchar(45) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `refreshToken` text,
  `role` enum('admin','superadmin','siswa') DEFAULT NULL,
  `siswa_NIS` int DEFAULT NULL,
  PRIMARY KEY (`idAkun`),
  KEY `fk_akun_siswa1_idx` (`siswa_NIS`),
  CONSTRAINT `fk_akun_siswa1` FOREIGN KEY (`siswa_NIS`) REFERENCES `siswa` (`NIS`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `akun`
--

LOCK TABLES `akun` WRITE;
/*!40000 ALTER TABLE `akun` DISABLE KEYS */;
INSERT INTO `akun` VALUES (4,'Rizky','Rizky','$2b$10$7vbk7qkXdCu4gBORULT8wunJ03eQClYw/OiRx8AA/zifS7qycy0WS',NULL,'siswa',15151),(5,'Muhammad Windu Aji','Muhammad Windu Aji','$2b$10$IHi7OBgXpzoa5SAsHn95RuCOGuJqYSBtFBD4AKM07HpWONd3QO/gW','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaXN3YUlkIjoxMDUyMTkwMzYsIm5hbWEiOiJNdWhhbW1hZCBXaW5kdSBBamkiLCJ1c2VybmFtZSI6Ik11aGFtbWFkIFdpbmR1IEFqaSIsInJvbGUiOiJzaXN3YSIsImlhdCI6MTY5MzQyODc4MCwiZXhwIjoxNjkzNTE1MTgwfQ.GuumuT2Ll3157esiuo81gyEwh41yY_z1OPoNYgGPNbA','siswa',105219036),(6,'Lord Yusril','Lord Yusril','$2b$10$rpMci4saxiRtrD0gAUJBX.f5UvEYI/Tnn0AbM86nblbEEcK2NCqBG',NULL,'siswa',105219098),(7,'Lord Albi','Lord Albi','$2b$10$BBqOHuDjSnyYX./kDKeLQ.doJ.R952eaArmz1vkgE/QF472eSDUce',NULL,'siswa',105219099),(10,'Husni','admin','$2b$10$YQeORYbJ1cX92UGMKrvSNO2E5c.MGeRUftrskCEcADbs1TqabimJm','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSHVzbmkiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjkzNDI2MDIzLCJleHAiOjE2OTM1MTI0MjN9.uBwQdejNNTa-nBxajU_-xOstgvi40q3jvxybUoWixO4','admin',NULL),(12,'Ahmad S','Ahmad','$2b$10$YcHtCcD/yFCLf52TXvwz4en8jDISs7Ddx63cDay4XRKJ4vIGX2VrG',NULL,'siswa',105219008),(21,'Yusril Albi','Yusril Albi','$2b$10$ksMbRtxsXP.9cn8uGkCwFudYPKM7GmWnfzuWTG5CilBLRbFT3JFLi',NULL,'siswa',105219007),(22,'Frank','Frank','$2b$10$uY94umnWRVri8Jc5Na8eUeRPVnP5OcMVZM57ynLeK8LfUHfBDOQ8C',NULL,'siswa',105219070),(23,'Admin Utama','Admin Utama','$2b$10$58vJaiUHvO7iLH6lgGacke3mBFSRUuMx2EpwRxNwLS0BMv8jW0O1O',NULL,'admin',NULL),(24,'Admin Utama','superadmin','$2b$10$iwRMQAEC3kUxVh34NkUdo.evkKgr1JsLRDEVW8UczUq.2FDXLYvom',NULL,'superadmin',NULL);
/*!40000 ALTER TABLE `akun` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `buku`
--

DROP TABLE IF EXISTS `buku`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `buku` (
  `kodeBuku` varchar(45) NOT NULL,
  `judul` varchar(45) DEFAULT NULL,
  `penulis` varchar(45) DEFAULT NULL,
  `ringkasan` longtext,
  `tahunTerbit` varchar(10) DEFAULT NULL,
  `keterangan` text,
  `jumlah` int DEFAULT NULL,
  `tersedia` int DEFAULT NULL,
  `cover` varchar(100) DEFAULT NULL,
  `berkasBuku` varchar(200) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `likes` int DEFAULT NULL,
  `isApproval` enum('Disetujui','Belum Disetujui','Ditolak') DEFAULT NULL,
  `kategori_idKategori` int NOT NULL,
  PRIMARY KEY (`kodeBuku`),
  KEY `fk_buku_kategori1_idx` (`kategori_idKategori`),
  CONSTRAINT `fk_buku_kategori1` FOREIGN KEY (`kategori_idKategori`) REFERENCES `kategori` (`idKategori`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `buku`
--

LOCK TABLES `buku` WRITE;
/*!40000 ALTER TABLE `buku` DISABLE KEYS */;
INSERT INTO `buku` VALUES ('1.2.10','Bisnis Franchise','Shofi',NULL,NULL,'Buku Fisik',3,1,NULL,NULL,'2023-08-29 19:06:39',NULL,'Ditolak',2),('1.2.3','Malin Kundang','Ahmad','Dikutuk',NULL,'Buku Fisik',8,8,NULL,NULL,'2023-08-30 09:59:58',NULL,'Disetujui',3);
/*!40000 ALTER TABLE `buku` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kategori`
--

DROP TABLE IF EXISTS `kategori`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kategori` (
  `idKategori` int NOT NULL AUTO_INCREMENT,
  `nama` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idKategori`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kategori`
--

LOCK TABLES `kategori` WRITE;
/*!40000 ALTER TABLE `kategori` DISABLE KEYS */;
INSERT INTO `kategori` VALUES (1,'Seni Budaya'),(2,'Hiburan'),(3,'Fiksi'),(4,'Matematika');
/*!40000 ALTER TABLE `kategori` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `membaca`
--

DROP TABLE IF EXISTS `membaca`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `membaca` (
  `siswa_NIS` int NOT NULL,
  `buku_kodeBuku` varchar(45) NOT NULL,
  `idRiwayat` int NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  PRIMARY KEY (`idRiwayat`),
  KEY `fk_siswa_has_buku_buku1_idx` (`buku_kodeBuku`),
  KEY `fk_siswa_has_buku_siswa1_idx` (`siswa_NIS`),
  CONSTRAINT `fk_siswa_has_buku_buku1` FOREIGN KEY (`buku_kodeBuku`) REFERENCES `buku` (`kodeBuku`),
  CONSTRAINT `fk_siswa_has_buku_siswa1` FOREIGN KEY (`siswa_NIS`) REFERENCES `siswa` (`NIS`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `membaca`
--

LOCK TABLES `membaca` WRITE;
/*!40000 ALTER TABLE `membaca` DISABLE KEYS */;
/*!40000 ALTER TABLE `membaca` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `meminjam`
--

DROP TABLE IF EXISTS `meminjam`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `meminjam` (
  `Buku_kodeBuku` varchar(45) NOT NULL,
  `Siswa_NIS` int NOT NULL,
  `idPeminjaman` int NOT NULL AUTO_INCREMENT,
  `tglPinjam` date DEFAULT NULL,
  `batasPinjam` date DEFAULT NULL,
  `tglKembali` date DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `denda` varchar(45) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  PRIMARY KEY (`idPeminjaman`),
  KEY `idBuku_idx` (`Buku_kodeBuku`),
  KEY `Siswa_NIS_idx` (`Siswa_NIS`),
  CONSTRAINT `fk_meminjam_buku1` FOREIGN KEY (`Buku_kodeBuku`) REFERENCES `buku` (`kodeBuku`) ON UPDATE CASCADE,
  CONSTRAINT `fk_meminjam_siswa1` FOREIGN KEY (`Siswa_NIS`) REFERENCES `siswa` (`NIS`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `meminjam`
--

LOCK TABLES `meminjam` WRITE;
/*!40000 ALTER TABLE `meminjam` DISABLE KEYS */;
INSERT INTO `meminjam` VALUES ('1.2.10',15151,8,'2023-02-28','2023-03-07',NULL,'Belum Dikembalikan','Rp. 88500','2023-08-30 22:52:51'),('1.2.10',105219099,9,'2023-02-28','2023-03-07','2023-08-30','Dikembalikan','Rp. 88000','2023-08-30 03:17:58'),('1.2.10',105219036,10,'2023-07-29','2023-08-04','2023-08-30','Dikembalikan','Rp. 13000','2023-08-30 00:38:50'),('1.2.10',15151,14,'2023-08-31','2023-09-06','2023-08-30','Lunas','0','2023-08-30 03:17:53'),('1.2.10',15151,15,'2023-08-30','2023-09-06',NULL,'Belum Dikembalikan','','2023-08-30 03:16:51');
/*!40000 ALTER TABLE `meminjam` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mengomentari`
--

DROP TABLE IF EXISTS `mengomentari`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mengomentari` (
  `siswa_NIS` int NOT NULL,
  `buku_kodeBuku` varchar(45) NOT NULL,
  `idKomentar` int NOT NULL AUTO_INCREMENT,
  `teksKomentar` varchar(45) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  PRIMARY KEY (`idKomentar`),
  KEY `fk_siswa_has_buku_buku2_idx` (`buku_kodeBuku`),
  KEY `fk_siswa_has_buku_siswa2_idx` (`siswa_NIS`),
  CONSTRAINT `fk_siswa_has_buku_buku2` FOREIGN KEY (`buku_kodeBuku`) REFERENCES `buku` (`kodeBuku`),
  CONSTRAINT `fk_siswa_has_buku_siswa2` FOREIGN KEY (`siswa_NIS`) REFERENCES `siswa` (`NIS`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mengomentari`
--

LOCK TABLES `mengomentari` WRITE;
/*!40000 ALTER TABLE `mengomentari` DISABLE KEYS */;
/*!40000 ALTER TABLE `mengomentari` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pengadaanbuku`
--

DROP TABLE IF EXISTS `pengadaanbuku`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pengadaanbuku` (
  `idPengadaan` int NOT NULL AUTO_INCREMENT,
  `judulBuku` varchar(45) DEFAULT NULL,
  `pengarang` varchar(45) DEFAULT NULL,
  `siswa_NIS` int NOT NULL,
  PRIMARY KEY (`idPengadaan`),
  KEY `fk_pengadaanbuku_siswa1_idx` (`siswa_NIS`),
  CONSTRAINT `fk_pengadaanbuku_siswa1` FOREIGN KEY (`siswa_NIS`) REFERENCES `siswa` (`NIS`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pengadaanbuku`
--

LOCK TABLES `pengadaanbuku` WRITE;
/*!40000 ALTER TABLE `pengadaanbuku` DISABLE KEYS */;
/*!40000 ALTER TABLE `pengadaanbuku` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pengunjung`
--

DROP TABLE IF EXISTS `pengunjung`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pengunjung` (
  `idpengunjung` int NOT NULL AUTO_INCREMENT,
  `nama` varchar(45) DEFAULT NULL,
  `tipePengunjung` varchar(6) DEFAULT NULL,
  `asal` varchar(45) DEFAULT NULL,
  `waktuKunjung` datetime DEFAULT NULL,
  PRIMARY KEY (`idpengunjung`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pengunjung`
--

LOCK TABLES `pengunjung` WRITE;
/*!40000 ALTER TABLE `pengunjung` DISABLE KEYS */;
INSERT INTO `pengunjung` VALUES (30,'Muhammad Windu Aji','umum','Universitas Pertamina','2023-08-29 21:00:02'),(32,'Sekar','siswa','10-1','2023-08-30 01:13:01'),(35,'Arsyad','Siswa','10-2','2023-08-30 23:12:06');
/*!40000 ALTER TABLE `pengunjung` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservasipinjam`
--

DROP TABLE IF EXISTS `reservasipinjam`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservasipinjam` (
  `Buku_kodeBuku` varchar(45) NOT NULL,
  `Siswa_NIS` int NOT NULL,
  `idReservasi` int NOT NULL AUTO_INCREMENT,
  `tglPemesanan` date DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  PRIMARY KEY (`idReservasi`),
  KEY `Buku_idBuku_idx` (`Buku_kodeBuku`),
  KEY `Siswa_NIS_idx` (`Siswa_NIS`),
  CONSTRAINT `FK_memesan_buku` FOREIGN KEY (`Buku_kodeBuku`) REFERENCES `buku` (`kodeBuku`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `FK_memesan_siswa` FOREIGN KEY (`Siswa_NIS`) REFERENCES `siswa` (`NIS`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservasipinjam`
--

LOCK TABLES `reservasipinjam` WRITE;
/*!40000 ALTER TABLE `reservasipinjam` DISABLE KEYS */;
INSERT INTO `reservasipinjam` VALUES ('1.2.10',15151,1,'2023-08-05','Dipinjam','2023-08-29 20:12:23'),('1.2.10',105219099,4,'2023-08-05','Kadaluarsa','2023-08-29 20:25:58'),('1.2.3',15151,5,'2023-08-31','Belum Dipinjam','2023-08-30 17:10:13');
/*!40000 ALTER TABLE `reservasipinjam` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `siswa`
--

DROP TABLE IF EXISTS `siswa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `siswa` (
  `NIS` int NOT NULL,
  `status` enum('Aktif','NonAktif') DEFAULT 'Aktif',
  `jumlahPinjam` int DEFAULT NULL,
  `waktuPinjam` datetime DEFAULT NULL,
  PRIMARY KEY (`NIS`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `siswa`
--

LOCK TABLES `siswa` WRITE;
/*!40000 ALTER TABLE `siswa` DISABLE KEYS */;
INSERT INTO `siswa` VALUES (15151,'Aktif',5,'2023-08-30 03:16:51'),(105219007,'Aktif',0,NULL),(105219008,'Aktif',0,NULL),(105219036,'Aktif',44,'2023-08-30 02:44:51'),(105219070,'Aktif',0,NULL),(105219098,'Aktif',0,NULL),(105219099,'Aktif',1,'2023-08-30 03:15:49');
/*!40000 ALTER TABLE `siswa` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-31  6:25:48
