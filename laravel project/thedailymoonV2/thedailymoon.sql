-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 15, 2026 at 01:21 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `thedailymoon`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(100) DEFAULT NULL,
  `role_id` int(11) NOT NULL DEFAULT 1,
  `photo` varchar(191) DEFAULT NULL,
  `password` varchar(191) NOT NULL,
  `token` varchar(191) DEFAULT NULL,
  `verify` tinyint(4) NOT NULL DEFAULT 0,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `remember_token` varchar(191) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL,
  `designation` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `name`, `email`, `phone`, `role_id`, `photo`, `password`, `token`, `verify`, `status`, `remember_token`, `created_at`, `updated_at`, `designation`) VALUES
(1, 'The Daily Moon', 'info@admin.com', '+8801800000000', 1, '1781017023PicsArt_11-15-01.09.48.jpg', '$2y$10$pZhtAXRKxDwR.L9E9xmgV.5JURe6Uqhb6d4dM5kbGvZO8/37uNYFy', NULL, 1, 1, 'cOvkXS2cVNBTptDCseTJQJquiy8ckeAM9qqYsqAd8R72jFdFxFsxpu8cxSrc', '2026-06-12 13:01:29', '2026-06-12 07:01:29', 'সম্পাদক ও প্রকাশক');

-- --------------------------------------------------------

--
-- Table structure for table `admin_languages`
--

CREATE TABLE `admin_languages` (
  `id` int(11) NOT NULL,
  `is_default` tinyint(4) NOT NULL DEFAULT 0,
  `language` varchar(100) NOT NULL,
  `file` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `rtl` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `admin_languages`
--

INSERT INTO `admin_languages` (`id`, `is_default`, `language`, `file`, `name`, `rtl`) VALUES
(1, 1, 'English', '1605077901sgDxsDx1.json', '1605077901sgDxsDx1', 0);

-- --------------------------------------------------------

--
-- Table structure for table `advertisements`
--

CREATE TABLE `advertisements` (
  `id` int(11) NOT NULL,
  `add_placement` varchar(191) DEFAULT NULL,
  `banner_type` varchar(191) DEFAULT NULL,
  `addSize` enum('size_728','size_468','size_234') DEFAULT NULL,
  `photo` varchar(191) DEFAULT NULL,
  `banner_code` text DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `language_id` int(11) NOT NULL,
  `title` varchar(191) DEFAULT NULL,
  `slug` varchar(100) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `color` varchar(20) DEFAULT NULL,
  `category_order` int(11) DEFAULT NULL,
  `show_at_homepage` tinyint(4) DEFAULT 1,
  `show_on_menu` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `language_id`, `title`, `slug`, `parent_id`, `color`, `category_order`, `show_at_homepage`, `show_on_menu`) VALUES
(1, 1, 'প্রচ্ছদ', 'home', NULL, '#ff0000', 1, 0, 1),
(2, 1, 'জাতীয়', 'national', NULL, '#4d23bd', 2, 1, 1),
(3, 1, 'রাজনীতি', 'politics', NULL, '#c01818', 3, 1, 1),
(4, 1, 'আন্তজাতিক', 'international', NULL, '#ff0000', 4, 1, 1),
(5, 1, 'তথ্য প্রযুক্তি', 'ict', NULL, '#ff0000', 5, 1, 1),
(6, 1, 'সারাদেশ', 'saradesh', NULL, '#ff0000', 6, 1, 1),
(7, 1, 'ক্যাম্পাস', 'campus', NULL, '#ff0000', 7, 1, 1),
(8, 1, 'বিনোদন', 'entertainment', NULL, '#ff0000', 8, 1, 1),
(9, 1, 'খেলাধুলা', 'sports', NULL, '#ff0000', 9, 1, 1),
(10, 1, 'মিডিয়া', 'media', NULL, '#ff0000', 10, 1, 1),
(11, 1, 'বিএনপি', 'বিএনপি', 3, NULL, NULL, 1, 1),
(12, 1, 'আওয়ামীলীগ', 'আওয়ামীলীগ', 3, NULL, NULL, 1, 1),
(13, 1, 'অনন্য', 'অনন্য', 3, NULL, NULL, 1, 1),
(14, 1, 'অপরাধ', 'অপরাধ', 2, NULL, NULL, 1, 1),
(15, 1, 'অর্থনীতি', 'অর্থনীতি', 2, NULL, NULL, 1, 1),
(16, 1, 'দুর্নীতি', 'দুর্নীতি', 2, NULL, NULL, 1, 1),
(17, 1, 'বিশেষ প্রতিবেদন', 'বিশেষ-প্রতিবেদন', 3, NULL, NULL, 1, 1),
(18, 1, 'জাতিসংঘ', 'জাতিসংঘ', 4, NULL, NULL, 1, 1),
(19, 1, 'বিশ্ব রাজনীতি', 'বিশ্ব-রাজনীতি', 4, NULL, NULL, 1, 1),
(20, 1, 'সারাবিশ্ব', 'সারাবিশ্ব', 4, NULL, NULL, 1, 1),
(21, 1, 'ঢাকা', 'ঢাকা', 6, NULL, NULL, 1, 1),
(22, 1, 'চট্টগ্রাম', 'চট্টগ্রাম', 6, NULL, NULL, 1, 1),
(23, 1, 'রাজশাহী', 'রাজশাহী', 6, NULL, NULL, 1, 1),
(24, 1, 'খুলনা', 'খুলনা', 6, NULL, NULL, 1, 1),
(25, 1, 'বরিশাল', 'বরিশাল', 6, NULL, NULL, 1, 1),
(26, 1, 'সিলেট', 'সিলেট', 6, NULL, NULL, 1, 1),
(27, 1, 'রংপুর', 'রংপুর', 6, NULL, NULL, 1, 1),
(28, 1, 'ময়মনসিংহ', 'ময়মনসিংহ', 6, NULL, NULL, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `follows`
--

CREATE TABLE `follows` (
  `id` int(11) NOT NULL,
  `admin_id` int(11) NOT NULL,
  `follower_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `follows`
--

INSERT INTO `follows` (`id`, `admin_id`, `follower_id`) VALUES
(3, 1, 6),
(4, 1, 3),
(5, 1, 7),
(6, 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `fonts`
--

CREATE TABLE `fonts` (
  `id` int(11) NOT NULL,
  `is_default` tinyint(4) NOT NULL DEFAULT 0,
  `font_family` varchar(50) DEFAULT NULL,
  `font_value` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `fonts`
--

INSERT INTO `fonts` (`id`, `is_default`, `font_family`, `font_value`) VALUES
(1, 0, 'Roboto', 'Roboto'),
(2, 0, 'Spartan', 'Spartan'),
(3, 0, 'Oxanium', 'Oxanium'),
(4, 1, 'Open Sans', 'Open Sans'),
(5, 0, 'Caladea', 'Caladea'),
(6, 0, 'Montserrat', 'Montserrat'),
(7, 0, 'Trade Winds', 'Trade+Winds'),
(8, 0, 'New Rocker', 'New+Rocker'),
(9, 0, 'Lacquer', 'Lacquer');

-- --------------------------------------------------------

--
-- Table structure for table `galleries`
--

CREATE TABLE `galleries` (
  `id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `photo` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `galleries`
--

INSERT INTO `galleries` (`id`, `post_id`, `photo`) VALUES
(29, 42, '1578127586joya-ahasan.jpg'),
(30, 42, '1578127586377761_179-600x337.jpg'),
(31, 42, '1578127586164059_Ahsan.jpg'),
(32, 247, '159126244714975762_1631317480501741_490245374_o.jpg'),
(33, 247, '159126244768626497_1696426900506281_7944048120013258752_o.jpg'),
(34, 247, '159126244883207239_2618960801709102_3429411530498637824_n.jpg'),
(35, 247, '159126244888246844_207613606980431_991879025783734272_n.jpg'),
(36, 248, '1591263106xD7rRfOg.jpg'),
(37, 248, '1591263107Pqybxa0L.jpg'),
(38, 248, '1591263108pb1FIKE4.jpg'),
(39, 257, '1601193880buNh5FeW.jpg'),
(40, 257, '1601193880GDqPk0Co.jpg'),
(41, 257, '1601193880IjFHKWnU.jpg'),
(42, 258, '1601274606IKnUQS6o.jpg'),
(43, 258, '1601274606wTQVEs52.jpg'),
(44, 258, '1601274606zobUab6V.jpg'),
(45, 259, '1601275946ICxmn6FP.jpg'),
(46, 259, '16012759465XHrbwZR.jpg'),
(47, 259, '1601275946Gs7EiiRB.jpg'),
(48, 259, '1601282031Dhaka_14th_March_(32624769393).jpg'),
(52, 259, '1601285567places-to-eat-in-noida-live-more-zone-dbs.jpg'),
(53, 322, '1601958165yPpKZyjX.jpg'),
(56, 322, '1601958928manny-moreno-x95vQCFQUmk-unsplash.jpg'),
(57, 323, '1601959076xHBuJhmT.jpg'),
(58, 323, '16019590770urHl8SW.jpg'),
(60, 344, '1602305612izPBavCh.jpg'),
(61, 344, '160230561424fin7m7.jpg'),
(62, 344, '16023056153efGRGOE.jpg'),
(63, 344, '1602305653photo-1601412349797-2383bac9c6f7.jpg'),
(64, 448, '16321275278RSlN2uf.jpg'),
(65, 448, '1632127527muzMcUv5.jpg'),
(66, 449, '16321291250qCe6j7q.jpg'),
(67, 449, '1632129125jpYDSxxQ.jpg'),
(68, 450, '1632129576hbNVXQz0.jpg'),
(69, 450, '1632129576SmXbSo05.jpg'),
(70, 451, '1632129774ROOGNghp.jpg'),
(71, 451, '1632129774Uf097JRD.jpg'),
(72, 452, '1632130219JkIoaGFO.jpg'),
(73, 452, '16321302194yryw6nT.jpg'),
(74, 452, '1632130219jVn7edgC.jpg'),
(75, 453, '1632130386eP3lW0JM.jpg'),
(76, 453, '1632130386KVVVlShf.jpg'),
(77, 453, '1632130386lcukXYuc.jpg'),
(78, 454, '1632130538sffuJ7RW.jpg'),
(79, 454, '1632130539oaElQDQZ.jpg'),
(80, 454, '1632130539IIGaaNTc.jpg'),
(81, 455, '1632194110EjGyneIC.jpg'),
(82, 455, '1632194110NKYaDOl2.jpg'),
(83, 456, '1673771766WDqr4kwL.jpg'),
(84, 459, '1673777833KGavI4hy.jpg'),
(85, 463, '1673846141ezSJV4ix.jpg'),
(86, 463, '1673846141Cs2hPcVL.jpg'),
(88, 463, '1673846918user-4.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `generalsettings`
--

CREATE TABLE `generalsettings` (
  `id` int(11) NOT NULL,
  `logo` varchar(100) NOT NULL,
  `footer_logo` varchar(100) NOT NULL,
  `favicon` varchar(191) DEFAULT NULL,
  `loader` varchar(100) DEFAULT NULL,
  `is_loader` tinyint(4) NOT NULL DEFAULT 0,
  `admin_loader` varchar(100) DEFAULT NULL,
  `title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `theme_color` varchar(100) DEFAULT NULL,
  `footer_color` varchar(100) DEFAULT NULL,
  `buton_color` varchar(100) DEFAULT NULL,
  `tags` text DEFAULT NULL,
  `error_photo` varchar(100) DEFAULT NULL,
  `error_title` varchar(191) DEFAULT NULL,
  `error_text` text DEFAULT NULL,
  `driver` varchar(100) DEFAULT NULL,
  `smtp_host` varchar(100) DEFAULT NULL,
  `smtp_port` varchar(100) DEFAULT NULL,
  `email_encryption` varchar(100) DEFAULT NULL,
  `smtp_user` varchar(100) DEFAULT NULL,
  `smtp_pass` varchar(100) DEFAULT NULL,
  `from_email` varchar(100) DEFAULT NULL,
  `from_name` varchar(100) DEFAULT NULL,
  `time_zone` varchar(100) DEFAULT NULL,
  `is_smtp` tinyint(4) NOT NULL DEFAULT 0,
  `version` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lazy_baner` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `og_baner` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `horizontal_adds1` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `copyright_text` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `adress` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `prokashok` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sompadok` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `barta_sompadok` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `notice_text` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `facebook_page_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `live_tv` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `epaper_link` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dhaka` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ctg` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rajshahi` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `khulna` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `barishal` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `syleth` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rangpur` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mymensingh` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `header1_728` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `header2_728` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `header3_728` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `header4_728` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `homepageads1_970` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `homepageads2_970` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `homepageads3_970` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `homepageads4_970` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sidebar_ads` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `adsense_code` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `search_console` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sidebar_ads1` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sidebar_adsbig` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `footer_line` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `catergory_side` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `menu_active` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `menu_color` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `menu_color2` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `generalsettings`
--

INSERT INTO `generalsettings` (`id`, `logo`, `footer_logo`, `favicon`, `loader`, `is_loader`, `admin_loader`, `title`, `theme_color`, `footer_color`, `buton_color`, `tags`, `error_photo`, `error_title`, `error_text`, `driver`, `smtp_host`, `smtp_port`, `email_encryption`, `smtp_user`, `smtp_pass`, `from_email`, `from_name`, `time_zone`, `is_smtp`, `version`, `lazy_baner`, `og_baner`, `horizontal_adds1`, `copyright_text`, `adress`, `email`, `phone`, `prokashok`, `sompadok`, `barta_sompadok`, `notice_text`, `facebook_page_url`, `live_tv`, `epaper_link`, `dhaka`, `ctg`, `rajshahi`, `khulna`, `barishal`, `syleth`, `rangpur`, `mymensingh`, `header1_728`, `header2_728`, `header3_728`, `header4_728`, `homepageads1_970`, `homepageads2_970`, `homepageads3_970`, `homepageads4_970`, `sidebar_ads`, `adsense_code`, `search_console`, `sidebar_ads1`, `sidebar_adsbig`, `footer_line`, `catergory_side`, `menu_active`, `menu_color`, `menu_color2`) VALUES
(1, '1781517728IMG_20210120_220405 (1).jpg', '1781517729pngggggggg2.png', '1780943417android-chrome-192x120.png', '1579417347loader.gif', 0, '1603002831loader.gif', 'The Daily Moon', '#ec3c2c', '#38241e', '#0a4466', 'national, sports', '1781044988PicsArt_11-15-01.09.48.jpg', 'Page Not Found!', 'Page Not Found!', 'smtp', 'smtp.gmail.com', '587', 'tls', 'thedailymoo@gmail.com', '0Y*xBK%U_ks6', 'info@thedailymoo.net', 'The Daily Moon', 'Asia/Dhaka', 1, '৭১.৮', '1781007669IMG_20210120_220405 (1).jpg', '1780942407PicsArt_11-15-01.09.48.jpg', '<img alt=\"ad728\" border=\"0\" src=\"https://4.bp.blogspot.com/-0vjyWEgMv-I/V1qVpS7vbRI/AAAAAAAAB70/occVjbuxm14nKSpIOmEWh31q-FhJaXSPwCLcB/s1600/16715760738488333078.gif\" title=\"ad728\">', '© সকল কিছুর স্বত্বাধিকারঃ The Daily Moon', 'Bosila, Muhamadpur, Dhaka, Bangladesh, 1207', 'news@thedailymoon.net', '০১৮৪৯৮৩০০০০', 'মোঃ আব্দুর রশিদ', 'মোঃ নজরুল ইসলাম', 'মোঃ নাইম হোসেন', 'আমাদের ওয়েব সাইটের সার্বিক উন্নয়ন এর কাজ চলছে। কাজ চলাকালীন অবস্থায় , আপনাদের সাময়িকভাবে কিছুটা অসুবিধা হতে পারে এর জন্য আমরা আন্তরিকভাবে দুক্ষিত । আমাদের ওয়েবসাইট উন্নয়নের কাজটি আগামিকাল শেষ হবে। আমাদের সাথে থাকার জন্য ধন্যবাদ।', 'thedailymoonpage', '<iframe width=\"300\" height=\"220\" src=\"https://www.youtube.com/embed/w_jwubVsEdg\" title=\"ইমরানকে হটাতে বেইমানি, কড়ায়-গণ্ডায় হিসাব নিলো জনগণ | Pakistan | Election 2024 | BanglaVision News\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" allowfullscreen></iframe>', 'https://epaper.thedailymoon.net/', '/saradesh/ঢাকা', '/saradesh/চট্টগ্রাম', '/saradesh/রাজশাহী', '/saradesh/খুলনা', '/saradesh/বরিশাল', '/saradesh/সিলেট', '/saradesh/রংপুর', '/saradesh/ময়মনসিংহ', '<img alt=\"ad728\" border=\"0\" src=\"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgSe0pmVufLWngfz587r2D7dohUbe69gqMLZeZc86t-75TVmMbCQPgc7F9vc86JXH-vx1O3P9UNRfSRJ1AH7-uF_nzrP_MpuSPJOUYVT8djrXYBTHJNGM6u5lOxGDpE-aqoUghqofFB0pAFwPUfepMMOOpqTRAmkh0q75wKkCK1a1FEERfc5VJIIIlrOb7n/s728/horizontal5.jpg\" title=\"ad728\">', '<img alt=\"ad728\" border=\"0\" src=\"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjwXwG-gUMjN-ayvGlhS32qSGTVr14sRfdwxZtVyRGumfS1zYuhRqhBuxYU3JEjCAt8Lcn6vK8pR48IrElTGRhkiGRAyPpv2G8JRwjy0KVnSJG6M8IXue34tmmpPMPFQv1YeDWvhEVew1qibjtN57WpzL1YKG5QmhWcv3zwLwNsvCkUboJm_MC9dynRHF4y/s728/horizontal4.png\" title=\"ad728\">', '<img alt=\"ad728\" border=\"0\" src=\"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi2q3jvnSTtcartzHFv62aa2JW0F3yChDdIklOFz3BfEfTByNXVuxaN9zkLl2s_6a7tNfR0JLpa_2Gb1AtjHW7MPBMzJRAx3FpoErd8JMwEwINEGoUwdwkTX38dSL0sJPWsBxm5wQqiGgIE4nnmcBKwmN8gLXL-1puulgXbnQmNO-ZjP0XjMEJ7sXaAnSVL/s16000/horizontal2.png\" title=\"ad728\">', '<img alt=\"ad728\" border=\"0\" src=\"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjwXwG-gUMjN-ayvGlhS32qSGTVr14sRfdwxZtVyRGumfS1zYuhRqhBuxYU3JEjCAt8Lcn6vK8pR48IrElTGRhkiGRAyPpv2G8JRwjy0KVnSJG6M8IXue34tmmpPMPFQv1YeDWvhEVew1qibjtN57WpzL1YKG5QmhWcv3zwLwNsvCkUboJm_MC9dynRHF4y/s728/horizontal4.png\" title=\"ad728\">', '<img alt=\"ad728\" border=\"0\" src=\"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEicpd5jHn65_nWN7eXEfKknexTEUL-OEyacKKUGvnn_KB4k-3XOvXxPWeb95oVt__vcf4qyYJq1DyslPixzYnbarJ_IihV5SJ7AkImmZoPWsH8_Af8Zr3GvVpkz_BsgApqctt3WAFYMUS4TUiFcBXESm6YKGBFJ1a7xyD9j3ZBYkBZbQRDvgy03XPppeI6D/s16000/horizontalbig1.jpg\" title=\"ad728\">', '<img alt=\"ad728\" border=\"0\" src=\"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhVgwki2O2ZzP5feducaTkhS3SJ7e5Yt-RrcKLFUd9ctWka1p9NZYnJJKix5gYdDFUGHsjEY0i227K2N2NZFFNUwRDu0I-u0cmmEn1wI4xvnrbOD9zKTckfa8_yYKXKbFbuj7kFQ9yPAclB21jbjlVBgIywPjNKpINoAaNQjp6eCrALCrfeGYl_S5jAv0XG/s970/horizontalbig2.gif\" title=\"ad728\">', '<img alt=\"ad728\" border=\"0\" src=\"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjj0Do2KlOu68ZtUdl-rNGytfTt1rSbBBI7KQvgqVmScO1HIdRkL83BQUDmhLmvhEyNdnrKqF2fr7LazECEz9R-sajtg6GN7VeI1LM4WOGK4oO18nF8BBR9skViqSWbF2cJuM7T9ksp8YMGHRqA_g8e-tw8U1zPO_RhKo9m1NLfHitpfMd0Ik4xQRDVQFFP/s970/horizontalbig3.gif\" title=\"ad728\">', '<img alt=\"ad728\" border=\"0\" src=\"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg37p8arzYJ3jLgzp9he0n4B3vRqt-VB5BC63EDHhvDvFM90BBoo4xDL5_29yqgnSInrev2cvSIZvalL5BShwvi0Vl4d1stMPpWKlcz_7PIpcK4UG4VLA-YoswL11EtInkB1YoshFLxhrlLbtgDk77bK2KJjrFpg5ugelAj1K47tHal971Z0WZK7uNgkQV5/s970/horizontalbig4.jpg\" title=\"ad728\">', '<img alt=\"ad728\" border=\"0\" src=\"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjJzjUlrsCObpKCcZVhpveAxQXG5s1Nv7C8mxpmZWdgluDF6z5m3aAF7Mth6ycqS-3igAJ7ABRrK4VmPyyb_bqiTyaZqxJEHQ-crCcbbSHF_4NkwF5x96RBTkVdIHroZ1coRw2GqKkuBcdVlxTg7Emga-xb7hX3ZXz035N6v-2P3tLwe8lJRpEucwXHO_zV/s500/vertical.gif\" title=\"ad728\">', '<meta name=\"google-site-verification\" content=\"27TFL9sedPA39difsO1J02G4qVJMOtna3LZv_0K4w6A\" />', '<meta name=\"google-site-verification\" content=\"27TFL9sedPA39difsO1J02G4qVJMOtna3LZv_0K4w6A\" />', '<img alt=\"ad300\" border=\"0\" src=\"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgyMk-a1IiDrExAiwDM6tC8-16cCUsBOMQHVhQDz3K0C122FY9qjdIXD0cRz5qV88Quyxt2kpkXtJM7jlLVdMtAvQ-j-ee8-vy8pG_g81EqToolnx35f4Apr0ZHDx2OR9c24tHmjVAH8HY/s1600/4109857506747772603.gif\" title=\"ad300\">', '<img alt=\"ad600\" border=\"0\" src=\"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi3fzcegHAA-chpBjhde5IZEchD-7BhiTQVV33kYZIFzSMmO0kz5enP_1GMbtrPQPAtQvzRkGKhHO3rNfLWW2JqmWX4fbdxIdPfRwbGgH7FaxGLw90HKDa-Bfnf3uABxV-UCRwBZQIqu1s/s1600/c61aa00070b0ad45d6ed505f9de7cbc3.jpg\" title=\"ad600\">', '#ffffff', '#dbe5ec', '#018cc1', '#e23b2c', '#ea3525');

-- --------------------------------------------------------

--
-- Table structure for table `image_albums`
--

CREATE TABLE `image_albums` (
  `id` int(11) NOT NULL,
  `language_id` int(11) NOT NULL,
  `photo` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `album_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `image_albums`
--

INSERT INTO `image_albums` (`id`, `language_id`, `photo`, `album_name`) VALUES
(5, 1, '173721984417266446331723213920-79e37da61ac9342b79e553f7929e4e54.jpg', 'বীর শহীদ আবু সাইদ'),
(6, 1, '17372198761726644724abu-20240717125217.jpg', 'শহীদ বীর আবু সাইদের কবর'),
(7, 1, '17372199391726644443ak_1723399984.jpg', 'বাংলাদেশি ছাত্র আন্দোলন'),
(8, 1, '17372199691726644500gonobhaban-050824-09-1722853720.jpg', 'জনতার দখলে গণভবন'),
(9, 1, '17372199951726644865Screenshot_8.jpg', 'পানি লাগবে পানি'),
(10, 1, '17372200161726644934Screenshot_9.jpg', 'শহীদ বীর মুগ্ধ'),
(11, 1, '17372200401726645032bmp-20240509232345.jpg', 'বিএনপির মহা সমাবেশ'),
(12, 1, '17372200621726645091Screenshot_1.jpg', 'ইউক্রেন এর দূতাবাস ঘেরাও');

-- --------------------------------------------------------

--
-- Table structure for table `image_categories`
--

CREATE TABLE `image_categories` (
  `id` int(11) NOT NULL,
  `language_id` int(11) NOT NULL,
  `image_album_id` int(11) NOT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `image_categories`
--

INSERT INTO `image_categories` (`id`, `language_id`, `image_album_id`, `name`) VALUES
(1, 2, 1, 'ফ্যাশন'),
(3, 2, 1, 'বাইরে কার্যক্রম'),
(4, 2, 3, 'জানুয়ারী'),
(5, 2, 3, 'ফেব্রুয়ারি'),
(6, 2, 3, 'মার্চ');

-- --------------------------------------------------------

--
-- Table structure for table `image_galleries`
--

CREATE TABLE `image_galleries` (
  `id` int(11) NOT NULL,
  `language_id` int(11) NOT NULL,
  `image_album_id` int(11) NOT NULL,
  `image_category_id` int(11) NOT NULL,
  `gallery` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `languages`
--

CREATE TABLE `languages` (
  `id` int(11) NOT NULL,
  `is_default` tinyint(4) NOT NULL DEFAULT 0,
  `language` varchar(20) DEFAULT NULL,
  `file` varchar(100) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `rtl` varchar(100) DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `languages`
--

INSERT INTO `languages` (`id`, `is_default`, `language`, `file`, `name`, `rtl`, `status`) VALUES
(1, 1, 'বাংলা', '1737183917JExgtHhU.json', '1737183917JExgtHhU', '0', 0);

-- --------------------------------------------------------

--
-- Table structure for table `logos`
--

CREATE TABLE `logos` (
  `id` int(11) NOT NULL,
  `language_id` int(11) NOT NULL,
  `header_logo` varchar(255) DEFAULT NULL,
  `footer_logo` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `logos`
--

INSERT INTO `logos` (`id`, `language_id`, `header_logo`, `footer_logo`) VALUES
(3, 1, '1781081963IMG_20210120_220405 (1).jpg', '1781081963pngggggggg2.png');

-- --------------------------------------------------------

--
-- Table structure for table `pages`
--

CREATE TABLE `pages` (
  `id` int(11) NOT NULL,
  `language_id` int(11) NOT NULL,
  `title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `slug` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `description` text CHARACTER SET utf32 COLLATE utf32_general_ci DEFAULT NULL,
  `placement` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `wbsite_right_column` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `pages`
--

INSERT INTO `pages` (`id`, `language_id`, `title`, `slug`, `description`, `placement`, `status`, `wbsite_right_column`) VALUES
(18, 1, 'শর্ত ও নীতিমালা', 'শর্ত-ও-নীতিমালা', '<span>শর্ত ও নীতিমালা&nbsp;</span><span>শর্ত ও নীতিমালা&nbsp;</span><span>শর্ত ও নীতিমালা</span>', 'footer', 1, 1),
(19, 1, 'গোপনীয়তা নীতি', 'গোপনীয়তা-নীতি', '<span>গোপনীয়তা নীতি&nbsp;</span><span>গোপনীয়তা নীতি&nbsp;</span><span>গোপনীয়তা নীতি&nbsp;</span><span>গোপনীয়তা নীতি</span>', 'footer', 1, 1),
(20, 1, 'আমাদের সম্পর্কে', 'আমাদের-সম্পর্কে', '<span>আমাদের সম্পর্কে&nbsp;</span><span>আমাদের সম্পর্কে</span>', 'footer', 1, 1),
(22, 1, 'footer-menu-01', 'footer-menu-01', '<div style=\"color: #cccccc;background-color: #1f1f1f;font-family: Consolas, \'Courier New\', monospace;font-weight: normal;font-size: 14px;line-height: 19px;white-space: pre;\"><div><span style=\"color: #ce9178;\">footer-menu-01</span></div></div><br>', NULL, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `personality_answers`
--

CREATE TABLE `personality_answers` (
  `id` int(11) NOT NULL,
  `personality_question_id` int(11) NOT NULL,
  `answer_title` varchar(255) DEFAULT NULL,
  `answer_photo` varchar(255) DEFAULT NULL,
  `answer_option` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `personality_answers`
--

INSERT INTO `personality_answers` (`id`, `personality_question_id`, `answer_title`, `answer_photo`, `answer_option`) VALUES
(188, 88, 'gfhf', '1673856936IrRAMUYT.jpg', '1'),
(189, 88, 'gfhf', '1673856936M4cBZtfC.jpg', '1');

-- --------------------------------------------------------

--
-- Table structure for table `personality_questions`
--

CREATE TABLE `personality_questions` (
  `id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `question_title` varchar(255) DEFAULT NULL,
  `question_photo` varchar(255) DEFAULT NULL,
  `question_description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `personality_questions`
--

INSERT INTO `personality_questions` (`id`, `post_id`, `question_title`, `question_photo`, `question_description`) VALUES
(88, 468, 'fghgfh', NULL, 'fghgf');

-- --------------------------------------------------------

--
-- Table structure for table `personality_results`
--

CREATE TABLE `personality_results` (
  `id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `result_title` varchar(255) DEFAULT NULL,
  `result_photo` varchar(255) DEFAULT NULL,
  `result_description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `personality_results`
--

INSERT INTO `personality_results` (`id`, `post_id`, `result_title`, `result_photo`, `result_description`) VALUES
(76, 468, 'ghgfhf', NULL, 'fghgfh');

-- --------------------------------------------------------

--
-- Table structure for table `poll_answers`
--

CREATE TABLE `poll_answers` (
  `id` int(11) NOT NULL,
  `poll_question_id` int(11) NOT NULL,
  `poll_option` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `poll_answers`
--

INSERT INTO `poll_answers` (`id`, `poll_question_id`, `poll_option`) VALUES
(93, 20, 'হ্যাঁ'),
(94, 20, 'না'),
(95, 20, 'মন্তব্য নেই');

-- --------------------------------------------------------

--
-- Table structure for table `poll_questions`
--

CREATE TABLE `poll_questions` (
  `id` int(11) NOT NULL,
  `language_id` int(11) NOT NULL,
  `question` varchar(191) DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `end_date` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `poll_questions`
--

INSERT INTO `poll_questions` (`id`, `language_id`, `question`, `status`, `end_date`, `created_at`, `updated_at`) VALUES
(20, 1, 'বাস-ট্রাক থেকে চাঁদা নেওয়া পুলিশ সদস্যদের বিরুদ্ধে ব্যবস্থা নেওয়া হবে বলে মনে করেন কি?', 1, '2026-06-29 18:24:01', '2026-06-09 12:25:04', '2026-06-14 00:13:56');

-- --------------------------------------------------------

--
-- Table structure for table `poll_results`
--

CREATE TABLE `poll_results` (
  `id` int(11) NOT NULL,
  `poll_question_id` int(11) NOT NULL,
  `poll_answer_id` int(11) NOT NULL,
  `ip_address` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `poll_results`
--

INSERT INTO `poll_results` (`id`, `poll_question_id`, `poll_answer_id`, `ip_address`) VALUES
(18, 10, 32, '::1'),
(19, 11, 35, '::1'),
(20, 8, 25, '::1'),
(21, 14, 62, '::1'),
(22, 15, 68, '::1'),
(23, 19, 84, '103.127.4.242'),
(24, 19, 85, '::1');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `language_id` int(11) DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `slug` varchar(100) DEFAULT NULL,
  `post_type` varchar(100) DEFAULT NULL,
  `meta_tag` text DEFAULT NULL,
  `show_right_column` tinyint(4) NOT NULL DEFAULT 0,
  `is_feature` tinyint(4) NOT NULL DEFAULT 0,
  `is_slider` tinyint(4) NOT NULL DEFAULT 0,
  `slider_left` tinyint(4) NOT NULL DEFAULT 0,
  `slider_right` tinyint(4) NOT NULL DEFAULT 0,
  `is_trending` tinyint(4) NOT NULL DEFAULT 0,
  `is_videoGallery` tinyint(1) DEFAULT 0,
  `description` text DEFAULT NULL,
  `image_big` varchar(191) DEFAULT NULL,
  `rss_image` varchar(191) DEFAULT NULL,
  `image_small` varchar(191) DEFAULT NULL,
  `video` varchar(255) DEFAULT NULL,
  `embed_video` text DEFAULT NULL,
  `audio` varchar(255) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `subcategories_id` int(11) DEFAULT NULL,
  `schedule_post` tinyint(4) NOT NULL DEFAULT 0,
  `schedule_post_date` timestamp NULL DEFAULT NULL,
  `is_pending` tinyint(4) NOT NULL DEFAULT 0,
  `admin_id` int(11) NOT NULL DEFAULT 0,
  `user_id` int(11) DEFAULT 0,
  `status` enum('true','false','draft') DEFAULT 'false',
  `is_draft` tinyint(4) NOT NULL DEFAULT 0,
  `rss_link` varchar(191) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL,
  `short_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `images_caption` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `language_id`, `title`, `slug`, `post_type`, `meta_tag`, `show_right_column`, `is_feature`, `is_slider`, `slider_left`, `slider_right`, `is_trending`, `is_videoGallery`, `description`, `image_big`, `rss_image`, `image_small`, `video`, `embed_video`, `audio`, `category_id`, `subcategories_id`, `schedule_post`, `schedule_post_date`, `is_pending`, `admin_id`, `user_id`, `status`, `is_draft`, `rss_link`, `created_at`, `updated_at`, `short_description`, `images_caption`) VALUES
(1, 1, 'চাঁপাইনবাবগঞ্জের সীমান্তে আবার উত্তেজনা, হামলায় ৩ বাংলাদেশি আহত', 'চাঁপাইনবাবগঞ্জের-সীমান্তে-আবার-উত্তেজনা,-হামলায়-৩-বাংলাদেশি-আহত', 'article', 'চাঁপাইনবাবগঞ্জের সীমান্তে আবার উত্তেজনা, হামলায় ৩ বাংলাদেশি আহত', 0, 1, 1, 0, 1, 1, 0, '<div><span style=\"font-size: 14px;\">চাঁপাইনবাবগঞ্জের শিবগঞ্জ উপজেলার চৌকা সীমান্তে আবার উত্তেজনা দেখা দিয়েছে। আজ শনিবার দুপুরে উপজেলার বিনোদপুর ইউনিয়নের চৌকা ও কিরণগঞ্জ বিজিবি সীমান্ত ফাঁড়ির মাঝামাঝি এলাকায় এ উত্তেজনা দেখা দেয়।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">দুপুর থেকে বাংলাদেশ ও ভারতীয় সীমান্তে দুই দেশের নাগরিকেরা জড়ো হয়ে বিক্ষোভ করছেন। এ সময় ভারতীয় নাগরিকদের হামলায় তিন বাংলাদেশি আহত হয়েছেন বলে অভিযোগ পাওয়া গেছে।</span></div><div><span style=\"font-size: 14px;\">এর আগে চৌকা সীমান্তের ওপারে ভারতের সুখদেবপুর সীমান্তে ভারতীয় সীমান্তরক্ষী বাহিনীর (বিএসএফ) কাঁটাতারের বেড়া নির্মাণ নিয়ে কয়েক দিন ধরে উত্তেজনা বিরাজ করেছিল। তখন চৌকা সীমান্তে বর্ডার গার্ড বাংলাদেশ (বিজিবি) ও বিএসএফের মধ্যে ব্যাটালিয়ন কমান্ডার পর্যায়ে পতাকা বৈঠক হয়েছিল।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">সীমান্তের বাসিন্দারা জানান, আজ দুপুরে সীমান্তে শূন্যরেখার পাশে বাংলাদেশের ভেতরের জমিতে গম কাটতে গিয়েছিলেন তাঁরা। তখন ভারতীয় নাগরিকেরা এসে বাংলাদেশের ভেতরের কয়েকটি আমগাছ কেটে দেন। এ নিয়ে বাংলাদেশ ও ভারতের নাগরিকদের মধ্যে পাল্টাপাল্টি ধাওয়া শুরু হয়। এ সময় ভারতীয় নাগরিকদের হাঁসুয়ার আঘাতে ও তাঁদের ছোড়া পাথরে কয়েকজন বাংলাদেশি আহত হন।</span></div><div><span style=\"font-size: 14px;\">স্থানীয় বিনোদপুর ইউনিয়ন পরিষদের (ইউপি) সদস্য মো. বাদশা প্রথম আলোকে বলেন, সীমান্তে গম কাটা নিয়ে উত্তেজনা শুরু হয়। ভারতীয় লোকজন বাংলাদেশ অংশে ঢুকে পড়লে উভয় পক্ষের মধ্যে পাল্টাপাল্টি ধাওয়া শুরু হয়। এতে তিন বাংলাদেশি আহত হয়েছেন।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">ভারতীয়দের হাঁসুয়ার আঘাতে আহত হয়েছেন বিনোদপুর ইউনিয়নের কালীগঞ্জ নামোটোলা এলাকার যুবক মেসবাহুল হক। তিনি বলেন, তিনিসহ মোট তিনজন আহত হয়েছেন। অন্য দুজনের মধ্যে বিশ্বনাথপুর গ্রামের মো. রনি ভারতীয়দের ছোড়া পাথরের আঘাতে ও মো. ফারুক হাঁসুয়ার আঘাতে আহত হয়েছেন।</span></div>', '1737204417fiM7Ihoq.jpg', NULL, NULL, NULL, NULL, NULL, 2, 14, 0, NULL, 0, 1, 0, 'true', 0, NULL, '2026-06-14 05:46:36', '2025-01-18 21:50:40', 'চাঁপাইনবাবগঞ্জের শিবগঞ্জ উপজেলার চৌকা সীমান্তে আবার উত্তেজনা দেখা দিয়েছে। আজ শনিবার দুপুরে উপজেলার বিনোদপুর ইউনিয়নের চৌকা ও কিরণগঞ্জ বিজিবি সীমান্ত ফাঁড়ির মাঝামাঝি এলাকায় এ উত্তেজনা দেখা দেয়।দুপুর থেকে বাংলাদেশ ও ভারতীয় সীমান্তে দুই দেশের নাগরিকেরা জড়ো হয়ে বিক্ষোভ করছেন। এ সময় ভারতীয় নাগরিকদের হামলায় তিন বাংলাদেশি আহত হয়েছেন বলে অভিযোগ পাওয়া গেছে।', NULL),
(2, 1, 'অবিবেচনাপ্রসূতভাবে ভ্যাটের হার বাড়ানো হয়েছে: দেবপ্রিয়', 'অবিবেচনাপ্রসূতভাবে-ভ্যাটের-হার-বাড়ানো-হয়েছে:-দেবপ্রিয়', 'article', 'অবিবেচনাপ্রসূতভাবে ভ্যাটের হার বাড়ানো হয়েছে: দেবপ্রিয়', 0, 1, 1, 0, 1, 1, 0, '<div><span style=\"font-size: 14px;\">অবিবেচনাপ্রসূতভাবে ভ্যাটের হার বাড়ানো হয়েছে বলে মন্তব্য করেছেন সেন্টার ফর পলিসি ডায়ালগের (সিপিডি) সম্মাননীয় ফেলো ও এসডিজি বাস্তবায়নে নাগরিক প্ল্যাটফর্মের আহ্বায়ক দেবপ্রিয় ভট্টাচার্য। তিনি বলেন, রাজস্ব আদায় বাড়াতে প্রত্যক্ষ করে মনোযোগ দেওয়া দরকার হলেও অন্তর্বর্তী সরকার আগের মতোই পরোক্ষ করে নজর দিচ্ছে। বিষয়টি উদ্বেগজনক।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">আজ শনিবার ঢাকায় বঙ্গবন্ধু আন্তর্জাতিক সম্মেলন কেন্দ্রে ‘শ্বেতপত্র ও অতঃপর: অর্থনৈতিক ব্যবস্থাপনা, সংস্কার ও জাতীয় বাজেট’ শীর্ষক এক সিম্পোজিয়ামে দেবপ্রিয় ভট্টাচার্য এসব কথা বলেন। তিনি বাংলাদেশের অর্থনীতির অবস্থা নিয়ে শ্বেতপত্রবিষয়ক কমিটির প্রধান। দিনব্যাপী অনুষ্ঠিত এই সিম্পোজিয়ামের প্রথম অধিবেশনে সম্মানিত অতিথি ছিলেন বাণিজ্য উপদেষ্টা শেখ বশিরউদ্দীন এবং বাংলাদেশ বিনিয়োগ উন্নয়ন কর্তৃপক্ষের (বিডা) নির্বাহী চেয়ারম্যান চৌধুরী আশিক মাহমুদ বিন হারুন।</span></div><div><span style=\"font-size: 14px;\">অবিবেচনাপ্রসূতভাবে ভ্যাটের হার বাড়ানো হয়েছে বলে মন্তব্য করেছেন সেন্টার ফর পলিসি ডায়ালগের (সিপিডি) সম্মাননীয় ফেলো ও এসডিজি বাস্তবায়নে নাগরিক প্ল্যাটফর্মের আহ্বায়ক দেবপ্রিয় ভট্টাচার্য। তিনি বলেন, রাজস্ব আদায় বাড়াতে প্রত্যক্ষ করে মনোযোগ দেওয়া দরকার হলেও অন্তর্বর্তী সরকার আগের মতোই পরোক্ষ করে নজর দিচ্ছে। বিষয়টি উদ্বেগজনক।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">আজ শনিবার ঢাকায় বঙ্গবন্ধু আন্তর্জাতিক সম্মেলন কেন্দ্রে ‘শ্বেতপত্র ও অতঃপর: অর্থনৈতিক ব্যবস্থাপনা, সংস্কার ও জাতীয় বাজেট’ শীর্ষক এক সিম্পোজিয়ামে দেবপ্রিয় ভট্টাচার্য এসব কথা বলেন। তিনি বাংলাদেশের অর্থনীতির অবস্থা নিয়ে শ্বেতপত্রবিষয়ক কমিটির প্রধান। দিনব্যাপী অনুষ্ঠিত এই সিম্পোজিয়ামের প্রথম অধিবেশনে সম্মানিত অতিথি ছিলেন বাণিজ্য উপদেষ্টা শেখ বশিরউদ্দীন এবং বাংলাদেশ বিনিয়োগ উন্নয়ন কর্তৃপক্ষের (বিডা) নির্বাহী চেয়ারম্যান চৌধুরী আশিক মাহমুদ বিন হারুন।</span></div><div><span style=\"font-size: 14px;\">অবিবেচনাপ্রসূতভাবে ভ্যাটের হার বাড়ানো হয়েছে বলে মন্তব্য করেছেন সেন্টার ফর পলিসি ডায়ালগের (সিপিডি) সম্মাননীয় ফেলো ও এসডিজি বাস্তবায়নে নাগরিক প্ল্যাটফর্মের আহ্বায়ক দেবপ্রিয় ভট্টাচার্য। তিনি বলেন, রাজস্ব আদায় বাড়াতে প্রত্যক্ষ করে মনোযোগ দেওয়া দরকার হলেও অন্তর্বর্তী সরকার আগের মতোই পরোক্ষ করে নজর দিচ্ছে। বিষয়টি উদ্বেগজনক।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">আজ শনিবার ঢাকায় বঙ্গবন্ধু আন্তর্জাতিক সম্মেলন কেন্দ্রে ‘শ্বেতপত্র ও অতঃপর: অর্থনৈতিক ব্যবস্থাপনা, সংস্কার ও জাতীয় বাজেট’ শীর্ষক এক সিম্পোজিয়ামে দেবপ্রিয় ভট্টাচার্য এসব কথা বলেন। তিনি বাংলাদেশের অর্থনীতির অবস্থা নিয়ে শ্বেতপত্রবিষয়ক কমিটির প্রধান। দিনব্যাপী অনুষ্ঠিত এই সিম্পোজিয়ামের প্রথম অধিবেশনে সম্মানিত অতিথি ছিলেন বাণিজ্য উপদেষ্টা শেখ বশিরউদ্দীন এবং বাংলাদেশ বিনিয়োগ উন্নয়ন কর্তৃপক্ষের (বিডা) নির্বাহী চেয়ারম্যান চৌধুরী আশিক মাহমুদ বিন হারুন।</span></div>', '1737209486bhpZVnJm.jpg', NULL, NULL, NULL, NULL, NULL, 2, 15, 0, NULL, 0, 1, 0, 'true', 0, NULL, '2026-06-14 05:46:36', '2025-01-18 22:11:26', 'অবিবেচনাপ্রসূতভাবে ভ্যাটের হার বাড়ানো হয়েছে বলে মন্তব্য করেছেন সেন্টার ফর পলিসি ডায়ালগের (সিপিডি) সম্মাননীয় ফেলো ও এসডিজি বাস্তবায়নে নাগরিক প্ল্যাটফর্মের আহ্বায়ক দেবপ্রিয় ভট্টাচার্য। তিনি বলেন, রাজস্ব আদায় বাড়াতে প্রত্যক্ষ করে মনোযোগ দেওয়া দরকার হলেও অন্তর্বর্তী সরকার আগের মতোই পরোক্ষ করে নজর দিচ্ছে। বিষয়টি উদ্বেগজনক।', NULL),
(3, 1, 'খায়রুল কবির খোকন বললেন, ‘তারেক রহমানই সরকার পতন আন্দোলনের মাস্টারমাইন্ড’', 'খায়রুল-কবির-খোকন-বললেন,-‘তারেক-রহমানই-সরকার-পতন-আন্দোলনের-মাস্টারমাইন্ড’', 'article', 'খায়রুল কবির খোকন বললেন, ‘তারেক রহমানই সরকার পতন আন্দোলনের মাস্টারমাইন্ড’', 0, 1, 1, 0, 1, 1, 0, '<div><span style=\"font-size: 14px;\">বিএনপির ভারপ্রাপ্ত চেয়ারম্যান তারেক রহমানই সরকার পতন আন্দোলনের ‘মাস্টারমাইন্ড’ বলে মন্তব্য করেছেন দলটির যুগ্ম মহাসচিব খায়রুল কবির (খোকন)। আজ শনিবার দুপুরে নরসিংদী জেলা বিএনপি কার্যালয়ে জিয়াউর রহমানের জন্মবার্ষিকী উপলক্ষে শীতার্তদের মধ্যে কম্বল বিতরণ কর্মসূচিতে এ মন্তব্য করেন তিনি।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">খায়রুল কবির খোকন বলেন, বৈষম্যবিরোধী ছাত্র আন্দোলনকারীরা সরকার পতনের আন্দোলন করেননি। তাঁরা কোটা আন্দোলন করেছিলেন। তাঁরা ৩ আগস্টে এক দফা আন্দোলনে গিয়েছিলেন। এর অনেক আগেই বিএনপি সরকার পতনের এক দফা আন্দোলনে ছিল। সরকার পতনের আন্দোলনের ‘মাস্টারমাইন্ড’ তাই তারেক রহমান। তিনি নেপথ্যের কারিগর না, প্রকাশ্যের কারিগর। তিনি ছয় হাজার কিলোমিটার দূরে থেকেও বাংলাদেশের জনগণের পাশে থেকেছেন।</span></div><div><span style=\"font-size: 14px;\">বিএনপির ভারপ্রাপ্ত চেয়ারম্যান তারেক রহমানই সরকার পতন আন্দোলনের ‘মাস্টারমাইন্ড’ বলে মন্তব্য করেছেন দলটির যুগ্ম মহাসচিব খায়রুল কবির (খোকন)। আজ শনিবার দুপুরে নরসিংদী জেলা বিএনপি কার্যালয়ে জিয়াউর রহমানের জন্মবার্ষিকী উপলক্ষে শীতার্তদের মধ্যে কম্বল বিতরণ কর্মসূচিতে এ মন্তব্য করেন তিনি।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">খায়রুল কবির খোকন বলেন, বৈষম্যবিরোধী ছাত্র আন্দোলনকারীরা সরকার পতনের আন্দোলন করেননি। তাঁরা কোটা আন্দোলন করেছিলেন। তাঁরা ৩ আগস্টে এক দফা আন্দোলনে গিয়েছিলেন। এর অনেক আগেই বিএনপি সরকার পতনের এক দফা আন্দোলনে ছিল। সরকার পতনের আন্দোলনের ‘মাস্টারমাইন্ড’ তাই তারেক রহমান। তিনি নেপথ্যের কারিগর না, প্রকাশ্যের কারিগর। তিনি ছয় হাজার কিলোমিটার দূরে থেকেও বাংলাদেশের জনগণের পাশে থেকেছেন।</span></div><div><span style=\"font-size: 14px;\">বিএনপির ভারপ্রাপ্ত চেয়ারম্যান তারেক রহমানই সরকার পতন আন্দোলনের ‘মাস্টারমাইন্ড’ বলে মন্তব্য করেছেন দলটির যুগ্ম মহাসচিব খায়রুল কবির (খোকন)। আজ শনিবার দুপুরে নরসিংদী জেলা বিএনপি কার্যালয়ে জিয়াউর রহমানের জন্মবার্ষিকী উপলক্ষে শীতার্তদের মধ্যে কম্বল বিতরণ কর্মসূচিতে এ মন্তব্য করেন তিনি।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">খায়রুল কবির খোকন বলেন, বৈষম্যবিরোধী ছাত্র আন্দোলনকারীরা সরকার পতনের আন্দোলন করেননি। তাঁরা কোটা আন্দোলন করেছিলেন। তাঁরা ৩ আগস্টে এক দফা আন্দোলনে গিয়েছিলেন। এর অনেক আগেই বিএনপি সরকার পতনের এক দফা আন্দোলনে ছিল। সরকার পতনের আন্দোলনের ‘মাস্টারমাইন্ড’ তাই তারেক রহমান। তিনি নেপথ্যের কারিগর না, প্রকাশ্যের কারিগর। তিনি ছয় হাজার কিলোমিটার দূরে থেকেও বাংলাদেশের জনগণের পাশে থেকেছেন।</span></div>', '1737209614RIN6gLVd.jpg', NULL, NULL, NULL, NULL, NULL, 3, 11, 0, NULL, 0, 1, 0, 'true', 0, NULL, '2026-06-14 05:46:36', '2025-01-18 22:13:35', 'বিএনপির ভারপ্রাপ্ত চেয়ারম্যান তারেক রহমানই সরকার পতন আন্দোলনের ‘মাস্টারমাইন্ড’ বলে মন্তব্য করেছেন দলটির যুগ্ম মহাসচিব খায়রুল কবির (খোকন)। আজ শনিবার দুপুরে নরসিংদী জেলা বিএনপি কার্যালয়ে জিয়াউর রহমানের জন্মবার্ষিকী উপলক্ষে শীতার্তদের মধ্যে কম্বল বিতরণ কর্মসূচিতে এ মন্তব্য করেন তিনি।', NULL),
(4, 1, 'বরিশালে এক নবজাতককে ৩ দিন ধরে পাওয়া যাচ্ছে না, মায়ের বিরুদ্ধে অভিযোগ বাবার', 'বরিশালে-এক-নবজাতককে-৩-দিন-ধরে-পাওয়া-যাচ্ছে-না,-মায়ের-বিরুদ্ধে-অভিযোগ-বাবার', 'article', 'বরিশালে এক নবজাতককে ৩ দিন ধরে পাওয়া যাচ্ছে না, মায়ের বিরুদ্ধে অভিযোগ বাবার', 0, 1, 1, 0, 1, 1, 0, '<div><span style=\"font-size: 14px;\">বরিশালে একটি নবজাতককে তিন দিন ধরে খুঁজে পাওয়া যাচ্ছে না। এ ঘটনায় পুলিশের শরণাপন্ন হয়েছেন নবজাতকের বাবা। তিনি বরিশাল মহানগরের কোতোয়ালি থানায় লিখিত অভিযোগ দিয়েছেন।</span>নবজাতকের বাবা সোহেল আহমেদ পিরোজপুরের মঠবাড়িয়া ফায়ার সার্ভিসের স্টেশন কর্মকর্তা হিসেবে কর্মরত আছেন। আর মা ঐশী আক্তার ঝালকাঠির নলছিটি উপজেলার হয়বৎপুর তৌকাঠি সরকারি প্রাথমিক বিদ্যালয়ের সহকারী শিক্ষক।&nbsp;</div><div><br></div><div>ঐশী আক্তার বর্তমানে বরিশালের শের-ই-বাংলা মেডিকেল কলেজ হাসপাতালে চিকিৎসাধীন আছেন। তিনি শারীরিক অসুস্থতা ও বিষণ্নতায় ভুগছেন বলে জানিয়েছে পরিবার।</div><div><span style=\"font-size: 14px;\">বরিশালে একটি নবজাতককে তিন দিন ধরে খুঁজে পাওয়া যাচ্ছে না। এ ঘটনায় পুলিশের শরণাপন্ন হয়েছেন নবজাতকের বাবা। তিনি বরিশাল মহানগরের কোতোয়ালি থানায় লিখিত অভিযোগ দিয়েছেন।</span></div><div><span style=\"font-size: 14px;\">নবজাতকের বাবা সোহেল আহমেদ পিরোজপুরের মঠবাড়িয়া ফায়ার সার্ভিসের স্টেশন কর্মকর্তা হিসেবে কর্মরত আছেন। আর মা ঐশী আক্তার ঝালকাঠির নলছিটি উপজেলার হয়বৎপুর তৌকাঠি সরকারি প্রাথমিক বিদ্যালয়ের সহকারী শিক্ষক। ঐশী আক্তার বর্তমানে বরিশালের শের-ই-বাংলা মেডিকেল কলেজ হাসপাতালে চিকিৎসাধীন আছেন। তিনি শারীরিক অসুস্থতা ও বিষণ্নতায় ভুগছেন বলে জানিয়েছে পরিবার।</span></div><div><span style=\"font-size: 14px;\">বরিশালে একটি নবজাতককে তিন দিন ধরে খুঁজে পাওয়া যাচ্ছে না। এ ঘটনায় পুলিশের শরণাপন্ন হয়েছেন নবজাতকের বাবা। তিনি বরিশাল মহানগরের কোতোয়ালি থানায় লিখিত অভিযোগ দিয়েছেন।</span></div><div><span style=\"font-size: 14px;\">নবজাতকের বাবা সোহেল আহমেদ পিরোজপুরের মঠবাড়িয়া ফায়ার সার্ভিসের স্টেশন কর্মকর্তা হিসেবে কর্মরত আছেন। আর মা ঐশী আক্তার ঝালকাঠির নলছিটি উপজেলার হয়বৎপুর তৌকাঠি সরকারি প্রাথমিক বিদ্যালয়ের সহকারী শিক্ষক। ঐশী আক্তার বর্তমানে বরিশালের শের-ই-বাংলা মেডিকেল কলেজ হাসপাতালে চিকিৎসাধীন আছেন। তিনি শারীরিক অসুস্থতা ও বিষণ্নতায় ভুগছেন বলে জানিয়েছে পরিবার।</span></div><div><span style=\"font-size: 14px;\">বরিশালে একটি নবজাতককে তিন দিন ধরে খুঁজে পাওয়া যাচ্ছে না। এ ঘটনায় পুলিশের শরণাপন্ন হয়েছেন নবজাতকের বাবা। তিনি বরিশাল মহানগরের কোতোয়ালি থানায় লিখিত অভিযোগ দিয়েছেন।</span></div><div><span style=\"font-size: 14px;\">নবজাতকের বাবা সোহেল আহমেদ পিরোজপুরের মঠবাড়িয়া ফায়ার সার্ভিসের স্টেশন কর্মকর্তা হিসেবে কর্মরত আছেন। আর মা ঐশী আক্তার ঝালকাঠির নলছিটি উপজেলার হয়বৎপুর তৌকাঠি সরকারি প্রাথমিক বিদ্যালয়ের সহকারী শিক্ষক। ঐশী আক্তার বর্তমানে বরিশালের শের-ই-বাংলা মেডিকেল কলেজ হাসপাতালে চিকিৎসাধীন আছেন। তিনি শারীরিক অসুস্থতা ও বিষণ্নতায় ভুগছেন বলে জানিয়েছে পরিবার।</span></div>', '1737209822aFr7W4gh.jpg', NULL, NULL, NULL, NULL, NULL, 6, 25, 0, NULL, 0, 1, 0, 'true', 0, NULL, '2026-06-14 05:46:36', '2025-01-18 22:17:02', 'বরিশালে একটি নবজাতককে তিন দিন ধরে খুঁজে পাওয়া যাচ্ছে না। এ ঘটনায় পুলিশের শরণাপন্ন হয়েছেন নবজাতকের বাবা। তিনি বরিশাল মহানগরের কোতোয়ালি থানায় লিখিত অভিযোগ দিয়েছেন।নবজাতকের বাবা সোহেল আহমেদ পিরোজপুরের মঠবাড়িয়া ফায়ার সার্ভিসের স্টেশন কর্মকর্তা হিসেবে কর্মরত আছেন। আর মা ঐশী আক্তার ঝালকাঠির নলছিটি উপজেলার হয়বৎপুর তৌকাঠি সরকারি প্রাথমিক বিদ্যালয়ের সহকারী শিক্ষক।', NULL),
(5, 1, 'দেড় থেকে দুই কোটি মানুষকে টিসিবির পণ্য দেওয়া সম্ভব: বাণিজ্য উপদেষ্টা', 'দেড়-থেকে-দুই-কোটি-মানুষকে-টিসিবির-পণ্য-দেওয়া-সম্ভব:-বাণিজ্য-উপদেষ্টা', 'article', 'দেড় থেকে দুই কোটি মানুষকে টিসিবির পণ্য দেওয়া সম্ভব: বাণিজ্য উপদেষ্টা', 0, 1, 1, 0, 1, 1, 0, '<div><span style=\"font-size: 14px;\">ট্রেডিং করপোরেশন অব বাংলাদেশের (টিসিবি) মাধ্যমে দেড় থেকে দুই কোটি মানুষের কাছে সাশ্রয়ী মূল্যে নিত্যপণ্য বিক্রি করা সম্ভব বলে মনে করেন বাণিজ্য উপদেষ্টা শেখ বশিরউদ্দীন। সে ক্ষেত্রে পণ্যগুলোর বিদ্যমান মূল্য সমন্বয় করতে হবে। মূল্য সমন্বয়ের মানে হচ্ছে মূল্য কিছুটা বাড়ানো।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">আজ শনিবার দুপুরে রাজধানীর আগারগাঁওয়ে বঙ্গবন্ধু আন্তর্জাতিক সম্মেলনকেন্দ্রে অনুষ্ঠিত শ্বেতপত্র প্রণয়ন কমিটি আয়োজিত ‘শ্বেতপত্র এবং অতঃপর: অর্থনৈতিক ব্যবস্থাপনা, সংস্কার জাতীয় বাজেট’ শীর্ষক সিম্পোজিয়ামের প্রথম অধিবেশনে সম্মানিত অতিথির বক্তব্যে এ কথা বলেন বাণিজ্য উপদেষ্টা।</span></div><div><span style=\"font-size: 14px;\">ট্রেডিং করপোরেশন অব বাংলাদেশের (টিসিবি) মাধ্যমে দেড় থেকে দুই কোটি মানুষের কাছে সাশ্রয়ী মূল্যে নিত্যপণ্য বিক্রি করা সম্ভব বলে মনে করেন বাণিজ্য উপদেষ্টা শেখ বশিরউদ্দীন। সে ক্ষেত্রে পণ্যগুলোর বিদ্যমান মূল্য সমন্বয় করতে হবে। মূল্য সমন্বয়ের মানে হচ্ছে মূল্য কিছুটা বাড়ানো।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">আজ শনিবার দুপুরে রাজধানীর আগারগাঁওয়ে বঙ্গবন্ধু আন্তর্জাতিক সম্মেলনকেন্দ্রে অনুষ্ঠিত শ্বেতপত্র প্রণয়ন কমিটি আয়োজিত ‘শ্বেতপত্র এবং অতঃপর: অর্থনৈতিক ব্যবস্থাপনা, সংস্কার জাতীয় বাজেট’ শীর্ষক সিম্পোজিয়ামের প্রথম অধিবেশনে সম্মানিত অতিথির বক্তব্যে এ কথা বলেন বাণিজ্য উপদেষ্টা।ট্রেডিং করপোরেশন অব বাংলাদেশের (টিসিবি) মাধ্যমে দেড় থেকে দুই কোটি মানুষের কাছে সাশ্রয়ী মূল্যে নিত্যপণ্য বিক্রি করা সম্ভব বলে মনে করেন বাণিজ্য উপদেষ্টা শেখ বশিরউদ্দীন। সে ক্ষেত্রে পণ্যগুলোর বিদ্যমান মূল্য সমন্বয় করতে হবে। মূল্য সমন্বয়ের মানে হচ্ছে মূল্য কিছুটা বাড়ানো।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">আজ শনিবার দুপুরে রাজধানীর আগারগাঁওয়ে বঙ্গবন্ধু আন্তর্জাতিক সম্মেলনকেন্দ্রে অনুষ্ঠিত শ্বেতপত্র প্রণয়ন কমিটি আয়োজিত ‘শ্বেতপত্র এবং অতঃপর: অর্থনৈতিক ব্যবস্থাপনা, সংস্কার জাতীয় বাজেট’ শীর্ষক সিম্পোজিয়ামের প্রথম অধিবেশনে সম্মানিত অতিথির বক্তব্যে এ কথা বলেন বাণিজ্য উপদেষ্টা।</span></div>', '1737210042dyImsrPU.jpg', NULL, NULL, NULL, NULL, NULL, 2, 15, 0, NULL, 0, 1, 0, 'true', 0, NULL, '2026-06-14 05:46:36', '2025-01-18 22:20:42', 'ট্রেডিং করপোরেশন অব বাংলাদেশের (টিসিবি) মাধ্যমে দেড় থেকে দুই কোটি মানুষের কাছে সাশ্রয়ী মূল্যে নিত্যপণ্য বিক্রি করা সম্ভব বলে মনে করেন বাণিজ্য উপদেষ্টা শেখ বশিরউদ্দীন। সে ক্ষেত্রে পণ্যগুলোর বিদ্যমান মূল্য সমন্বয় করতে হবে। মূল্য সমন্বয়ের মানে হচ্ছে মূল্য কিছুটা বাড়ানো।', NULL),
(6, 1, 'বর্তমান সরকারের প্রধান দায়িত্ব শেখ হাসিনাকে ফিরিয়ে এনে বিচারের সম্মুখীন করা: শফিকুল আলম', 'বর্তমান-সরকারের-প্রধান-দায়িত্ব-শেখ-হাসিনাকে-ফিরিয়ে-এনে-বিচারের-সম্মুখীন-করা:-শফিকুল-আলম', 'article', 'বর্তমান সরকারের প্রধান দায়িত্ব শেখ হাসিনাকে ফিরিয়ে এনে বিচারের সম্মুখীন করা: শফিকুল আলম', 0, 1, 1, 0, 1, 1, 0, '<div><span style=\"font-size: 14px;\">প্রধান উপদেষ্টার প্রেস সচিব শফিকুল আলম বলেছেন, অন্তর্বর্তীকালীন সরকারের প্রধান দায়িত্ব হচ্ছে শেখ হাসিনাকে ফিরিয়ে এনে বিচারের সম্মুখীন করা। আজ শনিবার বেলা সাড়ে ১১টার দিকে কুষ্টিয়া ইসলামী বিশ্ববিদ্যালয়ে অনুষ্ঠিত ‘জুলাই বিপ্লবের আকাঙ্ক্ষা ও গণমাধ্যম’ শীর্ষক সেমিনারে প্রধান আলোচকের বক্তব্যে তিনি এ কথা বলেন।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">শফিকুল আলম বলেন, ‘সারা জাতি যদি সোচ্চার থাকি এবং প্রেশার রাখতে পারি, তাহলে শেখ হাসিনাকে ঠিকই দেশে আনা হবে। তাঁর বাবার খুনিকে যেভাবে খুঁজে খুঁজে নিয়ে আসছেন, ঠিক তেমনি অন্তর্বর্তী সরকার এবং পরবর্তী সরকারের প্রধান দায়িত্ব হবে শেখ হাসিনাকে ফিরিয়ে এনে বিচারের সম্মুখীন করা।’ তিনি বলেন, এর জন্য যত রকমের আন্তর্জাতিক চাপ তৈরি করা যায়, সেটা অন্তর্বর্তীকালীন সরকার করছে।</span></div><div><span style=\"font-size: 14px;\">প্রধান উপদেষ্টার প্রেস সচিব শফিকুল আলম বলেছেন, অন্তর্বর্তীকালীন সরকারের প্রধান দায়িত্ব হচ্ছে শেখ হাসিনাকে ফিরিয়ে এনে বিচারের সম্মুখীন করা। আজ শনিবার বেলা সাড়ে ১১টার দিকে কুষ্টিয়া ইসলামী বিশ্ববিদ্যালয়ে অনুষ্ঠিত ‘জুলাই বিপ্লবের আকাঙ্ক্ষা ও গণমাধ্যম’ শীর্ষক সেমিনারে প্রধান আলোচকের বক্তব্যে তিনি এ কথা বলেন।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">শফিকুল আলম বলেন, ‘সারা জাতি যদি সোচ্চার থাকি এবং প্রেশার রাখতে পারি, তাহলে শেখ হাসিনাকে ঠিকই দেশে আনা হবে। তাঁর বাবার খুনিকে যেভাবে খুঁজে খুঁজে নিয়ে আসছেন, ঠিক তেমনি অন্তর্বর্তী সরকার এবং পরবর্তী সরকারের প্রধান দায়িত্ব হবে শেখ হাসিনাকে ফিরিয়ে এনে বিচারের সম্মুখীন করা।’ তিনি বলেন, এর জন্য যত রকমের আন্তর্জাতিক চাপ তৈরি করা যায়, সেটা অন্তর্বর্তীকালীন সরকার করছে।</span></div>', '1737210420DOW3NIod.jpg', NULL, NULL, NULL, NULL, NULL, 2, 14, 0, NULL, 0, 1, 0, 'true', 0, NULL, '2026-06-14 05:46:36', '2025-01-18 22:27:00', 'প্রধান উপদেষ্টার প্রেস সচিব শফিকুল আলম বলেছেন, অন্তর্বর্তীকালীন সরকারের প্রধান দায়িত্ব হচ্ছে শেখ হাসিনাকে ফিরিয়ে এনে বিচারের সম্মুখীন করা। আজ শনিবার বেলা সাড়ে ১১টার দিকে কুষ্টিয়া ইসলামী বিশ্ববিদ্যালয়ে অনুষ্ঠিত ‘জুলাই বিপ্লবের আকাঙ্ক্ষা ও গণমাধ্যম’ শীর্ষক সেমিনারে প্রধান আলোচকের বক্তব্যে তিনি এ কথা বলেন।', NULL),
(7, 1, 'শিক্ষাপ্রতিষ্ঠানে ‘গোপন রাজনীতি’ নিষিদ্ধের দাবি জানাল ছাত্রদল', 'শিক্ষাপ্রতিষ্ঠানে-‘গোপন-রাজনীতি’-নিষিদ্ধের-দাবি-জানাল-ছাত্রদল', 'article', 'শিক্ষাপ্রতিষ্ঠানে ‘গোপন রাজনীতি’ নিষিদ্ধের দাবি জানাল ছাত্রদল', 0, 1, 1, 0, 1, 1, 0, '<div><span style=\"font-size: 14px;\">দেশের সব শিক্ষাপ্রতিষ্ঠানে ‘আন্ডারগ্রাউন্ড রাজনীতি’ (গোপন ছাত্ররাজনীতি) নিষিদ্ধের দাবি তুলেছে ছাত্রদল। তারা বলছে, বাংলাদেশে আর আন্ডারগ্রাউন্ড রাজনীতির কোনো বাস্তবতা নেই। তারপরও কোনো ছাত্রসংগঠন এ ধরনের কর্মকাণ্ডে লিপ্ত থাকলে মনে করা হবে, তারা একাত্তরের মতো আবারও বড় কোনো ষড়যন্ত্রে লিপ্ত রয়েছে।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">আজ শনিবার বিকেলে ছাত্রদলের ‘মার্চ ফর জাস্টিস’ শীর্ষক কর্মসূচিতে মিছিল পরবর্তী সমাবেশে কেন্দ্রীয় শহীদ মিনারে এসব কথা বলেন নেতারা। ‘ফ্যাসিস্ট শেখ হাসিনার শাসনামলে শিক্ষাপ্রতিষ্ঠানগুলোতে সন্ত্রাসী সংগঠন ছাত্রলীগ কর্তৃক সংঘটিত সন্ত্রাসী কর্মকাণ্ডের যথাযথ বিচার, সন্ত্রাসীদের সাজা নিশ্চিত করা এবং ছাত্র-জনতার গণ-অভ্যুত্থানে ফ্যাসিবাদের দোসর হিসেবে ভূমিকা পালনকারীদের বিরুদ্ধে তদন্ত সাপেক্ষে উপযুক্ত ব্যবস্থা নেওয়ার দাবিতে’ এই কর্মসূচি করেছে ছাত্রদল।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">মিছিলপরবর্তী সমাবেশে সভাপতিত্ব করেন ছাত্রদল সভাপতি রাকিবুল ইসলাম। তিনি বলেন, ‘আজকের এই কর্মসূচি থেকে আনুষ্ঠানিকভাবে আমরা বাংলাদেশের সব শিক্ষাপ্রতিষ্ঠানে আন্ডারগ্রাউন্ড রাজনীতি নিষিদ্ধের দাবি জানাচ্ছি।’</span></div><div><span style=\"font-size: 14px;\">দেশের সব শিক্ষাপ্রতিষ্ঠানে ‘আন্ডারগ্রাউন্ড রাজনীতি’ (গোপন ছাত্ররাজনীতি) নিষিদ্ধের দাবি তুলেছে ছাত্রদল। তারা বলছে, বাংলাদেশে আর আন্ডারগ্রাউন্ড রাজনীতির কোনো বাস্তবতা নেই। তারপরও কোনো ছাত্রসংগঠন এ ধরনের কর্মকাণ্ডে লিপ্ত থাকলে মনে করা হবে, তারা একাত্তরের মতো আবারও বড় কোনো ষড়যন্ত্রে লিপ্ত রয়েছে।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">আজ শনিবার বিকেলে ছাত্রদলের ‘মার্চ ফর জাস্টিস’ শীর্ষক কর্মসূচিতে মিছিল পরবর্তী সমাবেশে কেন্দ্রীয় শহীদ মিনারে এসব কথা বলেন নেতারা। ‘ফ্যাসিস্ট শেখ হাসিনার শাসনামলে শিক্ষাপ্রতিষ্ঠানগুলোতে সন্ত্রাসী সংগঠন ছাত্রলীগ কর্তৃক সংঘটিত সন্ত্রাসী কর্মকাণ্ডের যথাযথ বিচার, সন্ত্রাসীদের সাজা নিশ্চিত করা এবং ছাত্র-জনতার গণ-অভ্যুত্থানে ফ্যাসিবাদের দোসর হিসেবে ভূমিকা পালনকারীদের বিরুদ্ধে তদন্ত সাপেক্ষে উপযুক্ত ব্যবস্থা নেওয়ার দাবিতে’ এই কর্মসূচি করেছে ছাত্রদল।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">মিছিলপরবর্তী সমাবেশে সভাপতিত্ব করেন ছাত্রদল সভাপতি রাকিবুল ইসলাম। তিনি বলেন, ‘আজকের এই কর্মসূচি থেকে আনুষ্ঠানিকভাবে আমরা বাংলাদেশের সব শিক্ষাপ্রতিষ্ঠানে আন্ডারগ্রাউন্ড রাজনীতি নিষিদ্ধের দাবি জানাচ্ছি।’</span></div>', '1737210772nCGRR6P9.jpg', NULL, NULL, NULL, NULL, NULL, 7, NULL, 0, NULL, 0, 1, 0, 'true', 0, NULL, '2026-06-14 05:44:50', '2025-01-18 22:32:52', 'দেশের সব শিক্ষাপ্রতিষ্ঠানে ‘আন্ডারগ্রাউন্ড রাজনীতি’ (গোপন ছাত্ররাজনীতি) নিষিদ্ধের দাবি তুলেছে ছাত্রদল। তারা বলছে, বাংলাদেশে আর আন্ডারগ্রাউন্ড রাজনীতির কোনো বাস্তবতা নেই। তারপরও কোনো ছাত্রসংগঠন এ ধরনের কর্মকাণ্ডে লিপ্ত থাকলে মনে করা হবে, তারা একাত্তরের মতো আবারও বড় কোনো ষড়যন্ত্রে লিপ্ত রয়েছে।', NULL),
(8, 1, 'রিকশাচালককে গুলি করে হত্যা মামলায় কারাগারে চিকিৎসকসহ পাঁচজন', 'রিকশাচালককে-গুলি-করে-হত্যা-মামলায়-কারাগারে-চিকিৎসকসহ-পাঁচজন', 'article', 'রিকশাচালককে গুলি করে হত্যা মামলায় কারাগারে চিকিৎসকসহ পাঁচজন', 0, 1, 1, 0, 1, 1, 0, '<span style=\"font-size: 14px;\">বৈষম্যবিরোধী ছাত্র–জনতার আন্দোলনের সময় রাজধানীর রামপুরায় গুলিবিদ্ধ হয়ে রিকশাচালক ইসমাইলের মৃত্যুর ঘটনায় করা মামলায় একজন চিকিৎসকসহ পাঁচজনকে কারাগারে পাঠানো হয়েছে। তাঁরা সবাই ডেলটা হেলথ কেয়ার নামের একটি ক্লিনিকের কর্মী।পুলিশ ও আদালত–সংশ্লিষ্ট সূত্রগুলো বলছে, গত ১৯ জুলাই বৈষম্যবিরোধী ছাত্র–জনতার আন্দোলনের সময় রাজধানীর রামপুরা এলাকায় গুলিবিদ্ধ হয়ে মারা যান রিকশাচালক ইসমাইল।&nbsp;</span><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">এ ঘটনার মামলায় এক চিকিৎসকসহ পাঁচজনকে গ্রেপ্তার করে আজ আদালতে হাজির করে হাতিরঝিল থানা–পুলিশ। পরে তাঁদের কারাগারে পাঠানোর আদেশ দেন আদালত।পুলিশ ও আদালত–সংশ্লিষ্ট সূত্রগুলো বলছে, গত ১৯ জুলাই বৈষম্যবিরোধী ছাত্র–জনতার আন্দোলনের সময় রাজধানীর রামপুরা এলাকায় গুলিবিদ্ধ হয়ে মারা যান রিকশাচালক ইসমাইল।&nbsp;</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">এ ঘটনার মামলায় এক চিকিৎসকসহ পাঁচজনকে গ্রেপ্তার করে আজ আদালতে হাজির করে হাতিরঝিল থানা–পুলিশ। পরে তাঁদের কারাগারে পাঠানোর আদেশ দেন আদালত।পুলিশ ও আদালত–সংশ্লিষ্ট সূত্রগুলো বলছে, গত ১৯ জুলাই বৈষম্যবিরোধী ছাত্র–জনতার আন্দোলনের সময় রাজধানীর রামপুরা এলাকায় গুলিবিদ্ধ হয়ে মারা যান রিকশাচালক ইসমাইল। এ ঘটনার মামলায় এক চিকিৎসকসহ পাঁচজনকে গ্রেপ্তার করে আজ আদালতে হাজির করে হাতিরঝিল থানা–পুলিশ। পরে তাঁদের কারাগারে পাঠানোর আদেশ দেন আদালত।</span></div>', '1737210990FCdH2m3Q.jpg', NULL, NULL, NULL, NULL, NULL, 2, 14, 0, NULL, 0, 1, 0, 'true', 0, NULL, '2026-06-14 05:46:36', '2025-01-18 22:36:30', 'বৈষম্যবিরোধী ছাত্র–জনতার আন্দোলনের সময় রাজধানীর রামপুরায় গুলিবিদ্ধ হয়ে রিকশাচালক ইসমাইলের মৃত্যুর ঘটনায় করা মামলায় একজন চিকিৎসকসহ পাঁচজনকে কারাগারে পাঠানো হয়েছে। তাঁরা সবাই ডেলটা হেলথ কেয়ার নামের একটি ক্লিনিকের কর্মী।পুলিশ ও আদালত–সংশ্লিষ্ট সূত্রগুলো বলছে, গত ১৯ জুলাই বৈষম্যবিরোধী ছাত্র–জনতার আন্দোলনের সময় রাজধানীর রামপুরা এলাকায় গুলিবিদ্ধ হয়ে মারা যান রিকশাচালক ইসমাইল।', NULL),
(9, 1, 'ছয় মাসের মধ্যে নির্বাচন এক কথায় অবাস্তব এবং অসম্ভব: সারজিস আলম', 'ছয়-মাসের-মধ্যে-নির্বাচন-এক-কথায়-অবাস্তব-এবং-অসম্ভব:-সারজিস-আলম', 'article', 'ছয় মাসের মধ্যে নির্বাচন এক কথায় অবাস্তব এবং অসম্ভব: সারজিস আলম', 0, 1, 1, 0, 1, 1, 0, '<div><span style=\"font-size: 14px;\">জাতীয় নাগরিক কমিটির মুখ্য সংগঠক ও জুলাই শহীদ স্মৃতি ফাউন্ডেশনের সাধারণ সম্পাদক সারজিস আলম বলেছেন, ‘আমরা মনে করি, এত বড় অভ্যুত্থান, এত রক্ত, এত জীবন সামগ্রিক সব কিছুর যে চাওয়া, তা কেবল একটি নির্বাচনের মধ্যে সীমাবদ্ধ না। আমরা অবশ্যই মনে করি, দ্রুত সময়ের মধ্যে নির্বাচনের মাধ্যমে জনগণের যাঁরা প্রতিনিধি হবেন, স্বচ্ছ নির্বাচনের মাধ্যমে তাঁদের কাছে ক্ষমতা যাবে, এতে কোনো সমস্যা নেই। কিন্তু এটা তো এক কথায় অবাস্তব এবং অসম্ভব যে ছয় মাসের মধ্যে নতুন একটি ভোটার তালিকা হালনাগাদ করা, নির্বাচন কমিশনকে ঠিক করা, বিচারব্যবস্থা সংস্কার করা এবং আইনশৃঙ্খলা বাহিনীকে তাদের মূল ভূমিকায় ফিরিয়ে আনা।’</span></div><div><span style=\"font-size: 14px;\">আজ শুক্রবার দুপুরে পঞ্চগড়ের মকবুলার রহমান সরকারি কলেজ মাঠে শীতার্ত ব্যক্তিদের মধ্যে কম্বল বিতরণ শেষে সাংবাদিকদের প্রশ্নের জবাবে তিনি এ কথাগুলো বলেন।</span></div><div><span style=\"font-size: 14px;\">জাতীয় নাগরিক কমিটির মুখ্য সংগঠক ও জুলাই শহীদ স্মৃতি ফাউন্ডেশনের সাধারণ সম্পাদক সারজিস আলম বলেছেন, ‘আমরা মনে করি, এত বড় অভ্যুত্থান, এত রক্ত, এত জীবন সামগ্রিক সব কিছুর যে চাওয়া, তা কেবল একটি নির্বাচনের মধ্যে সীমাবদ্ধ না। আমরা অবশ্যই মনে করি, দ্রুত সময়ের মধ্যে নির্বাচনের মাধ্যমে জনগণের যাঁরা প্রতিনিধি হবেন, স্বচ্ছ নির্বাচনের মাধ্যমে তাঁদের কাছে ক্ষমতা যাবে, এতে কোনো সমস্যা নেই। কিন্তু এটা তো এক কথায় অবাস্তব এবং অসম্ভব যে ছয় মাসের মধ্যে নতুন একটি ভোটার তালিকা হালনাগাদ করা, নির্বাচন কমিশনকে ঠিক করা, বিচারব্যবস্থা সংস্কার করা এবং আইনশৃঙ্খলা বাহিনীকে তাদের মূল ভূমিকায় ফিরিয়ে আনা।’</span></div><div><span style=\"font-size: 14px;\">আজ শুক্রবার দুপুরে পঞ্চগড়ের মকবুলার রহমান সরকারি কলেজ মাঠে শীতার্ত ব্যক্তিদের মধ্যে কম্বল বিতরণ শেষে সাংবাদিকদের প্রশ্নের জবাবে তিনি এ কথাগুলো বলেন।</span></div><div><span style=\"font-size: 14px;\">জাতীয় নাগরিক কমিটির মুখ্য সংগঠক ও জুলাই শহীদ স্মৃতি ফাউন্ডেশনের সাধারণ সম্পাদক সারজিস আলম বলেছেন, ‘আমরা মনে করি, এত বড় অভ্যুত্থান, এত রক্ত, এত জীবন সামগ্রিক সব কিছুর যে চাওয়া, তা কেবল একটি নির্বাচনের মধ্যে সীমাবদ্ধ না। আমরা অবশ্যই মনে করি, দ্রুত সময়ের মধ্যে নির্বাচনের মাধ্যমে জনগণের যাঁরা প্রতিনিধি হবেন, স্বচ্ছ নির্বাচনের মাধ্যমে তাঁদের কাছে ক্ষমতা যাবে, এতে কোনো সমস্যা নেই। কিন্তু এটা তো এক কথায় অবাস্তব এবং অসম্ভব যে ছয় মাসের মধ্যে নতুন একটি ভোটার তালিকা হালনাগাদ করা, নির্বাচন কমিশনকে ঠিক করা, বিচারব্যবস্থা সংস্কার করা এবং আইনশৃঙ্খলা বাহিনীকে তাদের মূল ভূমিকায় ফিরিয়ে আনা।’</span></div><div><span style=\"font-size: 14px;\">আজ শুক্রবার দুপুরে পঞ্চগড়ের মকবুলার রহমান সরকারি কলেজ মাঠে শীতার্ত ব্যক্তিদের মধ্যে কম্বল বিতরণ শেষে সাংবাদিকদের প্রশ্নের জবাবে তিনি এ কথাগুলো বলেন।</span></div><div><br></div>', '1737211189OSaZvr8w.jpg', NULL, NULL, NULL, NULL, NULL, 3, NULL, 0, NULL, 0, 1, 0, 'true', 0, NULL, '2026-06-14 05:44:50', '2025-01-18 22:39:49', 'জাতীয় নাগরিক কমিটির মুখ্য সংগঠক ও জুলাই শহীদ স্মৃতি ফাউন্ডেশনের সাধারণ সম্পাদক সারজিস আলম বলেছেন, ‘আমরা মনে করি, এত বড় অভ্যুত্থান, এত রক্ত, এত জীবন সামগ্রিক সব কিছুর যে চাওয়া, তা কেবল একটি নির্বাচনের মধ্যে সীমাবদ্ধ না। আমরা অবশ্যই মনে করি, দ্রুত সময়ের মধ্যে নির্বাচনের মাধ্যমে জনগণের যাঁরা প্রতিনিধি হবেন, স্বচ্ছ নির্বাচনের মাধ্যমে তাঁদের কাছে ক্ষমতা যাবে, এতে কোনো সমস্যা নেই।', NULL),
(10, 1, '৫৩ বছর দেশ শাসনকারীরা নতুন আশা দেখাতে পারবে না: চরমোনাই পীর', '৫৩-বছর-দেশ-শাসনকারীরা-নতুন-আশা-দেখাতে-পারবে-না:-চরমোনাই-পীর', 'article', '৫৩ বছর দেশ শাসনকারীরা নতুন আশা দেখাতে পারবে না: চরমোনাই পীর', 0, 1, 1, 0, 1, 1, 0, '<div><span style=\"font-size: 14px;\">যারা গত ৫৩ বছরে এ দেশ শাসন করেছে, তারা নতুন করে কোনো আশা দেখাতে পারবে না বলে মন্তব্য করেছেন ইসলামী আন্দোলন বাংলাদেশের আমির (চরমোনাই পীর) মুফতি সৈয়দ মুহাম্মাদ রেজাউল করীম। তিনি বলেছেন, এখন শাসকগোষ্ঠীকে পরিবর্তন করতে হবে। ইসলামকে ক্ষমতায় আনতে হবে।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">আজ শুক্রবার রাজধানীর সোহরাওয়ার্দী উদ্যানে আয়োজিত এক সম্মেলনে প্রধান অতিথির বক্তব্যে তিনি এসব কথা বলেছেন। সেখানে আজ ইসলামী যুব আন্দোলনের ‘৫ম জাতীয় যুব কনভেনশন’ অনুষ্ঠিত হয়।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">মুফতি সৈয়দ মুহাম্মাদ রেজাউল করীম বলেন, আগামী নির্বাচনে ইসলামী নীতি আদর্শ বাস্তবায়নে কাজ করতে হবে। এ জন্য ইসলামের পক্ষে যুবকদের নিয়ে আসতে মাসে কমপক্ষে চারজনকে দাওয়াত দিতে হবে। বাতিলকে পরাজিত করতে হবে। মায়ের কোল খালি করা আর বিদেশে টাকা পাচার করে বেগম পাড়া তৈরির রাজনীতি এ দেশের মানুষ চায় না।</span></div><div><span style=\"font-size: 14px;\">যারা গত ৫৩ বছরে এ দেশ শাসন করেছে, তারা নতুন করে কোনো আশা দেখাতে পারবে না বলে মন্তব্য করেছেন ইসলামী আন্দোলন বাংলাদেশের আমির (চরমোনাই পীর) মুফতি সৈয়দ মুহাম্মাদ রেজাউল করীম। তিনি বলেছেন, এখন শাসকগোষ্ঠীকে পরিবর্তন করতে হবে। ইসলামকে ক্ষমতায় আনতে হবে।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">আজ শুক্রবার রাজধানীর সোহরাওয়ার্দী উদ্যানে আয়োজিত এক সম্মেলনে প্রধান অতিথির বক্তব্যে তিনি এসব কথা বলেছেন। সেখানে আজ ইসলামী যুব আন্দোলনের ‘৫ম জাতীয় যুব কনভেনশন’ অনুষ্ঠিত হয়।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">মুফতি সৈয়দ মুহাম্মাদ রেজাউল করীম বলেন, আগামী নির্বাচনে ইসলামী নীতি আদর্শ বাস্তবায়নে কাজ করতে হবে। এ জন্য ইসলামের পক্ষে যুবকদের নিয়ে আসতে মাসে কমপক্ষে চারজনকে দাওয়াত দিতে হবে। বাতিলকে পরাজিত করতে হবে। মায়ের কোল খালি করা আর বিদেশে টাকা পাচার করে বেগম পাড়া তৈরির রাজনীতি এ দেশের মানুষ চায় না।</span></div>', '17372148908RRSF15H.jpg', NULL, NULL, NULL, NULL, NULL, 3, 13, 0, NULL, 0, 1, 0, 'true', 0, NULL, '2026-06-14 05:46:36', '2025-01-18 23:41:30', 'যারা গত ৫৩ বছরে এ দেশ শাসন করেছে, তারা নতুন করে কোনো আশা দেখাতে পারবে না বলে মন্তব্য করেছেন ইসলামী আন্দোলন বাংলাদেশের আমির (চরমোনাই পীর) মুফতি সৈয়দ মুহাম্মাদ রেজাউল করীম। তিনি বলেছেন, এখন শাসকগোষ্ঠীকে পরিবর্তন করতে হবে। ইসলামকে ক্ষমতায় আনতে হবে।', NULL),
(11, 1, 'অতীতের রাষ্ট্রপরিচালকেরা দুর্নীতি করে আঙুল ফুলে বটগাছ হয়েছেন: চরমোনাই পীর', 'অতীতের-রাষ্ট্রপরিচালকেরা-দুর্নীতি-করে-আঙুল-ফুলে-বটগাছ-হয়েছেন:-চরমোনাই-পীর', 'article', 'অতীতের রাষ্ট্রপরিচালকেরা দুর্নীতি করে আঙুল ফুলে বটগাছ হয়েছেন: চরমোনাই পীর', 0, 1, 1, 0, 1, 1, 0, '<div><span style=\"font-size: 14px;\">ইসলামী আন্দোলন বাংলাদেশের আমির (চরমোনাই পীর) মুফতি সৈয়দ মুহাম্মাদ রেজাউল করীম বলেছেন, ৫৩ বছরের রাষ্ট্রপরিচালকেরা দুর্নীতি করে আঙুল ফুলে বটগাছ হয়েছেন। দেশের অর্থ বিদেশে পাচার করে বাংলাদেশকে তলাবিহীন ঝুড়িতে পরিণত করেছেন।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">আজ শনিবার সকালে রাজধানীর ডিপ্লোমা ইঞ্জিনিয়ার্স ইনস্টিটিউশন মিলনায়তনে এক অনুষ্ঠানে প্রধান অতিথির বক্তব্যে মুফতি সৈয়দ মুহাম্মাদ রেজাউল করীম এ কথা বলেন। সেখানে জাতীয় শিক্ষক ফোরামের কেন্দ্রীয় কাউন্সিল-২০২৫ অনুষ্ঠিত হয়। ইসলামী আন্দোলন বাংলাদেশের এক সংবাদ বিজ্ঞপ্তি এ তথ্য জানানো হয়।ইসলামী আন্দোলন বাংলাদেশের আমির (চরমোনাই পীর) মুফতি সৈয়দ মুহাম্মাদ রেজাউল করীম বলেছেন, ৫৩ বছরের রাষ্ট্রপরিচালকেরা দুর্নীতি করে আঙুল ফুলে বটগাছ হয়েছেন। দেশের অর্থ বিদেশে পাচার করে বাংলাদেশকে তলাবিহীন ঝুড়িতে পরিণত করেছেন।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">আজ শনিবার সকালে রাজধানীর ডিপ্লোমা ইঞ্জিনিয়ার্স ইনস্টিটিউশন মিলনায়তনে এক অনুষ্ঠানে প্রধান অতিথির বক্তব্যে মুফতি সৈয়দ মুহাম্মাদ রেজাউল করীম এ কথা বলেন। সেখানে জাতীয় শিক্ষক ফোরামের কেন্দ্রীয় কাউন্সিল-২০২৫ অনুষ্ঠিত হয়। ইসলামী আন্দোলন বাংলাদেশের এক সংবাদ বিজ্ঞপ্তি এ তথ্য জানানো হয়।ইসলামী আন্দোলন বাংলাদেশের আমির (চরমোনাই পীর) মুফতি সৈয়দ মুহাম্মাদ রেজাউল করীম বলেছেন, ৫৩ বছরের রাষ্ট্রপরিচালকেরা দুর্নীতি করে আঙুল ফুলে বটগাছ হয়েছেন। দেশের অর্থ বিদেশে পাচার করে বাংলাদেশকে তলাবিহীন ঝুড়িতে পরিণত করেছেন।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">আজ শনিবার সকালে রাজধানীর ডিপ্লোমা ইঞ্জিনিয়ার্স ইনস্টিটিউশন মিলনায়তনে এক অনুষ্ঠানে প্রধান অতিথির বক্তব্যে মুফতি সৈয়দ মুহাম্মাদ রেজাউল করীম এ কথা বলেন। সেখানে জাতীয় শিক্ষক ফোরামের কেন্দ্রীয় কাউন্সিল-২০২৫ অনুষ্ঠিত হয়। ইসলামী আন্দোলন বাংলাদেশের এক সংবাদ বিজ্ঞপ্তি এ তথ্য জানানো হয়।ইসলামী আন্দোলন বাংলাদেশের আমির (চরমোনাই পীর) মুফতি সৈয়দ মুহাম্মাদ রেজাউল করীম বলেছেন, ৫৩ বছরের রাষ্ট্রপরিচালকেরা দুর্নীতি করে আঙুল ফুলে বটগাছ হয়েছেন। দেশের অর্থ বিদেশে পাচার করে বাংলাদেশকে তলাবিহীন ঝুড়িতে পরিণত করেছেন।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">আজ শনিবার সকালে রাজধানীর ডিপ্লোমা ইঞ্জিনিয়ার্স ইনস্টিটিউশন মিলনায়তনে এক অনুষ্ঠানে প্রধান অতিথির বক্তব্যে মুফতি সৈয়দ মুহাম্মাদ রেজাউল করীম এ কথা বলেন। সেখানে জাতীয় শিক্ষক ফোরামের কেন্দ্রীয় কাউন্সিল-২০২৫ অনুষ্ঠিত হয়। ইসলামী আন্দোলন বাংলাদেশের এক সংবাদ বিজ্ঞপ্তি এ তথ্য জানানো হয়।</span></div>', '1737215040xIPhd02m.jpg', NULL, NULL, NULL, NULL, NULL, 3, 13, 0, NULL, 0, 1, 0, 'true', 0, NULL, '2026-06-14 05:46:36', '2025-01-18 23:44:00', 'ইসলামী আন্দোলন বাংলাদেশের আমির (চরমোনাই পীর) মুফতি সৈয়দ মুহাম্মাদ রেজাউল করীম বলেছেন, ৫৩ বছরের রাষ্ট্রপরিচালকেরা দুর্নীতি করে আঙুল ফুলে বটগাছ হয়েছেন। দেশের অর্থ বিদেশে পাচার করে বাংলাদেশকে তলাবিহীন ঝুড়িতে পরিণত করেছেন।', NULL),
(12, 1, 'মেহেরবানি করে চাঁদাবাজি করবেন না, রাজশাহীতে কর্মী সম্মেলনে জামায়াতের আমির', 'মেহেরবানি-করে-চাঁদাবাজি-করবেন-না,-রাজশাহীতে-কর্মী-সম্মেলনে-জামায়াতের-আমির', 'article', 'মেহেরবানি করে চাঁদাবাজি করবেন না, রাজশাহীতে কর্মী সম্মেলনে জামায়াতের আমির', 0, 1, 1, 0, 1, 1, 0, '<div><span style=\"font-size: 14px;\">চাঁদাবাজি, দখলদারি থেকে সরে আসার আহ্বান জানিয়ে জামায়াতে ইসলামীর আমির শফিকুর রহমান বলেছেন, ‘মেহেরবানি করে এই কাজটা করবেন না। আমাদের শহীদদের আত্মা কষ্ট পাবে, মানবতা অপমানিত ও লাঞ্ছিত হবে।’</span>আজ শনিবার বেলা সাড়ে ১১টার দিকে রাজশাহী নগরের হাজী মুহাম্মদ মহসীন সরকারি উচ্চবিদ্যালয় মাঠে (ঐতিহাসিক মাদ্রাসা ময়দান) কর্মী সম্মেলনে প্রধান অতিথির বক্তব্যে তিনি এ আহ্বান জানান।</div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">শফিকুর রহমান বলেন, ‘রাজশাহী একটি শিক্ষানগরী। ৫ তারিখের পরে আশা করি রাজশাহীতে কোনো চাঁদাবাজি হয়নি। এখানকার মানুষ ভদ্র, বিনয়ী, সৎ, কেউ চাঁদাবাজি করে না। ঠিক না?’ তাঁর বক্তব্যের জবাবে কর্মীরা বলে ওঠেন, ‘করে করে, চাঁদাবাজি করে।’চাঁদাবাজি, দখলদারি থেকে সরে আসার আহ্বান জানিয়ে জামায়াতে ইসলামীর আমির শফিকুর রহমান বলেছেন, ‘মেহেরবানি করে এই কাজটা করবেন না। আমাদের শহীদদের আত্মা কষ্ট পাবে, মানবতা অপমানিত ও লাঞ্ছিত হবে।’</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">আজ শনিবার বেলা সাড়ে ১১টার দিকে রাজশাহী নগরের হাজী মুহাম্মদ মহসীন সরকারি উচ্চবিদ্যালয় মাঠে (ঐতিহাসিক মাদ্রাসা ময়দান) কর্মী সম্মেলনে প্রধান অতিথির বক্তব্যে তিনি এ আহ্বান জানান।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">শফিকুর রহমান বলেন, ‘রাজশাহী একটি শিক্ষানগরী। ৫ তারিখের পরে আশা করি রাজশাহীতে কোনো চাঁদাবাজি হয়নি। এখানকার মানুষ ভদ্র, বিনয়ী, সৎ, কেউ চাঁদাবাজি করে না। ঠিক না?’ তাঁর বক্তব্যের জবাবে কর্মীরা বলে ওঠেন, ‘করে করে, চাঁদাবাজি করে।’চাঁদাবাজি, দখলদারি থেকে সরে আসার আহ্বান জানিয়ে জামায়াতে ইসলামীর আমির শফিকুর রহমান বলেছেন, ‘মেহেরবানি করে এই কাজটা করবেন না। আমাদের শহীদদের আত্মা কষ্ট পাবে, মানবতা অপমানিত ও লাঞ্ছিত হবে।’</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">আজ শনিবার বেলা সাড়ে ১১টার দিকে রাজশাহী নগরের হাজী মুহাম্মদ মহসীন সরকারি উচ্চবিদ্যালয় মাঠে (ঐতিহাসিক মাদ্রাসা ময়দান) কর্মী সম্মেলনে প্রধান অতিথির বক্তব্যে তিনি এ আহ্বান জানান।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">শফিকুর রহমান বলেন, ‘রাজশাহী একটি শিক্ষানগরী। ৫ তারিখের পরে আশা করি রাজশাহীতে কোনো চাঁদাবাজি হয়নি। এখানকার মানুষ ভদ্র, বিনয়ী, সৎ, কেউ চাঁদাবাজি করে না। ঠিক না?’ তাঁর বক্তব্যের জবাবে কর্মীরা বলে ওঠেন, ‘করে করে, চাঁদাবাজি করে।’</span></div>', '1737215180tIx2awV6.jpg', NULL, NULL, NULL, NULL, NULL, 3, 13, 0, NULL, 0, 1, 0, 'true', 0, NULL, '2026-06-14 05:46:36', '2025-01-18 23:46:20', 'চাঁদাবাজি, দখলদারি থেকে সরে আসার আহ্বান জানিয়ে জামায়াতে ইসলামীর আমির শফিকুর রহমান বলেছেন, ‘মেহেরবানি করে এই কাজটা করবেন না। আমাদের শহীদদের আত্মা কষ্ট পাবে, মানবতা অপমানিত ও লাঞ্ছিত হবে।’আজ শনিবার বেলা সাড়ে ১১টার দিকে রাজশাহী নগরের হাজী মুহাম্মদ মহসীন সরকারি উচ্চবিদ্যালয় মাঠে (ঐতিহাসিক মাদ্রাসা ময়দান) কর্মী সম্মেলনে প্রধান অতিথির বক্তব্যে তিনি এ আহ্বান জানান।', NULL),
(13, 1, 'স্থানীয় সরকার নয়, জাতীয় নির্বাচন আগে চায় বিএনপিসহ বিভিন্ন দল', 'স্থানীয়-সরকার-নয়,-জাতীয়-নির্বাচন-আগে-চায়-বিএনপিসহ-বিভিন্ন-দল', 'article', 'স্থানীয় সরকার নয়, জাতীয় নির্বাচন আগে চায় বিএনপিসহ বিভিন্ন দল', 0, 1, 1, 0, 1, 1, 0, '<div><span style=\"font-size: 14px;\">অতি সাম্প্রতিক এক জরিপ বলছে, দেশের ৬৫ শতাংশ মানুষ আগামী জাতীয় সংসদ নির্বাচনের আগে স্থানীয় সরকারের নির্বাচন চান। তবে বিএনপিসহ বিভিন্ন রাজনৈতিক দল আগে জাতীয় নির্বাচন চায়। দলগুলো মনে করে, এ মুহূর্তে জাতীয় অগ্রাধিকার হচ্ছে সংসদ নির্বাচন অনুষ্ঠান। স্থানীয় সরকারের প্রতিনিধিদের অনুপস্থিতিতে নাগরিক সেবা থেকে বঞ্চিত সাধারণ মানুষ স্থানীয় সরকারের নির্বাচন আগে চাইতে পারেন। কিন্তু এই মত এ সময়ের জন্য মোটেও বাস্তবভিত্তিক নয়।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">তবে জাতীয় নির্বাচনের আগে অন্তর্বর্তী সরকারের অধীনই স্থানীয় সরকার নির্বাচন করার পক্ষে রয়েছে জাতীয় নাগরিক কমিটিসহ বিভিন্ন সংগঠন ও দল। তারা বিবিএসের জরিপের ফলাফলকে যৌক্তিক বলে মনে করছে।অতি সাম্প্রতিক এক জরিপ বলছে, দেশের ৬৫ শতাংশ মানুষ আগামী জাতীয় সংসদ নির্বাচনের আগে স্থানীয় সরকারের নির্বাচন চান। তবে বিএনপিসহ বিভিন্ন রাজনৈতিক দল আগে জাতীয় নির্বাচন চায়। দলগুলো মনে করে, এ মুহূর্তে জাতীয় অগ্রাধিকার হচ্ছে সংসদ নির্বাচন অনুষ্ঠান। স্থানীয় সরকারের প্রতিনিধিদের অনুপস্থিতিতে নাগরিক সেবা থেকে বঞ্চিত সাধারণ মানুষ স্থানীয় সরকারের নির্বাচন আগে চাইতে পারেন। কিন্তু এই মত এ সময়ের জন্য মোটেও বাস্তবভিত্তিক নয়।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">তবে জাতীয় নির্বাচনের আগে অন্তর্বর্তী সরকারের অধীনই স্থানীয় সরকার নির্বাচন করার পক্ষে রয়েছে জাতীয় নাগরিক কমিটিসহ বিভিন্ন সংগঠন ও দল। তারা বিবিএসের জরিপের ফলাফলকে যৌক্তিক বলে মনে করছে।অতি সাম্প্রতিক এক জরিপ বলছে, দেশের ৬৫ শতাংশ মানুষ আগামী জাতীয় সংসদ নির্বাচনের আগে স্থানীয় সরকারের নির্বাচন চান। তবে বিএনপিসহ বিভিন্ন রাজনৈতিক দল আগে জাতীয় নির্বাচন চায়। দলগুলো মনে করে, এ মুহূর্তে জাতীয় অগ্রাধিকার হচ্ছে সংসদ নির্বাচন অনুষ্ঠান। স্থানীয় সরকারের প্রতিনিধিদের অনুপস্থিতিতে নাগরিক সেবা থেকে বঞ্চিত সাধারণ মানুষ স্থানীয় সরকারের নির্বাচন আগে চাইতে পারেন। কিন্তু এই মত এ সময়ের জন্য মোটেও বাস্তবভিত্তিক নয়।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">তবে জাতীয় নির্বাচনের আগে অন্তর্বর্তী সরকারের অধীনই স্থানীয় সরকার নির্বাচন করার পক্ষে রয়েছে জাতীয় নাগরিক কমিটিসহ বিভিন্ন সংগঠন ও দল। তারা বিবিএসের জরিপের ফলাফলকে যৌক্তিক বলে মনে করছে।অতি সাম্প্রতিক এক জরিপ বলছে, দেশের ৬৫ শতাংশ মানুষ আগামী জাতীয় সংসদ নির্বাচনের আগে স্থানীয় সরকারের নির্বাচন চান। তবে বিএনপিসহ বিভিন্ন রাজনৈতিক দল আগে জাতীয় নির্বাচন চায়। দলগুলো মনে করে, এ মুহূর্তে জাতীয় অগ্রাধিকার হচ্ছে সংসদ নির্বাচন অনুষ্ঠান। স্থানীয় সরকারের প্রতিনিধিদের অনুপস্থিতিতে নাগরিক সেবা থেকে বঞ্চিত সাধারণ মানুষ স্থানীয় সরকারের নির্বাচন আগে চাইতে পারেন। কিন্তু এই মত এ সময়ের জন্য মোটেও বাস্তবভিত্তিক নয়।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">তবে জাতীয় নির্বাচনের আগে অন্তর্বর্তী সরকারের অধীনই স্থানীয় সরকার নির্বাচন করার পক্ষে রয়েছে জাতীয় নাগরিক কমিটিসহ বিভিন্ন সংগঠন ও দল। তারা বিবিএসের জরিপের ফলাফলকে যৌক্তিক বলে মনে করছে।</span></div>', '17372152802zG0uIMa.jpg', NULL, NULL, NULL, NULL, NULL, 3, 13, 0, NULL, 0, 1, 0, 'true', 0, NULL, '2026-06-14 05:46:36', '2025-01-18 23:48:00', 'অতি সাম্প্রতিক এক জরিপ বলছে, দেশের ৬৫ শতাংশ মানুষ আগামী জাতীয় সংসদ নির্বাচনের আগে স্থানীয় সরকারের নির্বাচন চান। তবে বিএনপিসহ বিভিন্ন রাজনৈতিক দল আগে জাতীয় নির্বাচন চায়। দলগুলো মনে করে, এ মুহূর্তে জাতীয় অগ্রাধিকার হচ্ছে সংসদ নির্বাচন অনুষ্ঠান। স্থানীয় সরকারের প্রতিনিধিদের অনুপস্থিতিতে নাগরিক সেবা থেকে বঞ্চিত সাধারণ মানুষ স্থানীয় সরকারের নির্বাচন আগে চাইতে পারেন। কিন্তু এই মত এ সময়ের জন্য মোটেও বাস্তবভিত্তিক নয়।', NULL),
(14, 1, 'খালেদা জিয়ার চিকিৎসায় বিশেষজ্ঞ চিকিৎসকদের নিয়ে মেডিকেল বোর্ড গঠন', 'খালেদা-জিয়ার-চিকিৎসায়-বিশেষজ্ঞ-চিকিৎসকদের-নিয়ে-মেডিকেল-বোর্ড-গঠন', 'article', 'খালেদা জিয়ার চিকিৎসায় বিশেষজ্ঞ চিকিৎসকদের নিয়ে মেডিকেল বোর্ড গঠন', 0, 1, 1, 0, 1, 1, 0, '<div><span style=\"font-size: 14px;\">যুক্তরাজ্যের দ্য লন্ডন ক্লিনিকে চিকিৎসাধীন বিএনপি চেয়ারপারসন খালেদা জিয়ার চিকিৎসার জন্য বিশেষজ্ঞ চিকিৎসকদের সমন্বয়ে একটি মেডিকেল বোর্ড গঠন করা হয়েছে। হার্ট, কিডনি, আর্থ্রাইটিস, লিভার ও ডায়াবেটিস–বিশেষজ্ঞদের সমন্বয়ে শুক্রবার এই মেডিকেল বোর্ড গঠন করা হয়।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">তারেক রহমানের পরিবারের সঙ্গে ঘনিষ্ঠ একাধিক সূত্র প্রথম আলোকে এ তথ্য নিশ্চিত করেছে। একটি সূত্র জানায়, মেডিকেল বোর্ড খালেদা জিয়ার স্বাস্থ্যের অবস্থা পর্যালোচনা করছে। এর ভিত্তিতে বিএনপির চেয়ারপারসনের চিকিৎসা শুরু হবে।যুক্তরাজ্যের দ্য লন্ডন ক্লিনিকে চিকিৎসাধীন বিএনপি চেয়ারপারসন খালেদা জিয়ার চিকিৎসার জন্য বিশেষজ্ঞ চিকিৎসকদের সমন্বয়ে একটি মেডিকেল বোর্ড গঠন করা হয়েছে। হার্ট, কিডনি, আর্থ্রাইটিস, লিভার ও ডায়াবেটিস–বিশেষজ্ঞদের সমন্বয়ে শুক্রবার এই মেডিকেল বোর্ড গঠন করা হয়।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">তারেক রহমানের পরিবারের সঙ্গে ঘনিষ্ঠ একাধিক সূত্র প্রথম আলোকে এ তথ্য নিশ্চিত করেছে। একটি সূত্র জানায়, মেডিকেল বোর্ড খালেদা জিয়ার স্বাস্থ্যের অবস্থা পর্যালোচনা করছে। এর ভিত্তিতে বিএনপির চেয়ারপারসনের চিকিৎসা শুরু হবে।যুক্তরাজ্যের দ্য লন্ডন ক্লিনিকে চিকিৎসাধীন বিএনপি চেয়ারপারসন খালেদা জিয়ার চিকিৎসার জন্য বিশেষজ্ঞ চিকিৎসকদের সমন্বয়ে একটি মেডিকেল বোর্ড গঠন করা হয়েছে। হার্ট, কিডনি, আর্থ্রাইটিস, লিভার ও ডায়াবেটিস–বিশেষজ্ঞদের সমন্বয়ে শুক্রবার এই মেডিকেল বোর্ড গঠন করা হয়।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">তারেক রহমানের পরিবারের সঙ্গে ঘনিষ্ঠ একাধিক সূত্র প্রথম আলোকে এ তথ্য নিশ্চিত করেছে। একটি সূত্র জানায়, মেডিকেল বোর্ড খালেদা জিয়ার স্বাস্থ্যের অবস্থা পর্যালোচনা করছে। এর ভিত্তিতে বিএনপির চেয়ারপারসনের চিকিৎসা শুরু হবে।যুক্তরাজ্যের দ্য লন্ডন ক্লিনিকে চিকিৎসাধীন বিএনপি চেয়ারপারসন খালেদা জিয়ার চিকিৎসার জন্য বিশেষজ্ঞ চিকিৎসকদের সমন্বয়ে একটি মেডিকেল বোর্ড গঠন করা হয়েছে। হার্ট, কিডনি, আর্থ্রাইটিস, লিভার ও ডায়াবেটিস–বিশেষজ্ঞদের সমন্বয়ে শুক্রবার এই মেডিকেল বোর্ড গঠন করা হয়।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">তারেক রহমানের পরিবারের সঙ্গে ঘনিষ্ঠ একাধিক সূত্র প্রথম আলোকে এ তথ্য নিশ্চিত করেছে। একটি সূত্র জানায়, মেডিকেল বোর্ড খালেদা জিয়ার স্বাস্থ্যের অবস্থা পর্যালোচনা করছে। এর ভিত্তিতে বিএনপির চেয়ারপারসনের চিকিৎসা শুরু হবে।</span></div>', '1737215372UnEZtfXd.jpg', NULL, NULL, NULL, NULL, NULL, 3, 13, 0, NULL, 0, 1, 0, 'true', 0, NULL, '2026-06-14 05:46:36', '2025-01-18 23:49:32', 'যুক্তরাজ্যের দ্য লন্ডন ক্লিনিকে চিকিৎসাধীন বিএনপি চেয়ারপারসন খালেদা জিয়ার চিকিৎসার জন্য বিশেষজ্ঞ চিকিৎসকদের সমন্বয়ে একটি মেডিকেল বোর্ড গঠন করা হয়েছে। হার্ট, কিডনি, আর্থ্রাইটিস, লিভার ও ডায়াবেটিস–বিশেষজ্ঞদের সমন্বয়ে শুক্রবার এই মেডিকেল বোর্ড গঠন করা হয়।', NULL),
(15, 1, 'প্রেস অ্যাক্রিডিটেশন নীতিমালা পুনর্মূল্যায়নে ১৭ সদস্যের কমিটি', 'প্রেস-অ্যাক্রিডিটেশন-নীতিমালা-পুনর্মূল্যায়নে-১৭-সদস্যের-কমিটি', 'article', 'প্রেস অ্যাক্রিডিটেশন নীতিমালা পুনর্মূল্যায়নে ১৭ সদস্যের কমিটি', 0, 1, 1, 0, 1, 1, 0, '<div>বৃহস্পতিবার (১৬ জানুয়ারি) তথ্য ও সম্প্রচার মন্ত্রণালয় থেকে এ-সংক্রান্ত প্রজ্ঞাপন জারি করা হয়েছে।এতে বলা হয়েছে, প্রধান উপদেষ্টার কার্যালয়ের নির্দেশনা অনুযায়ী প্রেস অ্যাক্রিডিটেশন নীতিমালা ২০২২ পুনর্মূল্যায়নের জন্য এ কমিটি গঠন করা হয়েছে। রাষ্ট্রপতির প্রেস সচিব সরওয়ার আলমকে কমিটির আহ্বায়ক করা হয়েছে। আর সদস্য সচিব হয়েছেন তথ্য অধিদপ্তরের উপপ্রধান তথ্য অফিসার মোহাম্মদ কামরুজ্জামান ভূঁঞা।</div><div><br></div><div>কমিটির সদস্যরা হলেন, তথ্য ও সম্প্রচার মন্ত্রণালয়ের অতিরিক্ত সচিব কাউসার আহাম্মদ, জননিরাপত্তা বিভাগের অতিরিক্ত সচিব আতাউর রহমান খান, তথ্য অধিদপ্তরের প্রধান তথ্য অফিসার নিজামুল কবীর, চলচ্চিত্র ও প্রকাশনা অধিদপ্তরের মহাপরিচালক খালেদা বেগম, প্রধান উপদেষ্টার কার্যালয়ের উপপ্রেস সচিব আবুল কালাম আজাদ মজুমদার, সিনিয়র সহকারী প্রেস সচিব ফয়েজ আহম্মেদ, বিএফইউজে-এর ভারপ্রাপ্ত সভাপতি ওবায়দুর রহমান শাহীন, ডিইউজের সভাপতি শহিদুল ইসলাম, ঢাকা রিপোর্টার্স ইউনিটির সভাপতি আবু সালেহ আকন, ইকোনমিক রিপোর্টার্স ফোরামের সভাপতি দৌলত আক্তার মালা সভাপতি, ব্রডকাস্ট জার্নালিস্ট সেন্টারের ট্রাস্টি ইলিয়াস হোসেন, বাংলাদেশি জার্নালিস্টস ইন ইন্টারন্যাশনাল মিডিয়ার (বিজেআইএম) প্রতিষ্ঠাতা আহ্বায়ক শিকদার আবীর মাহমুদ (স্যাম) জাহান, ডিক্যাব এবং বিএসআরএফের সদস্য মুস্তাফিজুর রহমান, রিপোর্টার্স উইদাউট বর্ডারসের (আরএসএফ) বাংলাদেশ করেসপন্ডেন্ট সালিম সামাদ, বাংলাদেশ ফটোজার্নালিস্ট অ্যাসোসিয়েশনের সভাপতি ইন্দ্রজিৎ কুমার ঘোষ।</div><div><br></div><div>কমিটির কার্যপরিধিতে বলা হয়, প্রেস অ্যাক্রিডিটেশন নীতিমালা-২০২২ পুনর্মূল্যায়ন করে প্রয়োজনীয় সংযোজন, সংশোধন ও পরিমার্জনের বিষয়ে সুপারিশ প্রণয়ন করবে। কমিটি আগামী ১০ ফেব্রুয়ারির মধ্যে তথ্য ও সম্প্রচার মন্ত্রণালয়ের সচিব বরাবর প্রতিবেদন দেবে।</div>', '1737221712MyHNpt14.jpg', NULL, NULL, NULL, NULL, NULL, 10, NULL, 0, NULL, 0, 1, 0, 'true', 0, NULL, '2026-06-14 05:44:50', '2025-01-19 01:35:12', 'বৃহস্পতিবার (১৬ জানুয়ারি) তথ্য ও সম্প্রচার মন্ত্রণালয় থেকে এ-সংক্রান্ত প্রজ্ঞাপন জারি করা হয়েছে।এতে বলা হয়েছে, প্রধান উপদেষ্টার কার্যালয়ের নির্দেশনা অনুযায়ী প্রেস অ্যাক্রিডিটেশন নীতিমালা ২০২২ পুনর্মূল্যায়নের জন্য এ কমিটি গঠন করা হয়েছে। রাষ্ট্রপতির প্রেস সচিব সরওয়ার আলমকে কমিটির আহ্বায়ক করা হয়েছে। আর সদস্য সচিব হয়েছেন তথ্য অধিদপ্তরের উপপ্রধান তথ্য অফিসার মোহাম্মদ কামরুজ্জামান ভূঁঞা।', NULL),
(16, 1, 'আরও ১৪ সাংবাদিকের ব্যাংক হিসাবের তথ্য তলব', 'আরও-১৪-সাংবাদিকের-ব্যাংক-হিসাবের-তথ্য-তলব', 'article', 'আরও ১৪ সাংবাদিকের ব্যাংক হিসাবের তথ্য তলব', 0, 1, 1, 0, 1, 1, 0, '<div>একইসঙ্গে তাদের ব্যক্তি মালিকানাধীন প্রতিষ্ঠানের ব্যাংক হিসাবের তথ্য দেওয়ার নির্দেশনা দেওয়া হয়েছে। ব্যাংক ও আর্থিক প্রতিষ্ঠানগুলোর কাছে এ সংক্রান্ত নির্দেশনা পাঠিয়েছে সংস্থাটি।বুধবার (১৫ জানুয়ারি) বিএফআইইউর সংশ্লিষ্ট এক ঊর্ধ্বতন কর্মকর্তা এ তথ্য নিশ্চিত করেছেন।আগামী সাত কর্মদিবসের মধ্যে এসব তথ্য পাঠাতে হবে বলে চিঠিতে জানিয়েছে বাংলাদেশ ব্যাংকের আর্থিক গোয়েন্দা সংস্থা বিএফআইইউ।</div><div><br></div><div>চিঠিতে বলা হয়, এ ১৪ সাংবাদিকের স্বামী বা স্ত্রী এবং পুত্র-কন্যাসহ তাদের স্বার্থসংশ্লিষ্ট প্রতিষ্ঠানের ব্যাংক হিসাবের তথ্য যেমন হিসাব খোলার ফরম, কেওয়াইসি, লেনদেনের বিবরণীসহ আনুষঙ্গিক তথ্য পাঠাতে হবে।</div><div>তালিকায় থাকা অন্য সাংবাদিকেরা হলেন, বাংলাদেশ জার্নাল’র শাহজান সরদার, ঢাকা ট্রিবিউন’র স্টাফ রিপোর্টার আলী আসিফ শাওন, ফ্রিল্যান্স সাংবাদিক নাদিম কাদির, ডিবিসি নিউজ’র সিনিয়র রিপোর্টার রাজীব ঘোষ ও ডেইলি পিপলস লাইফ’র সম্পাদক মো. আজিজুল হক ভুঁইয়া।</div><div><br></div><div>তালিকায় আরও আছেন, বাংলাদেশ সংবাদ সংস্থার (বাসস) স্পোর্টস ইনচার্জ স্বপন বসু, ডিবিসি নিউজের স্টাফ রিপোর্টার তাহমিদা সাদেক জেসি, চ্যানেল আইয়ের সিনিয়র রিপোর্টার নীলাদ্রি শেখর কুন্ডু, বাংলা টিভির নজরুল কবীর, গাজী টিভির বার্তা সম্পাদক ইকবাল করিম নিশান, গ্রিন টিভির সাজু রহমান ও চ্যানেল নাইনের সাবেক বার্তাপ্রধান আমিনুর রশীদ।</div><div>এর আগে, ৫ জানুয়ারি ২১ সাংবাদিকের ব্যাংক হিসাব তলব করা হয়। তার আগে গত বছরের ৩০ ডিসেম্বর ১২ সাংবাদিকের ব্যাংক হিসাবের তথ্য চেয়ে ব্যাংকগুলোকে চিঠি দিয়েছিল বিএফআইইউ।</div><div><br></div><div>ছাত্র-জনতার অভ্যুত্থানের মুখে গত ৫ আগস্ট প্রধানমন্ত্রীর পদ থেকে পদত্যাগ করে দেশ ছাড়েন শেখ হাসিনা। এর মাধ্যমে টানা ১৬ বছরের আওয়ামী লীগের নজিরবিহীন দুঃশাসন ও স্বেচ্ছাচারিতার অবসান ঘটে। এরপর অন্তর্বর্তীকালীন সরকার আসার পর আওয়ামী লীগ সরকারের অপকর্মের সহযোগী ও নানা অনিয়ম-দুর্নীতির সঙ্গে জড়িত এমন সন্দেহে বেশকিছু পেশাজীবীদের ব্যাংক হিসাব তলব ও জব্দ করে বিএফআইইউ।</div>', '1737221848M1JlfHPw.jpg', NULL, NULL, NULL, NULL, NULL, 10, NULL, 0, NULL, 0, 1, 0, 'true', 0, NULL, '2026-06-14 05:44:50', '2025-01-19 01:37:28', 'একইসঙ্গে তাদের ব্যক্তি মালিকানাধীন প্রতিষ্ঠানের ব্যাংক হিসাবের তথ্য দেওয়ার নির্দেশনা দেওয়া হয়েছে। ব্যাংক ও আর্থিক প্রতিষ্ঠানগুলোর কাছে এ সংক্রান্ত নির্দেশনা পাঠিয়েছে সংস্থাটি।বুধবার (১৫ জানুয়ারি) বিএফআইইউর সংশ্লিষ্ট এক ঊর্ধ্বতন কর্মকর্তা এ তথ্য নিশ্চিত করেছেন।আগামী সাত কর্মদিবসের মধ্যে এসব তথ্য পাঠাতে হবে বলে চিঠিতে জানিয়েছে বাংলাদেশ ব্যাংকের আর্থিক গোয়েন্দা সংস্থা বিএফআইইউ।', NULL),
(17, 1, 'শরীয়তপুর সাংবাদিক সমিতির সভাপতি পলাশ, সম্পাদক মামুন', 'শরীয়তপুর-সাংবাদিক-সমিতির-সভাপতি-পলাশ,-সম্পাদক-মামুন', 'article', 'শরীয়তপুর সাংবাদিক সমিতির সভাপতি পলাশ, সম্পাদক মামুন', 0, 1, 1, 0, 1, 1, 0, '<div>শুক্রবার (১০ জানুয়ারি) রাজধানীর পল্টনস্থ ইকোনমিক রিপোর্টার্স ফোরাম-ইআরএফের কার্যালয়ে সমিতির সদস্যদের প্রত্যক্ষ ভোটে নতুন নেতৃত্বে নির্বাচিত হয়।হাবিবুর রহমান পলাশ তার নিকটতম প্রতিদ্বন্দ্বী চ্যানেল আইয়ের রাজু আলিমকে হারিয়ে সভাপতি ও ওবায়দুল্লাহ মামুন তার নিকটতম প্রতিদ্বন্দ্বী মহিউদ্দিন তুষারকে হারিয়ে সাধারণ সম্পাদক নির্বাচিত হন।</div><div><br></div><div>শরীয়তপুর সাংবাদিক সমিতির অন্য সদস্যরা হলেন, সহ-সভাপতি মনির হোসেন (নয়া দিগন্ত), শাহাদাত হোসেন শাহীন (গণমুক্তি), ফেরদৌস রহমান রূপক (গণমুক্তি), বোরহান উদ্দিন (অর্থকণ্ঠ), মো. খলিলুর রহমান (জনকণ্ঠ) ও যুগ্ম সাধারণ সম্পাদক মো. মাহবুব হোসেন (ডেইলি সান), মোয়াজ্জেম হোসেন বিপুল (এশিয়ান টিভি)।</div><div><br></div><div>সাংগঠনিক সম্পাদক মনির হোসেন তপু (এটিএন বাংলা), সহ-সাংগঠনিক মো. ফয়সাল আহমেদ (ডিবিসি) ও আদনান হাদী (ট্রেন্ডিং নিউজ), দপ্তর সম্পাদক মাহমুদুল হাসান (কালবেলা), তথ্য প্রযুক্তি সম্পাদক যুবায়ের আহমাদ (নিউজ টোয়েন্টিফোর), সমাজ কল্যাণ সম্পাদক বিষয়ক মো. আলী মুবিন (চ্যানেল এস), প্রচার ও প্রকাশনা সম্পাদক জাফর আহমেদ (কালবেলা), ক্রীড়া ও সাংস্কৃতিক সম্পাদক মো. রাজিবুল ইসলাম (ঢাকা জার্নাল), আইন বিষয়ক সম্পাদক এমরুল হাসান বাপ্পী (দ্য ডেইলি স্টার) এবং নারী বিষয়ক সম্পাদক প্রীতিকা ইসলাম (নিউজ টোয়েন্টিফোর)।</div><div><br></div><div>এ ছাড়া কার্যনির্বাহী কমিটির সদস্য নির্বাচিত হয়েছেন মো: জুবায়ের আলম খান রাকেশ (মানবকণ্ঠ), মো. শফিকুজ্জামান রুবেল (সময় টিভি), মদিনা বেগম (এস এ টিভি), মো. আতাউর রহমান মোল্লা (এটিএন নিউজ), মো. আবু তালেব হাসান (মোহনা টিভি), মো. বাবুল হোসেন (সময় টিভি)।</div><div><br></div><div>এর আগে সাংবাদিক সমিতির নির্বাচন কমিশনানের চেয়ারম্যান রফিকুল ইসলাম আজাদ এবং নির্বাচন কমিশনার কাঞ্চন কুমার দে ও মোজাম্মেল হক চঞ্চল নিবার্চন পরিচালনা করেন। বেলা ১১টা থেকে বিকাল ৪টা পর্যন্ত ভোটগ্রহণ অনুষ্ঠিত হয়।</div>', '1737221955Fshn6tXr.jpg', NULL, NULL, NULL, NULL, NULL, 10, NULL, 0, NULL, 0, 1, 0, 'true', 0, NULL, '2026-06-14 05:44:50', '2025-01-19 01:39:15', 'শুক্রবার (১০ জানুয়ারি) রাজধানীর পল্টনস্থ ইকোনমিক রিপোর্টার্স ফোরাম-ইআরএফের কার্যালয়ে সমিতির সদস্যদের প্রত্যক্ষ ভোটে নতুন নেতৃত্বে নির্বাচিত হয়।হাবিবুর রহমান পলাশ তার নিকটতম প্রতিদ্বন্দ্বী চ্যানেল আইয়ের রাজু আলিমকে হারিয়ে সভাপতি ও ওবায়দুল্লাহ মামুন তার নিকটতম প্রতিদ্বন্দ্বী মহিউদ্দিন তুষারকে হারিয়ে সাধারণ সম্পাদক নির্বাচিত হন।', NULL);
INSERT INTO `posts` (`id`, `language_id`, `title`, `slug`, `post_type`, `meta_tag`, `show_right_column`, `is_feature`, `is_slider`, `slider_left`, `slider_right`, `is_trending`, `is_videoGallery`, `description`, `image_big`, `rss_image`, `image_small`, `video`, `embed_video`, `audio`, `category_id`, `subcategories_id`, `schedule_post`, `schedule_post_date`, `is_pending`, `admin_id`, `user_id`, `status`, `is_draft`, `rss_link`, `created_at`, `updated_at`, `short_description`, `images_caption`) VALUES
(18, 1, 'সংস্কার কমিশনে ২২ দফা সংস্কার প্রস্তাবনা দিলো মুক্ত গণমাধ্যম মঞ্চ', 'সংস্কার-কমিশনে-২২-দফা-সংস্কার-প্রস্তাবনা-দিলো-মুক্ত-গণমাধ্যম-মঞ্চ', 'article', 'সংস্কার কমিশনে ২২ দফা সংস্কার প্রস্তাবনা দিলো মুক্ত গণমাধ্যম মঞ্চ', 0, 1, 1, 0, 1, 1, 0, '<div>বৃহস্পতিবার (৯ জানুয়ারি) তথ্য ভবনে অবস্থিত গণমাধ্যম সংস্কার কমিশনের প্রধান কার্যালয়ে কমিশন প্রধান কামাল আহমেদের কাছে এ প্রস্তাবনা জমা দেয়া হয়।এ সময় উপস্থিত ছিলেন মুক্ত গণমাধ্যম মঞ্চের সভাপতি মাহফুজ উদ্দিন খান, মুখপাত্র মোহাম্মদ আবদুল্লাহ মজুমদার, অফিস বিভাগের পরিচালক এস এম নাসিম, সংস্কৃতি বিভাগের পরিচালক নিথর মাহবুবসহ গণমাধ্যম সংস্কার কমিশনের অন্যান্য সদস্য ও কর্মকর্তারা উপস্থিত ছিলেন।</div><div><br></div><div>পরে মুক্ত গণমাধ্যম মঞ্চের মুখপাত্র মোহাম্মদ আবদুল্লাহ মজুমদার জানান, ২২ দফা প্রস্তাবনায় গণমাধ্যম ও মত প্রকাশের স্বাধীনতা, গণমাধ্যমকে প্রভাবমুক্ত করণ, সাংবাদিকতার মান নিয়ন্ত্রণ এবং গণমাধ্যমকর্মীদের অধিকারের বিষয়ে প্রস্তাব দেয়া হয়েছে।</div><div>বৃহস্পতিবার (৯ জানুয়ারি) তথ্য ভবনে অবস্থিত গণমাধ্যম সংস্কার কমিশনের প্রধান কার্যালয়ে কমিশন প্রধান কামাল আহমেদের কাছে এ প্রস্তাবনা জমা দেয়া হয়।</div><div><br></div><div>এ সময় উপস্থিত ছিলেন মুক্ত গণমাধ্যম মঞ্চের সভাপতি মাহফুজ উদ্দিন খান, মুখপাত্র মোহাম্মদ আবদুল্লাহ মজুমদার, অফিস বিভাগের পরিচালক এস এম নাসিম, সংস্কৃতি বিভাগের পরিচালক নিথর মাহবুবসহ গণমাধ্যম সংস্কার কমিশনের অন্যান্য সদস্য ও কর্মকর্তারা উপস্থিত ছিলেন।</div><div>পরে মুক্ত গণমাধ্যম মঞ্চের মুখপাত্র মোহাম্মদ আবদুল্লাহ মজুমদার জানান, ২২ দফা প্রস্তাবনায় গণমাধ্যম ও মত প্রকাশের স্বাধীনতা, গণমাধ্যমকে প্রভাবমুক্ত করণ, সাংবাদিকতার মান নিয়ন্ত্রণ এবং গণমাধ্যমকর্মীদের অধিকারের বিষয়ে প্রস্তাব দেয়া হয়েছে।</div>', '17372220621EYz58Hh.jpg', NULL, NULL, NULL, NULL, NULL, 10, NULL, 0, NULL, 0, 1, 0, 'true', 0, NULL, '2026-06-14 05:44:50', '2025-01-19 01:41:02', 'বৃহস্পতিবার (৯ জানুয়ারি) তথ্য ভবনে অবস্থিত গণমাধ্যম সংস্কার কমিশনের প্রধান কার্যালয়ে কমিশন প্রধান কামাল আহমেদের কাছে এ প্রস্তাবনা জমা দেয়া হয়।এ সময় উপস্থিত ছিলেন মুক্ত গণমাধ্যম মঞ্চের সভাপতি মাহফুজ উদ্দিন খান, মুখপাত্র মোহাম্মদ আবদুল্লাহ মজুমদার, অফিস বিভাগের পরিচালক এস এম নাসিম, সংস্কৃতি বিভাগের পরিচালক নিথর মাহবুবসহ গণমাধ্যম সংস্কার কমিশনের অন্যান্য সদস্য ও কর্মকর্তারা উপস্থিত ছিলেন।', NULL),
(19, 1, 'কাতারে বাংলাদেশ প্রেস ক্লাবের নতুন সভাপতি শামীম সম্পাদক সালাম', 'কাতারে-বাংলাদেশ-প্রেস-ক্লাবের-নতুন-সভাপতি-শামীম-সম্পাদক-সালাম', 'article', 'কাতারে বাংলাদেশ প্রেস ক্লাবের নতুন সভাপতি শামীম সম্পাদক সালাম', 0, 1, 1, 0, 1, 1, 0, '<div>চ্যানেল২৪’র কাতার প্রতিনিধি কাজী মোহাম্মদ শামীম সভাপতি, আরটিভির কাতার প্রতিনিধি গোলাম মাওলা আকাশ সহ সভাপতি, জিটিভি কাতার প্রতিনিধি এম এ সালাম সাধারণ সম্পাদক এবং একুশে টিভির কাতার প্রতিনিধি সজল মালাকার সাংগঠনিক সম্পাদক নির্বাচিত হয়েছেন।</div><div>কমিটির অন্যরা হলেন– প্রচার সম্পাদক ৭১ বাংলা টিভি কাতার প্রতিনিধি রিয়াজ হোসেন সাদ্দাম, কার্যকরী সদস্য মোহনা টিভি কাতার প্রতিনিধি ইউসুফ পাটোয়ারী লিংকন, এখন টিভি কাতার প্রতিনিধি আনোয়ার হোসেন মামুন।</div><div><br></div><div>নবনির্বাচিত কার্যকরী কমিটির পক্ষ থেকে জানানো হয়েছে, কিছুদিনের মধ্যে ২০২৫-২৬ মেয়াদের নবনির্বাচিত কমিটির অভিষেক অনুষ্ঠিত হবে।চ্যানেল২৪’র কাতার প্রতিনিধি কাজী মোহাম্মদ শামীম সভাপতি, আরটিভির কাতার প্রতিনিধি গোলাম মাওলা আকাশ সহ সভাপতি, জিটিভি কাতার প্রতিনিধি এম এ সালাম সাধারণ সম্পাদক এবং একুশে টিভির কাতার প্রতিনিধি সজল মালাকার সাংগঠনিক সম্পাদক নির্বাচিত হয়েছেন।</div><div><br></div><div>কমিটির অন্যরা হলেন– প্রচার সম্পাদক ৭১ বাংলা টিভি কাতার প্রতিনিধি রিয়াজ হোসেন সাদ্দাম, কার্যকরী সদস্য মোহনা টিভি কাতার প্রতিনিধি ইউসুফ পাটোয়ারী লিংকন, এখন টিভি কাতার প্রতিনিধি আনোয়ার হোসেন মামুন।</div><div>নবনির্বাচিত কার্যকরী কমিটির পক্ষ থেকে জানানো হয়েছে, কিছুদিনের মধ্যে ২০২৫-২৬ মেয়াদের নবনির্বাচিত কমিটির অভিষেক অনুষ্ঠিত হবে।</div>', '1737222185yaYbrrJl.jpg', NULL, NULL, NULL, NULL, NULL, 10, NULL, 0, NULL, 0, 1, 0, 'true', 0, NULL, '2026-06-14 05:44:50', '2025-01-19 01:43:05', 'চ্যানেল২৪’র কাতার প্রতিনিধি কাজী মোহাম্মদ শামীম সভাপতি, আরটিভির কাতার প্রতিনিধি গোলাম মাওলা আকাশ সহ সভাপতি, জিটিভি কাতার প্রতিনিধি এম এ সালাম সাধারণ সম্পাদক এবং একুশে টিভির কাতার প্রতিনিধি সজল মালাকার সাংগঠনিক সম্পাদক নির্বাচিত হয়েছেন।কমিটির অন্যরা হলেন– প্রচার সম্পাদক ৭১ বাংলা টিভি কাতার প্রতিনিধি রিয়াজ হোসেন', NULL),
(20, 1, 'সাংবাদিকতা পেশায় রাজনৈতিক দলবাজি বন্ধ করা দরকার: সংস্কার কমিশন', 'সাংবাদিকতা-পেশায়-রাজনৈতিক-দলবাজি-বন্ধ-করা-দরকার:-সংস্কার-কমিশন', 'article', 'সাংবাদিকতা পেশায় রাজনৈতিক দলবাজি বন্ধ করা দরকার: সংস্কার কমিশন', 0, 1, 1, 0, 1, 1, 0, '<div>রোববার (৫ জানুয়ারি) চট্টগ্রাম জেলা প্রশাসনের সম্মেলন কক্ষে চট্টগ্রাম বিভাগের সাংবাদিকদের সাথে গণমাধ্যম সংস্কার কমিশনের মতবিনিময় সভায় সভাপতির বক্তব্যে এ কথা বলেন গণমাধ্যম সংস্কার কমিশন প্রধান কামাল আহমেদ।রাজনৈতিক কারণে বৈষম্যের শিকার সাংবাদিকদের ক্ষতিপূরণ দেওয়ার প্রস্তাবে সায় দিয়ে সভায় কমিশন প্রধান কামাল আহমেদ বলেন, ‘নীতিগতভাবে বা বিভিন্ন রাষ্ট্রীয় সিদ্ধান্ত গ্রহণের ক্ষেত্রে বৈষম্য করা হয়েছে। রাজনৈতিক কারণে বৈষম্যের শিকার ব্যক্তি বা সাংবাদিকদের ক্ষতিপূরণের বিষয়টি একটি গুরুত্বপূর্ণ প্রশ্ন। এটা আমাদেরকে বিবেচনায় নিতে হবে। একইভাবে হয়রানিমূলক মামলায় যারা ক্ষতিগ্রস্ত হয়েছেন, জেল খেটেছেন, দিনের পর দিন কাজ করতে পারেননি, তাদের মামলা প্রত্যাহারের বিষয় অগ্রাধিকারের ভিত্তিতেই বিবেচনা করা দরকার। আর যারা ক্ষতিগ্রস্ত হয়েছেন তাদের ক্ষতিপূরণ দেওয়ার দাবিটাও যৌক্তিক ও ন্যায্য।’</div><div><br></div><div>তিনি বলেন, ‘আপনাদের (সাংবাদিক) বক্তব্যে রাজনৈতিক সক্রিয়তা, দলীয় সক্রিয়তা, ফ্যাসিবাদের সহযোগিতা সবচেয়ে বড় সমস্যা হিসেবে চিহ্নিত হয়েছে। যারা ফ্যাসিবাদে সহযোগিতা করেছেন তাদের বিচারের প্রশ্ন ওঠেছে। তাদের যারা উস্কানি দিয়েছেন তাদের বিচারের প্রশ্ন উত্থাপিত হয়েছে। সমস্যা হলো আমরা কোনো তদন্ত সংস্থা নই। অপরাধগুলোর তদন্ত আমরা করতে পারব না। তবে আমরা এটা বলতে পারি, যারা উস্কানিদাতা তাদের উস্কানির বিষয়টি তদন্ত করে প্রয়োজনীয় ব্যবস্থা নেওয়া হোক।’</div><div><br></div><div>ওয়েজবোর্ডের বদলে সাংবাদিকদের একটা ন্যূনতম বেতন নির্ধারণ করার প্রস্তাবের বিষয়ে গণমাধ্যম সংস্কার কমিশন প্রধান বলেন, ‘সেটা একটা ভালো সমাধান হতে পারে যে, ন্যূনতম বেতন সারাদেশে সাংবাদিকদের জন্য থাকবে। যে শহরে খরচ বেশি, বিশেষ করে ঢাকায়-আলাদা করে একটা ভাতা বা বাড়তি বেতন দিতে হবে।</div><div><br></div><div>আমরা আশা করছি এই ধরনের সমাধানগুলো আমরা আপনাদের কাছ থেকেই পাব। সেটার ভিত্তিতেই আমরা সুপারিশমালা তৈরি করব। বাস্তবায়ন সরকার করবে, সেটি আমাদের হাতে নেই। আমরা রাজনৈতিক দলগুলোর কাছ থেকেও তাদের সুপারিশ লিখিতভাবে চেয়েছি।’</div><div><br></div><div>সম্পাদকদের জন্য নীতিমালা হওয়া দরকার জানিয়ে গণমাধ্যম সংস্কার কমিশন প্রধান কামাল আহমেদ বলেন, ‘আমরা সম্পাদক পরিষদকে বলেছি, একটা জাতীয় নীতিমালা হওয়া দরকার। আপনারা একটা মান নির্ধারণ করেন যে, এই ন্যূনতম মান আমাদের মেনে চলা দরকার। আশা করছি সম্পাদক পরিষদ সেই উদ্যোগটা নেবেন।’</div><div><br></div><div>পত্রিকা প্রকাশ ও সম্পাদকদের যোগ্যতা প্রসঙ্গে তিনি বলেন, ‘পত্রিকা প্রকাশের ক্ষেত্রে যোগ্যতার প্রশ্ন, পেশাদার সাংবাদিকের সম্পাদক হওয়ার প্রশ্ন- এগুলো কিন্তু নীতিমালায় আছে। কিন্তু আপনারাই বলছেন, উত্তরাধিকার সূত্রে পরিবারের সদস্যদের সম্পাদক বানিয়ে দেওয়া হচ্ছে। সেটা আবার সরকার গ্রহণ করছে। কারণ হতে পারে রাজনৈতিক প্রভাব কিংবা অন্য কিছু।’</div><div><br></div><div>ডিএফপি কর্তৃক পত্রিকার প্রচার সংখ্যার অবাস্তব তথ্য প্রসঙ্গে কমিশন প্রধান বলেন, ‘একইভাবে পত্রিকার প্রচার সংখ্যার দিক থেকে সাবেক প্রধানমন্ত্রীর প্রেস সচিবের নামেই চারটি পত্রিকার ডিক্লারেশন ছিল। একটি পত্রিকার সার্কুলেশন যেটা ৬ হাজারেরও কম, সেটা তিনি ২ লাখ ৯৯ হাজার দেখাতে বাধ্য করেছেন। এখন তো হিসেবও বেরিয়েছে ২৯৬ কোটি টাকা ওনার ব্যাংক অ্যাকাউন্টে লেনদেন করা হয়েছে। সর্বাধিক প্রচারিত যে দাবি করা হয়, হকারের বেচা-বিক্রি হিসেবে সেটাও ঠিক না।’</div><div><br></div><div>রাজধানীর দুটো সংবাদপত্র হকার্স সমিতিতে পত্রিকা বিক্রির পরিসংখ্যান তুলে ধরে তিনি বলেন, ‘হকারদের পত্রিকা বিক্রির হিসেবের সাথে বাস্তবতার কোনো মিল নেই। ঢাকা শহর থেকে ৩০২টি পত্রিকা মিডিয়া লিস্টে আছে, সারাদেশে ৫৯২টির মতো পত্রিকা আছে। আমরা দেখেছি হকারদের তালিকায় ৪৬টি কাগজ তারা লেনদেন করে। বাকি কাগজগুলোর কোনো পেপার (নথি) নেই। কেউ কিনে না ওই পত্রিকাগুলো। তাহলে এটা সরকারের মিডিয়া লিস্টিং এর মধ্যে ঢুকলো কি করে ? এই সমস্যার সমাধান করতে হবে।’</div><div><br></div><div>একই ব্যক্তি একাধিক শ্রেণির সংবাদপত্রের মালিক হতে পারবে না- সাংবাদিকদের এমন মন্তব্যের জবাবে গণমাধ্যম সংস্কার কমিশন প্রধান কামাল আহমেদ বলেন, ‘এটা কিন্তু অনেক দেশেই নাই। এমনকি আমেরিকাতেও একটা টেলিভিশন কোম্পানির মালিক একটা পত্রিকার মালিক হতে পারেন না। আমাদের এখানে একই হাউসে একাধিক টেলিভিশন চ্যানেলের অনুমতি দেওয়া হয়েছে। আবার একই হাউসে টেলিভিশন, রেডিও, অনলাইন এবং বাংলা-ইংরেজি সংবাদপত্রের অনুমোদন দেওয়া হয়েছে। একই হাউস থেকে একাধিক বাংলা পত্রিকা বের হচ্ছে। তাইলে পাঠক কি পাচ্ছে ? এখানে কোনো বৈচিত্র থাকছে না।</div><div><br></div><div>বাংলাদেশে ৪৬টি টেলিভিশন চলার মতো বাজার নেই উল্লেখ করে তিনি বলেন, তারপরও কিন্তু ৪৬টি টেলিভিশনকে সরকার অনুমতি দিয়েছে। এটাতো গ্রহণযোগ্য হতে পারে না। এই টেলিভিশন কেন্দ্রগুলোর যেহেতু বাজার নেই সেহেতু তারা যথেষ্ঠ আয় করতে পারে না। আবার নিয়োগ দেয় বিনা বেতনে, কার্ডের ব্যবসায় চলে যায়। ফলে একটা দুষ্ট চক্র তৈরি হয়েছে। এগুলো ভেঙে একটা শৃঙ্খলা আনতে হবে।’</div><div>সভায় আরও উপস্থিত ছিলেন গণমাধ্যম সংস্কার কমিশনের সদস্য অধ্যাপক গীতিআরা নাসরীন, শামসুল হক জাহিদ, আখতার হোসেন খান, চট্টগ্রাম প্রেস ক্লাবের সদস্য সচিব সিনিয়র সাংবাদিক জাহিদুল করিম কচি, চট্টগ্রাম মেট্রোপলিটন সাংবাদিক ইউনিয়নের সভাপতি মোহাম্মদ শাহনওয়াজ, সাধারণ সম্পাদক সালেহ নোমানসহ বিভিন্ন দৈনিক ও অনলাইন সংবাদপত্রের সম্পাদক, প্রকাশক, জেলা ও জেলার বাইরের বিভিন্ন সংবাদকর্মীরা।-বাসস।</div>', '1737222308uiemMojp.jpg', NULL, NULL, NULL, NULL, NULL, 10, NULL, 0, NULL, 0, 1, 0, 'true', 0, NULL, '2026-06-14 05:44:50', '2025-01-19 01:45:08', 'রোববার (৫ জানুয়ারি) চট্টগ্রাম জেলা প্রশাসনের সম্মেলন কক্ষে চট্টগ্রাম বিভাগের সাংবাদিকদের সাথে গণমাধ্যম সংস্কার কমিশনের মতবিনিময় সভায় সভাপতির বক্তব্যে এ কথা বলেন গণমাধ্যম সংস্কার কমিশন প্রধান কামাল আহমেদ।রাজনৈতিক কারণে বৈষম্যের শিকার সাংবাদিকদের ক্ষতিপূরণ দেওয়ার প্রস্তাবে সায় দিয়ে সভায় কমিশন প্রধান কামাল আহমেদ বলেন, ‘নীতিগতভাবে বা বিভিন্ন রাষ্ট্রীয় সিদ্ধান্ত গ্রহণের ক্ষেত্রে বৈষম্য করা হয়েছে।', NULL),
(21, 1, 'নতুন বছরের শুরুতেই যেসব ফোনে বন্ধ হচ্ছে হোয়াটসঅ্যাপ', 'নতুন-বছরের-শুরুতেই-যেসব-ফোনে-বন্ধ-হচ্ছে-হোয়াটসঅ্যাপ', 'article', 'নতুন বছরের শুরুতেই যেসব ফোনে বন্ধ হচ্ছে হোয়াটসঅ্যাপ', 0, 1, 1, 0, 1, 1, 0, '<div>২০২৫ সালের শুরুতে কিছু ফোনে আর হোয়াটসঅ্যাপ ব্যবহার করা যাবে না। মূলত পুরোনো অপারেটিং সিস্টেম, ফোনের হার্ডওয়্যারের সীমাবদ্ধতা, নতুন ফিচার, নিরাপত্তা আপডেটের সঙ্গে সামঞ্জস্যতা বজায় রেখে এ সিদ্ধান্ত নিয়েছে মেটা।</div><div>২০২৫ সালের জানুয়ারি থেকে যেসব ফোনে বন্ধ হচ্ছে হোয়াটসঅ্যাপ</div><div>স্যামসাং: Galaxy S3, Galaxy Note 2, Galaxy Ace 3, Galaxy S4 Mini</div><div>সনি: Xperia Z, Xperia SP, Xperia T, Xperia V</div><div>মোটোরোল: Moto G (1st Gen), Razr HD, Moto E 2014</div><div>এইচটিসি: One X, One X+, Desire 500, Desire 601</div><div>এলজি: Optimus G, Nexus 4, G2 Mini, L90</div><div><br></div><div>Copied from: https://www.rtvonline.com/others/305962</div>', '1737222419CZEhcdPL.jpg', NULL, NULL, NULL, NULL, NULL, 5, NULL, 0, NULL, 0, 1, 0, 'true', 0, NULL, '2026-06-14 05:44:50', '2025-01-19 01:46:59', '২০২৫ সালের শুরুতে কিছু ফোনে আর হোয়াটসঅ্যাপ ব্যবহার করা যাবে না। মূলত পুরোনো অপারেটিং সিস্টেম, ফোনের হার্ডওয়্যারের সীমাবদ্ধতা, নতুন ফিচার, নিরাপত্তা আপডেটের সঙ্গে সামঞ্জস্যতা বজায় রেখে এ সিদ্ধান্ত নিয়েছে মেটা।', NULL),
(22, 1, 'খালেদা জিয়াকে সার্বক্ষণিক চিকিৎসা দিচ্ছে লন্ডন ক্লিনিকের মেডিকেল বোর্ড', 'খালেদা-জিয়াকে-সার্বক্ষণিক-চিকিৎসা-দিচ্ছে-লন্ডন-ক্লিনিকের-মেডিকেল-বোর্ড', 'video', 'খালেদা জিয়াকে সার্বক্ষণিক চিকিৎসা দিচ্ছে লন্ডন ক্লিনিকের মেডিকেল বোর্ড', 0, 1, 1, 0, 1, 1, 1, '<div>বিএনপির চেয়ারপারসন খালেদা জিয়ার শারীরিক অসুস্থতা বিবেচনা করে প্রতিদিনই প্রয়োজনীয় কোনো না কোনো বিষয়ে পরীক্ষা করে তাঁর চিকিৎসা দেওয়া হচ্ছে। লন্ডনের বিশেষায়িত বেসরকারি হাসপাতাল দ্য লন্ডন ক্লিনিকের চিকিৎসক জন প্যাট্রিক কেনেডির নেতৃত্বে গঠিত মেডিকেল বোর্ডের চিকিৎসকেরা তাঁকে সার্বক্ষণিক চিকিৎসা দিচ্ছেন।</div><div><br></div><div>সাবেক প্রধানমন্ত্রী খালেদা জিয়ার ব্যক্তিগত চিকিৎসক এ জেড এম জাহিদ হোসেন আজ শনিবার রাতে প্রথম আলোকে এ তথ্য জানিয়েছেন। ৮ জানুয়ারি খালেদা জিয়া উন্নত চিকিৎসার জন্য লন্ডনে আসেন। সেদিনই লন্ডনের হিথরো বিমানবন্দর থেকে সরাসরি তাঁকে ‘দ্য ক্লিনিক’–এ নিয়ে সেখানে ভর্তি করা হয়। শুরু থেকেই তিনি ওই হাসপাতালের অধ্যাপক জন প্যাট্রিক কেনেডির তত্ত্বাবধানে চিকিৎসাধীন আছেন।বিএনপির চেয়ারপারসন খালেদা জিয়ার শারীরিক অসুস্থতা বিবেচনা করে প্রতিদিনই প্রয়োজনীয় কোনো না কোনো বিষয়ে পরীক্ষা করে তাঁর চিকিৎসা দেওয়া হচ্ছে। লন্ডনের বিশেষায়িত বেসরকারি হাসপাতাল দ্য লন্ডন ক্লিনিকের চিকিৎসক জন প্যাট্রিক কেনেডির নেতৃত্বে গঠিত মেডিকেল বোর্ডের চিকিৎসকেরা তাঁকে সার্বক্ষণিক চিকিৎসা দিচ্ছেন।</div><div><br></div><div>সাবেক প্রধানমন্ত্রী খালেদা জিয়ার ব্যক্তিগত চিকিৎসক এ জেড এম জাহিদ হোসেন আজ শনিবার রাতে প্রথম আলোকে এ তথ্য জানিয়েছেন। ৮ জানুয়ারি খালেদা জিয়া উন্নত চিকিৎসার জন্য লন্ডনে আসেন। সেদিনই লন্ডনের হিথরো বিমানবন্দর থেকে সরাসরি তাঁকে ‘দ্য ক্লিনিক’–এ নিয়ে সেখানে ভর্তি করা হয়। শুরু থেকেই তিনি ওই হাসপাতালের অধ্যাপক জন প্যাট্রিক কেনেডির তত্ত্বাবধানে চিকিৎসাধীন আছেন।বিএনপির চেয়ারপারসন খালেদা জিয়ার শারীরিক অসুস্থতা বিবেচনা করে প্রতিদিনই প্রয়োজনীয় কোনো না কোনো বিষয়ে পরীক্ষা করে তাঁর চিকিৎসা দেওয়া হচ্ছে। লন্ডনের বিশেষায়িত বেসরকারি হাসপাতাল দ্য লন্ডন ক্লিনিকের চিকিৎসক জন প্যাট্রিক কেনেডির নেতৃত্বে গঠিত মেডিকেল বোর্ডের চিকিৎসকেরা তাঁকে সার্বক্ষণিক চিকিৎসা দিচ্ছেন।</div><div><br></div><div>সাবেক প্রধানমন্ত্রী খালেদা জিয়ার ব্যক্তিগত চিকিৎসক এ জেড এম জাহিদ হোসেন আজ শনিবার রাতে প্রথম আলোকে এ তথ্য জানিয়েছেন। ৮ জানুয়ারি খালেদা জিয়া উন্নত চিকিৎসার জন্য লন্ডনে আসেন। সেদিনই লন্ডনের হিথরো বিমানবন্দর থেকে সরাসরি তাঁকে ‘দ্য ক্লিনিক’–এ নিয়ে সেখানে ভর্তি করা হয়। শুরু থেকেই তিনি ওই হাসপাতালের অধ্যাপক জন প্যাট্রিক কেনেডির তত্ত্বাবধানে চিকিৎসাধীন আছেন।</div>', '1737223708GdANR5Mb.jpg', NULL, NULL, '', 'KB0fMtkTCdc', NULL, 3, 11, 0, NULL, 0, 1, 0, 'true', 0, NULL, '2026-06-14 05:46:36', '2025-01-19 02:08:28', 'বিএনপির চেয়ারপারসন খালেদা জিয়ার শারীরিক অসুস্থতা বিবেচনা করে প্রতিদিনই প্রয়োজনীয় কোনো না কোনো বিষয়ে পরীক্ষা করে তাঁর চিকিৎসা দেওয়া হচ্ছে। লন্ডনের বিশেষায়িত বেসরকারি হাসপাতাল দ্য লন্ডন ক্লিনিকের চিকিৎসক জন প্যাট্রিক কেনেডির নেতৃত্বে গঠিত মেডিকেল বোর্ডের চিকিৎসকেরা তাঁকে সার্বক্ষণিক চিকিৎসা দিচ্ছেন।', NULL),
(23, 1, 'প্রাণনাশের হুমকি পেয়েছিলেন এই তারকারাও', 'প্রাণনাশের-হুমকি-পেয়েছিলেন-এই-তারকারাও', 'video', 'প্রাণনাশের হুমকি পেয়েছিলেন এই তারকারাও', 0, 1, 1, 0, 1, 1, 1, '<div>বিএনপির চেয়ারপারসন খালেদা জিয়ার শারীরিক অসুস্থতা বিবেচনা করে প্রতিদিনই প্রয়োজনীয় কোনো না কোনো বিষয়ে পরীক্ষা করে তাঁর চিকিৎসা দেওয়া হচ্ছে। লন্ডনের বিশেষায়িত বেসরকারি হাসপাতাল দ্য লন্ডন ক্লিনিকের চিকিৎসক জন প্যাট্রিক কেনেডির নেতৃত্বে গঠিত মেডিকেল বোর্ডের চিকিৎসকেরা তাঁকে সার্বক্ষণিক চিকিৎসা দিচ্ছেন।</div><div><br></div><div>সাবেক প্রধানমন্ত্রী খালেদা জিয়ার ব্যক্তিগত চিকিৎসক এ জেড এম জাহিদ হোসেন আজ শনিবার রাতে প্রথম আলোকে এ তথ্য জানিয়েছেন। ৮ জানুয়ারি খালেদা জিয়া উন্নত চিকিৎসার জন্য লন্ডনে আসেন। সেদিনই লন্ডনের হিথরো বিমানবন্দর থেকে সরাসরি তাঁকে ‘দ্য ক্লিনিক’–এ নিয়ে সেখানে ভর্তি করা হয়। শুরু থেকেই তিনি ওই হাসপাতালের অধ্যাপক জন প্যাট্রিক কেনেডির তত্ত্বাবধানে চিকিৎসাধীন আছেন।বিএনপির চেয়ারপারসন খালেদা জিয়ার শারীরিক অসুস্থতা বিবেচনা করে প্রতিদিনই প্রয়োজনীয় কোনো না কোনো বিষয়ে পরীক্ষা করে তাঁর চিকিৎসা দেওয়া হচ্ছে। লন্ডনের বিশেষায়িত বেসরকারি হাসপাতাল দ্য লন্ডন ক্লিনিকের চিকিৎসক জন প্যাট্রিক কেনেডির নেতৃত্বে গঠিত মেডিকেল বোর্ডের চিকিৎসকেরা তাঁকে সার্বক্ষণিক চিকিৎসা দিচ্ছেন।</div><div><br></div><div>সাবেক প্রধানমন্ত্রী খালেদা জিয়ার ব্যক্তিগত চিকিৎসক এ জেড এম জাহিদ হোসেন আজ শনিবার রাতে প্রথম আলোকে এ তথ্য জানিয়েছেন। ৮ জানুয়ারি খালেদা জিয়া উন্নত চিকিৎসার জন্য লন্ডনে আসেন। সেদিনই লন্ডনের হিথরো বিমানবন্দর থেকে সরাসরি তাঁকে ‘দ্য ক্লিনিক’–এ নিয়ে সেখানে ভর্তি করা হয়। শুরু থেকেই তিনি ওই হাসপাতালের অধ্যাপক জন প্যাট্রিক কেনেডির তত্ত্বাবধানে চিকিৎসাধীন আছেন।বিএনপির চেয়ারপারসন খালেদা জিয়ার শারীরিক অসুস্থতা বিবেচনা করে প্রতিদিনই প্রয়োজনীয় কোনো না কোনো বিষয়ে পরীক্ষা করে তাঁর চিকিৎসা দেওয়া হচ্ছে। লন্ডনের বিশেষায়িত বেসরকারি হাসপাতাল দ্য লন্ডন ক্লিনিকের চিকিৎসক জন প্যাট্রিক কেনেডির নেতৃত্বে গঠিত মেডিকেল বোর্ডের চিকিৎসকেরা তাঁকে সার্বক্ষণিক চিকিৎসা দিচ্ছেন।</div><div><br></div><div>সাবেক প্রধানমন্ত্রী খালেদা জিয়ার ব্যক্তিগত চিকিৎসক এ জেড এম জাহিদ হোসেন আজ শনিবার রাতে প্রথম আলোকে এ তথ্য জানিয়েছেন। ৮ জানুয়ারি খালেদা জিয়া উন্নত চিকিৎসার জন্য লন্ডনে আসেন। সেদিনই লন্ডনের হিথরো বিমানবন্দর থেকে সরাসরি তাঁকে ‘দ্য ক্লিনিক’–এ নিয়ে সেখানে ভর্তি করা হয়। শুরু থেকেই তিনি ওই হাসপাতালের অধ্যাপক জন প্যাট্রিক কেনেডির তত্ত্বাবধানে চিকিৎসাধীন আছেন।</div>', '1737224526DmXkKLbu.jpg', NULL, NULL, '', 'XRxgMhwhlLk', NULL, 8, NULL, 0, NULL, 0, 1, 0, 'true', 0, NULL, '2026-06-14 05:44:50', '2025-01-19 02:22:06', 'বিএনপির চেয়ারপারসন খালেদা জিয়ার শারীরিক অসুস্থতা বিবেচনা করে প্রতিদিনই প্রয়োজনীয় কোনো না কোনো বিষয়ে পরীক্ষা করে তাঁর চিকিৎসা দেওয়া হচ্ছে। লন্ডনের বিশেষায়িত বেসরকারি হাসপাতাল দ্য লন্ডন ক্লিনিকের চিকিৎসক জন প্যাট্রিক কেনেডির নেতৃত্বে গঠিত মেডিকেল বোর্ডের চিকিৎসকেরা তাঁকে সার্বক্ষণিক চিকিৎসা দিচ্ছেন।', NULL),
(24, 1, 'বুবলীকে ‘পিনিক’–এ যেমন দেখা যাবে', 'বুবলীকে-‘পিনিক’–এ-যেমন-দেখা-যাবে', 'video', 'বুবলীকে ‘পিনিক’–এ যেমন দেখা যাবে', 0, 1, 1, 0, 1, 1, 1, 'গত বছরের নভেম্বরে কক্সবাজারে শুটিং শুরু হয় ‘পিনিক’ ছবির। শুটিংয়ের মাঝপথে ছবির নায়ক আদর আজাদের ফার্স্ট লুক পোস্টার প্রকাশিত হয়। তখনই জানানো হয়, ছবিতে বুবলীর চরিত্র সম্পর্কে ধারণা দিতে তাঁরও একটি ফার্স্ট লুক পোস্টার প্রকাশিত হবে। যত দিনে বুবলীর ফার্স্ট লুক পোস্টার প্রকাশিত হয়েছে, তত দিনে নতুন বছর চলে এসেছে।&nbsp;<div><br></div><div>এর মধ্যে ছবিটির শেষ কিস্তির শুটিং শুরু হওয়ার কথাও। শনিবার সন্ধ্যায় পিনিক ছবিতে বুবলীর ফার্স্ট লুক পোস্টার প্রকাশিত হয়েছে। যেখানে দেখা গেছে, স্কার্ফে আবৃত নায়িকার মাথা। চোখে রোদচশমা। বুবলীর মুখমণ্ডল খাঁচায় বন্দী।গত বছরের নভেম্বরে কক্সবাজারে শুটিং শুরু হয় ‘পিনিক’ ছবির। শুটিংয়ের মাঝপথে ছবির নায়ক আদর আজাদের ফার্স্ট লুক পোস্টার প্রকাশিত হয়। তখনই জানানো হয়, ছবিতে বুবলীর চরিত্র সম্পর্কে ধারণা দিতে তাঁরও একটি ফার্স্ট লুক পোস্টার প্রকাশিত হবে। যত দিনে বুবলীর ফার্স্ট লুক পোস্টার প্রকাশিত হয়েছে, তত দিনে নতুন বছর চলে এসেছে। এর মধ্যে ছবিটির শেষ কিস্তির শুটিং শুরু হওয়ার কথাও।&nbsp;</div><div><br></div><div>শনিবার সন্ধ্যায় পিনিক ছবিতে বুবলীর ফার্স্ট লুক পোস্টার প্রকাশিত হয়েছে। যেখানে দেখা গেছে, স্কার্ফে আবৃত নায়িকার মাথা। চোখে রোদচশমা। বুবলীর মুখমণ্ডল খাঁচায় বন্দী।</div>', '1737224736dTktwijh.jpg', NULL, NULL, '', 'GcIqmMOmnh0', NULL, 8, NULL, 0, NULL, 0, 1, 0, 'true', 0, NULL, '2026-06-14 05:44:50', '2025-01-19 02:25:36', 'গত বছরের নভেম্বরে কক্সবাজারে শুটিং শুরু হয় ‘পিনিক’ ছবির। শুটিংয়ের মাঝপথে ছবির নায়ক আদর আজাদের ফার্স্ট লুক পোস্টার প্রকাশিত হয়। তখনই জানানো হয়, ছবিতে বুবলীর চরিত্র সম্পর্কে ধারণা দিতে তাঁরও একটি ফার্স্ট লুক পোস্টার প্রকাশিত হবে। যত দিনে বুবলীর ফার্স্ট লুক পোস্টার প্রকাশিত হয়েছে, তত দিনে নতুন বছর চলে এসেছে।', NULL),
(25, 1, 'প্রবীর মিত্রের শেষ দিনগুলো যেমন ছিল', 'প্রবীর-মিত্রের-শেষ-দিনগুলো-যেমন-ছিল', 'video', 'প্রবীর মিত্রের শেষ দিনগুলো যেমন ছিল', 0, 1, 1, 0, 1, 1, 1, '<div>গত রোববার রাতে মারা গেছেন খ্যাতিমান অভিনেতা প্রবীর মিত্র। রাজধানীর একটি বেসরকারি হাসপাতালে চিকিৎসাধীন ছিলেন তিনি। ফুসফুসে সংক্রমণ, অক্সিজেন-স্বল্পতাসহ বেশ কিছু সমস্যায় ভুগছিলেন তিনি।</div><div>এর আগে গত ২২ ডিসেম্বর প্রবীর মিত্রকে হাসপাতালে ভর্তি করা হয়। অবস্থার অবনতি হলে নিবিড় পরিচর্যাকেন্দ্রে (আইসিইউ) রাখা হয় তাঁকে। পরে কেবিনে স্থানান্তর করা হলে আবার অবস্থার অবনতি হয়। এরপর থেকে তাঁকে এইচডিইউ ইউনিটে রাখা হয়। গতকাল সকাল থেকে অক্সিজেনের মাত্রা কমতে থাকে। রাত ১০টা ১০ মিনিটে চিকিৎসকেরা প্রবীর মিত্রকে মৃত ঘোষণা করেন।</div><div><br></div><div><div>গত রোববার রাতে মারা গেছেন খ্যাতিমান অভিনেতা প্রবীর মিত্র। রাজধানীর একটি বেসরকারি হাসপাতালে চিকিৎসাধীন ছিলেন তিনি। ফুসফুসে সংক্রমণ, অক্সিজেন-স্বল্পতাসহ বেশ কিছু সমস্যায় ভুগছিলেন তিনি।</div><div>এর আগে গত ২২ ডিসেম্বর প্রবীর মিত্রকে হাসপাতালে ভর্তি করা হয়। অবস্থার অবনতি হলে নিবিড় পরিচর্যাকেন্দ্রে (আইসিইউ) রাখা হয় তাঁকে। পরে কেবিনে স্থানান্তর করা হলে আবার অবস্থার অবনতি হয়। এরপর থেকে তাঁকে এইচডিইউ ইউনিটে রাখা হয়। গতকাল সকাল থেকে অক্সিজেনের মাত্রা কমতে থাকে। রাত ১০টা ১০ মিনিটে চিকিৎসকেরা প্রবীর মিত্রকে মৃত ঘোষণা করেন।</div></div><div><br></div><div><div>গত রোববার রাতে মারা গেছেন খ্যাতিমান অভিনেতা প্রবীর মিত্র। রাজধানীর একটি বেসরকারি হাসপাতালে চিকিৎসাধীন ছিলেন তিনি। ফুসফুসে সংক্রমণ, অক্সিজেন-স্বল্পতাসহ বেশ কিছু সমস্যায় ভুগছিলেন তিনি।</div><div>এর আগে গত ২২ ডিসেম্বর প্রবীর মিত্রকে হাসপাতালে ভর্তি করা হয়। অবস্থার অবনতি হলে নিবিড় পরিচর্যাকেন্দ্রে (আইসিইউ) রাখা হয় তাঁকে। পরে কেবিনে স্থানান্তর করা হলে আবার অবস্থার অবনতি হয়। এরপর থেকে তাঁকে এইচডিইউ ইউনিটে রাখা হয়। গতকাল সকাল থেকে অক্সিজেনের মাত্রা কমতে থাকে। রাত ১০টা ১০ মিনিটে চিকিৎসকেরা প্রবীর মিত্রকে মৃত ঘোষণা করেন।</div></div>', '1737225055aqvKY2He.jpg', NULL, NULL, '', 'zlJhgoItynE', NULL, 8, NULL, 0, NULL, 0, 1, 0, 'true', 0, NULL, '2026-06-14 05:44:50', '2025-01-19 02:30:55', 'গত রোববার রাতে মারা গেছেন খ্যাতিমান অভিনেতা প্রবীর মিত্র। রাজধানীর একটি বেসরকারি হাসপাতালে চিকিৎসাধীন ছিলেন তিনি। ফুসফুসে সংক্রমণ, অক্সিজেন-স্বল্পতাসহ বেশ কিছু সমস্যায় ভুগছিলেন তিনি।', NULL),
(26, 1, 'আমাদের জীবিত কিংবদন্তি দিলারা জামান...', 'আমাদের-জীবিত-কিংবদন্তি-দিলারা-জামান...', 'video', 'আমাদের জীবিত কিংবদন্তি দিলারা জামান...', 0, 1, 1, 0, 1, 1, 1, '<div>গত রোববার রাতে মারা গেছেন খ্যাতিমান অভিনেতা প্রবীর মিত্র। রাজধানীর একটি বেসরকারি হাসপাতালে চিকিৎসাধীন ছিলেন তিনি। ফুসফুসে সংক্রমণ, অক্সিজেন-স্বল্পতাসহ বেশ কিছু সমস্যায় ভুগছিলেন তিনি।</div><div>এর আগে গত ২২ ডিসেম্বর প্রবীর মিত্রকে হাসপাতালে ভর্তি করা হয়। অবস্থার অবনতি হলে নিবিড় পরিচর্যাকেন্দ্রে (আইসিইউ) রাখা হয় তাঁকে। পরে কেবিনে স্থানান্তর করা হলে আবার অবস্থার অবনতি হয়। এরপর থেকে তাঁকে এইচডিইউ ইউনিটে রাখা হয়। গতকাল সকাল থেকে অক্সিজেনের মাত্রা কমতে থাকে। রাত ১০টা ১০ মিনিটে চিকিৎসকেরা প্রবীর মিত্রকে মৃত ঘোষণা করেন।গত রোববার রাতে মারা গেছেন খ্যাতিমান অভিনেতা প্রবীর মিত্র। রাজধানীর একটি বেসরকারি হাসপাতালে চিকিৎসাধীন ছিলেন তিনি। ফুসফুসে সংক্রমণ, অক্সিজেন-স্বল্পতাসহ বেশ কিছু সমস্যায় ভুগছিলেন তিনি।</div><div>এর আগে গত ২২ ডিসেম্বর প্রবীর মিত্রকে হাসপাতালে ভর্তি করা হয়। অবস্থার অবনতি হলে নিবিড় পরিচর্যাকেন্দ্রে (আইসিইউ) রাখা হয় তাঁকে। পরে কেবিনে স্থানান্তর করা হলে আবার অবস্থার অবনতি হয়। এরপর থেকে তাঁকে এইচডিইউ ইউনিটে রাখা হয়। গতকাল সকাল থেকে অক্সিজেনের মাত্রা কমতে থাকে। রাত ১০টা ১০ মিনিটে চিকিৎসকেরা প্রবীর মিত্রকে মৃত ঘোষণা করেন।গত রোববার রাতে মারা গেছেন খ্যাতিমান অভিনেতা প্রবীর মিত্র। রাজধানীর একটি বেসরকারি হাসপাতালে চিকিৎসাধীন ছিলেন তিনি। ফুসফুসে সংক্রমণ, অক্সিজেন-স্বল্পতাসহ বেশ কিছু সমস্যায় ভুগছিলেন তিনি।</div><div>এর আগে গত ২২ ডিসেম্বর প্রবীর মিত্রকে হাসপাতালে ভর্তি করা হয়। অবস্থার অবনতি হলে নিবিড় পরিচর্যাকেন্দ্রে (আইসিইউ) রাখা হয় তাঁকে। পরে কেবিনে স্থানান্তর করা হলে আবার অবস্থার অবনতি হয়। এরপর থেকে তাঁকে এইচডিইউ ইউনিটে রাখা হয়। গতকাল সকাল থেকে অক্সিজেনের মাত্রা কমতে থাকে। রাত ১০টা ১০ মিনিটে চিকিৎসকেরা প্রবীর মিত্রকে মৃত ঘোষণা করেন।</div>', '1737225311HnmyAs0m.jpg', NULL, NULL, '', 'Zm5faHcozco', NULL, 8, NULL, 0, NULL, 0, 1, 0, 'true', 0, NULL, '2026-06-14 05:44:50', '2025-01-19 02:35:11', 'গত রোববার রাতে মারা গেছেন খ্যাতিমান অভিনেতা প্রবীর মিত্র। রাজধানীর একটি বেসরকারি হাসপাতালে চিকিৎসাধীন ছিলেন তিনি। ফুসফুসে সংক্রমণ, অক্সিজেন-স্বল্পতাসহ বেশ কিছু সমস্যায় ভুগছিলেন তিনি।', NULL),
(27, 1, 'সাঁতার প্রতিযোগিতার সেরা নাফিসা সিনেমায় নায়িকাও, নায়কের তালিকায় ছিলেন অমিতাভ ও শশী কাপুররা', 'সাঁতার-প্রতিযোগিতার-সেরা-নাফিসা-সিনেমায়-নায়িকাও,-নায়কের-তালিকায়-ছিলেন-অমিতাভ-ও-শশী-কাপুররা', 'video', 'সাঁতার প্রতিযোগিতার সেরা নাফিসা সিনেমায় নায়িকাও, নায়কের তালিকায় ছিলেন অমিতাভ ও শশী কাপুররা', 0, 1, 1, 0, 1, 1, 1, '<div>গত রোববার রাতে মারা গেছেন খ্যাতিমান অভিনেতা প্রবীর মিত্র। রাজধানীর একটি বেসরকারি হাসপাতালে চিকিৎসাধীন ছিলেন তিনি। ফুসফুসে সংক্রমণ, অক্সিজেন-স্বল্পতাসহ বেশ কিছু সমস্যায় ভুগছিলেন তিনি।</div><div>এর আগে গত ২২ ডিসেম্বর প্রবীর মিত্রকে হাসপাতালে ভর্তি করা হয়। অবস্থার অবনতি হলে নিবিড় পরিচর্যাকেন্দ্রে (আইসিইউ) রাখা হয় তাঁকে। পরে কেবিনে স্থানান্তর করা হলে আবার অবস্থার অবনতি হয়। এরপর থেকে তাঁকে এইচডিইউ ইউনিটে রাখা হয়। গতকাল সকাল থেকে অক্সিজেনের মাত্রা কমতে থাকে। রাত ১০টা ১০ মিনিটে চিকিৎসকেরা প্রবীর মিত্রকে মৃত ঘোষণা করেন।গত রোববার রাতে মারা গেছেন খ্যাতিমান অভিনেতা প্রবীর মিত্র। রাজধানীর একটি বেসরকারি হাসপাতালে চিকিৎসাধীন ছিলেন তিনি। ফুসফুসে সংক্রমণ, অক্সিজেন-স্বল্পতাসহ বেশ কিছু সমস্যায় ভুগছিলেন তিনি।</div><div>এর আগে গত ২২ ডিসেম্বর প্রবীর মিত্রকে হাসপাতালে ভর্তি করা হয়। অবস্থার অবনতি হলে নিবিড় পরিচর্যাকেন্দ্রে (আইসিইউ) রাখা হয় তাঁকে। পরে কেবিনে স্থানান্তর করা হলে আবার অবস্থার অবনতি হয়। এরপর থেকে তাঁকে এইচডিইউ ইউনিটে রাখা হয়। গতকাল সকাল থেকে অক্সিজেনের মাত্রা কমতে থাকে। রাত ১০টা ১০ মিনিটে চিকিৎসকেরা প্রবীর মিত্রকে মৃত ঘোষণা করেন।গত রোববার রাতে মারা গেছেন খ্যাতিমান অভিনেতা প্রবীর মিত্র। রাজধানীর একটি বেসরকারি হাসপাতালে চিকিৎসাধীন ছিলেন তিনি। ফুসফুসে সংক্রমণ, অক্সিজেন-স্বল্পতাসহ বেশ কিছু সমস্যায় ভুগছিলেন তিনি।</div><div>এর আগে গত ২২ ডিসেম্বর প্রবীর মিত্রকে হাসপাতালে ভর্তি করা হয়। অবস্থার অবনতি হলে নিবিড় পরিচর্যাকেন্দ্রে (আইসিইউ) রাখা হয় তাঁকে। পরে কেবিনে স্থানান্তর করা হলে আবার অবস্থার অবনতি হয়। এরপর থেকে তাঁকে এইচডিইউ ইউনিটে রাখা হয়। গতকাল সকাল থেকে অক্সিজেনের মাত্রা কমতে থাকে। রাত ১০টা ১০ মিনিটে চিকিৎসকেরা প্রবীর মিত্রকে মৃত ঘোষণা করেন।গত রোববার রাতে মারা গেছেন খ্যাতিমান অভিনেতা প্রবীর মিত্র। রাজধানীর একটি বেসরকারি হাসপাতালে চিকিৎসাধীন ছিলেন তিনি। ফুসফুসে সংক্রমণ, অক্সিজেন-স্বল্পতাসহ বেশ কিছু সমস্যায় ভুগছিলেন তিনি।</div><div>এর আগে গত ২২ ডিসেম্বর প্রবীর মিত্রকে হাসপাতালে ভর্তি করা হয়। অবস্থার অবনতি হলে নিবিড় পরিচর্যাকেন্দ্রে (আইসিইউ) রাখা হয় তাঁকে। পরে কেবিনে স্থানান্তর করা হলে আবার অবস্থার অবনতি হয়। এরপর থেকে তাঁকে এইচডিইউ ইউনিটে রাখা হয়। গতকাল সকাল থেকে অক্সিজেনের মাত্রা কমতে থাকে। রাত ১০টা ১০ মিনিটে চিকিৎসকেরা প্রবীর মিত্রকে মৃত ঘোষণা করেন।</div>', '1737225501ZuA38R9e.jpg', NULL, NULL, '', 'ZFXcsi9_5NQ', NULL, 8, NULL, 0, NULL, 0, 1, 0, 'true', 0, NULL, '2026-06-14 05:44:50', '2025-01-19 02:38:21', 'গত রোববার রাতে মারা গেছেন খ্যাতিমান অভিনেতা প্রবীর মিত্র। রাজধানীর একটি বেসরকারি হাসপাতালে চিকিৎসাধীন ছিলেন তিনি। ফুসফুসে সংক্রমণ, অক্সিজেন-স্বল্পতাসহ বেশ কিছু সমস্যায় ভুগছিলেন তিনি।', NULL),
(28, 1, 'ঠাকুরগাঁওয়ে ইত্যাদির শুটিংয়ে কী ঘটেছিল, জানালেন হানিফ সংকেত', 'ঠাকুরগাঁওয়ে-ইত্যাদির-শুটিংয়ে-কী-ঘটেছিল,-জানালেন-হানিফ-সংকেত', 'video', 'ঠাকুরগাঁওয়ে ইত্যাদির শুটিংয়ে কী ঘটেছিল, জানালেন হানিফ সংকেত', 0, 1, 1, 0, 1, 1, 1, '<div>গত রোববার রাতে মারা গেছেন খ্যাতিমান অভিনেতা প্রবীর মিত্র। রাজধানীর একটি বেসরকারি হাসপাতালে চিকিৎসাধীন ছিলেন তিনি। ফুসফুসে সংক্রমণ, অক্সিজেন-স্বল্পতাসহ বেশ কিছু সমস্যায় ভুগছিলেন তিনি।</div><div>এর আগে গত ২২ ডিসেম্বর প্রবীর মিত্রকে হাসপাতালে ভর্তি করা হয়। অবস্থার অবনতি হলে নিবিড় পরিচর্যাকেন্দ্রে (আইসিইউ) রাখা হয় তাঁকে। পরে কেবিনে স্থানান্তর করা হলে আবার অবস্থার অবনতি হয়। এরপর থেকে তাঁকে এইচডিইউ ইউনিটে রাখা হয়। গতকাল সকাল থেকে অক্সিজেনের মাত্রা কমতে থাকে। রাত ১০টা ১০ মিনিটে চিকিৎসকেরা প্রবীর মিত্রকে মৃত ঘোষণা করেন।গত রোববার রাতে মারা গেছেন খ্যাতিমান অভিনেতা প্রবীর মিত্র। রাজধানীর একটি বেসরকারি হাসপাতালে চিকিৎসাধীন ছিলেন তিনি। ফুসফুসে সংক্রমণ, অক্সিজেন-স্বল্পতাসহ বেশ কিছু সমস্যায় ভুগছিলেন তিনি।</div><div>এর আগে গত ২২ ডিসেম্বর প্রবীর মিত্রকে হাসপাতালে ভর্তি করা হয়। অবস্থার অবনতি হলে নিবিড় পরিচর্যাকেন্দ্রে (আইসিইউ) রাখা হয় তাঁকে। পরে কেবিনে স্থানান্তর করা হলে আবার অবস্থার অবনতি হয়। এরপর থেকে তাঁকে এইচডিইউ ইউনিটে রাখা হয়। গতকাল সকাল থেকে অক্সিজেনের মাত্রা কমতে থাকে। রাত ১০টা ১০ মিনিটে চিকিৎসকেরা প্রবীর মিত্রকে মৃত ঘোষণা করেন।গত রোববার রাতে মারা গেছেন খ্যাতিমান অভিনেতা প্রবীর মিত্র। রাজধানীর একটি বেসরকারি হাসপাতালে চিকিৎসাধীন ছিলেন তিনি। ফুসফুসে সংক্রমণ, অক্সিজেন-স্বল্পতাসহ বেশ কিছু সমস্যায় ভুগছিলেন তিনি।</div><div>এর আগে গত ২২ ডিসেম্বর প্রবীর মিত্রকে হাসপাতালে ভর্তি করা হয়। অবস্থার অবনতি হলে নিবিড় পরিচর্যাকেন্দ্রে (আইসিইউ) রাখা হয় তাঁকে। পরে কেবিনে স্থানান্তর করা হলে আবার অবস্থার অবনতি হয়। এরপর থেকে তাঁকে এইচডিইউ ইউনিটে রাখা হয়। গতকাল সকাল থেকে অক্সিজেনের মাত্রা কমতে থাকে। রাত ১০টা ১০ মিনিটে চিকিৎসকেরা প্রবীর মিত্রকে মৃত ঘোষণা করেন।গত রোববার রাতে মারা গেছেন খ্যাতিমান অভিনেতা প্রবীর মিত্র। রাজধানীর একটি বেসরকারি হাসপাতালে চিকিৎসাধীন ছিলেন তিনি। ফুসফুসে সংক্রমণ, অক্সিজেন-স্বল্পতাসহ বেশ কিছু সমস্যায় ভুগছিলেন তিনি।</div><div>এর আগে গত ২২ ডিসেম্বর প্রবীর মিত্রকে হাসপাতালে ভর্তি করা হয়। অবস্থার অবনতি হলে নিবিড় পরিচর্যাকেন্দ্রে (আইসিইউ) রাখা হয় তাঁকে। পরে কেবিনে স্থানান্তর করা হলে আবার অবস্থার অবনতি হয়। এরপর থেকে তাঁকে এইচডিইউ ইউনিটে রাখা হয়। গতকাল সকাল থেকে অক্সিজেনের মাত্রা কমতে থাকে। রাত ১০টা ১০ মিনিটে চিকিৎসকেরা প্রবীর মিত্রকে মৃত ঘোষণা করেন।গত রোববার রাতে মারা গেছেন খ্যাতিমান অভিনেতা প্রবীর মিত্র। রাজধানীর একটি বেসরকারি হাসপাতালে চিকিৎসাধীন ছিলেন তিনি। ফুসফুসে সংক্রমণ, অক্সিজেন-স্বল্পতাসহ বেশ কিছু সমস্যায় ভুগছিলেন তিনি।</div><div>এর আগে গত ২২ ডিসেম্বর প্রবীর মিত্রকে হাসপাতালে ভর্তি করা হয়। অবস্থার অবনতি হলে নিবিড় পরিচর্যাকেন্দ্রে (আইসিইউ) রাখা হয় তাঁকে। পরে কেবিনে স্থানান্তর করা হলে আবার অবস্থার অবনতি হয়। এরপর থেকে তাঁকে এইচডিইউ ইউনিটে রাখা হয়। গতকাল সকাল থেকে অক্সিজেনের মাত্রা কমতে থাকে। রাত ১০টা ১০ মিনিটে চিকিৎসকেরা প্রবীর মিত্রকে মৃত ঘোষণা করেন।</div>', '1737225705Ol04JLNm.jpg', NULL, NULL, '', 'edMzwOBnKYM', NULL, 8, NULL, 0, NULL, 0, 1, 0, 'true', 0, NULL, '2026-06-14 05:44:50', '2025-01-19 02:41:45', 'গত রোববার রাতে মারা গেছেন খ্যাতিমান অভিনেতা প্রবীর মিত্র। রাজধানীর একটি বেসরকারি হাসপাতালে চিকিৎসাধীন ছিলেন তিনি। ফুসফুসে সংক্রমণ, অক্সিজেন-স্বল্পতাসহ বেশ কিছু সমস্যায় ভুগছিলেন তিনি।', NULL),
(29, 1, 'হামাস জিম্মিদের তালিকা না দেওয়া পর্যন্ত যুদ্ধবিরতি কার্যকর হবে না: নেতানিয়াহু', 'হামাস-জিম্মিদের-তালিকা-না-দেওয়া-পর্যন্ত-যুদ্ধবিরতি-কার্যকর-হবে-না:-নেতানিয়াহু', 'article', 'হামাস জিম্মিদের তালিকা না দেওয়া পর্যন্ত যুদ্ধবিরতি কার্যকর হবে না: নেতানিয়াহু', 0, 1, 1, 0, 1, 1, 0, '<div><span style=\"font-size: 14px;\">মুক্তি দেওয়া হবে এমন জিম্মি ব্যক্তিদের তালিকা হামাস প্রকাশ না করা পর্যন্ত পূর্বনির্ধারিত সময়ে যুদ্ধবিরতি কার্যকর হবে না। ইসরায়েলের প্রধানমন্ত্রী বেনিয়ামিন নেতানিয়াহু আজ রোববার এমন হুঁশিয়ারি দিয়েছেন।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">আজ ইসরায়েলের স্থানীয় সময় সকাল সাড়ে আটটায় যুদ্ধবিরতি কার্যকর হওয়ার কথা। এর আগে ফিলিস্তিনি সশস্ত্র সংগঠন হামাস জানিয়েছে, ‘কারিগরি সমস্যার’ কারণে মুক্তি পেতে যাওয়া জিম্মি ব্যক্তিদের তালিকা প্রকাশ করতে দেরি হচ্ছে।মুক্তি দেওয়া হবে এমন জিম্মি ব্যক্তিদের তালিকা হামাস প্রকাশ না করা পর্যন্ত পূর্বনির্ধারিত সময়ে যুদ্ধবিরতি কার্যকর হবে না। ইসরায়েলের প্রধানমন্ত্রী বেনিয়ামিন নেতানিয়াহু আজ রোববার এমন হুঁশিয়ারি দিয়েছেন।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">আজ ইসরায়েলের স্থানীয় সময় সকাল সাড়ে আটটায় যুদ্ধবিরতি কার্যকর হওয়ার কথা। এর আগে ফিলিস্তিনি সশস্ত্র সংগঠন হামাস জানিয়েছে, ‘কারিগরি সমস্যার’ কারণে মুক্তি পেতে যাওয়া জিম্মি ব্যক্তিদের তালিকা প্রকাশ করতে দেরি হচ্ছে।</span></div>', '1737272856ewUGeDe6.jpg', NULL, NULL, NULL, NULL, NULL, 4, 18, 0, NULL, 0, 1, 0, 'true', 0, NULL, '2026-06-14 05:46:36', '2025-01-19 15:47:36', 'মুক্তি দেওয়া হবে এমন জিম্মি ব্যক্তিদের তালিকা হামাস প্রকাশ না করা পর্যন্ত পূর্বনির্ধারিত সময়ে যুদ্ধবিরতি কার্যকর হবে না। ইসরায়েলের প্রধানমন্ত্রী বেনিয়ামিন নেতানিয়াহু আজ রোববার এমন হুঁশিয়ারি দিয়েছেন।মুক্তি দেওয়া হবে এমন জিম্মি ব্যক্তিদের তালিকা হামাস প্রকাশ না করা পর্যন্ত পূর্বনির্ধারিত সময়ে যুদ্ধবিরতি কার্যকর হবে না। ইসরায়েলের প্রধানমন্ত্রী বেনিয়ামিন নেতানিয়াহু আজ রোববার এমন হুঁশিয়ারি দিয়েছেন।', NULL),
(30, 1, '‘আমি ভয়ও পাচ্ছি, কারণ ইসরায়েলিদের বিশ্বাস করি না’', '‘আমি-ভয়ও-পাচ্ছি,-কারণ-ইসরায়েলিদের-বিশ্বাস-করি-না’', 'article', '‘আমি ভয়ও পাচ্ছি, কারণ ইসরায়েলিদের বিশ্বাস করি না’', 0, 1, 1, 0, 1, 1, 0, '<div><span style=\"font-size: 14px;\">গাজায় যুদ্ধবিরতি চুক্তি কার্যকরের জন্য অধীর অপেক্ষা নিয়ে সময় গুনছেন ফিলিস্তিনিরা।</span>উপত্যকায় যুদ্ধবিরতি কার্যকর হওয়ার সম্ভাবনায় গাজাবাসীদের মধ্যে আনন্দ-উচ্ছ্বাস দেখা যাচ্ছে। তবে তাঁদের মধ্যে কাজ করছে শঙ্কাও।</div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">গাজার বাস্তুচ্যুত নারী লতিফা কাশকাশ বলেন, তিনি খুশি। কারণ, যুদ্ধবিরতি কার্যকর হলে তিনি তাঁর বসত এলাকায়, বাড়িতে ফিরে যাবেন।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">তবে লতিফার মধ্যে আশঙ্কাও আছে। তিনি বলেন, ‘আমি ভয়ও পাচ্ছি। কারণ, আমি ইসরায়েলিদের বিশ্বাস করি না।’গাজায় যুদ্ধবিরতি চুক্তি কার্যকরের জন্য অধীর অপেক্ষা নিয়ে সময় গুনছেন ফিলিস্তিনিরা।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">উপত্যকায় যুদ্ধবিরতি কার্যকর হওয়ার সম্ভাবনায় গাজাবাসীদের মধ্যে আনন্দ-উচ্ছ্বাস দেখা যাচ্ছে। তবে তাঁদের মধ্যে কাজ করছে শঙ্কাও।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">গাজার বাস্তুচ্যুত নারী লতিফা কাশকাশ বলেন, তিনি খুশি। কারণ, যুদ্ধবিরতি কার্যকর হলে তিনি তাঁর বসত এলাকায়, বাড়িতে ফিরে যাবেন।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">তবে লতিফার মধ্যে আশঙ্কাও আছে। তিনি বলেন, ‘আমি ভয়ও পাচ্ছি। কারণ, আমি ইসরায়েলিদের বিশ্বাস করি না।’গাজায় যুদ্ধবিরতি চুক্তি কার্যকরের জন্য অধীর অপেক্ষা নিয়ে সময় গুনছেন ফিলিস্তিনিরা।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">উপত্যকায় যুদ্ধবিরতি কার্যকর হওয়ার সম্ভাবনায় গাজাবাসীদের মধ্যে আনন্দ-উচ্ছ্বাস দেখা যাচ্ছে। তবে তাঁদের মধ্যে কাজ করছে শঙ্কাও।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">গাজার বাস্তুচ্যুত নারী লতিফা কাশকাশ বলেন, তিনি খুশি। কারণ, যুদ্ধবিরতি কার্যকর হলে তিনি তাঁর বসত এলাকায়, বাড়িতে ফিরে যাবেন।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">তবে লতিফার মধ্যে আশঙ্কাও আছে। তিনি বলেন, ‘আমি ভয়ও পাচ্ছি। কারণ, আমি ইসরায়েলিদের বিশ্বাস করি না।’</span></div>', '1737272994JTteamjC.jpg', NULL, NULL, NULL, NULL, NULL, 4, NULL, 0, NULL, 0, 1, 0, 'true', 0, NULL, '2026-06-14 05:44:50', '2025-01-19 15:49:54', 'গাজায় যুদ্ধবিরতি চুক্তি কার্যকরের জন্য অধীর অপেক্ষা নিয়ে সময় গুনছেন ফিলিস্তিনিরা।উপত্যকায় যুদ্ধবিরতি কার্যকর হওয়ার সম্ভাবনায় গাজাবাসীদের মধ্যে আনন্দ-উচ্ছ্বাস দেখা যাচ্ছে। তবে তাঁদের মধ্যে কাজ করছে শঙ্কাও।গাজায় যুদ্ধবিরতি চুক্তি কার্যকরের জন্য অধীর অপেক্ষা নিয়ে সময় গুনছেন ফিলিস্তিনিরা।উপত্যকায় যুদ্ধবিরতি কার্যকর হওয়ার সম্ভাবনায় গাজাবাসীদের মধ্যে আনন্দ-উচ্ছ্বাস দেখা যাচ্ছে। তবে তাঁদের মধ্যে কাজ করছে শঙ্কাও।', NULL),
(31, 1, 'ট্রাম্প ওয়াশিংটনে পৌঁছেছেন, প্রথম দিনেই সই করবেন রেকর্ডসংখ্যক নির্বাহী আদেশে', 'ট্রাম্প-ওয়াশিংটনে-পৌঁছেছেন,-প্রথম-দিনেই-সই-করবেন-রেকর্ডসংখ্যক-নির্বাহী-আদেশে', 'article', 'ট্রাম্প ওয়াশিংটনে পৌঁছেছেন, প্রথম দিনেই সই করবেন রেকর্ডসংখ্যক নির্বাহী আদেশে', 0, 1, 1, 0, 1, 1, 0, '<div><span style=\"font-size: 14px;\">ওয়াশিংটন পৌঁছে গেছেন ডোনাল্ড ট্রাম্প। ২০ জানুয়ারি সেখানেই তাঁর শপথ গ্রহণ অনুষ্ঠান হবে। যুক্তরাষ্ট্রের নতুন প্রেসিডেন্ট হিসেবে শপথ গ্রহণ শেষে সেদিনই রেকর্ডসংখ্যক নির্বাহী আদেশে সই করার পরিকল্পনার কথা জানিয়েছেন ট্রাম্প</span>ট্রাম্প, তাঁর স্ত্রী মেলানিয়া এবং ট্রাম্প পরিবারের অন্য সদস্যদের নিয়ে ইউএস এয়ার ফোর্সের একটি উড়োজাহাজ স্থানীয় সময় শনিবার ডালাস আন্তর্জাতিক বিমানবন্দরে পৌঁছায়।</div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">সেখান থেকে ট্রাম্প তাঁর পরিবারের সদস্যদের নিয়ে ভার্জিনিয়ায় তাঁর গলফ ক্লাবে যাবেন। ভার্জিনিয়া ওয়াশিংটন উপকণ্ঠে অবস্থিত। গলফ ক্লাবে আতশবাজি পোড়ানোর মধ্য দিয়ে ট্রাম্পের শপথ গ্রহণ উৎস শুরু হয়ে যাবে।ওয়াশিংটন পৌঁছে গেছেন ডোনাল্ড ট্রাম্প। ২০ জানুয়ারি সেখানেই তাঁর শপথ গ্রহণ অনুষ্ঠান হবে। যুক্তরাষ্ট্রের নতুন প্রেসিডেন্ট হিসেবে শপথ গ্রহণ শেষে সেদিনই রেকর্ডসংখ্যক নির্বাহী আদেশে সই করার পরিকল্পনার কথা জানিয়েছেন ট্রাম্প।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">ট্রাম্প, তাঁর স্ত্রী মেলানিয়া এবং ট্রাম্প পরিবারের অন্য সদস্যদের নিয়ে ইউএস এয়ার ফোর্সের একটি উড়োজাহাজ স্থানীয় সময় শনিবার ডালাস আন্তর্জাতিক বিমানবন্দরে পৌঁছায়।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">সেখান থেকে ট্রাম্প তাঁর পরিবারের সদস্যদের নিয়ে ভার্জিনিয়ায় তাঁর গলফ ক্লাবে যাবেন। ভার্জিনিয়া ওয়াশিংটন উপকণ্ঠে অবস্থিত। গলফ ক্লাবে আতশবাজি পোড়ানোর মধ্য দিয়ে ট্রাম্পের শপথ গ্রহণ উৎস শুরু হয়ে যাবে।</span></div>', '1737273203cmrk8Bvp.jpg', NULL, NULL, NULL, NULL, NULL, 4, NULL, 0, NULL, 0, 1, 0, 'true', 0, NULL, '2026-06-14 05:44:50', '2025-01-19 15:53:23', 'ওয়াশিংটন পৌঁছে গেছেন ডোনাল্ড ট্রাম্প। ২০ জানুয়ারি সেখানেই তাঁর শপথ গ্রহণ অনুষ্ঠান হবে। যুক্তরাষ্ট্রের নতুন প্রেসিডেন্ট হিসেবে শপথ গ্রহণ শেষে সেদিনই রেকর্ডসংখ্যক নির্বাহী আদেশে সই করার পরিকল্পনার কথা জানিয়েছেন ট্রাম্পট্রাম্প, তাঁর স্ত্রী মেলানিয়া এবং ট্রাম্প পরিবারের অন্য সদস্যদের নিয়ে ইউএস এয়ার ফোর্সের একটি উড়োজাহাজ স্থানীয় সময় শনিবার ডালাস আন্তর্জাতিক বিমানবন্দরে পৌঁছায়।', NULL),
(32, 1, 'ড্রাইভিং লাইসেন্স নবায়ন করতে গিয়ে জানলেন তিনি ‘মৃত’', 'ড্রাইভিং-লাইসেন্স-নবায়ন-করতে-গিয়ে-জানলেন-তিনি-‘মৃত’', 'article', 'ড্রাইভিং লাইসেন্স নবায়ন করতে গিয়ে জানলেন তিনি ‘মৃত’', 0, 1, 1, 0, 1, 1, 0, '<div><span style=\"font-size: 14px;\">যুক্তরাষ্ট্রের মেরিল্যান্ড অঙ্গরাজ্যের বাসিন্দা নিকোল পাউলিনো। সম্প্রতি নিজের ড্রাইভিং লাইসেন্স নবায়ন করতে গিয়ে তিনি যে তথ্য জানতে পারেন, তাতে তাঁর মাথায় পুরো আকাশ ভেঙে পড়েছিল। তিন সন্তানের জননী এই নারী বলেন, জীবনে এতটা হতবাক তিনি আগে কখনো হননি।</span></div><div><span style=\"font-size: 14px;\">কী কারণে নিকোল এতটা হতবাক হয়েছেন, তা জানলে আপনারও চোখ কপালে উঠে যাবে। পাউলিনো ড্রাইভিং লাইসেন্স নবায়ন করতে গিয়ে জানতে পারেন, সরকারি নথিপত্রে তিনি একজন মৃত মানুষ। তাই আগে তাঁকে জীবিত থাকার প্রমাণপত্র দিতে হবে। তবেই কেবল তিনি ড্রাইভিং লাইসেন্স নবায়ন করতে পারবেন।যুক্তরাষ্ট্রের মেরিল্যান্ড অঙ্গরাজ্যের বাসিন্দা নিকোল পাউলিনো। সম্প্রতি নিজের ড্রাইভিং লাইসেন্স নবায়ন করতে গিয়ে তিনি যে তথ্য জানতে পারেন, তাতে তাঁর মাথায় পুরো আকাশ ভেঙে পড়েছিল। তিন সন্তানের জননী এই নারী বলেন, জীবনে এতটা হতবাক তিনি আগে কখনো হননি।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">কী কারণে নিকোল এতটা হতবাক হয়েছেন, তা জানলে আপনারও চোখ কপালে উঠে যাবে। পাউলিনো ড্রাইভিং লাইসেন্স নবায়ন করতে গিয়ে জানতে পারেন, সরকারি নথিপত্রে তিনি একজন মৃত মানুষ। তাই আগে তাঁকে জীবিত থাকার প্রমাণপত্র দিতে হবে। তবেই কেবল তিনি ড্রাইভিং লাইসেন্স নবায়ন করতে পারবেন।যুক্তরাষ্ট্রের মেরিল্যান্ড অঙ্গরাজ্যের বাসিন্দা নিকোল পাউলিনো। সম্প্রতি নিজের ড্রাইভিং লাইসেন্স নবায়ন করতে গিয়ে তিনি যে তথ্য জানতে পারেন, তাতে তাঁর মাথায় পুরো আকাশ ভেঙে পড়েছিল। তিন সন্তানের জননী এই নারী বলেন, জীবনে এতটা হতবাক তিনি আগে কখনো হননি।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">কী কারণে নিকোল এতটা হতবাক হয়েছেন, তা জানলে আপনারও চোখ কপালে উঠে যাবে। পাউলিনো ড্রাইভিং লাইসেন্স নবায়ন করতে গিয়ে জানতে পারেন, সরকারি নথিপত্রে তিনি একজন মৃত মানুষ। তাই আগে তাঁকে জীবিত থাকার প্রমাণপত্র দিতে হবে। তবেই কেবল তিনি ড্রাইভিং লাইসেন্স নবায়ন করতে পারবেন।</span></div>', '1737273321xBcwhS7E.jpg', NULL, NULL, NULL, NULL, NULL, 4, NULL, 0, NULL, 0, 1, 0, 'true', 0, NULL, '2026-06-14 05:44:50', '2025-01-19 15:55:21', 'যুক্তরাষ্ট্রের মেরিল্যান্ড অঙ্গরাজ্যের বাসিন্দা নিকোল পাউলিনো। সম্প্রতি নিজের ড্রাইভিং লাইসেন্স নবায়ন করতে গিয়ে তিনি যে তথ্য জানতে পারেন, তাতে তাঁর মাথায় পুরো আকাশ ভেঙে পড়েছিল। তিন সন্তানের জননী এই নারী বলেন, জীবনে এতটা হতবাক তিনি আগে কখনো হননি।', NULL),
(33, 1, 'যুক্তরাষ্ট্রে টিকটকে ঢুকলে দেখা যাচ্ছে নতুন বার্তা', 'যুক্তরাষ্ট্রে-টিকটকে-ঢুকলে-দেখা-যাচ্ছে-নতুন-বার্তা', 'article', 'যুক্তরাষ্ট্রে টিকটকে ঢুকলে দেখা যাচ্ছে নতুন বার্তা', 0, 1, 1, 0, 1, 1, 0, '<div><span style=\"font-size: 14px;\">যুক্তরাষ্ট্রে আইনি বাধ্যবাধকতায় নিষেধাজ্ঞা কার্যকর হওয়ার কয়েক ঘণ্টা আগে আজ রোববার বন্ধ হয়ে গেছে ভিডিও শেয়ারিং অ্যাপ টিকটক।</span></div><div><span style=\"font-size: 14px;\">এর ফলে যুক্তরাষ্ট্রে টিকটক ব্যবহারকারী ব্যক্তিরা অ্যাপটিতে ঢুকলে একটি বার্তা দেখতে পাচ্ছেন। তাতে লেখা রয়েছে, ‘আইনগতভাবে টিকটক নিষিদ্ধ করা হয়েছে। এর অর্থ হলো, আপনি এখন থেকে টিকটক ব্যবহার করতে পারবেন না।’যুক্তরাষ্ট্রে আইনি বাধ্যবাধকতায় নিষেধাজ্ঞা কার্যকর হওয়ার কয়েক ঘণ্টা আগে আজ রোববার বন্ধ হয়ে গেছে ভিডিও শেয়ারিং অ্যাপ টিকটক।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">এর ফলে যুক্তরাষ্ট্রে টিকটক ব্যবহারকারী ব্যক্তিরা অ্যাপটিতে ঢুকলে একটি বার্তা দেখতে পাচ্ছেন। তাতে লেখা রয়েছে, ‘আইনগতভাবে টিকটক নিষিদ্ধ করা হয়েছে। এর অর্থ হলো, আপনি এখন থেকে টিকটক ব্যবহার করতে পারবেন না।’যুক্তরাষ্ট্রে আইনি বাধ্যবাধকতায় নিষেধাজ্ঞা কার্যকর হওয়ার কয়েক ঘণ্টা আগে আজ রোববার বন্ধ হয়ে গেছে ভিডিও শেয়ারিং অ্যাপ টিকটক।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">এর ফলে যুক্তরাষ্ট্রে টিকটক ব্যবহারকারী ব্যক্তিরা অ্যাপটিতে ঢুকলে একটি বার্তা দেখতে পাচ্ছেন। তাতে লেখা রয়েছে, ‘আইনগতভাবে টিকটক নিষিদ্ধ করা হয়েছে। এর অর্থ হলো, আপনি এখন থেকে টিকটক ব্যবহার করতে পারবেন না।’যুক্তরাষ্ট্রে আইনি বাধ্যবাধকতায় নিষেধাজ্ঞা কার্যকর হওয়ার কয়েক ঘণ্টা আগে আজ রোববার বন্ধ হয়ে গেছে ভিডিও শেয়ারিং অ্যাপ টিকটক।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">এর ফলে যুক্তরাষ্ট্রে টিকটক ব্যবহারকারী ব্যক্তিরা অ্যাপটিতে ঢুকলে একটি বার্তা দেখতে পাচ্ছেন। তাতে লেখা রয়েছে, ‘আইনগতভাবে টিকটক নিষিদ্ধ করা হয়েছে। এর অর্থ হলো, আপনি এখন থেকে টিকটক ব্যবহার করতে পারবেন না।’</span></div>', '1737273429ilYUX6zd.jpg', NULL, NULL, NULL, NULL, NULL, 4, NULL, 0, NULL, 0, 1, 0, 'true', 0, NULL, '2026-06-14 05:44:50', '2025-01-19 15:57:09', 'যুক্তরাষ্ট্রে আইনি বাধ্যবাধকতায় নিষেধাজ্ঞা কার্যকর হওয়ার কয়েক ঘণ্টা আগে আজ রোববার বন্ধ হয়ে গেছে ভিডিও শেয়ারিং অ্যাপ টিকটক।', NULL),
(34, 1, 'দক্ষতা উন্নয়নে নজর কম, ফ্রিল্যান্সার তৈরির হিড়িক', 'দক্ষতা-উন্নয়নে-নজর-কম,-ফ্রিল্যান্সার-তৈরির-হিড়িক', 'article', 'দক্ষতা উন্নয়নে নজর কম, ফ্রিল্যান্সার তৈরির হিড়িক', 0, 1, 1, 0, 1, 1, 0, '<div><span style=\"font-size: 14px;\">তথ্যপ্রযুক্তি খাতের ফ্রিল্যান্সার তৈরিতে প্রশিক্ষণ দিচ্ছে সরকারের তিন মন্ত্রণালয়। এ প্রশিক্ষণে এরই মধ্যে হাজার কোটি টাকার বেশি ব্যয় হয়েছে। যদিও সরকারের এক গবেষণাই বলছে, বাজারের চাহিদার সঙ্গে এই প্রশিক্ষণের বিস্তর ফারাক রয়েছে। প্রতিযোগী দেশগুলোর তুলনায় দক্ষতায় পিছিয়ে বাংলাদেশ; আয়েও রয়েছে পিছিয়ে।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">বিগত আওয়ামী লীগ সরকারের আমলে প্রতিবছরই বলা হতো, ফ্রিল্যান্সারের সংখ্যা লাখ লাখ বাড়ছে। প্রায়ই নেওয়া হতো নানা প্রকল্প। ফ্রিল্যান্সার তৈরিতে অন্তত হাজার কোটি টাকা ব্যয় করেছে তথ্য ও যোগাযোগপ্রযুক্তি বিভাগ (আইসিটি)। শিক্ষা মন্ত্রণালয়ের অধীন জাতীয় কম্পিউটার প্রশিক্ষণ ও গবেষণা একাডেমি (নেকটার) এবং যুব ও ক্রীড়া মন্ত্রণালয়ের অধীন যুব উন্নয়ন অধিদপ্তরও ফ্রিল্যান্সার তৈরিতে বড় অঙ্কের অর্থ ব্যয় করে আসছে।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">খাতসংশ্লিষ্ট ব্যক্তিরা সরকারের এই প্রশিক্ষণ ও অর্থ ব্যয়কে অনেকটাই অপচয় বলছেন। তাঁরা পুরোনো সিলেবাসে প্রশিক্ষণ, বাজারের চাহিদা না বোঝা; যাঁদের প্রয়োজন, তাঁদের প্রশিক্ষণ না দেওয়া; প্রশিক্ষণ উদ্যোগে অংশীজনদের যুক্ত না করা এবং প্রশিক্ষকদের পর্যবেক্ষণে না রাখার বিষয়কে মূল সমস্যা হিসেবে তুলে ধরছেন।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">আইসিটি সচিব শীষ হায়দার চৌধুরী প্রথম আলোকে বলেন, ফ্রিল্যান্সিংয়ের প্রয়োজনীয়তা আছে। তবে দক্ষতা বৃদ্ধিতে এখন মনোযোগ দিতে হবে। এ জন্য আইসিটি বিভাগ সামনের কাজগুলোতে এ ধরনের প্রশিক্ষণের ক্ষেত্রে সংশ্লিষ্ট বিশেষজ্ঞদের যুক্ত করবে।</span></div>', '1737273620QDR1g1WU.jpg', NULL, NULL, NULL, NULL, NULL, 5, NULL, 0, NULL, 0, 1, 0, 'true', 0, NULL, '2026-06-14 05:44:50', '2025-01-19 16:00:20', 'তথ্যপ্রযুক্তি খাতের ফ্রিল্যান্সার তৈরিতে প্রশিক্ষণ দিচ্ছে সরকারের তিন মন্ত্রণালয়। এ প্রশিক্ষণে এরই মধ্যে হাজার কোটি টাকার বেশি ব্যয় হয়েছে। যদিও সরকারের এক গবেষণাই বলছে, বাজারের চাহিদার সঙ্গে এই প্রশিক্ষণের বিস্তর ফারাক রয়েছে। প্রতিযোগী দেশগুলোর তুলনায় দক্ষতায় পিছিয়ে বাংলাদেশ; আয়েও রয়েছে পিছিয়ে।', NULL),
(35, 1, 'করোনাকালে বাড়লেও ক্রমেই কমছে স্টার্টআপে বিনিয়োগ, নীতি সহজ করার তাগিদ', 'করোনাকালে-বাড়লেও-ক্রমেই-কমছে-স্টার্টআপে-বিনিয়োগ,-নীতি-সহজ-করার-তাগিদ', 'article', 'করোনাকালে বাড়লেও ক্রমেই কমছে স্টার্টআপে বিনিয়োগ, নীতি সহজ করার তাগিদ', 0, 1, 1, 0, 1, 1, 0, '<div><span style=\"font-size: 14px;\">দেশের স্টার্টআপ খাতে গত এক দশকে প্রায় ৯৮৯ মিলিয়ন মার্কিন ডলার বিনিয়োগ এসেছে। দেশীয় মুদ্রায় যা সাড়ে ১১ হাজার কোটি টাকার বেশি (প্রতি ডলার ১২০ টাকা ধরে)। করোনাকালে পরপর দুই বছর এ খাতের বিনিয়োগে বেশ উঠতি প্রবণতা দেখা যায়। তবে পরের বছরগুলোয় ধারাবাহিকভাবে তা কমে এসেছে। এমন পরিস্থিতিতে স্টার্টআপে বিনিয়োগ আকর্ষণে দেশের আর্থিক নীতি সহজ করার তাগিদ দিয়েছেন এ খাত–সংশ্লিষ্ট ব্যক্তিরা।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">দেশীয় পরামর্শক প্রতিষ্ঠান লাইটক্যাসল পার্টনার্স গত বছরের নভেম্বরে ‘বাংলাদেশের স্টার্টআপে বিনিয়োগ প্রতিবেদন: এক দশকের পর্যালোচনা’ শীর্ষক একটি প্রতিবেদন প্রকাশ করেছে। এতে বলা হয়েছে, ২০১৩ থেকে ২০২৪ সাল পর্যন্ত এক দশকে দেশের স্টার্টআপে ১১ হাজার ৮৬৮ কোটি টাকার বেশি বিনিয়োগ এসেছে। এর মধ্যে বিদেশি বিনিয়োগ ৯২ শতাংশ।দেশের স্টার্টআপ খাতে গত এক দশকে প্রায় ৯৮৯ মিলিয়ন মার্কিন ডলার বিনিয়োগ এসেছে। দেশীয় মুদ্রায় যা সাড়ে ১১ হাজার কোটি টাকার বেশি (প্রতি ডলার ১২০ টাকা ধরে)। করোনাকালে পরপর দুই বছর এ খাতের বিনিয়োগে বেশ উঠতি প্রবণতা দেখা যায়। তবে পরের বছরগুলোয় ধারাবাহিকভাবে তা কমে এসেছে। এমন পরিস্থিতিতে স্টার্টআপে বিনিয়োগ আকর্ষণে দেশের আর্থিক নীতি সহজ করার তাগিদ দিয়েছেন এ খাত–সংশ্লিষ্ট ব্যক্তিরা।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">দেশীয় পরামর্শক প্রতিষ্ঠান লাইটক্যাসল পার্টনার্স গত বছরের নভেম্বরে ‘বাংলাদেশের স্টার্টআপে বিনিয়োগ প্রতিবেদন: এক দশকের পর্যালোচনা’ শীর্ষক একটি প্রতিবেদন প্রকাশ করেছে। এতে বলা হয়েছে, ২০১৩ থেকে ২০২৪ সাল পর্যন্ত এক দশকে দেশের স্টার্টআপে ১১ হাজার ৮৬৮ কোটি টাকার বেশি বিনিয়োগ এসেছে। এর মধ্যে বিদেশি বিনিয়োগ ৯২ শতাংশ।</span></div>', '1737273764co2RsWTj.jpg', NULL, NULL, NULL, NULL, NULL, 5, NULL, 0, NULL, 0, 1, 0, 'true', 0, NULL, '2026-06-14 05:44:50', '2025-01-19 16:02:44', 'দেশের স্টার্টআপ খাতে গত এক দশকে প্রায় ৯৮৯ মিলিয়ন মার্কিন ডলার বিনিয়োগ এসেছে। দেশীয় মুদ্রায় যা সাড়ে ১১ হাজার কোটি টাকার বেশি (প্রতি ডলার ১২০ টাকা ধরে)। করোনাকালে পরপর দুই বছর এ খাতের বিনিয়োগে বেশ উঠতি প্রবণতা দেখা যায়। তবে পরের বছরগুলোয় ধারাবাহিকভাবে তা কমে এসেছে। এমন পরিস্থিতিতে স্টার্টআপে বিনিয়োগ আকর্ষণে দেশের আর্থিক নীতি সহজ করার তাগিদ দিয়েছেন এ খাত–সংশ্লিষ্ট ব্যক্তিরা।', NULL),
(36, 1, 'সেমিকন্ডাক্টর খাতের বিকাশে টাস্কফোর্স গঠন, সদস্য ১৩ জন', 'সেমিকন্ডাক্টর-খাতের-বিকাশে-টাস্কফোর্স-গঠন,-সদস্য-১৩-জন', 'article', 'সেমিকন্ডাক্টর খাতের বিকাশে টাস্কফোর্স গঠন, সদস্য ১৩ জন', 0, 1, 1, 0, 1, 1, 0, '<div><span style=\"font-size: 14px;\">বাংলাদেশে সেমিকন্ডাক্টর শিল্পে চ্যালেঞ্জ, সম্ভাবনা ও ভবিষ্যতে করণীয় সম্পর্কে সুপারিশ প্রণয়নের লক্ষ্যে একটি জাতীয় সেমিকন্ডাক্টর টাস্কফোর্স গঠন করেছে সরকার। টাস্কফোর্সের আহ্বায়ক করা হয়েছে বাংলাদেশ বিনিয়োগ উন্নয়ন কর্তৃপক্ষের (বিডা) নির্বাহী চেয়ারম্যান আশিক চৌধুরীকে।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">আজ বুধবার প্রধান উপদেষ্টার কার্যালয় থেকে এ–সংক্রান্ত প্রজ্ঞাপন জারি করা হয়েছে। এক সংবাদ বিজ্ঞপ্তিতে এসব তথ্য জানিয়েছে বিডা।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">বিডা জানিয়েছে, টাস্কফোর্সের কাজ হবে সেমিকন্ডাক্টর শিল্পে তাৎক্ষণিক প্রবৃদ্ধির সুযোগ চিহ্নিত করা, নীতি ও দক্ষতার ঘাটতি দূর করা এবং বৈশ্বিক বিনিয়োগ আকর্ষণে অবকাঠামো ও প্রণোদনা কাঠামো প্রস্তাব করা। এ জন্য টাস্কফোর্স সুনির্দিষ্টভাবে সেমিকন্ডাক্টর খাতের চ্যালেঞ্জ, সম্ভাবনা ও ভবিষ্যতে করণীয় সম্পর্কে সুপারিশ করবে।বাংলাদেশে সেমিকন্ডাক্টর শিল্পে চ্যালেঞ্জ, সম্ভাবনা ও ভবিষ্যতে করণীয় সম্পর্কে সুপারিশ প্রণয়নের লক্ষ্যে একটি জাতীয় সেমিকন্ডাক্টর টাস্কফোর্স গঠন করেছে সরকার। টাস্কফোর্সের আহ্বায়ক করা হয়েছে বাংলাদেশ বিনিয়োগ উন্নয়ন কর্তৃপক্ষের (বিডা) নির্বাহী চেয়ারম্যান আশিক চৌধুরীকে।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">আজ বুধবার প্রধান উপদেষ্টার কার্যালয় থেকে এ–সংক্রান্ত প্রজ্ঞাপন জারি করা হয়েছে। এক সংবাদ বিজ্ঞপ্তিতে এসব তথ্য জানিয়েছে বিডা।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">বিডা জানিয়েছে, টাস্কফোর্সের কাজ হবে সেমিকন্ডাক্টর শিল্পে তাৎক্ষণিক প্রবৃদ্ধির সুযোগ চিহ্নিত করা, নীতি ও দক্ষতার ঘাটতি দূর করা এবং বৈশ্বিক বিনিয়োগ আকর্ষণে অবকাঠামো ও প্রণোদনা কাঠামো প্রস্তাব করা। এ জন্য টাস্কফোর্স সুনির্দিষ্টভাবে সেমিকন্ডাক্টর খাতের চ্যালেঞ্জ, সম্ভাবনা ও ভবিষ্যতে করণীয় সম্পর্কে সুপারিশ করবে।</span></div>', '1737273934D3RWtJBb.jpg', NULL, NULL, NULL, NULL, NULL, 5, NULL, 0, NULL, 0, 1, 0, 'true', 0, NULL, '2026-06-14 05:44:50', '2025-01-19 16:05:34', 'বাংলাদেশে সেমিকন্ডাক্টর শিল্পে চ্যালেঞ্জ, সম্ভাবনা ও ভবিষ্যতে করণীয় সম্পর্কে সুপারিশ প্রণয়নের লক্ষ্যে একটি জাতীয় সেমিকন্ডাক্টর টাস্কফোর্স গঠন করেছে সরকার। টাস্কফোর্সের আহ্বায়ক করা হয়েছে বাংলাদেশ বিনিয়োগ উন্নয়ন কর্তৃপক্ষের (বিডা) নির্বাহী চেয়ারম্যান আশিক চৌধুরীকে।', NULL),
(37, 1, 'বিসিসির সঙ্গে চুক্তি বাতিল করল নির্বাচন কমিশন', 'বিসিসির-সঙ্গে-চুক্তি-বাতিল-করল-নির্বাচন-কমিশন', 'article', 'বিসিসির সঙ্গে চুক্তি বাতিল করল নির্বাচন কমিশন', 0, 1, 1, 0, 1, 1, 0, '<div><span style=\"font-size: 14px;\">নিবন্ধনের মাধ্যমে তথ্য-উপাত্ত যাচাই বিষয়ে নির্বাচন কমিশনের (ইসি) সঙ্গে বাংলাদেশ কম্পিউটার কাউন্সিলের (বিসিসি) করা চুক্তি বাতিল হয়েছে।</span>গত শুক্রবার (২০ ডিসেম্বর) চুক্তিটি বাতিল করা হয় বলে আজ রোববার এক সংবাদ বিজ্ঞপ্তিতে জানিয়েছে ইসি সচিবালয়।</div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">ইসি সচিবালয়ের জাতীয় পরিচয় নিবন্ধন অনুবিভাগের মহাপরিচালক এ এস এম হুমায়ুন কবীর স্বাক্ষরিত সংবাদ বিজ্ঞপ্তিতে বলা হয়, চুক্তির শর্ত লঙ্ঘন করেছে বিসিসি। চুক্তি অনুযায়ী প্রযোজ্য ফি বা চার্জ নির্ধারিত সময়ে বিসিসি পরিশোধ করেনি। তাই ইসির সঙ্গে বিসিসির চুক্তিটি বাতিল করা হয়েছে।</span></div><div><span style=\"font-size: 14px;\">নিবন্ধনের মাধ্যমে তথ্য-উপাত্ত যাচাই বিষয়ে নির্বাচন কমিশনের (ইসি) সঙ্গে বাংলাদেশ কম্পিউটার কাউন্সিলের (বিসিসি) করা চুক্তি বাতিল হয়েছে।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">গত শুক্রবার (২০ ডিসেম্বর) চুক্তিটি বাতিল করা হয় বলে আজ রোববার এক সংবাদ বিজ্ঞপ্তিতে জানিয়েছে ইসি সচিবালয়।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">ইসি সচিবালয়ের জাতীয় পরিচয় নিবন্ধন অনুবিভাগের মহাপরিচালক এ এস এম হুমায়ুন কবীর স্বাক্ষরিত সংবাদ বিজ্ঞপ্তিতে বলা হয়, চুক্তির শর্ত লঙ্ঘন করেছে বিসিসি। চুক্তি অনুযায়ী প্রযোজ্য ফি বা চার্জ নির্ধারিত সময়ে বিসিসি পরিশোধ করেনি। তাই ইসির সঙ্গে বিসিসির চুক্তিটি বাতিল করা হয়েছে।</span></div><div><br></div>', '1737274030tWf16tgK.jpg', NULL, NULL, NULL, NULL, NULL, 5, NULL, 0, NULL, 0, 1, 0, 'true', 0, NULL, '2026-06-14 05:44:50', '2025-01-19 16:07:10', 'নিবন্ধনের মাধ্যমে তথ্য-উপাত্ত যাচাই বিষয়ে নির্বাচন কমিশনের (ইসি) সঙ্গে বাংলাদেশ কম্পিউটার কাউন্সিলের (বিসিসি) করা চুক্তি বাতিল হয়েছে।গত শুক্রবার (২০ ডিসেম্বর) চুক্তিটি বাতিল করা হয় বলে আজ রোববার এক সংবাদ বিজ্ঞপ্তিতে জানিয়েছে ইসি সচিবালয়।', NULL);
INSERT INTO `posts` (`id`, `language_id`, `title`, `slug`, `post_type`, `meta_tag`, `show_right_column`, `is_feature`, `is_slider`, `slider_left`, `slider_right`, `is_trending`, `is_videoGallery`, `description`, `image_big`, `rss_image`, `image_small`, `video`, `embed_video`, `audio`, `category_id`, `subcategories_id`, `schedule_post`, `schedule_post_date`, `is_pending`, `admin_id`, `user_id`, `status`, `is_draft`, `rss_link`, `created_at`, `updated_at`, `short_description`, `images_caption`) VALUES
(38, 1, 'বাড়ির দোতলায়ও পানি, ভাই–বোনের খোঁজ পাচ্ছেন না গায়িকা পুতুল', 'বাড়ির-দোতলায়ও-পানি,-ভাই–বোনের-খোঁজ-পাচ্ছেন-না-গায়িকা-পুতুল', 'article', 'বাড়ির দোতলায়ও পানি, ভাই–বোনের খোঁজ পাচ্ছেন না গায়িকা পুতুল\r\n=', 0, 1, 1, 0, 1, 1, 0, '<span style=\"font-size: 14px;\">ঢাকায় থাকেন গায়িকা পুতুল। বাবা-মায়ের বাড়ি ফেনী শহরে। গত কয়েক দিনে ফেনীসহ দেশের বিভিন্ন জেলায় বন্যা পরিস্থিতির অবনতি হয়েছে। এতে পুতুলদের ফেনী শহরের উকিলপাড়ার বাড়ির দোতলা পর্যন্ত পানি উঠেছে। এই বাড়িতে পুতুলের ভাই তাঁর পরিবার নিয়ে থাকতেন। পাশে বড় বোনও থাকতেন। গত দুদিনে বন্যার পানি বেড়ে যাওয়াতে পরিস্থিতির ভয়াবহ অবনতি হয়েছে। শহরের সেই বাড়িতে পানিবন্দী সবাই। গতকাল বৃহস্পতিবার থেকে ভাই-বোনের খোঁজও পাচ্ছে না পুতুল!</span><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">ঢাকায় থাকেন গায়িকা পুতুল। বাবা-মায়ের বাড়ি ফেনী শহরে। গত কয়েক দিনে ফেনীসহ দেশের বিভিন্ন জেলায় বন্যা পরিস্থিতির অবনতি হয়েছে। এতে পুতুলদের ফেনী শহরের উকিলপাড়ার বাড়ির দোতলা পর্যন্ত পানি উঠেছে। এই বাড়িতে পুতুলের ভাই তাঁর পরিবার নিয়ে থাকতেন। পাশে বড় বোনও থাকতেন। গত দুদিনে বন্যার পানি বেড়ে যাওয়াতে পরিস্থিতির ভয়াবহ অবনতি হয়েছে। শহরের সেই বাড়িতে পানিবন্দী সবাই। গতকাল বৃহস্পতিবার থেকে ভাই-বোনের খোঁজও পাচ্ছে না পুতুল!</span></div><div><span style=\"font-size: 14px;\">ঢাকায় থাকেন গায়িকা পুতুল। বাবা-মায়ের বাড়ি ফেনী শহরে। গত কয়েক দিনে ফেনীসহ দেশের বিভিন্ন জেলায় বন্যা পরিস্থিতির অবনতি হয়েছে। এতে পুতুলদের ফেনী শহরের উকিলপাড়ার বাড়ির দোতলা পর্যন্ত পানি উঠেছে। এই বাড়িতে পুতুলের ভাই তাঁর পরিবার নিয়ে থাকতেন। পাশে বড় বোনও থাকতেন। গত দুদিনে বন্যার পানি বেড়ে যাওয়াতে পরিস্থিতির ভয়াবহ অবনতি হয়েছে। শহরের সেই বাড়িতে পানিবন্দী সবাই। গতকাল বৃহস্পতিবার থেকে ভাই-বোনের খোঁজও পাচ্ছে না পুতুল!</span></div><div><span style=\"font-size: 14px;\">ঢাকায় থাকেন গায়িকা পুতুল। বাবা-মায়ের বাড়ি ফেনী শহরে। গত কয়েক দিনে ফেনীসহ দেশের বিভিন্ন জেলায় বন্যা পরিস্থিতির অবনতি হয়েছে। এতে পুতুলদের ফেনী শহরের উকিলপাড়ার বাড়ির দোতলা পর্যন্ত পানি উঠেছে। এই বাড়িতে পুতুলের ভাই তাঁর পরিবার নিয়ে থাকতেন। পাশে বড় বোনও থাকতেন। গত দুদিনে বন্যার পানি বেড়ে যাওয়াতে পরিস্থিতির ভয়াবহ অবনতি হয়েছে। শহরের সেই বাড়িতে পানিবন্দী সবাই। গতকাল বৃহস্পতিবার থেকে ভাই-বোনের খোঁজও পাচ্ছে না পুতুল!</span></div>', '1737274449RZk0GYyL.jpg', NULL, NULL, NULL, NULL, NULL, 6, 21, 0, NULL, 0, 1, 0, 'true', 0, NULL, '2026-06-14 05:46:36', '2025-01-19 16:14:09', 'ঢাকায় থাকেন গায়িকা পুতুল। বাবা-মায়ের বাড়ি ফেনী শহরে। গত কয়েক দিনে ফেনীসহ দেশের বিভিন্ন জেলায় বন্যা পরিস্থিতির অবনতি হয়েছে। এতে পুতুলদের ফেনী শহরের উকিলপাড়ার বাড়ির দোতলা পর্যন্ত পানি উঠেছে। এই বাড়িতে পুতুলের ভাই তাঁর পরিবার নিয়ে থাকতেন। পাশে বড় বোনও থাকতেন। গত দুদিনে বন্যার পানি বেড়ে যাওয়াতে পরিস্থিতির ভয়াবহ অবনতি হয়েছে। শহরের সেই বাড়িতে পানিবন্দী সবাই। গতকাল বৃহস্পতিবার থেকে ভাই-বোনের খোঁজও পাচ্ছে না পুতুল!', NULL),
(39, 1, 'ভারতের সঙ্গে কথা হবে চোখে চোখ রেখে', 'ভারতের-সঙ্গে-কথা-হবে-চোখে-চোখ-রেখে', 'article', 'ভারতের সঙ্গে কথা হবে চোখে চোখ রেখে', 0, 1, 1, 0, 1, 1, 0, '<div><span style=\"font-size: 14px;\">আগামীর বাংলাদেশ জনগণের মতামতের ভিত্তিতে চলবে বলে জানিয়েছেন অন্তর্বর্তী সরকারের যুব ও ক্রীড়া উপদেষ্টা আসিফ মাহমুদ সজীব ভূঁইয়া। তিনি বলেন, বাংলাদেশের মানুষ বেশি কিছু চায় না। মানুষ স্বাধীনভাবে তাদের মতপ্রকাশ করতে চায়। তাদের মৌলিক অধিকার নিয়ে সুখে–শান্তিতে বসবাস করতে চায়।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">গতকাল মঙ্গলবার বিকেলে কুমিল্লা টাউন হল মাঠের মুক্তমঞ্চে আয়োজিত মতবিনিময় সভায় আসিফ মাহমুদ এ কথাগুলো বলেন। প্রতিবেশী দেশ ভারতকে বাংলাদেশের জনগণের সঙ্গে কথা বলতে হবে উল্লেখ করে তিনি আরও বলেন, ‘একটি স্বাধীন সার্বভৌম রাষ্ট্র হিসেবে ভারতের সঙ্গে এ দেশের মানুষের কথা হবে চোখে চোখ রেখে। কথা হবে মাথা উঁচু করে। বাংলাদেশের মানুষকে কথা বলতে হবে সম্মান দিয়ে। ভারত এত দিন একটি দলের সঙ্গে কথা বলেছে; কিন্তু এখন আর তা হবে না। ভারতকে এখন কথা বলতে হবে এদেশের জনগণের সঙ্গে। বাংলাদেশকে পেছনে ফেলার যে প্র্যাকটিস (চর্চা) তারা এত দিন ধরে করে এসেছে, সেখান থেকে সরে আসতে হবে।’আগামীর বাংলাদেশ জনগণের মতামতের ভিত্তিতে চলবে বলে জানিয়েছেন অন্তর্বর্তী সরকারের যুব ও ক্রীড়া উপদেষ্টা আসিফ মাহমুদ সজীব ভূঁইয়া। তিনি বলেন, বাংলাদেশের মানুষ বেশি কিছু চায় না। মানুষ স্বাধীনভাবে তাদের মতপ্রকাশ করতে চায়। তাদের মৌলিক অধিকার নিয়ে সুখে–শান্তিতে বসবাস করতে চায়।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">গতকাল মঙ্গলবার বিকেলে কুমিল্লা টাউন হল মাঠের মুক্তমঞ্চে আয়োজিত মতবিনিময় সভায় আসিফ মাহমুদ এ কথাগুলো বলেন। প্রতিবেশী দেশ ভারতকে বাংলাদেশের জনগণের সঙ্গে কথা বলতে হবে উল্লেখ করে তিনি আরও বলেন, ‘একটি স্বাধীন সার্বভৌম রাষ্ট্র হিসেবে ভারতের সঙ্গে এ দেশের মানুষের কথা হবে চোখে চোখ রেখে। কথা হবে মাথা উঁচু করে। বাংলাদেশের মানুষকে কথা বলতে হবে সম্মান দিয়ে। ভারত এত দিন একটি দলের সঙ্গে কথা বলেছে; কিন্তু এখন আর তা হবে না। ভারতকে এখন কথা বলতে হবে এদেশের জনগণের সঙ্গে। বাংলাদেশকে পেছনে ফেলার যে প্র্যাকটিস (চর্চা) তারা এত দিন ধরে করে এসেছে, সেখান থেকে সরে আসতে হবে।’</span></div>', '1737274557hycZ7lOd.jpg', NULL, NULL, NULL, NULL, NULL, 6, 21, 0, NULL, 0, 1, 0, 'true', 0, NULL, '2026-06-14 05:46:36', '2025-01-19 16:15:57', 'আগামীর বাংলাদেশ জনগণের মতামতের ভিত্তিতে চলবে বলে জানিয়েছেন অন্তর্বর্তী সরকারের যুব ও ক্রীড়া উপদেষ্টা আসিফ মাহমুদ সজীব ভূঁইয়া। তিনি বলেন, বাংলাদেশের মানুষ বেশি কিছু চায় না। মানুষ স্বাধীনভাবে তাদের মতপ্রকাশ করতে চায়। তাদের মৌলিক অধিকার নিয়ে সুখে–শান্তিতে বসবাস করতে চায়।', NULL),
(40, 1, 'কোনো সভ্য দেশে কূটনৈতিক স্থাপনায় এ ধরনের হামলা হতে পারে না', 'কোনো-সভ্য-দেশে-কূটনৈতিক-স্থাপনায়-এ-ধরনের-হামলা-হতে-পারে-না', 'article', 'কোনো সভ্য দেশে কূটনৈতিক স্থাপনায় এ ধরনের হামলা হতে পারে না', 0, 1, 1, 0, 1, 1, 0, '<div><span style=\"font-size: 14px;\">ভারতের ত্রিপুরা রাজ্যের আগরতলায় বাংলাদেশের সহকারী হাইকমিশনে হামলার প্রতিবাদে মঙ্গলবার রাজধানী ঢাকাসহ অন্তত ১৫ জেলায় বিক্ষোভ হয়েছে। বিএনপি, বৈষম্যবিরোধী ছাত্র আন্দোলন, জাতীয় নাগরিক কমিটি, সচেতন নাগরিক সমাজসহ বিভিন্ন ব্যানারে এসব বিক্ষোভ ও প্রতিবাদ সমাবেশের আয়োজন করা হয়।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">বিক্ষোভ কর্মসূচি থেকে সহকারী হাইকমিশনে হামলা ও বাংলাদেশের জাতীয় পতাকা অবমাননার তীব্র নিন্দা জানিয়ে বক্তারা বলেন, এ ধরনের হামলা বাংলাদেশের সার্বভৌমত্বের জন্য হুমকি। কোনো সভ্য দেশে কূটনৈতিক স্থাপনায় এ ধরনের হামলার ঘটনা ঘটতে পারে না। ভারত সরকারের ব্যর্থতার কারণে এ হামলা হয়েছে। এর মাধ্যমে বাংলাদেশকে অশান্ত করার অপচেষ্টা চালাচ্ছে একটি মহল।</span></div><div><span style=\"font-size: 14px;\">ভারতের ত্রিপুরা রাজ্যের আগরতলায় বাংলাদেশের সহকারী হাইকমিশনে হামলার প্রতিবাদে মঙ্গলবার রাজধানী ঢাকাসহ অন্তত ১৫ জেলায় বিক্ষোভ হয়েছে। বিএনপি, বৈষম্যবিরোধী ছাত্র আন্দোলন, জাতীয় নাগরিক কমিটি, সচেতন নাগরিক সমাজসহ বিভিন্ন ব্যানারে এসব বিক্ষোভ ও প্রতিবাদ সমাবেশের আয়োজন করা হয়।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">বিক্ষোভ কর্মসূচি থেকে সহকারী হাইকমিশনে হামলা ও বাংলাদেশের জাতীয় পতাকা অবমাননার তীব্র নিন্দা জানিয়ে বক্তারা বলেন, এ ধরনের হামলা বাংলাদেশের সার্বভৌমত্বের জন্য হুমকি। কোনো সভ্য দেশে কূটনৈতিক স্থাপনায় এ ধরনের হামলার ঘটনা ঘটতে পারে না। ভারত সরকারের ব্যর্থতার কারণে এ হামলা হয়েছে। এর মাধ্যমে বাংলাদেশকে অশান্ত করার অপচেষ্টা চালাচ্ছে একটি মহল।</span></div>', '1737274831KUZqMQmc.jpg', NULL, NULL, NULL, NULL, NULL, 6, 27, 0, NULL, 0, 1, 0, 'true', 0, NULL, '2026-06-14 05:46:36', '2025-01-19 16:20:31', 'ভারতের ত্রিপুরা রাজ্যের আগরতলায় বাংলাদেশের সহকারী হাইকমিশনে হামলার প্রতিবাদে মঙ্গলবার রাজধানী ঢাকাসহ অন্তত ১৫ জেলায় বিক্ষোভ হয়েছে। বিএনপি, বৈষম্যবিরোধী ছাত্র আন্দোলন, জাতীয় নাগরিক কমিটি, সচেতন নাগরিক সমাজসহ বিভিন্ন ব্যানারে এসব বিক্ষোভ ও প্রতিবাদ সমাবেশের আয়োজন করা হয়।', NULL),
(42, 1, 'বৃহত্তর খুলনার প্রথম উচ্চশিক্ষা প্রতিষ্ঠান সরকারি ব্রজলাল কলেজ', 'বৃহত্তর-খুলনার-প্রথম-উচ্চশিক্ষা-প্রতিষ্ঠান-সরকারি-ব্রজলাল-কলেজ', 'article', 'বৃহত্তর খুলনার প্রথম উচ্চশিক্ষা প্রতিষ্ঠান সরকারি ব্রজলাল কলেজ', 0, 1, 1, 0, 1, 1, 0, '<div><span style=\"font-size: 14px;\">সারি সারি আমগাছের মাথায় এসে পড়েছে শীতের নরম রোদ। বিশাল মাঠের সবুজ ঘাসগুলোতে হলদেটে ভাব। মাঠেই শিক্ষার্থীদের ছোট ছোট জটলা। চলছে হাসাহাসি, কথা, গল্প আর খুনসুটি। এককোনায় কেক কেটে বন্ধুর জন্মদিন উদ্‌যাপন করছে একটা দল।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">৭ জানুয়ারি দুপুরে খুলনার সরকারি ব্রজলাল কলেজমাঠের কয়েকটি খণ্ডচিত্র। মাঠের পাশ দিয়ে শহীদ মিনারের পাশের বকুল চত্বরের দিকে চলে যাই আমরা। এদিকটায় কলেজের সাংস্কৃতিক সংগঠনগুলোর কর্মীদের আড্ডা আর অনুশীলনকেন্দ্র। একটি কক্ষে আবৃত্তি দলের কর্মীরা উচ্চারণ অনুশীলন করছেন। পাশের কক্ষে যুক্তি আর পাল্টা যুক্তি উপস্থাপনের মধ্য দিয়ে চলছে বিতর্কের মহড়া। অংশ নিয়েছেন ডিবেটিং ক্লাবের সদস্যরা। ২০১২ সালে তৈরি হওয়া এই ডিবেটিং ক্লাব শিক্ষার্থীদের বিতর্কচর্চাকে এগিয়ে নিয়ে যাচ্ছে। রবি, মঙ্গল আর বৃহস্পতি—সপ্তাহে তিন দিন হয় বিতর্ক অনুশীলন। সোমবার পাঠচক্র।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">ডিবেটিং ক্লাবের সাধারণ সম্পাদক ইংরেজি তৃতীয় বর্ষের শিক্ষার্থী ইলমী জানালেন, ডিবেটিং ক্লাবের সদস্যসংখ্যা এখন ১০০ জনের ওপর। জাতীয় ও আঞ্চলিক পর্যায়ে প্রতিযোগিতায় অংশ নিয়ে ভালো করার পাশাপাশি জাতীয় পর্যায়ের প্রতিযোগিতা আয়োজনের অভিজ্ঞতাও তাঁদের আছে। চলতি বছর একটি জাতীয় ও একটি আঞ্চলিক বিতর্ক প্রতিযোগিতা আয়োজনের পরিকল্পনা করেছেন তাঁরা।সারি সারি আমগাছের মাথায় এসে পড়েছে শীতের নরম রোদ। বিশাল মাঠের সবুজ ঘাসগুলোতে হলদেটে ভাব। মাঠেই শিক্ষার্থীদের ছোট ছোট জটলা। চলছে হাসাহাসি, কথা, গল্প আর খুনসুটি। এককোনায় কেক কেটে বন্ধুর জন্মদিন উদ্‌যাপন করছে একটা দল।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">৭ জানুয়ারি দুপুরে খুলনার সরকারি ব্রজলাল কলেজমাঠের কয়েকটি খণ্ডচিত্র। মাঠের পাশ দিয়ে শহীদ মিনারের পাশের বকুল চত্বরের দিকে চলে যাই আমরা। এদিকটায় কলেজের সাংস্কৃতিক সংগঠনগুলোর কর্মীদের আড্ডা আর অনুশীলনকেন্দ্র। একটি কক্ষে আবৃত্তি দলের কর্মীরা উচ্চারণ অনুশীলন করছেন। পাশের কক্ষে যুক্তি আর পাল্টা যুক্তি উপস্থাপনের মধ্য দিয়ে চলছে বিতর্কের মহড়া। অংশ নিয়েছেন ডিবেটিং ক্লাবের সদস্যরা। ২০১২ সালে তৈরি হওয়া এই ডিবেটিং ক্লাব শিক্ষার্থীদের বিতর্কচর্চাকে এগিয়ে নিয়ে যাচ্ছে। রবি, মঙ্গল আর বৃহস্পতি—সপ্তাহে তিন দিন হয় বিতর্ক অনুশীলন। সোমবার পাঠচক্র।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">ডিবেটিং ক্লাবের সাধারণ সম্পাদক ইংরেজি তৃতীয় বর্ষের শিক্ষার্থী ইলমী জানালেন, ডিবেটিং ক্লাবের সদস্যসংখ্যা এখন ১০০ জনের ওপর। জাতীয় ও আঞ্চলিক পর্যায়ে প্রতিযোগিতায় অংশ নিয়ে ভালো করার পাশাপাশি জাতীয় পর্যায়ের প্রতিযোগিতা আয়োজনের অভিজ্ঞতাও তাঁদের আছে। চলতি বছর একটি জাতীয় ও একটি আঞ্চলিক বিতর্ক প্রতিযোগিতা আয়োজনের পরিকল্পনা করেছেন তাঁরা।</span></div>', '17372759520wdES34a.jpg', NULL, NULL, NULL, NULL, NULL, 7, NULL, 0, NULL, 0, 1, 0, 'true', 0, NULL, '2026-06-14 05:44:50', '2025-01-19 16:39:12', 'সারি সারি আমগাছের মাথায় এসে পড়েছে শীতের নরম রোদ। বিশাল মাঠের সবুজ ঘাসগুলোতে হলদেটে ভাব। মাঠেই শিক্ষার্থীদের ছোট ছোট জটলা। চলছে হাসাহাসি, কথা, গল্প আর খুনসুটি। এককোনায় কেক কেটে বন্ধুর জন্মদিন উদ্‌যাপন করছে একটা দল।', NULL),
(43, 1, 'বদলে যাওয়া ক্যাম্পাস', 'বদলে-যাওয়া-ক্যাম্পাস', 'article', 'বদলে যাওয়া ক্যাম্পাস', 0, 1, 1, 0, 1, 1, 0, '<span style=\"font-size: 14px;\">গেস্টরুম থেকে ক্যানটিন, কেটেছে আতঙ্ক; বদলে গেছে ডাইনিংয়ের খাবারের স্বাদ। তিন মাস আগেও চিত্রটা এমন ছিল না। র‍্যাগিং, ছাত্রলীগ নেতাদের দাপট, হলের সিট দখল, চাঁদাবাজি, রাজনৈতিক হিংস্রতা ছিল সাধারণ চিত্র।&nbsp;</span><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">৫ আগস্টের পর থেকেই ধীরে ধীরে কমে যায় ছাত্রসংগঠনগুলোর দাপট। ঢাকা থেকে রাজশাহী, চট্টগ্রাম কিংবা ময়মনসিংহের বাংলাদেশ কৃষি বিশ্ববিদ্যালয়, পাবলিক বিশ্ববিদ্যালয়গুলোর পরিবেশেও আসতে থাকে পরিবর্তন।আবাসিক হলগুলোর আসন বণ্টনেও এসেছে বড় পরিবর্তন। প্রায় সব ক্যাম্পাসের অভ্যন্তরীণ পরিবেশ এখন অনেকটাই স্বাভাবিক। হলের সিট বরাদ্দ ও ব্যবস্থাপনা প্রক্রিয়ায় এসেছে স্বচ্ছতা। ঢাকা ও জাহাঙ্গীরনগর বিশ্ববিদ্যালয়ের ‘গেস্টরুম’ ছিল নবীন শিক্ষার্থীদের জন্য এক আতঙ্কের নাম।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">&nbsp;সেই সংস্কৃতিতেও পরিবর্তন এসেছে ।গেস্টরুম থেকে ক্যানটিন, কেটেছে আতঙ্ক; বদলে গেছে ডাইনিংয়ের খাবারের স্বাদ। তিন মাস আগেও চিত্রটা এমন ছিল না। র‍্যাগিং, ছাত্রলীগ নেতাদের দাপট, হলের সিট দখল, চাঁদাবাজি, রাজনৈতিক হিংস্রতা ছিল সাধারণ চিত্র। ৫ আগস্টের পর থেকেই ধীরে ধীরে কমে যায় ছাত্রসংগঠনগুলোর দাপট। ঢাকা থেকে রাজশাহী, চট্টগ্রাম কিংবা ময়মনসিংহের বাংলাদেশ কৃষি বিশ্ববিদ্যালয়, পাবলিক বিশ্ববিদ্যালয়গুলোর পরিবেশেও আসতে থাকে পরিবর্তন।আবাসিক হলগুলোর আসন বণ্টনেও এসেছে বড় পরিবর্তন। প্রায় সব ক্যাম্পাসের অভ্যন্তরীণ পরিবেশ এখন অনেকটাই স্বাভাবিক। হলের সিট বরাদ্দ ও ব্যবস্থাপনা প্রক্রিয়ায় এসেছে স্বচ্ছতা। ঢাকা ও জাহাঙ্গীরনগর বিশ্ববিদ্যালয়ের ‘গেস্টরুম’ ছিল নবীন শিক্ষার্থীদের জন্য এক আতঙ্কের নাম। সেই সংস্কৃতিতেও পরিবর্তন এসেছে ।</span></div>', '1737276066O8Z7Oi6v.jpg', NULL, NULL, NULL, NULL, NULL, 7, NULL, 0, NULL, 0, 1, 0, 'true', 0, NULL, '2026-06-14 05:44:50', '2025-01-19 16:41:06', 'গেস্টরুম থেকে ক্যানটিন, কেটেছে আতঙ্ক; বদলে গেছে ডাইনিংয়ের খাবারের স্বাদ। তিন মাস আগেও চিত্রটা এমন ছিল না। র‍্যাগিং, ছাত্রলীগ নেতাদের দাপট, হলের সিট দখল, চাঁদাবাজি, রাজনৈতিক হিংস্রতা ছিল সাধারণ চিত্র। গেস্টরুম থেকে ক্যানটিন, কেটেছে আতঙ্ক; বদলে গেছে ডাইনিংয়ের খাবারের স্বাদ। তিন মাস আগেও চিত্রটা এমন ছিল না। র‍্যাগিং, ছাত্রলীগ নেতাদের দাপট, হলের সিট দখল, চাঁদাবাজি, রাজনৈতিক হিংস্রতা ছিল সাধারণ চিত্র।', NULL),
(44, 1, 'এআইইউবিতে চাকরি মেলা অনুষ্ঠিত', 'এআইইউবিতে-চাকরি-মেলা-অনুষ্ঠিত', 'article', 'এআইইউবিতে চাকরি মেলা অনুষ্ঠিত', 0, 1, 1, 0, 1, 1, 0, '<span style=\"font-size: 14px;\">ব্যাংক, আর্থিক সেবা প্রতিষ্ঠান, অটোমোবাইল কোম্পানি, ওষুধ প্রস্তুতকারী প্রতিষ্ঠান, টেলিকম, তথ্যপ্রযুক্তি সেবাদানকারী প্রতিষ্ঠান, হাসপাতাল, হোটেল, ইলেকট্রনিকস, রিয়েল এস্টেট প্রতিষ্ঠানসহ বিভিন্ন খাতের প্রতিষ্ঠান চাকরি মেলায়&nbsp; অংশগ্রহণ করে। অংশগ্রহণকারী প্রতিষ্ঠানের মধ্যে উল্লেখযোগ্য ছিল আবদুল মোনেম লিমিটেড, বিকাশ লিমিটেড, ব্র্যাক ব্যাংক, সিটি ব্যাংক, ইস্টার্ন ব্যাংক, মিউচুয়াল ট্রাস্ট ব্যাংক, নাভানা, পাঠাও লিমিটেড, ক্রাউন সিমেন্ট, মেঘনা গ্রুপ অব ইন্ডাস্ট্রিজ, এপেক্স, জিপিএইচ ইস্পাত লিমিটেড, লে মেরিডিয়ান ঢাকা, হোটেল রেনেসাঁ ঢাকা, আরএফএল গ্রুপ, রবি আজিয়াটা, ইউনাইটেড হসপিটাল লিমিটেডসহ আরও অনেক প্রতিষ্ঠান।&nbsp;</span><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">এ ছাড়া এআইইউবির অ্যালামনাই সদস্যরা তাঁদের নিজস্ব ব্যবসাপ্রতিষ্ঠান নিয়ে অংশগ্রহণ করেন।ব্যাংক, আর্থিক সেবা প্রতিষ্ঠান, অটোমোবাইল কোম্পানি, ওষুধ প্রস্তুতকারী প্রতিষ্ঠান, টেলিকম, তথ্যপ্রযুক্তি সেবাদানকারী প্রতিষ্ঠান, হাসপাতাল, হোটেল, ইলেকট্রনিকস, রিয়েল এস্টেট প্রতিষ্ঠানসহ বিভিন্ন খাতের প্রতিষ্ঠান চাকরি মেলায়&nbsp; অংশগ্রহণ করে। অংশগ্রহণকারী প্রতিষ্ঠানের মধ্যে উল্লেখযোগ্য ছিল আবদুল মোনেম লিমিটেড, বিকাশ লিমিটেড, ব্র্যাক ব্যাংক, সিটি ব্যাংক, ইস্টার্ন ব্যাংক, মিউচুয়াল ট্রাস্ট ব্যাংক, নাভানা, পাঠাও লিমিটেড, ক্রাউন সিমেন্ট, মেঘনা গ্রুপ অব ইন্ডাস্ট্রিজ, এপেক্স, জিপিএইচ ইস্পাত লিমিটেড, লে মেরিডিয়ান ঢাকা, হোটেল রেনেসাঁ ঢাকা, আরএফএল গ্রুপ, রবি আজিয়াটা, ইউনাইটেড হসপিটাল লিমিটেডসহ আরও অনেক প্রতিষ্ঠান। এ ছাড়া এআইইউবির অ্যালামনাই সদস্যরা তাঁদের নিজস্ব ব্যবসাপ্রতিষ্ঠান নিয়ে অংশগ্রহণ করেন।</span></div>', '1737276162ST8XKDxG.jpg', NULL, NULL, NULL, NULL, NULL, 7, NULL, 0, NULL, 0, 1, 0, 'true', 0, NULL, '2026-06-14 05:44:50', '2025-01-19 16:42:42', 'ব্যাংক, আর্থিক সেবা প্রতিষ্ঠান, অটোমোবাইল কোম্পানি, ওষুধ প্রস্তুতকারী প্রতিষ্ঠান, টেলিকম, তথ্যপ্রযুক্তি সেবাদানকারী প্রতিষ্ঠান, হাসপাতাল, হোটেল, ইলেকট্রনিকস, রিয়েল এস্টেট প্রতিষ্ঠানসহ বিভিন্ন খাতের প্রতিষ্ঠান চাকরি মেলায়  অংশগ্রহণ করে। অংশগ্রহণকারী প্রতিষ্ঠানের মধ্যে উল্লেখযোগ্য ছিল আবদুল মোনেম লিমিটেড, বিকাশ লিমিটেড, ব্র্যাক ব্যাংক, সিটি ব্যাংক, ইস্টার্ন ব্যাংক, মিউচুয়াল ট্রাস্ট ব্যাংক, নাভানা, পাঠাও লিমিটেড, ক্রাউন সিমেন্ট, মেঘনা গ্রুপ অব ইন্ডাস্ট্রিজ, এপেক্স, জিপিএইচ ইস্পাত লিমিটেড, লে মেরিডিয়ান ঢাকা, হোটেল রেনেসাঁ ঢাকা, আরএফএল গ্রুপ, রবি আজিয়াটা, ইউনাইটেড হসপিটাল লিমিটেডসহ আরও অনেক প্রতিষ্ঠান।', NULL),
(45, 1, 'আমি চুয়েটের শিক্ষার্থী, তাই আবেগ ও দায়বদ্ধতাও বেশি : চুয়েটের উপাচার্য', 'আমি-চুয়েটের-শিক্ষার্থী,-তাই-আবেগ-ও-দায়বদ্ধতাও-বেশি-:-চুয়েটের-উপাচার্য', 'article', 'আমি চুয়েটের শিক্ষার্থী, তাই আবেগ ও দায়বদ্ধতাও বেশি : চুয়েটের উপাচার্য', 0, 1, 1, 0, 1, 1, 0, '<div><span style=\"font-size: 14px;\">প্রায় আড়াই মাস উপাচার্যহীন ছিল চুয়েট। দীর্ঘ সময় উপাচার্য না থাকায় একাডেমিক কাউন্সিল, সিন্ডিকেট সভা, নিয়োগ, পদোন্নতি, প্রকল্পের কাজসহ বিভিন্ন প্রশাসনিক কার্যক্রম স্থবির হয়ে যায়। গত ৩০ অক্টোবর দায়িত্ব নেওয়ার পর থেকেই সেগুলো সচলে চেষ্টা করে যাচ্ছি।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">শিক্ষার্থীদের দাবির পরিপ্রেক্ষিতে গণ-অভ্যুত্থানে ছাত্রদের ওপর হামলাকারী ও ক্যাম্পাসে সন্ত্রাসী কার্যক্রম পরিচালনাকারী ছাত্রলীগের সদস্যের শাস্তির আওতায় আনার জন্য তদন্ত কমিটি গঠন করা হয়েছে। সুনির্দিষ্ট অভিযোগের ভিত্তিতে যাচাই-বাছাই শেষে তাঁদের শাস্তি নিশ্চিত করা হবে। মাদক ও র‍্যাগিং নামক ব্যাধি নির্মূলে আমরা কঠোর অবস্থানে আছি। হলে শৃঙ্খলা ফিরিয়ে আনতে হল প্রশাসন ও সাধারণ শিক্ষার্থীরাও আমাদের সহায়তা করছেন।প্রায় আড়াই মাস উপাচার্যহীন ছিল চুয়েট। দীর্ঘ সময় উপাচার্য না থাকায় একাডেমিক কাউন্সিল, সিন্ডিকেট সভা, নিয়োগ, পদোন্নতি, প্রকল্পের কাজসহ বিভিন্ন প্রশাসনিক কার্যক্রম স্থবির হয়ে যায়। গত ৩০ অক্টোবর দায়িত্ব নেওয়ার পর থেকেই সেগুলো সচলে চেষ্টা করে যাচ্ছি।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">শিক্ষার্থীদের দাবির পরিপ্রেক্ষিতে গণ-অভ্যুত্থানে ছাত্রদের ওপর হামলাকারী ও ক্যাম্পাসে সন্ত্রাসী কার্যক্রম পরিচালনাকারী ছাত্রলীগের সদস্যের শাস্তির আওতায় আনার জন্য তদন্ত কমিটি গঠন করা হয়েছে। সুনির্দিষ্ট অভিযোগের ভিত্তিতে যাচাই-বাছাই শেষে তাঁদের শাস্তি নিশ্চিত করা হবে। মাদক ও র‍্যাগিং নামক ব্যাধি নির্মূলে আমরা কঠোর অবস্থানে আছি। হলে শৃঙ্খলা ফিরিয়ে আনতে হল প্রশাসন ও সাধারণ শিক্ষার্থীরাও আমাদের সহায়তা করছেন।</span></div>', '1737276231hkcIohJF.jpg', NULL, NULL, NULL, NULL, NULL, 7, NULL, 0, NULL, 0, 1, 0, 'true', 0, NULL, '2026-06-14 05:44:50', '2025-01-19 16:43:51', 'প্রায় আড়াই মাস উপাচার্যহীন ছিল চুয়েট। দীর্ঘ সময় উপাচার্য না থাকায় একাডেমিক কাউন্সিল, সিন্ডিকেট সভা, নিয়োগ, পদোন্নতি, প্রকল্পের কাজসহ বিভিন্ন প্রশাসনিক কার্যক্রম স্থবির হয়ে যায়। গত ৩০ অক্টোবর দায়িত্ব নেওয়ার পর থেকেই সেগুলো সচলে চেষ্টা করে যাচ্ছি।', NULL),
(46, 1, 'এটা স্কুল নয়, শাস্তিও নয়—বললেন ভারতের প্রধান নির্বাচক', 'এটা-স্কুল-নয়,-শাস্তিও-নয়—বললেন-ভারতের-প্রধান-নির্বাচক', 'article', 'এটা স্কুল নয়, শাস্তিও নয়—বললেন ভারতের প্রধান নির্বাচক', 0, 1, 1, 0, 1, 1, 0, '<div><span style=\"font-size: 14px;\">সংবাদ সম্মেলন শেষে আমাকে সচিবের সঙ্গে বসতে হবে এবং পারিবারিক ইস্যু নিয়ে কথা বলতে হবে। তাঁরা আমাকে ডাকছেন’—গতকাল ভারতের চ্যাম্পিয়নস ট্রফির দল ঘোষণা করার আগে প্রধান নির্বাচক অজিত আগারকারকে অধিনায়ক রোহিত শর্মার বলা কথাগুলো এখন ভাইরাল।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">সম্প্রতি ভারতের শীর্ষস্থানীয় কয়েকটি সংবাদমাধ্যম জানায়, দলের মধ্যে শৃঙ্খলা, একতা ও ইতিবাচক পরিবেশ নিশ্চিত করতে সম্প্রতি ক্রিকেটারদের ১০টি নির্দেশনা দিয়েছে ভারতীয় ক্রিকেট বোর্ড (বিসিসিআই)। যদিও বোর্ডের পক্ষ থেকে এখনো আনুষ্ঠানিক ঘোষণা আসেনি।</span></div><div><span style=\"font-size: 14px;\">অবশ্য বিসিসিআইয়ের এমন কঠোরতায় প্রধান নির্বাচক অজিত আগারকার কোনো সমস্যা দেখেন না, ‘আমি মনে করি, আমরা যদি (নির্দেশনা নিয়ে) অবিরাম কথা বলতে থাকি, তাহলে এটা চলতেই থাকবে। প্রতিটি দলেরই কিছু নিয়মকানুন আছে। আমরা কয়েক মাস ধরে বিভিন্ন বিষয়ে কথা বলেছি। যেমন আপনি একটি দল হিসেবে কীভাবে উন্নতি করতে পারেন, কীভাবে আরও ঐক্যবদ্ধ থাকা যায়। এটা কোনো বিদ্যালয় নয়। এটা কোনো শাস্তিও নয়।’</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">আগারকার মনে করেন, দেশের প্রতিনিধিত্ব করার সময় কিছু নিয়মের প্রয়োজন আছে, ‘জাতীয় দলের হয়ে খেলার সময় আপনাকে নিয়মগুলো মানতে হবে। আবার এটাও দেখতে হবে, খেলোয়াড়রা সবাই পরিণত। তাঁরা নিজেদের যোগ্যতার কারণেই মহাতারকা। কিন্তু দিন শেষে আপনি দেশকে প্রতিনিধিত্ব করছেন। কিছু কিছু বিষয় আছে, যেগুলো আপনি সহজাতভাবে অনুসরণ করেন। যেমন প্রতিটি দল করে।’</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">আগারকার আরও জানান, ১০ নির্দেশনার বেশির ভাগই আগে থেকেই ছিল। সংবাদমাধ্যমগুলো নতুন করে প্রচার করায় এত দিন পর আলোচনায় এসেছে।</span></div>', '1737280465fkBbVV7N.jpg', NULL, NULL, NULL, NULL, NULL, 9, NULL, 0, NULL, 0, 1, 0, 'true', 0, NULL, '2026-06-14 05:44:50', '2025-01-19 17:54:25', 'সংবাদ সম্মেলন শেষে আমাকে সচিবের সঙ্গে বসতে হবে এবং পারিবারিক ইস্যু নিয়ে কথা বলতে হবে। তাঁরা আমাকে ডাকছেন’—গতকাল ভারতের চ্যাম্পিয়নস ট্রফির দল ঘোষণা করার আগে প্রধান নির্বাচক অজিত আগারকারকে অধিনায়ক রোহিত শর্মার বলা কথাগুলো এখন ভাইরাল।', NULL),
(47, 1, 'রান নেই–উইকেট নেই, তবু ম্যাচসেরা', 'রান-নেই–উইকেট-নেই,-তবু-ম্যাচসেরা', 'article', 'রান নেই–উইকেট নেই, তবু ম্যাচসেরা', 0, 1, 1, 0, 1, 1, 0, '<div><span style=\"font-size: 14px;\">ব্যাটিং ও বোলিং বিভাগ ছাড়া ক্রিকেটে অবদান রাখার সুযোগ থাকে কোথায়? ফিল্ডিংয়ে। এই ফিল্ডিং করেই ম্যাচসেরা হয়েছেন উড। নিয়েছেন ৩টি ক্যাচ, সঙ্গে আরও একটি নিতে সহায়তা করেছেন। যা ম্যাচের ভাগ্য পরিবর্তনে বড় ভূমিকা রেখেছে বলেই মনে করেছেন ম্যাচসেরা নির্বাচনে জড়িত ধারাভাষ্যকারেরা।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">ব্যাটিংয়ে উডের অবদান রাখার সুযোগই ছিল না। তিনি মূলত মাঠে নেমেছেন সুপার সাব হিসেবে। বোলিংয়ে ২ ওভারে রান দিয়েছেন ২১। যেখানে তাঁর দল ভাইপার্সের দেওয়া ১৯৩ রানের লক্ষ্য তাড়া করতে নেমে নাইট রাইডাইর্স ১৪০ রানেই গুটিয়ে গেছে। বোঝাই যাচ্ছে, অবদান রাখতে গিয়ে আরও পিছিয়ে দিয়েছেন উড!</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">সেটা অবশ্য ফিল্ডিংয়েই পুষিয়ে দিয়েছেন উড। শুরুটা কাইল মায়ার্সের ক্যাচ দিয়ে। অষ্টম ওভারে তখন নাইট রাইডার্সের রান ১ উইকেটে ৬৮। ওভারের পঞ্চম বলটিতে ছক্কা মেরে সবে খোলস ছেড়ে বেরিয়েছেন মায়ার্স। শেষ বলটিও ডিপ স্কয়ার লেগ দিয়ে ছক্কাই হতো, যদি না বাউন্ডারিতে উড না থাকতেন!</span></div><div><br></div><div><div><span style=\"font-size: 14px;\">ব্যাটিং ও বোলিং বিভাগ ছাড়া ক্রিকেটে অবদান রাখার সুযোগ থাকে কোথায়? ফিল্ডিংয়ে। এই ফিল্ডিং করেই ম্যাচসেরা হয়েছেন উড। নিয়েছেন ৩টি ক্যাচ, সঙ্গে আরও একটি নিতে সহায়তা করেছেন। যা ম্যাচের ভাগ্য পরিবর্তনে বড় ভূমিকা রেখেছে বলেই মনে করেছেন ম্যাচসেরা নির্বাচনে জড়িত ধারাভাষ্যকারেরা।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">ব্যাটিংয়ে উডের অবদান রাখার সুযোগই ছিল না। তিনি মূলত মাঠে নেমেছেন সুপার সাব হিসেবে। বোলিংয়ে ২ ওভারে রান দিয়েছেন ২১। যেখানে তাঁর দল ভাইপার্সের দেওয়া ১৯৩ রানের লক্ষ্য তাড়া করতে নেমে নাইট রাইডাইর্স ১৪০ রানেই গুটিয়ে গেছে। বোঝাই যাচ্ছে, অবদান রাখতে গিয়ে আরও পিছিয়ে দিয়েছেন উড!</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">সেটা অবশ্য ফিল্ডিংয়েই পুষিয়ে দিয়েছেন উড। শুরুটা কাইল মায়ার্সের ক্যাচ দিয়ে। অষ্টম ওভারে তখন নাইট রাইডার্সের রান ১ উইকেটে ৬৮। ওভারের পঞ্চম বলটিতে ছক্কা মেরে সবে খোলস ছেড়ে বেরিয়েছেন মায়ার্স। শেষ বলটিও ডিপ স্কয়ার লেগ দিয়ে ছক্কাই হতো, যদি না বাউন্ডারিতে উড না থাকতেন!</span></div></div><div><br></div>', '1737280611EdCYEUfP.jpg', NULL, NULL, NULL, NULL, NULL, 9, NULL, 0, NULL, 0, 1, 0, 'true', 0, NULL, '2026-06-14 05:44:50', '2025-01-19 17:56:51', 'ব্যাটিং ও বোলিং বিভাগ ছাড়া ক্রিকেটে অবদান রাখার সুযোগ থাকে কোথায়? ফিল্ডিংয়ে। এই ফিল্ডিং করেই ম্যাচসেরা হয়েছেন উড। নিয়েছেন ৩টি ক্যাচ, সঙ্গে আরও একটি নিতে সহায়তা করেছেন। যা ম্যাচের ভাগ্য পরিবর্তনে বড় ভূমিকা রেখেছে বলেই মনে করেছেন ম্যাচসেরা নির্বাচনে জড়িত ধারাভাষ্যকারেরা।', NULL),
(48, 1, '৪৮ রানে ৭ উইকেট হারাল পাকিস্তান, ওয়ারিকানের স্পিন–ঘূর্ণি', '৪৮-রানে-৭-উইকেট-হারাল-পাকিস্তান,-ওয়ারিকানের-স্পিন–ঘূর্ণি', 'article', '৪৮ রানে ৭ উইকেট হারাল পাকিস্তান, ওয়ারিকানের স্পিন–ঘূর্ণি', 0, 1, 1, 0, 1, 1, 0, '<div><span style=\"font-size: 14px;\">পাকিস্তানের হাতে ছিল ৭ উইকেট। খেলার জন্য সারাটা দিন তো পড়েই ছিল। কিন্তু মুলতানে আরও একবার হুড়মুড় করে ভেঙে পড়ল পাকিস্তানের ব্যাটিং লাইনআপ। আজ ম্যাচের তৃতীয় দিনের সকালে ১৫.৪ ওভারেই হাতে থাকা সব উইকেট হারিয়েছে পাকিস্তান। স্কোরবোর্ডে যোগ হয়েছে মাত্র ৪৮ রান।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">তবে এরপরও মুলতানে সিরিজের প্রথম টেস্টে খুব খারাপ অবস্থায় নেই পাকিস্তান। চতুর্থ ইনিংসে রান তাড়ার জন্য সফরকারী ওয়েস্ট ইন্ডিজকে দিয়েছে ২৫১ রানের লক্ষ্য।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">মুলতানে চতুর্থ ইনিংসে এর চেয়ে বেশি রান তাড়া করে জেতার ঘটনা মাত্র একটিই আছে। ২০০৩ সালে বাংলাদেশের বিপক্ষে ইনজামাম উল হকের সেঞ্চুরিতে ২৬১ রান করে জিতেছিল পাকিস্তান।</span></div>', '1737280733ECQhqcNY.jpg', NULL, NULL, NULL, NULL, NULL, 9, NULL, 0, NULL, 0, 1, 0, 'true', 0, NULL, '2026-06-14 05:44:50', '2025-01-19 17:58:53', 'পাকিস্তানের হাতে ছিল ৭ উইকেট। খেলার জন্য সারাটা দিন তো পড়েই ছিল। কিন্তু মুলতানে আরও একবার হুড়মুড় করে ভেঙে পড়ল পাকিস্তানের ব্যাটিং লাইনআপ। আজ ম্যাচের তৃতীয় দিনের সকালে ১৫.৪ ওভারেই হাতে থাকা সব উইকেট হারিয়েছে পাকিস্তান। স্কোরবোর্ডে যোগ হয়েছে মাত্র ৪৮ রান।', NULL),
(49, 1, 'বিশ্বকাপ নিয়ে রিভালদোর সঙ্গে তর্কে জড়ালেন নেইমার', 'বিশ্বকাপ-নিয়ে-রিভালদোর-সঙ্গে-তর্কে-জড়ালেন-নেইমার', 'article', 'বিশ্বকাপ নিয়ে রিভালদোর সঙ্গে তর্কে জড়ালেন নেইমার', 0, 1, 1, 0, 1, 1, 0, '<div><span style=\"font-size: 14px;\">তবে বিষয়টি স্বাভাবিকভাবে নিতে পারেননি রিভালদো। নেইমারের কথার বিরোধিতা করে ৫২ বছর বয়সী এই কিংবদন্তি ইনস্টাগ্রামে লিখেছেন, ‘আমি নেইমারকে বলতে শুনেছি, ক্যারিয়ারের সেরা সময়ে সে ২০০২ বিশ্বকাপে আমার জায়গায় খেলত। সত্যি বলতে, আমি তার প্রতিভা ও দক্ষতাকে স্বীকার করি এবং এটাও বিশ্বাস করি সে ওই দলে থাকতে পারত। কিন্তু আমার জায়গায় খেলতে নামলে গল্পটা অন্যরকম হতে পারত। তার প্রতি সব ধরনের সম্মান ও প্রশংসা জানিয়ে আমি ১০০% নিশ্চিত হয়ে বলতে পারি এটা (যেভাবে ঘটেছে সেভাবে) ঘটত না।’</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">রিভালদো ২০০২ বিশ্বকাপে নিজের বিশেষত্ব বোঝাতে গিয়ে বলেছেন, ‘সেই সময় আমি বিশ্বকাপ শিরোপা জয়ের জন্য এতটাই মনোযোগী, দৃঢ়প্রতিজ্ঞ ও ক্ষুধার্ত ছিলাম যে, কেউ তার ক্যারিয়ারের সেরা সময়ে যতই ভালো হোক না কেন, আমার জায়গা নিতে পারেনি। আমি আত্মবিশ্বাসের সঙ্গে বলছি, যারা সেই মুহূর্তে আমার সঙ্গে ছিল, তারা জানে বিশ্ব চ্যাম্পিয়ন হওয়ার জন্য আমি কতটা কঠিন লড়াই করেছি।’</span></div>', '1737280863qJHZXU6J.jpg', NULL, NULL, NULL, NULL, NULL, 9, NULL, 0, NULL, 0, 1, 0, 'true', 0, NULL, '2026-06-14 05:44:50', '2025-01-19 18:01:03', 'তবে বিষয়টি স্বাভাবিকভাবে নিতে পারেননি রিভালদো। নেইমারের কথার বিরোধিতা করে ৫২ বছর বয়সী এই কিংবদন্তি ইনস্টাগ্রামে লিখেছেন, ‘আমি নেইমারকে বলতে শুনেছি, ক্যারিয়ারের সেরা সময়ে সে ২০০২ বিশ্বকাপে আমার জায়গায় খেলত। সত্যি বলতে, আমি তার প্রতিভা ও দক্ষতাকে স্বীকার করি এবং এটাও বিশ্বাস করি সে ওই দলে থাকতে পারত। কিন্তু আমার জায়গায় খেলতে নামলে গল্পটা অন্যরকম হতে পারত। তার প্রতি সব ধরনের সম্মান ও প্রশংসা জানিয়ে আমি ১০০% নিশ্চিত হয়ে বলতে পারি এটা (যেভাবে ঘটেছে সেভাবে) ঘটত না।’', NULL),
(50, 1, '‘বিটিভি নিউজ’র যাত্রা শুরু', '‘বিটিভি-নিউজ’র-যাত্রা-শুরু', 'article', '‘বিটিভি নিউজ’র যাত্রা শুরু', 0, 1, 1, 0, 1, 1, 0, '<div><span style=\"font-size: 14px;\">‘বিটিভি নিউজ’র লোগো প্রকাশ করে ওই পোস্টে বলা হয়, নতুন প্রত্যয়ে সংবাদভিত্তিক পূর্ণাঙ্গ টেলিভিশন চ্যানেল হিসেবে আজ সন্ধ্যা ৭টা থেকে যাত্রা শুরু করবে ‘বিটিভি নিউজ’।</span></div><div><br></div><div><span style=\"font-size: 14px;\">বাংলাভাষায় বিশ্বের প্রথম টেলিভিশন ‘বিটিভি’। ১৯৬৪ সালের ২৫ ডিসেম্বর একটি পাইলট প্রকল্প হিসেবে যাত্রা শুরু হয় চ্যানেলটির। ১৯৬৭ সালে তৎকালীন পাকিস্তান টেলিভিশন করপোরেশন ও ১৯৭২ সালে রাষ্ট্রপতির আদেশে (পি.ও নং-১১৫) বাংলাদেশ টেলিভিশন নামে রাষ্ট্রীয় টিভি চ্যানেলে পরিণত হয় এটি।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">দেশের শতকরা ৯৫ ভাগ মানুষ টেরিস্ট্রিয়াল সম্প্রচার সুবিধার মাধ্যমে বিটিভির অনুষ্ঠান দেখতে পাচ্ছে। বর্তমানে বিটিভিতে বিভিন্ন অনুষ্ঠান ও সংবাদ সম্প্রচারিত হয়। এবার শুধু সংবাদের জন্য বিশেষায়িত চ্যানেল হিসেবে যাত্রা শুরু করছে বিটিভি নিউজ।‘বিটিভি নিউজ’র লোগো প্রকাশ করে ওই পোস্টে বলা হয়, নতুন প্রত্যয়ে সংবাদভিত্তিক পূর্ণাঙ্গ টেলিভিশন চ্যানেল হিসেবে আজ সন্ধ্যা ৭টা থেকে যাত্রা শুরু করবে ‘বিটিভি নিউজ’।</span></div><div><span style=\"font-size: 14px;\">বাংলাভাষায় বিশ্বের প্রথম টেলিভিশন ‘বিটিভি’। ১৯৬৪ সালের ২৫ ডিসেম্বর একটি পাইলট প্রকল্প হিসেবে যাত্রা শুরু হয় চ্যানেলটির। ১৯৬৭ সালে তৎকালীন পাকিস্তান টেলিভিশন করপোরেশন ও ১৯৭২ সালে রাষ্ট্রপতির আদেশে (পি.ও নং-১১৫) বাংলাদেশ টেলিভিশন নামে রাষ্ট্রীয় টিভি চ্যানেলে পরিণত হয় এটি।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">দেশের শতকরা ৯৫ ভাগ মানুষ টেরিস্ট্রিয়াল সম্প্রচার সুবিধার মাধ্যমে বিটিভির অনুষ্ঠান দেখতে পাচ্ছে। বর্তমানে বিটিভিতে বিভিন্ন অনুষ্ঠান ও সংবাদ সম্প্রচারিত হয়। এবার শুধু সংবাদের জন্য বিশেষায়িত চ্যানেল হিসেবে যাত্রা শুরু করছে বিটিভি নিউজ।</span></div>', '1737282501yl5bFyIO.jpg', NULL, NULL, NULL, NULL, NULL, 10, NULL, 0, NULL, 0, 1, 0, 'true', 0, NULL, '2026-06-14 05:44:50', '2025-01-19 18:28:21', '‘বিটিভি নিউজ’র লোগো প্রকাশ করে ওই পোস্টে বলা হয়, নতুন প্রত্যয়ে সংবাদভিত্তিক পূর্ণাঙ্গ টেলিভিশন চ্যানেল হিসেবে আজ সন্ধ্যা ৭টা থেকে যাত্রা শুরু করবে ‘বিটিভি নিউজ’।', NULL),
(51, 1, 'অগ্নিকাণ্ডের ৫ দিন পর সচিবালয়ে সাংবাদিকদের প্রবেশ', 'অগ্নিকাণ্ডের-৫-দিন-পর-সচিবালয়ে-সাংবাদিকদের-প্রবেশ', 'article', 'অগ্নিকাণ্ডের ৫ দিন পর সচিবালয়ে সাংবাদিকদের প্রবেশ', 0, 1, 1, 0, 1, 1, 0, '<div><span style=\"font-size: 14px;\">এর আগে রোববার সরকারের পক্ষ থেকে জানানো হয়েছিল সাংবাদিকরা সচিবালয়ে প্রবেশ করতে পারবে, কিন্তু সকাল থেকে প্রবেশের জন্য সাংবাদিকরা সচিবালয়ের গেটে অবস্থান করলেও অনুমতি মেলে দুপুরে। সোমবার প্রায় ২০০ সাংবাদিকের সচিবালয়ে প্রবেশের অনুমতি দেয় স্বরাষ্ট্র মন্ত্রণালয়।</span></div><div><br></div><div><span style=\"font-size: 14px;\">রোববার তথ্য উপদেষ্টা নাহিদ ইসলাম জানান, সোমবার থেকে সাংবাদিকদের অস্থায়ী পাস দেওয়া হবে। এদিন সচিবালয়ে কর্মরত সাংবাদিকদের সংগঠনের নেতাদের সঙ্গে স্বরাষ্ট্র মন্ত্রণালয়ে বৈঠক শেষে নাহিদ ইসলাম বলেছিলেন, সাংবাদিকদের অ্যাক্রিডিটেশন কার্ড পুনঃমূল্যায়ন করা হচ্ছে। সোমবার থেকে সাংবাদিকদের প্রবেশে স্বল্প সংখ্যক অস্থায়ী পাস দেওয়া হবে।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">এ ছাড়া রোববার দুপুরে সচিবালয় বিটের সাংবাদিকদের সংগঠন বাংলাদেশ সেক্রেটারিয়েট রিপোর্টার্স ফোরামের (বিএসআরএফ) নেতাদের সঙ্গে বৈঠকে স্বরাষ্ট্র উপদেষ্টা লেফটেন্যান্ট জেনারেল (অব.) মো. জাহাঙ্গীর আলম চৌধুরী বলেন, ‘সোমবার থেকে অস্থায়ী পাস নিয়ে সাংবাদিকরা সচিবালয়ে প্রবেশ করতে পারবেন।’</span></div>', '1737282675ukyMoeTF.jpg', NULL, NULL, NULL, NULL, NULL, 8, NULL, 0, NULL, 0, 1, 0, 'true', 0, NULL, '2026-06-14 05:44:50', '2025-01-19 18:31:15', 'এর আগে রোববার সরকারের পক্ষ থেকে জানানো হয়েছিল সাংবাদিকরা সচিবালয়ে প্রবেশ করতে পারবে, কিন্তু সকাল থেকে প্রবেশের জন্য সাংবাদিকরা সচিবালয়ের গেটে অবস্থান করলেও অনুমতি মেলে দুপুরে। সোমবার প্রায় ২০০ সাংবাদিকের সচিবালয়ে প্রবেশের অনুমতি দেয় স্বরাষ্ট্র মন্ত্রণালয়।', NULL),
(52, 1, 'অগ্নিকাণ্ডের ৫ দিন পর সচিবালয়ে সাংবাদিকদের প্রবেশ', 'অগ্নিকাণ্ডের-৫-দিন-পর-সচিবালয়ে-সাংবাদিকদের-প্রবেশ4', 'article', 'অগ্নিকাণ্ডের ৫ দিন পর সচিবালয়ে সাংবাদিকদের প্রবেশ', 0, 1, 1, 0, 1, 1, 0, '<div><span style=\"font-size: 14px;\">এর আগে রোববার সরকারের পক্ষ থেকে জানানো হয়েছিল সাংবাদিকরা সচিবালয়ে প্রবেশ করতে পারবে, কিন্তু সকাল থেকে প্রবেশের জন্য সাংবাদিকরা সচিবালয়ের গেটে অবস্থান করলেও অনুমতি মেলে দুপুরে। সোমবার প্রায় ২০০ সাংবাদিকের সচিবালয়ে প্রবেশের অনুমতি দেয় স্বরাষ্ট্র মন্ত্রণালয়।</span></div><div><br></div><div><span style=\"font-size: 14px;\">রোববার তথ্য উপদেষ্টা নাহিদ ইসলাম জানান, সোমবার থেকে সাংবাদিকদের অস্থায়ী পাস দেওয়া হবে। এদিন সচিবালয়ে কর্মরত সাংবাদিকদের সংগঠনের নেতাদের সঙ্গে স্বরাষ্ট্র মন্ত্রণালয়ে বৈঠক শেষে নাহিদ ইসলাম বলেছিলেন, সাংবাদিকদের অ্যাক্রিডিটেশন কার্ড পুনঃমূল্যায়ন করা হচ্ছে। সোমবার থেকে সাংবাদিকদের প্রবেশে স্বল্প সংখ্যক অস্থায়ী পাস দেওয়া হবে।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">এ ছাড়া রোববার দুপুরে সচিবালয় বিটের সাংবাদিকদের সংগঠন বাংলাদেশ সেক্রেটারিয়েট রিপোর্টার্স ফোরামের (বিএসআরএফ) নেতাদের সঙ্গে বৈঠকে স্বরাষ্ট্র উপদেষ্টা লেফটেন্যান্ট জেনারেল (অব.) মো. জাহাঙ্গীর আলম চৌধুরী বলেন, ‘সোমবার থেকে অস্থায়ী পাস নিয়ে সাংবাদিকরা সচিবালয়ে প্রবেশ করতে পারবেন।’</span></div>', '1737283017VacA72IS.jpg', NULL, NULL, NULL, NULL, NULL, 10, NULL, 0, NULL, 0, 1, 0, 'true', 0, NULL, '2026-06-14 05:44:50', '2025-01-19 18:36:57', 'এর আগে রোববার সরকারের পক্ষ থেকে জানানো হয়েছিল সাংবাদিকরা সচিবালয়ে প্রবেশ করতে পারবে, কিন্তু সকাল থেকে প্রবেশের জন্য সাংবাদিকরা সচিবালয়ের গেটে অবস্থান করলেও অনুমতি মেলে দুপুরে। সোমবার প্রায় ২০০ সাংবাদিকের সচিবালয়ে প্রবেশের অনুমতি দেয় স্বরাষ্ট্র মন্ত্রণালয়।', NULL),
(53, 1, 'সাংবাদিকদের দ্রুত অ্যাক্রিডিটেশন প্রদানের আহ্বান অনলাইন এডিটরস অ্যালায়েন্সের', 'সাংবাদিকদের-দ্রুত-অ্যাক্রিডিটেশন-প্রদানের-আহ্বান-অনলাইন-এডিটরস-অ্যালায়েন্সের', 'article', 'সাংবাদিকদের দ্রুত অ্যাক্রিডিটেশন প্রদানের আহ্বান অনলাইন এডিটরস অ্যালায়েন্সের', 0, 1, 1, 0, 1, 1, 0, '<div><span style=\"font-size: 14px;\">রোববার (২৯ ডিসেম্বর) অনলাইন এডিটরস অ্যালায়েন্স সভাপতি হাসান শরীফ ও সাধারণ সম্পাদক মিজানুর রহমান সোহেল স্বাক্ষরিত এক বিবৃতিতে এ উদ্বেগ প্রকাশ করা হয়।</span></div><div><span style=\"font-size: 14px;\">এতে বলা হয়, সম্প্রতি সচিবালয়ে সাংবাদিকদের প্রবেশাধিকারে সাময়িক স্থগিতাদেশের বিষয়ে আমরা গভীর উদ্বেগ প্রকাশ করছি। আমরা আশা করি, প্রশাসন নিরাপত্তা ও সুশাসন নিশ্চিত করার পাশাপাশি সাংবাদিকদের ন্যায্য প্রবেশাধিকার বজায় রাখার বিষয়টি গুরুত্বসহকারে বিবেচনা করবে। এ ক্ষেত্রে যাচাই-বাছাইয়ের মাধ্যমে প্রকৃত সাংবাদিকদের দ্রুত অ্যাক্রিডিটেশন প্রদান করার জন্য সংশ্লিষ্ট কর্তৃপক্ষের প্রতি জোরালো দাবি জানাচ্ছি।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">অনলাইন এডিটরস অ্যালায়েন্স সরকারের গঠনমূলক পদক্ষেপের প্রতি আস্থা রাখে এবং এ বিষয়ে একটি ইতিবাচক সিদ্ধান্ত নেওয়ার আহ্বান জানায়। গণহারে সাংবাদিকদের অ্যাক্রিডিটেশন বাতিল করার সিদ্ধান্তকে আমরা সুবিবেচনাপ্রসূত মনে করি না। ভবিষ্যতে এ ধরনের সিদ্ধান্ত গ্রহণের ক্ষেত্রে আরও সতর্ক ও সংবেদনশীল হওয়ার আহ্বান জানাচ্ছি।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">আমরা দৃঢ়ভাবে বিশ্বাস করি, গণমাধ্যমের স্বাধীনতা ও সাংবাদিকদের দায়িত্বশীল ভূমিকা নিশ্চিত করতে প্রশাসনের সঙ্গে ঘনিষ্ঠ সহযোগিতা অপরিহার্য। একই সঙ্গে, আমরা কর্তৃপক্ষকে অনুরোধ করছি, প্রকৃত সাংবাদিকদের সচিবালয়ে প্রবেশাধিকারের বিষয়টি দ্রুত নিশ্চিত করতে প্রয়োজনীয় পদক্ষেপ গ্রহণ করুন।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">এ ছাড়া সাংবাদিকদের পেশাগত দায়িত্ব পালনের সুযোগ নিশ্চিত করা তথ্যের অবাধ প্রবাহ এবং গণতান্ত্রিক মূল্যবোধ রক্ষার গুরুত্বপূর্ণ অংশ বলেও জানায় অনলাইন এডিটরস অ্যালায়েন্স।</span></div>', '1737283161T1v3u229.jpg', NULL, NULL, NULL, NULL, NULL, 10, NULL, 0, NULL, 0, 1, 0, 'true', 0, NULL, '2026-06-14 05:44:50', '2025-01-19 18:39:21', 'এতে বলা হয়, সম্প্রতি সচিবালয়ে সাংবাদিকদের প্রবেশাধিকারে সাময়িক স্থগিতাদেশের বিষয়ে আমরা গভীর উদ্বেগ প্রকাশ করছি। আমরা আশা করি, প্রশাসন নিরাপত্তা ও সুশাসন নিশ্চিত করার পাশাপাশি সাংবাদিকদের ন্যায্য প্রবেশাধিকার বজায় রাখার বিষয়টি গুরুত্বসহকারে বিবেচনা করবে। এ ক্ষেত্রে যাচাই-বাছাইয়ের মাধ্যমে প্রকৃত সাংবাদিকদের দ্রুত অ্যাক্রিডিটেশন প্রদান করার জন্য সংশ্লিষ্ট কর্তৃপক্ষের প্রতি জোরালো দাবি জানাচ্ছি।', NULL),
(54, 1, 'সচিবালয়ে সাংবাদিকদের প্রবেশাধিকার নিশ্চিতের আহ্বান ডিআরইউয়ের', 'সচিবালয়ে-সাংবাদিকদের-প্রবেশাধিকার-নিশ্চিতের-আহ্বান-ডিআরইউয়ের', 'article', 'সচিবালয়ে সাংবাদিকদের প্রবেশাধিকার নিশ্চিতের আহ্বান ডিআরইউয়ের', 0, 1, 1, 0, 1, 1, 0, '<div><span style=\"font-size: 14px;\">রোববার (২৯ ডিসেম্বর) ডিআরইউ কার্যনির্বাহী কমিটির পক্ষে সভাপতি আবু সালেহ আকন ও সাধারণ সম্পাদক মাইনুল হাসান সোহেল এক বিবৃতিতে এ আহ্বান জানান।</span></div><div><br></div><div><span style=\"font-size: 14px;\">এতে বলা হয়েছে, গত শুক্রবার স্বরাষ্ট্র মন্ত্রণালয় এক প্রেস বিজ্ঞপ্তিতে সাংবাদিকদের পরবর্তী নির্দেশ না দেওয়া পর্যন্ত সচিবালয়ে প্রবেশাধিকার বাতিল করেছে। প্রশাসনের প্রাণকেন্দ্র সচিবালয়ে সাংবাদিকদের প্রবেশাধিকার সীমিত করা হলে পেশাদার সাংবাদিকদের তথ্য প্রাপ্তি বাধাগ্রস্ত হবে বলে আশঙ্কা করছে ডিআরইউ।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">পেশাগত দায়িত্ব পালনে সাংবাদিকরা যাতে নির্বিঘ্নে এবং নিয়মিত সচিবালয়ে যাতায়াত করতে পারেন, তা দ্রুত নিশ্চিত করতে সরকারের প্রতি আহ্বান জানিয়েছেন ডিআরইউ নেতৃবৃন্দ।</span></div><div><span style=\"font-size: 14px;\">রোববার (২৯ ডিসেম্বর) ডিআরইউ কার্যনির্বাহী কমিটির পক্ষে সভাপতি আবু সালেহ আকন ও সাধারণ সম্পাদক মাইনুল হাসান সোহেল এক বিবৃতিতে এ আহ্বান জানান।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">এতে বলা হয়েছে, গত শুক্রবার স্বরাষ্ট্র মন্ত্রণালয় এক প্রেস বিজ্ঞপ্তিতে সাংবাদিকদের পরবর্তী নির্দেশ না দেওয়া পর্যন্ত সচিবালয়ে প্রবেশাধিকার বাতিল করেছে। প্রশাসনের প্রাণকেন্দ্র সচিবালয়ে সাংবাদিকদের প্রবেশাধিকার সীমিত করা হলে পেশাদার সাংবাদিকদের তথ্য প্রাপ্তি বাধাগ্রস্ত হবে বলে আশঙ্কা করছে ডিআরইউ।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">পেশাগত দায়িত্ব পালনে সাংবাদিকরা যাতে নির্বিঘ্নে এবং নিয়মিত সচিবালয়ে যাতায়াত করতে পারেন, তা দ্রুত নিশ্চিত করতে সরকারের প্রতি আহ্বান জানিয়েছেন ডিআরইউ নেতৃবৃন্দ।</span></div>', '1737283339GWaPstmH.jpg', NULL, NULL, NULL, NULL, NULL, 10, NULL, 0, NULL, 0, 1, 0, 'true', 0, NULL, '2026-06-14 05:44:50', '2025-01-19 18:42:19', 'এতে বলা হয়েছে, গত শুক্রবার স্বরাষ্ট্র মন্ত্রণালয় এক প্রেস বিজ্ঞপ্তিতে সাংবাদিকদের পরবর্তী নির্দেশ না দেওয়া পর্যন্ত সচিবালয়ে প্রবেশাধিকার বাতিল করেছে। প্রশাসনের প্রাণকেন্দ্র সচিবালয়ে সাংবাদিকদের প্রবেশাধিকার সীমিত করা হলে পেশাদার সাংবাদিকদের তথ্য প্রাপ্তি বাধাগ্রস্ত হবে বলে আশঙ্কা করছে ডিআরইউ।', NULL),
(55, 1, 'রমজান উপলক্ষে আরটিভির হিফজুল কোরআন প্রতিযোগিতার সিলেকশন রাউন্ড শেষ', 'রমজান-উপলক্ষে-আরটিভির-হিফজুল-কোরআন-প্রতিযোগিতার-সিলেকশন-রাউন্ড-শেষ', 'article', 'bangladesh,bbaggg', 0, 1, 1, 0, 1, 1, 0, '<div><span style=\"font-size: 14px;\">শনিবার (২৮ ডিসেম্বর) সকাল থেকে আরটিভি’র বেঙ্গল মাল্টিমিডিয়া স্টুডিওতে এই সিলেকশন রাউন্ড অনুষ্ঠিত হয়।</span></div><div><br></div><div><span style=\"font-size: 14px;\">সারাদেশ থেকে প্রাথমিকভাবে বাছাইকৃত ৪০০-এর অধিক কোরআনের হাফেজ এই সিলেকশন রাউন্ডে আসেন।</span></div><div><br></div><div><span style=\"font-size: 14px;\">সিলেকশন রাউন্ডে বিচারক হিসেবে উপস্থিত ছিলেন বাংলাদেশ ইমাম সমিতির সভাপতি হাফেজ মাওলানা লুৎফর রহমান, হাফেজ ক্বারী আবু রায়হান, হাফেজ ক্বারী নুরুজ্জামানসহ আরও অনেকে।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">অডিশন শেষে প্রতিযোগী, ওস্তাদ ও বিচারকদের অংশগ্রহণে একটি র‌্যালির আয়োজন করা হয়।শনিবার (২৮ ডিসেম্বর) সকাল থেকে আরটিভি’র বেঙ্গল মাল্টিমিডিয়া স্টুডিওতে এই সিলেকশন রাউন্ড অনুষ্ঠিত হয়।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">সারাদেশ থেকে প্রাথমিকভাবে বাছাইকৃত ৪০০-এর অধিক কোরআনের হাফেজ এই সিলেকশন রাউন্ডে আসেন।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">সিলেকশন রাউন্ডে বিচারক হিসেবে উপস্থিত ছিলেন বাংলাদেশ ইমাম সমিতির সভাপতি হাফেজ মাওলানা লুৎফর রহমান, হাফেজ ক্বারী আবু রায়হান, হাফেজ ক্বারী নুরুজ্জামানসহ আরও অনেকে।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">অডিশন শেষে প্রতিযোগী, ওস্তাদ ও বিচারকদের অংশগ্রহণে একটি র‌্যালির আয়োজন করা হয়।</span></div>', '1737283502kogi9xQ3.jpg', NULL, NULL, NULL, NULL, NULL, 10, NULL, 0, NULL, 0, 1, 0, 'true', 0, NULL, '2026-06-14 05:44:50', '2025-01-20 02:55:59', 'সিলেকশন রাউন্ডে বিচারক হিসেবে উপস্থিত ছিলেন বাংলাদেশ ইমাম সমিতির সভাপতি হাফেজ মাওলানা লুৎফর রহমান, হাফেজ ক্বারী আবু রায়হান, হাফেজ ক্বারী নুরুজ্জামানসহ আরও অনেকে।', 'রমজান উপলক্ষে আরটিভির হিফজুল কোরআন প্রতিযোগিতার সিলেকশন রাউন্ড শেষ'),
(56, 1, 'প্রধান উপদেষ্টাকে মার্চে বেইজিং সফরে নিতে আগ্রহী চীন', 'প্রধান-উপদেষ্টাকে-মার্চে-বেইজিং-সফরে-নিতে-আগ্রহী-চীন', 'article', 'প্রধান উপদেষ্টাকে মার্চে বেইজিং সফরে নিতে আগ্রহী চীন', 0, 1, 1, 0, 1, 1, 0, '<div>ছাত্র-জনতার অভ্যুত্থানে বাংলাদেশে ৫ আগস্টের রাজনৈতিক পটপরিবর্তনের পর দুই দেশের সম্পর্ক গভীর করতে মনোযোগ দিচ্ছে চীন। অন্তর্বর্তী সরকারের সঙ্গে প্রথম দ্বিপক্ষীয় বৈঠক আয়োজনের ধারাবাহিকতায় সর্বোচ্চ স্তরের সফরে আগ্রহী বেইজিং। তাই দুই দেশের সম্পর্কের পাঁচ দশক পূর্তিতে আগামী মার্চে অন্তর্বর্তী সরকারের প্রধান উপদেষ্টা অধ্যাপক মুহাম্মদ ইউনূসকে বেইজিং সফরে নিতে চায় চীন।</div><div><br></div><div>কূটনৈতিক সূত্রে জানা গেছে, আগামী ২৭ ও ২৮ মার্চ বেইজিংয়ে অনুষ্ঠেয় বাও ফোরাম ফর এশিয়ার (বিএফএ) সম্মেলনে যোগ দিতে ইতিমধ্যে অধ্যাপক মুহাম্মদ ইউনূসকে আমন্ত্রণ জানিয়েছে চীন। এশিয়াসহ বিশ্বের গুরুত্বপূর্ণ ইস্যু নিয়ে বেসরকারি ও অলাভজনক সংস্থার এই ফোরামে বিভিন্ন দেশের নেতা, শিল্পোদ্যোক্তা, ব্যবসায়ী নেতা ও শিক্ষাবিদেরা অংশ নিয়ে থাকেন।ছাত্র-জনতার অভ্যুত্থানে বাংলাদেশে ৫ আগস্টের রাজনৈতিক পটপরিবর্তনের পর দুই দেশের সম্পর্ক গভীর করতে মনোযোগ দিচ্ছে চীন। অন্তর্বর্তী সরকারের সঙ্গে প্রথম দ্বিপক্ষীয় বৈঠক আয়োজনের ধারাবাহিকতায় সর্বোচ্চ স্তরের সফরে আগ্রহী বেইজিং। তাই দুই দেশের সম্পর্কের পাঁচ দশক পূর্তিতে আগামী মার্চে অন্তর্বর্তী সরকারের প্রধান উপদেষ্টা অধ্যাপক মুহাম্মদ ইউনূসকে বেইজিং সফরে নিতে চায় চীন।</div><div><br></div><div>কূটনৈতিক সূত্রে জানা গেছে, আগামী ২৭ ও ২৮ মার্চ বেইজিংয়ে অনুষ্ঠেয় বাও ফোরাম ফর এশিয়ার (বিএফএ) সম্মেলনে যোগ দিতে ইতিমধ্যে অধ্যাপক মুহাম্মদ ইউনূসকে আমন্ত্রণ জানিয়েছে চীন। এশিয়াসহ বিশ্বের গুরুত্বপূর্ণ ইস্যু নিয়ে বেসরকারি ও অলাভজনক সংস্থার এই ফোরামে বিভিন্ন দেশের নেতা, শিল্পোদ্যোক্তা, ব্যবসায়ী নেতা ও শিক্ষাবিদেরা অংশ নিয়ে থাকেন।</div>', '1737318906kjbfwtFr.jpg', NULL, NULL, NULL, NULL, NULL, 2, NULL, 0, NULL, 0, 0, 115, 'true', 0, NULL, '2026-06-14 05:44:50', '2025-01-20 04:35:25', 'ছাত্র-জনতার অভ্যুত্থানে বাংলাদেশে ৫ আগস্টের রাজনৈতিক পটপরিবর্তনের পর দুই দেশের সম্পর্ক গভীর করতে মনোযোগ দিচ্ছে চীন। অন্তর্বর্তী সরকারের সঙ্গে প্রথম দ্বিপক্ষীয় বৈঠক আয়োজনের ধারাবাহিকতায় সর্বোচ্চ স্তরের সফরে আগ্রহী বেইজিং।', 'প্রধান উপদেষ্টাকে মার্চে বেইজিং সফরে নিতে আগ্রহী চীন'),
(57, 1, 'মুক্তমত প্রকাশ–সংক্রান্ত ও গায়েবি মামলা ফেব্রুয়ারির মধ্যে প্রত্যাহারের আশা আইন উপদেষ্টার', 'মুক্তমত-প্রকাশ–সংক্রান্ত-ও-গায়েবি-মামলা-ফেব্রুয়ারির-মধ্যে-প্রত্যাহারের-আশা-আইন-উপদেষ্টার', 'article', 'মুক্তমত প্রকাশ–সংক্রান্ত ও গায়েবি মামলা ফেব্রুয়ারির মধ্যে প্রত্যাহারের আশা আইন উপদেষ্টার', 0, 1, 1, 0, 1, 1, 0, '<div><span style=\"font-size: 14px;\">স্পিচ অফেন্স–সম্পর্কিত মামলা প্রত্যাহারের বিষয়ে আসিফ নজরুল বলেন, বিগত সরকারের আমলে করা ৩২২টি স্পিচ অফেন্স–সম্পর্কিত মামলার বিচার চলছে। এগুলো প্রত্যাহার করার বিষয়ে আইন মন্ত্রণালয়ের ভূমিকা রাখার অবকাশ আছে। ৩২২টি মামলার মধ্যে সরকারি কৌঁসুলির মাধ্যমে ইতিমধ্যে ১১৩টি মামলা প্রত্যাহার করা হয়েছে। তাঁরা আশা করছেন, দুই সপ্তাহের মধ্যে এ–সংক্রান্ত যতগুলো মামলা আছে সব প্রত্যাহার করা হবে।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">স্পিচ অফেন্স–সম্পর্কিত মামলা প্রত্যাহারের বিষয়ে আসিফ নজরুল বলেন, বিগত সরকারের আমলে করা ৩২২টি স্পিচ অফেন্স–সম্পর্কিত মামলার বিচার চলছে। এগুলো প্রত্যাহার করার বিষয়ে আইন মন্ত্রণালয়ের ভূমিকা রাখার অবকাশ আছে। ৩২২টি মামলার মধ্যে সরকারি কৌঁসুলির মাধ্যমে ইতিমধ্যে ১১৩টি মামলা প্রত্যাহার করা হয়েছে। তাঁরা আশা করছেন, দুই সপ্তাহের মধ্যে এ–সংক্রান্ত যতগুলো মামলা আছে সব প্রত্যাহার করা হবে।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">স্পিচ অফেন্স–সম্পর্কিত মামলা প্রত্যাহারের বিষয়ে আসিফ নজরুল বলেন, বিগত সরকারের আমলে করা ৩২২টি স্পিচ অফেন্স–সম্পর্কিত মামলার বিচার চলছে। এগুলো প্রত্যাহার করার বিষয়ে আইন মন্ত্রণালয়ের ভূমিকা রাখার অবকাশ আছে। ৩২২টি মামলার মধ্যে সরকারি কৌঁসুলির মাধ্যমে ইতিমধ্যে ১১৩টি মামলা প্রত্যাহার করা হয়েছে। তাঁরা আশা করছেন, দুই সপ্তাহের মধ্যে এ–সংক্রান্ত যতগুলো মামলা আছে সব প্রত্যাহার করা হবে।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><div style=\"\"><span style=\"font-size: 14px;\">স্পিচ অফেন্স–সম্পর্কিত মামলা প্রত্যাহারের বিষয়ে আসিফ নজরুল বলেন, বিগত সরকারের আমলে করা ৩২২টি স্পিচ অফেন্স–সম্পর্কিত মামলার বিচার চলছে। এগুলো প্রত্যাহার করার বিষয়ে আইন মন্ত্রণালয়ের ভূমিকা রাখার অবকাশ আছে। ৩২২টি মামলার মধ্যে সরকারি কৌঁসুলির মাধ্যমে ইতিমধ্যে ১১৩টি মামলা প্রত্যাহার করা হয়েছে। তাঁরা আশা করছেন, দুই সপ্তাহের মধ্যে এ–সংক্রান্ত যতগুলো মামলা আছে সব প্রত্যাহার করা হবে।</span></div><div style=\"\"><span style=\"font-size: 14px;\"><br></span></div><div style=\"\"><span style=\"font-size: 14px;\">স্পিচ অফেন্স–সম্পর্কিত মামলা প্রত্যাহারের বিষয়ে আসিফ নজরুল বলেন, বিগত সরকারের আমলে করা ৩২২টি স্পিচ অফেন্স–সম্পর্কিত মামলার বিচার চলছে। এগুলো প্রত্যাহার করার বিষয়ে আইন মন্ত্রণালয়ের ভূমিকা রাখার অবকাশ আছে। ৩২২টি মামলার মধ্যে সরকারি কৌঁসুলির মাধ্যমে ইতিমধ্যে ১১৩টি মামলা প্রত্যাহার করা হয়েছে। তাঁরা আশা করছেন, দুই সপ্তাহের মধ্যে এ–সংক্রান্ত যতগুলো মামলা আছে সব প্রত্যাহার করা হবে।</span></div><div style=\"\"><span style=\"font-size: 14px;\"><br></span></div><div style=\"\"><span style=\"font-size: 14px;\">স্পিচ অফেন্স–সম্পর্কিত মামলা প্রত্যাহারের বিষয়ে আসিফ নজরুল বলেন, বিগত সরকারের আমলে করা ৩২২টি স্পিচ অফেন্স–সম্পর্কিত মামলার বিচার চলছে। এগুলো প্রত্যাহার করার বিষয়ে আইন মন্ত্রণালয়ের ভূমিকা রাখার অবকাশ আছে। ৩২২টি মামলার মধ্যে সরকারি কৌঁসুলির মাধ্যমে ইতিমধ্যে ১১৩টি মামলা প্রত্যাহার করা হয়েছে। তাঁরা আশা করছেন, দুই সপ্তাহের মধ্যে এ–সংক্রান্ত যতগুলো মামলা আছে সব প্রত্যাহার করা হবে।</span></div></div>', '1737461880yAZugqX4.jpg', NULL, NULL, NULL, NULL, NULL, 2, 14, 0, NULL, 0, 1, 0, 'true', 0, NULL, '2026-06-14 05:46:36', '2025-01-21 20:18:00', 'স্পিচ অফেন্স–সম্পর্কিত মামলা প্রত্যাহারের বিষয়ে আসিফ নজরুল বলেন, বিগত সরকারের আমলে করা ৩২২টি স্পিচ অফেন্স–সম্পর্কিত মামলার বিচার চলছে। এগুলো প্রত্যাহার করার বিষয়ে আইন মন্ত্রণালয়ের ভূমিকা রাখার অবকাশ আছে। ৩২২টি মামলার মধ্যে সরকারি কৌঁসুলির মাধ্যমে ইতিমধ্যে ১১৩টি মামলা প্রত্যাহার করা হয়েছে। তাঁরা আশা করছেন, দুই সপ্তাহের মধ্যে এ–সংক্রান্ত যতগুলো মামলা আছে সব প্রত্যাহার করা হবে।', 'মুক্তমত প্রকাশ–সংক্রান্ত ও গায়েবি মামলা ফেব্রুয়ারির মধ্যে প্রত্যাহারের আশা আইন উপদেষ্টার'),
(58, 1, 'রাষ্ট্র ধর্মনিরপেক্ষ না হলে কীভাবে অন্তর্ভুক্তিমূলক হবে, প্রশ্ন আনু মুহাম্মদের', 'রাষ্ট্র-ধর্মনিরপেক্ষ-না-হলে-কীভাবে-অন্তর্ভুক্তিমূলক-হবে,-প্রশ্ন-আনু-মুহাম্মদের', 'article', 'রাষ্ট্র ধর্মনিরপেক্ষ না হলে কীভাবে অন্তর্ভুক্তিমূলক হবে, প্রশ্ন আনু মুহাম্মদের', 0, 1, 1, 0, 1, 1, 0, '<div><span style=\"font-size: 14px;\">ধর্মনিরপেক্ষ না হলে একটা রাষ্ট্র কীভাবে অন্তর্ভুক্তিমূলক হবে—এই প্রশ্ন তুলে অধ্যাপক আনু মুহাম্মদ বলেছেন, ধর্মনিরপেক্ষতা মানে হচ্ছে রাষ্ট্র, জাতি, ধর্ম, লিঙ্গ—এসব বিষয়ে রাষ্ট্র নিরপেক্ষ থাকবে। রাষ্ট্র সবাইকে সমান অধিকার ও সুযোগ দেবে। কোনো রাষ্ট্র যদি এই অবস্থানটা না নেয়, তাহলে তো সে রাষ্ট্র এমনিতেই অন্য ধর্মাবলম্বীদের আলাদা করে দিচ্ছে।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">সংবিধান সংস্কার কমিশনের প্রস্তাবে সংবিধানের মূলনীতি থেকে ‘ধর্মনিরপেক্ষতা’ শব্দটি বাদ দেওয়ার প্রসঙ্গ উল্লেখ করে আনু মুহাম্মদ এ কথা বলেন। আজ সোমবার ঢাকা বিশ্ববিদ্যালয়ের মোজাফফর আহমেদ চৌধুরী মিলনায়তনে ‘স্বৈরতন্ত্র থেকে গণতন্ত্রের পথ: বৈষম্যহীন বাংলাদেশের সন্ধানে’ শীর্ষক সেমিনারে সভাপ্রধান হিসেবে সমাপনী বক্তব্য দেন তিনি। দিনব্যাপী এই সেমিনারের আয়োজন করে রাজনীতি, অর্থনীতি ও সমাজ বিশ্লেষণমূলক জার্নাল ‘সর্বজনকথা’। সর্বজনকথার সম্পাদক অধ্যাপক আনু মুহাম্মদ।ধর্মনিরপেক্ষ না হলে একটা রাষ্ট্র কীভাবে অন্তর্ভুক্তিমূলক হবে—এই প্রশ্ন তুলে অধ্যাপক আনু মুহাম্মদ বলেছেন, ধর্মনিরপেক্ষতা মানে হচ্ছে রাষ্ট্র, জাতি, ধর্ম, লিঙ্গ—এসব বিষয়ে রাষ্ট্র নিরপেক্ষ থাকবে। রাষ্ট্র সবাইকে সমান অধিকার ও সুযোগ দেবে। কোনো রাষ্ট্র যদি এই অবস্থানটা না নেয়, তাহলে তো সে রাষ্ট্র এমনিতেই অন্য ধর্মাবলম্বীদের আলাদা করে দিচ্ছে।</span></div><div><span style=\"font-size: 14px;\"><br></span></div><div><span style=\"font-size: 14px;\">সংবিধান সংস্কার কমিশনের প্রস্তাবে সংবিধানের মূলনীতি থেকে ‘ধর্মনিরপেক্ষতা’ শব্দটি বাদ দেওয়ার প্রসঙ্গ উল্লেখ করে আনু মুহাম্মদ এ কথা বলেন। আজ সোমবার ঢাকা বিশ্ববিদ্যালয়ের মোজাফফর আহমেদ চৌধুরী মিলনায়তনে ‘স্বৈরতন্ত্র থেকে গণতন্ত্রের পথ: বৈষম্যহীন বাংলাদেশের সন্ধানে’ শীর্ষক সেমিনারে সভাপ্রধান হিসেবে সমাপনী বক্তব্য দেন তিনি। দিনব্যাপী এই সেমিনারের আয়োজন করে রাজনীতি, অর্থনীতি ও সমাজ বিশ্লেষণমূলক জার্নাল ‘সর্বজনকথা’। সর্বজনকথার সম্পাদক অধ্যাপক আনু মুহাম্মদ।</span></div>', '1737461981jKQ5jH3Q.jpg', NULL, NULL, NULL, NULL, NULL, 2, 14, 0, NULL, 0, 1, 0, 'true', 0, NULL, '2026-06-14 05:46:36', '2025-01-21 20:19:41', 'ধর্মনিরপেক্ষ না হলে একটা রাষ্ট্র কীভাবে অন্তর্ভুক্তিমূলক হবে—এই প্রশ্ন তুলে অধ্যাপক আনু মুহাম্মদ বলেছেন, ধর্মনিরপেক্ষতা মানে হচ্ছে রাষ্ট্র, জাতি, ধর্ম, লিঙ্গ—এসব বিষয়ে রাষ্ট্র নিরপেক্ষ থাকবে। রাষ্ট্র সবাইকে সমান অধিকার ও সুযোগ দেবে।', 'রাষ্ট্র ধর্মনিরপেক্ষ না হলে কীভাবে অন্তর্ভুক্তিমূলক হবে, প্রশ্ন আনু মুহাম্মদের'),
(59, 1, 'বর্তমান সরকারের প্রধান দায়িত্ব শেখ হাসিনাকে ফিরিয়ে এনে', 'বর্তমান-সরকারের-প্রধান-দায়িত্ব-শেখ-হাসিনাকে-ফিরিয়ে-এনে', 'article', 'বর্তমান সরকারের প্রধান দায়িত্ব শেখ হাসিনাকে ফিরিয়ে এনে', 0, 1, 1, 0, 1, 1, 0, '<h3>বর্তমান সরকারের প্রধান দায়িত্ব শেখ হাসিনাকে ফিরিয়ে এনে</h3><br>', '17813427323WkTNOuT.jpg', NULL, NULL, NULL, NULL, NULL, 2, 14, 1, '2026-06-13 09:30:00', 0, 1, 0, 'true', 0, NULL, '2026-06-14 05:46:36', '2026-06-13 03:29:26', 'বর্তমান সরকারের প্রধান দায়িত্ব শেখ হাসিনাকে ফিরিয়ে এনে', 'বর্তমান সরকারের প্রধান দায়িত্ব শেখ হাসিনাকে ফিরিয়ে এনে');
INSERT INTO `posts` (`id`, `language_id`, `title`, `slug`, `post_type`, `meta_tag`, `show_right_column`, `is_feature`, `is_slider`, `slider_left`, `slider_right`, `is_trending`, `is_videoGallery`, `description`, `image_big`, `rss_image`, `image_small`, `video`, `embed_video`, `audio`, `category_id`, `subcategories_id`, `schedule_post`, `schedule_post_date`, `is_pending`, `admin_id`, `user_id`, `status`, `is_draft`, `rss_link`, `created_at`, `updated_at`, `short_description`, `images_caption`) VALUES
(60, 1, 'যুব উন্নয়ন অধিদপ্তরে চাকরির সুযোগ', 'যুব উন্নয়ন অধিদপ্তরে চাকরির সুযোগ', 'article', 'যুব উন্নয়ন অধিদপ্তরে চাকরির সুযোগ', 0, 0, 0, 0, 0, 0, 0, '<p>জনবল নিয়োগের বিজ্ঞপ্তি প্রকাশ করেছে যুব উন্নয়ন অধিদপ্তর। আটটি পদে মোট ৮১ জনকে নিয়োগ দেওয়া হবে। আগ্রহী যোগ্য প্রার্থীরা অনলাইনে আবেদন করতে পারবেন।</p><p>পদের নাম: বাবুর্চি, ক্যাটল অ্যান্ড পোল্ট্রি অ্যাটেনডেন্ট, বেয়ারার, ফরাশ কাম নৈশপ্রহরী, পরিচ্ছন্নতাকর্মী (ঝাড়ুদার), নিরাপত্তাপ্রহরী (গার্ড), অফিস সহায়ক ও নৈশপ্রহরী কাম ফরাশ।</p><p>পদসংখ্যা: মোট ৮১ জন।</p><p>শিক্ষাগত যোগ্যতা ও অভিজ্ঞতা: স্বীকৃত যেকোনো শিক্ষাপ্রতিষ্ঠান থেকে মাধ্যমিক/ অষ্টম শ্রেণি বা সমমান পাস প্রার্থীরা বিভিন্ন পদের জন্য আবেদন করতে পারবেন। কিছু কিছু পদের জন্য কম্পিউটার চালনায় দক্ষতা ও উক্ত পদের জন্য কাজের অভিজ্ঞতা থাকতে হবে। আবেদনকারীর বয়সসীমা ন্যূনতম ১৮ থেকে অনূর্ধ্ব ৩০ বছরের মধ্যে হতে হবে।</p><p>বেতন: জাতীয় বেতন স্কেল-২০১৫ অনুযায়ী বেতন-ভাতা দেওয়া হবে।</p><p>আবেদন প্রক্রিয়া: আগ্রহী প্রার্থীদের অনলাইনের (http://dyd.teletalk.com.bd) মাধ্যমে আবেদনপত্র পূরণ করতে হবে।</p><p>আবেদনের শেষ তারিখ: অনলাইনের মাধ্যমে আবেদন ও ফি প্রদান শুরু হয়েছে ১২ নভেম্বর, ২০২০ সকাল ১০টায় এবং শেষ হবে ১৩ ডিসেম্বর, ২০২০ বিকেল ৫টায়।</p>', '1781517923AHEpzpZn.jpg', NULL, NULL, NULL, NULL, NULL, 7, NULL, 0, NULL, 0, 1, 0, 'true', 0, NULL, '2026-06-15 10:05:24', '2026-06-15 04:05:24', 'জনবল নিয়োগের বিজ্ঞপ্তি প্রকাশ করেছে যুব উন্নয়ন অধিদপ্তর। আটটি পদে মোট ৮১ জনকে নিয়োগ দেওয়া হবে। আগ্রহী যোগ্য প্রার্থীরা অনলাইনে আবেদন করতে পারবেন।পদের নাম: বাবুর্চি, ক্যাটল অ্যান্ড পোল্ট্রি অ্যাটেনডেন্ট, বেয়ারার, ফরাশ কাম নৈশপ্রহরী, পরিচ্ছন্নতাকর্মী (ঝাড়ুদার), নিরাপত্তাপ্রহরী (গার্ড), অফিস সহায়ক ও নৈশপ্রহরী কাম ফরাশ।পদসংখ্যা: মোট ৮১ জন।শিক্ষাগত যোগ্যতা ও অভিজ্ঞতা: স্বীকৃত যেকোনো শিক্ষাপ্রতিষ্ঠান থেকে মাধ্যমিক/ অষ্টম শ্রেণি বা সমমান পাস প্রার্থীরা বিভিন্ন পদের জন্য আবেদন করতে পারবেন। কিছু কিছু পদের জন্য কম্পিউটার চালনায় দক্ষতা ও উক্ত পদের জন্য কাজের অভিজ্ঞতা থাকতে হবে। আবেদনকারীর বয়সসীমা ন্যূনতম ১৮ থ', 'যুব উন্নয়ন অধিদপ্তরে চাকরির সুযোগ'),
(61, 1, 'সংসদে অটো পাসের সমালোচনা', 'সংসদে অটো পাসের সমালোচনা', 'article', 'সংসদে অটো পাসের সমালোচনা', 0, 1, 1, 0, 1, 1, 0, '<p>চলমান করোনাভাইরাস পরিস্থিতির মধ্যে শিক্ষাপ্রতিষ্ঠান বন্ধ রেখে অটো পাস দেওয়ার সমালোচনা করেছেন সংসদের বিরোধী দলীয় উপনেতা জাতীয় পার্টির কো-চেয়ারম্যান গোলাম মোহাম্মদ কাদের। আজ বৃহস্পতিবার রাতে একাদশ জাতীয় সংসদের দশম অধিবেশনের সমাপনী ভাষণে বিরোধী দলীয় উপ নেতা তার বক্ত্যের যুক্তি তুলে ধরেন।</p><p>গোলাম মোহাম্মদ কাদের বলেন, অফিস-আদালত, মিল-কারখানা, দোকানপাট, যানবাহন, হাটবাজার কোনো কিছুই বন্ধ রাখা হচ্ছে না। শুধু শিক্ষাপ্রতিষ্ঠানকে বন্ধ রাখার যৌক্তিকতা দেখি না। আমি মনে করি শিক্ষাপ্রতিষ্ঠান খুলে দেওয়া উচিত।</p><p>স্পিকার ড. শিরীন শারমিন চৌধুরীর সভাপতিত্বে অধিবেশনে তিনি বলেন, কোভিড-১৯ প্রাদুর্ভাবে গত মার্চ থেকে অদ্যবদি শিক্ষাপ্রতিষ্ঠানগুলো বন্ধ এবং অটো পাস সিস্টেম চালু করা হয়েছে। শিক্ষার মতো মৌলিক গুরুত্বপূর্ণ কার্যক্রম বন্ধ রাখার নামে দেশ ও জাতির ভবিষ্যৎ ব্যাহত করা হচ্ছে। এটা কখনোই মঙ্গলজনক নয়।</p><p>তিনি বলেন, পরীক্ষা কার্যক্রম বন্ধ রেখে সবাইকে অটো পাস দেওয়াতে মেধাবী ছাত্রদের প্রতি অবিচার করা হচ্ছে। কাজেই বিষয়টি বিবেচনা করা উচিত যে যারা অনুপস্থিত থাকতে চান তাদের সেই সুযোগ দেওয়া উচিত।</p><p>জিএম কাদের বলেন, যারা অটো পাস চান তাদের অটো পাসের সুযোগ দেওয়া উচিত। কিন্তু যারা ক্লাস করতে চান তাদের জন্য শিক্ষাপ্রতিষ্ঠান খুলে দেওয়া উচিত। যারা পরীক্ষা দিতে চান তাদের পরীক্ষার সুযোগ দেওয়া উচিত। এটাকে ম্যানেজ করা খুব কঠিন ব্যাপার নয়। শিক্ষা মন্ত্রণালয় একটু চেষ্টা করলে করতে পারে।</p><p>এছাড়া বিভিন্ন অনুষ্ঠানেও একাধিকার শিক্ষাপ্রতিষ্ঠান খুলে দেয়ার দাবি জানিয়েছেন গোলাম মোহাম্মদ কাদের। গত ১ নভেম্বর কাকরাইলে জাতীয় পার্টির কেন্দ্রীয় কার্যালয়ে জাতীয় যুব সংহতি আয়োজিত অনুষ্ঠানে কাদের বলেন, দেশের বর্তমান পরিস্থিতিতে স্কুল-কলেজ খুলে দেয়া উচিত।</p>', '17815179397k6aTdxN.jpg', NULL, NULL, NULL, NULL, NULL, 7, NULL, 0, NULL, 0, 1, 0, 'true', 0, NULL, '2026-06-15 10:05:39', '2026-06-15 04:05:39', 'চলমান করোনাভাইরাস পরিস্থিতির মধ্যে শিক্ষাপ্রতিষ্ঠান বন্ধ রেখে অটো পাস দেওয়ার সমালোচনা করেছেন সংসদের বিরোধী দলীয় উপনেতা জাতীয় পার্টির কো-চেয়ারম্যান গোলাম মোহাম্মদ কাদের। আজ বৃহস্পতিবার রাতে একাদশ জাতীয় সংসদের দশম অধিবেশনের সমাপনী ভাষণে বিরোধী দলীয় উপ নেতা তার বক্ত্যের যুক্তি তুলে ধরেন।গোলাম মোহাম্মদ কাদের বলেন, অফিস-আদালত, মিল-কারখানা, দোকানপাট, যানবাহন, হাটবাজার কোনো কিছুই বন্ধ রাখা হচ্ছে না। শুধু শিক্ষাপ্রতিষ্ঠানকে বন্ধ রাখার যৌক্তিকতা দেখি না। আমি মনে করি শিক্ষাপ্রতিষ্ঠান খুলে দেওয়া উচিত।স্পিকার ড. শিরীন শারমিন চৌধুরীর সভাপতিত্বে অধিবেশনে তিনি বলেন, কোভিড-১৯ প্রাদুর্ভাবে গত মার্চ থেকে অদ্যবদি শিক্ষাপ্রতিষ্ঠানগুলো বন্ধ এবং অটো পাস সিস্টেম চালু করা হয়েছে। শিক্ষার মতো মৌলিক গুরুত্বপূর্ণ কার্যক্রম বন্ধ রাখার নামে দেশ ও জাতির ভবিষ্যৎ ব', 'সংসদে অটো পাসের সমালোচনা'),
(62, 1, 'sdsdsds', 'sdsdsds', 'audio', 'dsdsdsds', 0, 0, 0, 0, 0, 0, 0, 'dsds', '1781422802USvdCTKb.jpg', NULL, NULL, NULL, NULL, '17813696580718.MP3', 2, 14, 0, NULL, 0, 1, 0, 'true', 0, NULL, '2026-06-14 07:40:02', '2026-06-14 01:40:02', 'dsdsd', 'dsdsd');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(191) DEFAULT NULL,
  `section` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `section`) VALUES
(1, 'Super Admin', '[\"menu_builder\",\"pages\",\"categories\",\"add_post\",\"add_gallery\",\"posts\",\"schedule_post\",\"drafts\",\"rss_feeds\",\"polls\",\"widgets\",\"create_ads\",\"newsLetter\",\"contact_messages\",\"languages\",\"general_settings\",\"social_settings\",\"seo_tools\",\"emails_settings\",\"role_management\",\"font_option\",\"user_management\",\"cache_management\",\"administration_management\"]'),
(4, 'user', '[\"add_post\",\"posts\",\"schedule_post\",\"drafts\"]'),
(5, 'Sub Admin', '[\"menu_builder\",\"pages\",\"categories\",\"add_post\",\"add_gallery\",\"posts\",\"schedule_post\",\"drafts\",\"rss_feeds\",\"polls\",\"widgets\",\"create_ads\",\"newsLetter\",\"contact_messages\",\"languages\",\"general_settings\",\"social_settings\",\"seo_tools\",\"emails_settings\",\"font_option\",\"user_management\",\"cache_management\"]'),
(6, 'author', '[\"add_post\",\"add_gallery\",\"posts\",\"schedule_post\",\"drafts\",\"cache_management\"]'),
(7, 'moderator', '[\"pages\",\"categories\",\"add_post\",\"add_gallery\",\"posts\",\"schedule_post\",\"drafts\",\"rss_feeds\",\"polls\",\"widgets\",\"create_ads\",\"newsLetter\",\"contact_messages\",\"languages\",\"general_settings\",\"social_settings\",\"seo_tools\",\"emails_settings\",\"font_option\",\"cache_management\"]');

-- --------------------------------------------------------

--
-- Table structure for table `rss_feeds`
--

CREATE TABLE `rss_feeds` (
  `id` int(11) NOT NULL,
  `language_id` int(11) NOT NULL,
  `feed_name` varchar(191) DEFAULT NULL,
  `feed_url` varchar(191) DEFAULT NULL,
  `post_limit` int(11) DEFAULT NULL,
  `category_id` int(11) NOT NULL,
  `auto_update` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `seotools`
--

CREATE TABLE `seotools` (
  `id` int(11) NOT NULL,
  `google_analytics` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_keys` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_description` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `seotools`
--

INSERT INTO `seotools` (`id`, `google_analytics`, `meta_keys`, `meta_description`) VALUES
(1, '<!-- Google tag (gtag.js) -->\r\n<script async src=\"https://www.googletagmanager.com/gtag/js?id=G-F758S21JWX\"></script>\r\n<script>\r\n  window.dataLayer = window.dataLayer || [];\r\n  function gtag(){dataLayer.push(arguments);}\r\n  gtag(\'js\', new Date());\r\n\r\n  gtag(\'config\', \'G-F758S21JWX\');\r\n</script>', 'The Daily Moon, Bangla news papaer theme,Laravel news papaer,laravel bangla newspaaper,laravel bangla news protal theme', 'This is a Lravel Bangla News Papaer Source code.');

-- --------------------------------------------------------

--
-- Table structure for table `short_lists`
--

CREATE TABLE `short_lists` (
  `id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `item_title` varchar(255) DEFAULT NULL,
  `item_photo` varchar(255) DEFAULT NULL,
  `item_description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `short_lists`
--

INSERT INTO `short_lists` (`id`, `post_id`, `item_title`, `item_photo`, `item_description`) VALUES
(5, 194, 'Class aptent taciti sociosqu ad litora torquent per conubia nostra', '1588399220tmOLewct.jpg', '<p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec rhoncus feugiat magna ut hendrerit. Mauris non consectetur nunc. Nam scelerisque ex a posuere porttitor. Morbi tincidunt eget odio nec pretium. Morbi aliquam, elit nec interdum commodo, metus neque tincidunt tellus, a hendrerit risus magna sit amet turpis.</p>\n<div id=\"gtx-trans\" style=\"position: absolute; left: 820px; top: -12px;\">\n<div class=\"gtx-trans-icon\"></div></div>'),
(6, 194, 'Vivamus sit amet turpis at nisl elementum pellentesque', '1588399222Y1S1NXTT.jpg', '<p>Integer non cursus ligula, et varius diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vestibulum auctor, tellus sit amet dapibus ultricies, lorem tortor efficitur enim, et gravida eros felis et lectus. Cras a condimentum felis. Sed congue mauris vel lectus scelerisque, id rutrum velit dictum. Nam sapien neque, interdum at mi quis, viverra pellentesque metus. Etiam in ante nunc.</p>\n<div id=\"gtx-trans\" style=\"position: absolute; left: 673px; top: 8px;\">\n<div class=\"gtx-trans-icon\"></div></div>'),
(7, 194, 'Quisque efficitur augue eget enim malesuada auctor', '1588399223xqQYMrBn.jpg', '<p>Cras hendrerit enim ut turpis commodo, eget porta massa ullamcorper. Maecenas quis maximus ipsum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed hendrerit magna ligula, nec malesuada lectus finibus vel. Praesent varius rutrum nunc, sit amet tincidunt dolor ultrices nec.</p>\n<div id=\"gtx-trans\" style=\"position: absolute; left: 629px; top: 33px;\">\n<div class=\"gtx-trans-icon\"></div></div>'),
(10, 255, 'German Shepherd Dogs can stand as high as 26 inches', '1591550393Q2NLPIRu.jpg', '<span style=\"color: rgb(34, 34, 35); font-family: Lato, Arial, sans-serif; font-size: small;\">German Shepherd Dogs can stand as high as 26 inches at the shoulder and, when viewed in outline, presents a picture of smooth, graceful curves rather than angles. The natural gait is a free-and-easy trot, but they can turn it up a notch or two and reach great speeds.</span><br>'),
(11, 255, 'The graceful, medium-sized Siberian Husky', '1591550394uN7rYki9.jpg', '<span style=\"color: rgb(34, 34, 35); font-family: Lato, Arial, sans-serif; background-color: rgb(255, 255, 255);\"><font size=\"2\">The graceful, medium-sized Siberian Husky’s almond-shaped eyes can be either brown or blue—and sometimes one of each—and convey a keen but amiable and even mischievous expression. Quick and nimble-footed, Siberians are known for their powerful but seemingly effortless gait. Tipping the scales at no more than 60 pounds, they are noticeably smaller and lighter than their burly cousin,</font></span><br>'),
(12, 256, 'xcv', '1591551708qW75IKmu.jpg', 'cxvx'),
(13, 257, 'The graceful, medium-sized Siberian Husky', '15915524243Duq53wW.jpg', 'Enter some text in the fields below, then press the \"Reset form\" button to reset the form.<br>'),
(14, 257, 'xcv', '15915524255ilvg4Rh.jpg', 'Enter some text in the fields below, then press the \"Reset form\" button to reset the form.<br>'),
(15, 258, 'The graceful, medium-sized Siberian Husky', '1591552592BmXwB3AH.jpg', 'Enter some text in the fields below, then press the \"Reset form\" button to reset the form.<br>'),
(16, 258, 'xcv', '1591552593hl5zxFGy.jpg', 'Enter some text in the fields below, then press the \"Reset form\" button to reset the form.<br>'),
(17, 259, 'The graceful, medium-sized Siberian Husky', '1591552897AgQ3Zdjx.jpg', 'Enter some text in the fields below, then press the \"Reset form\" button to reset the form.<br>'),
(18, 259, 'xcv', '1591552898tAcDIof4.jpg', 'Enter some text in the fields below, then press the \"Reset form\" button to reset the form.<br>'),
(19, 260, 'The graceful, medium-sized Siberian Husky', '1591594120cNPnlRpD.jpg', '<span style=\"color: rgb(26, 30, 37); font-family: -apple-system, &quot;Segoe UI&quot;, sans-serif; font-size: medium;\">This package can make a Laravel app tenant aware. The philosophy of this package is that it should only provide the bare essentials to enable multitenancy.</span><br>'),
(20, 261, NULL, NULL, '<br>'),
(21, 262, NULL, NULL, '<br>'),
(22, 264, 'The graceful, medium-sized Siberian Husky', '1591601362bJ0DWPQU.jpg', 'gjgh'),
(23, 263, 'The graceful, medium-sized Siberian Husky', '1591601362qgTvU4ea.jpg', 'gjgh'),
(24, 264, 'The graceful, medium-sized Siberian Husky', '1591601362ws3RJxxS.jpg', 'fghf'),
(25, 263, 'The graceful, medium-sized Siberian Husky', '1591601362appT3ApW.jpg', 'fghf'),
(26, 266, NULL, NULL, '<br>'),
(27, 265, NULL, NULL, '<br>'),
(28, 256, 'The graceful, medium-sized Siberian Husky', '1591764926cQXo4HYj.jpg', '<span style=\"color: rgb(57, 66, 78); font-family: &quot;Whitney SSm A&quot;, &quot;Whitney SSm B&quot;, Avenir, &quot;Segoe UI&quot;, Ubuntu, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; font-size: 16px;\">The creator of this contest is solely responsible for setting and communicating the eligibility requirements associated with prizes awarded to participants, as well as for procurement and distribution of all prizes. The contest creator holds HackerRank harmless from and against any and all claims, losses, damages, costs, awards, settlements, orders, or fines.</span><br>'),
(29, 262, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', '1601367099Uy5jC5Fw.jpg', '<span style=\"color: rgb(0, 0, 0); font-family: &quot;Open Sans&quot;, Arial, sans-serif; text-align: justify;\">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span><br>'),
(30, 262, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', '1601367099zel3FMID.jpg', '<span style=\"color: rgb(0, 0, 0); font-family: &quot;Open Sans&quot;, Arial, sans-serif; text-align: justify;\">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span><br>'),
(31, 262, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', '1601367100YMHm45lS.jpg', '<span style=\"color: rgb(0, 0, 0); font-family: &quot;Open Sans&quot;, Arial, sans-serif; text-align: justify;\">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span><br>'),
(33, 325, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', '1601960815uK2seoy8.jpg', 'fghfg'),
(39, 461, 'dfg', '1673782072m59Pf2aD.jpg', 'fghfhgf'),
(40, 461, 'test sort', '1673782072rtZCcruO.jpg', 'fghfgh'),
(41, 466, 'dfgdfg', '1673850848q5ZNCbDb.jpg', 'dfgdfg'),
(42, 466, 'dfgdfg', '16738508481hFqS2Jc.jpg', 'dfgdfgd');

-- --------------------------------------------------------

--
-- Table structure for table `sitemaps`
--

CREATE TABLE `sitemaps` (
  `id` int(11) NOT NULL,
  `sitemap_url` varchar(255) DEFAULT NULL,
  `filename` varchar(255) DEFAULT NULL,
  `auto_update` tinyint(4) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `socialsettings`
--

CREATE TABLE `socialsettings` (
  `id` int(11) NOT NULL,
  `fclient_id` varchar(100) DEFAULT NULL,
  `fclient_secret` varchar(100) DEFAULT NULL,
  `fredirect` varchar(100) DEFAULT NULL,
  `gclient_id` varchar(100) DEFAULT NULL,
  `gclient_secret` varchar(100) DEFAULT NULL,
  `gredirect` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `socialsettings`
--

INSERT INTO `socialsettings` (`id`, `fclient_id`, `fclient_secret`, `fredirect`, `gclient_id`, `gclient_secret`, `gredirect`) VALUES
(1, '560315224867834', 'ebcdaa2a847428152e8f254ea9f95bab', 'https://localhost/newspaper/auth/facebook/callback', '904681031719-sh1aolu42k7l93ik0bkiddcboghbpcfi.apps.googleusercontent.com', 'yGBWmUpPtn5yWhDAsXnswEX3', 'http://localhost/newspaper/auth/google/callback');

-- --------------------------------------------------------

--
-- Table structure for table `social_links`
--

CREATE TABLE `social_links` (
  `id` int(11) NOT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `link` varchar(100) DEFAULT NULL,
  `icon` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `social_links`
--

INSERT INTO `social_links` (`id`, `name`, `link`, `icon`) VALUES
(7, 'facebook', 'https://www.facebook.com/thedailymoonpage/', 'fa fa-facebook'),
(8, 'twitter', 'https://www.x.com/thedailymoonpage/', 'fa fa-twitter'),
(10, 'youtube', 'https://www.youtube.com/@thedailymoon9024', 'fa fa-youtube-play'),
(11, 'instagram', 'https://www.instagram.com/thedailymoon10', 'fa fa-instagram');

-- --------------------------------------------------------

--
-- Table structure for table `social_providers`
--

CREATE TABLE `social_providers` (
  `id` int(11) NOT NULL,
  `admin_id` int(11) NOT NULL,
  `provider_id` varchar(191) NOT NULL,
  `provider` varchar(191) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `subscribers`
--

CREATE TABLE `subscribers` (
  `id` int(11) NOT NULL,
  `email` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `subscribers`
--

INSERT INTO `subscribers` (`id`, `email`) VALUES
(16, 'mma.rifat66@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `trivia_answers`
--

CREATE TABLE `trivia_answers` (
  `id` int(11) NOT NULL,
  `trivia_question_id` int(11) NOT NULL,
  `answer_title` varchar(255) DEFAULT NULL,
  `correct_answer` tinyint(4) DEFAULT 0,
  `answer_photo` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `trivia_answers`
--

INSERT INTO `trivia_answers` (`id`, `trivia_question_id`, `answer_title`, `correct_answer`, `answer_photo`) VALUES
(372, 303, 'a', 0, '1602050454T7SgXAGq.jpg'),
(373, 303, NULL, 0, '1602050454ZRyO2mSt.jpg'),
(374, 304, 'a', 0, '16020504560VXzEAmG.jpg'),
(375, 304, NULL, 0, '1602050456nAFymf74.jpg'),
(376, 305, 'q', 0, NULL),
(377, 305, 'y', 0, NULL),
(378, 308, 'r', 0, NULL),
(379, 308, 't', 0, NULL),
(380, 309, 'a', 1, NULL),
(381, 309, 'b', 0, NULL),
(382, 310, 'a', 1, NULL),
(383, 310, 'b', 0, NULL),
(388, 313, 'a', 1, NULL),
(389, 313, 'b', 0, NULL),
(390, 314, 'a', 1, NULL),
(391, 314, 'b', 0, NULL),
(493, 351, 'sdfds', 1, '1673782497rG0Ym8Go.jpg'),
(494, 351, 'dsfsd', 0, '1673782498yOdIso6g.jpg'),
(495, 352, 'ghj', 0, '1673782498NOcUtd4d.jpg'),
(496, 352, 'ghjgh', 1, '1673782498503PKuET.jpg'),
(497, 353, 'gfhf', 1, '16738513485cq4JP5G.jpg'),
(498, 353, 'gfh', 0, '1673851349joBvGLxP.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `trivia_questions`
--

CREATE TABLE `trivia_questions` (
  `id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `question_title` varchar(255) DEFAULT NULL,
  `question_photo` varchar(255) DEFAULT NULL,
  `question_description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `trivia_questions`
--

INSERT INTO `trivia_questions` (`id`, `post_id`, `question_title`, `question_photo`, `question_description`) VALUES
(303, 334, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', '1602050453flJQswLe.jpg', '<br>'),
(304, 334, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', '1602050456a9Iq0UmF.jpg', '<br>'),
(305, 334, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', '1602050458cZMau9EY.jpg', '<br>'),
(306, 335, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', '1602051685Q0vCujHM.jpg', '<br>'),
(308, 354, 'gfgh', NULL, '<br>'),
(309, 355, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', '1602309736GigUSK0D.jpg', '<br>'),
(310, 356, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', '1602309771qFudLBgu.jpg', '<br>'),
(313, 379, 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium', '1602646325T7sZOtR9.jpg', '<br>'),
(314, 380, 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium', '1602646492swQzOIyN.jpg', '<br>'),
(351, 462, 'sfdsfsdf', '1673782497ugez65du.jpg', 'sdfdsf'),
(352, 462, 'sdfsdfs', '1673782498NNKLJHxM.jpg', 'sdfsd'),
(353, 467, 'dfgdfgdfg', '1673851348bw7Q7NxS.jpg', '<br>');

-- --------------------------------------------------------

--
-- Table structure for table `trivia_results`
--

CREATE TABLE `trivia_results` (
  `id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `result_title` varchar(255) DEFAULT NULL,
  `result_photo` varchar(255) DEFAULT NULL,
  `result_description` text DEFAULT NULL,
  `min` int(11) DEFAULT NULL,
  `max` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `trivia_results`
--

INSERT INTO `trivia_results` (`id`, `post_id`, `result_title`, `result_photo`, `result_description`, `min`, `max`) VALUES
(61, 334, 'You are confident', '1602050460bQf9x3Xa.jpg', '<span style=\"color: rgb(0, 0, 0); font-family: &quot;Open Sans&quot;, Arial, sans-serif; text-align: justify;\">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</span><br>', NULL, NULL),
(62, 334, 'You are dull', '1602050460foIdm8QP.jpg', '<span style=\"color: rgb(0, 0, 0); font-family: &quot;Open Sans&quot;, Arial, sans-serif; text-align: justify;\">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</span><br>', NULL, NULL),
(63, 354, 'v', NULL, '<br>', NULL, NULL),
(64, 355, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', '1602309736e7mOdk5c.jpg', '<br>', 0, 1),
(65, 356, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', '1602309771qbx9Ju6B.jpg', '<br>', 0, 1),
(85, 462, 'ghjghjg', '16737824989tvtx6Na.jpg', 'ghjghj', 0, 2),
(86, 467, 'gfhgfhf', '1673851349Qu2ifEJ9.jpg', 'gfhgf', 1, 3);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `photo` varchar(191) DEFAULT NULL,
  `zip` varchar(191) DEFAULT NULL,
  `city` varchar(191) DEFAULT NULL,
  `address` varchar(191) DEFAULT NULL,
  `phone` varchar(191) DEFAULT NULL,
  `role_id` int(11) NOT NULL DEFAULT 4,
  `fax` varchar(191) DEFAULT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(191) DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `is_provider` tinyint(10) NOT NULL DEFAULT 0,
  `status` tinyint(10) NOT NULL DEFAULT 0,
  `verification_link` text DEFAULT NULL,
  `email_verified` enum('Yes','No') NOT NULL DEFAULT 'No',
  `affilate_code` text DEFAULT NULL,
  `referral_id` tinyint(1) NOT NULL DEFAULT 0,
  `verified` tinyint(4) NOT NULL DEFAULT 0,
  `details` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `designation` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `username`, `photo`, `zip`, `city`, `address`, `phone`, `role_id`, `fax`, `email`, `password`, `remember_token`, `is_provider`, `status`, `verification_link`, `email_verified`, `affilate_code`, `referral_id`, `verified`, `details`, `created_at`, `updated_at`, `designation`) VALUES
(109, 'মোঃ নজরুল ইসলাম', NULL, '1737546550Blank-Image-1.png', NULL, NULL, NULL, '01984913112', 5, NULL, 'nazrul@creativedesign.com.bd', '$2y$10$I7HjWzyAPJozo/NOHz58nuMi4U1qWoehyj12sbvK64xvMMUI4wQkW', NULL, 0, 0, NULL, 'Yes', NULL, 0, 1, NULL, '2025-01-19 22:58:23', '2026-06-09 14:02:20', 'সম্পাদক ও প্রকাশক'),
(110, 'মোঃ নাইম হোসেন', NULL, '1737546604Blank-Image-1.png', NULL, NULL, NULL, '01775457008', 6, NULL, 'nayeem@creativedesign.com.bd', '$2y$10$I7HjWzyAPJozo/NOHz58nuMi4U1qWoehyj12sbvK64xvMMUI4wQkW', NULL, 0, 0, NULL, 'Yes', NULL, 0, 1, NULL, '2025-01-19 22:59:28', '2026-06-09 14:02:34', 'বার্তা সম্পাদক'),
(111, 'মোঃ জুবায়ের ইসলাম', NULL, '1737546661Blank-Image-1.png', NULL, NULL, NULL, '01954578089', 7, NULL, 'jubayer@creativedesign.com.bd', '$2y$10$I7HjWzyAPJozo/NOHz58nuMi4U1qWoehyj12sbvK64xvMMUI4wQkW', NULL, 0, 0, NULL, 'Yes', NULL, 0, 1, NULL, '2025-01-19 23:00:47', '2026-06-09 14:06:03', 'নির্বাহী এডিটর'),
(112, 'মোঃ কাদের মোল্লা', NULL, '1737546753Blank-Image-1.png', NULL, NULL, NULL, '01984913112', 6, NULL, 'kader@gmail.com', '$2y$10$I7HjWzyAPJozo/NOHz58nuMi4U1qWoehyj12sbvK64xvMMUI4wQkW', NULL, 0, 0, NULL, 'Yes', NULL, 0, 1, NULL, '2025-01-19 23:02:04', '2026-06-09 14:06:21', 'নির্বাহী সম্পাদক'),
(113, 'মোঃ খালেদ ইসলাম', NULL, '1737546833Blank-Image-1.png', NULL, NULL, NULL, '+8801617942014', 7, NULL, 'khaled@gmail.com', '$2y$10$I7HjWzyAPJozo/NOHz58nuMi4U1qWoehyj12sbvK64xvMMUI4wQkW', NULL, 0, 0, NULL, 'Yes', NULL, 0, 1, NULL, '2025-01-19 23:03:42', '2026-06-09 14:06:12', 'সিনিয়র রিপোর্টার'),
(114, 'মোঃ শামিম হোসেন', NULL, '1737546896Blank-Image-1.png', NULL, NULL, NULL, '01998470369', 7, NULL, 'shamim@gmail.com', '$2y$10$I7HjWzyAPJozo/NOHz58nuMi4U1qWoehyj12sbvK64xvMMUI4wQkW', NULL, 0, 0, NULL, 'Yes', NULL, 0, 1, NULL, '2025-01-19 23:04:55', '2026-06-09 14:06:32', 'রংপুর প্রতিনিধি'),
(115, 'মোঃ রাকিবুল ইসলাম', NULL, '1737546968Blank-Image-1.png', NULL, NULL, NULL, '01998470369', 7, NULL, 'rakibul@gmail.com', '$2y$10$I7HjWzyAPJozo/NOHz58nuMi4U1qWoehyj12sbvK64xvMMUI4wQkW', NULL, 0, 0, NULL, 'Yes', NULL, 0, 1, NULL, '2025-01-19 23:06:12', '2026-06-09 14:06:44', 'ভোলা প্রতিনিধি'),
(116, 'মোঃ রাসেল মিয়া', NULL, '1737547012Blank-Image-1.png', NULL, NULL, NULL, '01998470369', 7, NULL, 'rasel@gmail.com', '$2y$10$I7HjWzyAPJozo/NOHz58nuMi4U1qWoehyj12sbvK64xvMMUI4wQkW', NULL, 0, 0, NULL, 'Yes', NULL, 0, 1, NULL, '2025-01-19 23:07:16', '2026-06-09 14:06:57', 'খুলনা জেলা প্রতিনিধি'),
(118, 'Sazid Habib', NULL, NULL, NULL, NULL, NULL, '01723774768', 5, NULL, 'sazid@admin.com', '$2y$10$I7HjWzyAPJozo/NOHz58nuMi4U1qWoehyj12sbvK64xvMMUI4wQkW', NULL, 0, 0, NULL, 'Yes', NULL, 0, 1, NULL, '2026-06-09 13:56:55', '2026-06-09 14:00:40', 'নির্বাহী সম্পাদক'),
(119, 'Reza', NULL, NULL, NULL, NULL, NULL, '01830996044', 5, NULL, 'reza@gmail.com', '$2y$10$I7HjWzyAPJozo/NOHz58nuMi4U1qWoehyj12sbvK64xvMMUI4wQkW', NULL, 0, 0, NULL, 'Yes', NULL, 0, 1, NULL, '2026-06-09 14:07:59', '2026-06-09 14:09:52', 'নির্বাহী এডিটর'),
(120, 'Arko', NULL, NULL, NULL, NULL, NULL, '+8801714787250', 6, NULL, 'arko@gmail.com', '$2y$10$YpHkHEZc5Fyysa2JYDwEuuj0Ka61imKzy0HJT.db8llp/HsAjoizG', NULL, 0, 0, NULL, 'Yes', NULL, 0, 1, NULL, '2026-06-09 14:10:43', '2026-06-09 14:10:43', 'এডিটর');

-- --------------------------------------------------------

--
-- Table structure for table `views`
--

CREATE TABLE `views` (
  `id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `ip_address` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `views`
--

INSERT INTO `views` (`id`, `post_id`, `ip_address`) VALUES
(3, 47, '::1'),
(12, 51, '::1'),
(14, 46, '::1'),
(17, 52, '::1'),
(20, 49, '::1'),
(21, 95, '::1'),
(22, 96, '::1'),
(24, 102, '::1'),
(25, 106, '::1'),
(30, 48, '::1'),
(33, 116, '::1'),
(34, 125, '::1'),
(35, 124, '::1'),
(36, 131, '::1'),
(38, 141, '::1'),
(39, 142, '::1'),
(40, 114, '::1'),
(41, 113, '::1'),
(43, 140, '::1'),
(49, 119, '::1'),
(50, 152, '::1'),
(51, 120, '::1'),
(53, 136, '::1'),
(54, 153, '::1'),
(55, 117, '::1'),
(56, 139, '::1'),
(58, 123, '::1'),
(59, 134, '::1'),
(60, 135, '::1'),
(61, 132, '::1'),
(62, 118, '::1'),
(63, 129, '::1'),
(64, 121, '::1'),
(65, 162, '::1'),
(66, 137, '::1'),
(67, 164, '::1'),
(68, 163, '::1'),
(70, 47, '::2'),
(71, 47, '::3'),
(72, 47, '::4'),
(73, 51, '::2'),
(74, 51, '::3'),
(75, 122, '::1'),
(76, 126, '::1'),
(77, 130, '::1'),
(78, 161, '::1'),
(79, 94, '::1'),
(80, 105, '::1'),
(84, 99, '::1'),
(85, 76, '::1'),
(87, 194, '::1'),
(89, 103, '::1'),
(90, 133, '::1'),
(91, 104, '::1'),
(92, 214, '::1'),
(93, 215, '::1'),
(110, 255, '::1'),
(127, 319, '::1'),
(129, 317, '::1'),
(130, 256, '::1'),
(131, 218, '::1'),
(132, 221, '::1'),
(135, 338, '::1'),
(137, 378, '::1'),
(141, 142, '103.54.150.47'),
(142, 142, '169.61.190.27'),
(143, 392, '103.54.150.47'),
(144, 51, '103.54.150.47'),
(145, 51, '169.60.29.183'),
(146, 393, '103.54.150.47'),
(147, 394, '103.54.150.47'),
(148, 125, '103.127.4.242'),
(149, 392, '180.210.220.103'),
(150, 47, '180.210.220.103'),
(165, 120, '103.197.205.8'),
(166, 120, '169.61.133.87'),
(289, 377, '::1'),
(294, 461, '::1'),
(295, 467, '::1'),
(296, 466, '::1'),
(298, 470, '::1'),
(299, 477, '::1'),
(300, 482, '::1'),
(301, 489, '::1'),
(302, 494, '::1'),
(303, 475, '::1'),
(304, 522, '::1'),
(305, 523, '::1'),
(306, 491, '::1'),
(307, 502, '::1'),
(308, 481, '::1'),
(309, 476, '::1'),
(310, 485, '::1'),
(311, 521, '::1'),
(312, 492, '::1'),
(313, 509, '::1'),
(314, 513, '::1'),
(315, 499, '::1'),
(316, 495, '::1'),
(317, 519, '::1'),
(318, 516, '::1'),
(319, 524, '::1'),
(320, 519, '103.131.145.159'),
(321, 519, '66.220.149.11'),
(322, 524, '103.131.145.159'),
(323, 524, '66.220.149.26'),
(324, 524, '69.63.189.8'),
(325, 524, '173.252.83.27'),
(326, 521, '103.131.145.159'),
(327, 521, '173.252.83.10'),
(328, 524, '173.252.83.12'),
(329, 474, '::1'),
(330, 526, '::1'),
(331, 526, '103.131.145.159'),
(332, 513, '103.131.145.159'),
(333, 509, '103.131.145.159'),
(334, 526, '173.252.83.125'),
(335, 511, '194.163.135.155'),
(336, 518, '194.163.135.155'),
(337, 511, '65.108.128.54'),
(338, 518, '65.108.128.54'),
(339, 495, '65.108.128.54'),
(340, 495, '188.165.212.137'),
(341, 518, '188.165.212.137'),
(342, 522, '3.133.140.47'),
(343, 481, '52.15.50.169'),
(344, 473, '18.191.192.229'),
(345, 507, '3.21.134.124'),
(346, 525, '18.190.160.135'),
(347, 497, '18.190.160.135'),
(348, 526, '3.131.37.220'),
(349, 526, '3.131.37.220'),
(350, 513, '3.22.241.222'),
(351, 507, '3.144.218.107'),
(352, 512, '18.227.134.162'),
(353, 506, '18.227.134.162'),
(354, 503, '3.134.108.150'),
(355, 521, '18.221.158.246'),
(356, 523, '3.142.135.243'),
(357, 483, '3.143.217.112'),
(358, 480, '18.223.117.234'),
(359, 515, '3.17.157.7'),
(360, 519, '3.15.182.126'),
(361, 506, '3.128.201.254'),
(362, 516, '18.188.125.151'),
(363, 511, '18.219.237.93'),
(364, 504, '18.223.172.137'),
(365, 509, '3.128.28.117'),
(366, 490, '18.118.255.51'),
(367, 515, '18.118.255.51'),
(368, 502, '18.217.108.107'),
(369, 475, '3.147.65.42'),
(370, 524, '3.143.143.99'),
(371, 519, '13.59.219.166'),
(372, 471, '18.118.198.47'),
(373, 479, '18.217.80.37'),
(374, 470, '18.189.171.137'),
(375, 522, '18.221.84.179'),
(376, 477, '18.223.119.139'),
(377, 516, '3.138.126.79'),
(378, 508, '3.139.86.170'),
(379, 474, '18.191.103.151'),
(380, 520, '3.144.1.94'),
(381, 510, '18.217.97.131'),
(382, 501, '3.19.209.203'),
(383, 503, '3.19.209.203'),
(384, 504, '3.135.214.184'),
(385, 508, '18.223.172.110'),
(386, 518, '18.117.142.64'),
(387, 513, '3.133.118.82'),
(388, 509, '3.137.167.53'),
(389, 505, '3.137.167.53'),
(390, 478, '3.144.6.254'),
(391, 523, '3.140.188.75'),
(392, 511, '18.188.186.61'),
(393, 524, '3.135.187.121'),
(394, 496, '3.144.232.21'),
(395, 499, '3.145.89.175'),
(396, 517, '3.21.104.171'),
(397, 500, '18.191.31.223'),
(398, 514, '3.133.123.217'),
(399, 517, '18.218.213.199'),
(400, 505, '3.147.43.16'),
(401, 525, '18.218.13.221'),
(402, 514, '3.17.154.248'),
(403, 502, '18.191.238.22'),
(404, 472, '18.116.163.144'),
(405, 481, '3.19.55.47'),
(406, 483, '3.135.220.255'),
(407, 484, '3.16.36.89'),
(408, 487, '18.219.152.33'),
(409, 520, '3.15.236.219'),
(410, 493, '3.147.57.201'),
(411, 487, '18.218.149.167'),
(412, 485, '18.225.255.200'),
(413, 494, '3.145.100.218'),
(414, 511, '52.15.201.192'),
(415, 525, '18.116.36.70'),
(416, 488, '18.118.205.21'),
(417, 526, '18.117.186.131'),
(418, 486, '18.117.100.196'),
(419, 518, '18.118.55.243'),
(420, 504, '18.118.162.155'),
(421, 495, '18.118.139.79'),
(422, 486, '52.14.196.242'),
(423, 521, '18.191.22.207'),
(424, 489, '18.221.63.103'),
(425, 488, '18.222.181.72'),
(426, 492, '3.144.250.173'),
(427, 521, '3.133.90.194'),
(428, 522, '13.59.89.140'),
(429, 473, '18.220.57.185'),
(430, 476, '3.133.129.119'),
(431, 497, '18.118.186.62'),
(432, 491, '3.145.67.141'),
(433, 505, '18.217.47.171'),
(434, 500, '18.189.171.188'),
(435, 480, '3.15.206.81'),
(436, 479, '3.135.215.245'),
(437, 477, '3.141.6.23'),
(438, 512, '18.223.124.141'),
(439, 509, '3.15.197.189'),
(440, 491, '18.218.6.155'),
(441, 478, '3.17.165.204'),
(442, 495, '3.143.235.90'),
(443, 501, '3.145.115.172'),
(444, 516, '18.216.172.133'),
(445, 473, '3.141.32.186'),
(446, 503, '18.188.130.119'),
(447, 477, '18.223.156.172'),
(448, 500, '18.191.103.151'),
(449, 471, '18.217.216.192'),
(450, 515, '3.137.199.190'),
(451, 474, '18.191.155.227'),
(452, 514, '18.119.253.53'),
(453, 492, '18.221.139.125'),
(454, 520, '3.147.127.30'),
(455, 490, '18.117.11.25'),
(456, 478, '18.219.10.41'),
(457, 471, '18.118.10.213'),
(458, 499, '18.191.134.241'),
(459, 479, '52.14.183.78'),
(460, 513, '3.145.71.171'),
(461, 475, '18.189.171.188'),
(462, 470, '3.145.45.174'),
(463, 481, '3.143.17.11'),
(464, 517, '18.218.238.244'),
(465, 483, '3.135.186.255'),
(466, 496, '18.222.23.94'),
(467, 470, '18.191.205.229'),
(468, 493, '3.16.213.208'),
(469, 475, '3.145.90.244'),
(470, 482, '3.137.170.50'),
(471, 480, '18.224.139.33'),
(472, 497, '3.139.72.250'),
(473, 508, '3.128.201.196'),
(474, 507, '3.15.145.175'),
(475, 494, '3.144.179.230'),
(476, 496, '18.191.41.156'),
(477, 472, '18.118.163.233'),
(478, 510, '3.144.117.125'),
(479, 498, '18.227.79.126'),
(480, 490, '3.148.107.37'),
(481, 499, '52.14.31.251'),
(482, 506, '18.117.151.0'),
(483, 502, '18.191.174.5'),
(484, 524, '18.118.161.96'),
(485, 518, '18.117.184.57'),
(486, 519, '3.138.181.225'),
(487, 501, '18.118.31.118'),
(488, 523, '13.58.37.241'),
(489, 476, '18.222.181.72'),
(490, 487, '18.216.176.25'),
(491, 485, '18.222.102.248'),
(492, 483, '3.149.231.40'),
(493, 472, '18.220.121.42'),
(494, 484, '18.118.19.129'),
(495, 501, '18.117.186.131'),
(496, 505, '3.17.162.17'),
(497, 522, '3.144.152.153'),
(498, 486, '18.118.0.48'),
(499, 491, '3.142.135.53'),
(500, 500, '18.221.139.125'),
(501, 488, '3.144.93.10'),
(502, 494, '18.191.70.28'),
(503, 489, '3.141.197.248'),
(504, 493, '3.139.85.59'),
(505, 481, '18.217.166.156'),
(506, 492, '3.145.90.244'),
(507, 485, '18.188.125.151'),
(508, 497, '18.117.70.127'),
(509, 521, '18.220.147.78'),
(510, 484, '18.118.0.175'),
(511, 504, '18.189.29.43'),
(512, 476, '3.141.193.54'),
(513, 511, '18.225.209.24'),
(514, 526, '18.216.142.94'),
(515, 525, '3.145.103.54'),
(516, 495, '3.145.179.209'),
(517, 507, '3.17.162.17'),
(518, 503, '18.220.206.218'),
(519, 471, '3.137.169.102'),
(520, 520, '3.147.83.139'),
(521, 473, '3.138.37.123'),
(522, 512, '3.133.81.218'),
(523, 482, '18.220.206.218'),
(524, 519, '18.224.30.9'),
(525, 502, '18.223.100.219'),
(526, 474, '18.119.253.53'),
(527, 479, '18.191.15.173'),
(528, 490, '18.220.140.29'),
(529, 517, '3.128.79.193'),
(530, 477, '18.191.75.242'),
(531, 515, '3.133.149.44'),
(532, 499, '18.222.107.103'),
(533, 487, '3.138.138.87'),
(534, 506, '3.137.166.5'),
(535, 518, '18.220.89.112'),
(536, 498, '18.117.186.178'),
(537, 470, '18.117.135.132'),
(538, 523, '18.116.163.144'),
(539, 480, '18.119.125.91'),
(540, 513, '3.145.102.112'),
(541, 516, '3.147.103.204'),
(542, 514, '3.14.245.203'),
(543, 496, '3.133.129.119'),
(544, 509, '3.137.180.245'),
(545, 478, '18.226.88.63'),
(546, 510, '3.141.197.248'),
(547, 475, '3.144.24.113'),
(548, 508, '18.118.120.15'),
(549, 472, '3.15.148.189'),
(550, 485, '3.147.140.101'),
(551, 484, '3.128.94.125'),
(552, 495, '3.129.39.54'),
(553, 488, '3.144.6.254'),
(554, 494, '3.147.52.238'),
(555, 486, '13.59.35.247'),
(556, 489, '3.133.130.72'),
(557, 493, '3.17.154.248'),
(558, 492, '3.144.5.221'),
(559, 482, '3.143.239.215'),
(560, 476, '18.216.16.44'),
(561, 498, '3.147.85.243'),
(562, 470, '65.21.113.206'),
(563, 471, '65.21.113.206'),
(564, 473, '65.21.113.206'),
(565, 474, '65.21.113.206'),
(566, 475, '65.21.113.206'),
(567, 477, '65.21.113.206'),
(568, 478, '65.21.113.206'),
(569, 479, '65.21.113.206'),
(570, 480, '65.21.113.206'),
(571, 481, '65.21.113.206'),
(572, 482, '65.21.113.206'),
(573, 483, '65.21.113.206'),
(574, 490, '65.21.113.206'),
(575, 496, '65.21.113.206'),
(576, 497, '65.21.113.206'),
(577, 499, '65.21.113.206'),
(578, 501, '65.21.113.206'),
(579, 502, '65.21.113.206'),
(580, 503, '65.21.113.206'),
(581, 504, '65.21.113.206'),
(582, 505, '65.21.113.206'),
(583, 506, '65.21.113.206'),
(584, 507, '65.21.113.206'),
(585, 508, '65.21.113.206'),
(586, 509, '65.21.113.206'),
(587, 510, '65.21.113.206'),
(588, 511, '65.21.113.206'),
(589, 512, '65.21.113.206'),
(590, 513, '65.21.113.206'),
(591, 514, '65.21.113.206'),
(592, 515, '65.21.113.206'),
(593, 516, '65.21.113.206'),
(594, 517, '65.21.113.206'),
(595, 519, '65.21.113.206'),
(596, 522, '65.21.113.206'),
(597, 523, '65.21.113.206'),
(598, 524, '65.21.113.206'),
(599, 525, '65.21.113.206'),
(600, 526, '65.21.113.206'),
(601, 520, '65.21.113.206'),
(602, 521, '65.21.113.206'),
(603, 518, '65.21.113.206'),
(604, 472, '65.21.113.206'),
(605, 476, '65.21.113.206'),
(606, 484, '65.21.113.206'),
(607, 485, '65.21.113.206'),
(608, 486, '65.21.113.206'),
(609, 487, '65.21.113.206'),
(610, 488, '65.21.113.206'),
(611, 489, '65.21.113.206'),
(612, 491, '65.21.113.206'),
(613, 492, '65.21.113.206'),
(614, 493, '65.21.113.206'),
(615, 494, '65.21.113.206'),
(616, 495, '65.21.113.206'),
(617, 498, '65.21.113.206'),
(618, 500, '65.21.113.206'),
(619, 511, '54.38.85.37'),
(620, 495, '54.38.85.37'),
(621, 518, '54.38.85.37'),
(622, 495, '37.187.73.123'),
(623, 518, '37.187.73.123'),
(624, 526, '103.143.0.45'),
(625, 526, '69.63.189.14'),
(626, 498, '103.143.0.45'),
(627, 495, '103.143.0.45'),
(628, 498, '69.63.189.113'),
(629, 495, '69.63.189.1'),
(630, 495, '217.182.175.120'),
(631, 518, '217.182.175.120'),
(632, 521, '103.60.175.28'),
(633, 524, '103.60.175.28'),
(634, 526, '103.60.175.28'),
(635, 497, '103.60.175.28'),
(636, 470, '103.60.175.28'),
(637, 505, '103.60.175.28'),
(638, 513, '103.60.175.28'),
(639, 482, '103.60.175.28'),
(640, 514, '103.60.175.28'),
(641, 502, '103.60.175.28'),
(642, 476, '103.60.175.28'),
(643, 518, '103.60.175.28'),
(644, 520, '103.60.175.28'),
(645, 509, '103.60.175.28'),
(646, 525, '127.0.0.1'),
(647, 480, '127.0.0.1'),
(652, 475, '127.0.0.1'),
(653, 491, '127.0.0.1'),
(654, 532, '127.0.0.1'),
(655, 526, '127.0.0.1'),
(656, 477, '127.0.0.1'),
(657, 4001, '127.0.0.1'),
(658, 30, '127.0.0.1'),
(659, 59, '127.0.0.1'),
(660, 28, '127.0.0.1'),
(661, 50, '127.0.0.1'),
(662, 61, '127.0.0.1'),
(663, 9, '127.0.0.1'),
(664, 55, '127.0.0.1'),
(665, 16, '127.0.0.1'),
(666, 52, '127.0.0.1');

-- --------------------------------------------------------

--
-- Table structure for table `widgets`
--

CREATE TABLE `widgets` (
  `id` int(11) NOT NULL,
  `language_id` int(11) NOT NULL,
  `title` varchar(191) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `widgets`
--

INSERT INTO `widgets` (`id`, `language_id`, `title`, `description`, `status`) VALUES
(10, 1, 'Death of George Floyd', '<span style=\"color: rgb(77, 81, 86); font-family: arial, sans-serif;\">On May 25, 2020, George Perry Floyd, a black man, was killed in the Powderhorn community of Minneapolis, Minnesota, United States</span><br>', 1),
(12, 1, 'Coronavirus: Bangladesh', 'Deaths:6092', 1);

-- --------------------------------------------------------

--
-- Table structure for table `widget_settings`
--

CREATE TABLE `widget_settings` (
  `id` int(11) NOT NULL,
  `feature_inhome` tinyint(4) NOT NULL DEFAULT 0,
  `category_inhome` tinyint(4) NOT NULL DEFAULT 0,
  `follow_inhome` tinyint(4) NOT NULL DEFAULT 0,
  `tag_inhome` tinyint(4) NOT NULL DEFAULT 0,
  `poll_inhome` tinyint(4) NOT NULL DEFAULT 0,
  `calendar_inhome` tinyint(4) NOT NULL DEFAULT 0,
  `newsletter_inhome` tinyint(4) NOT NULL DEFAULT 0,
  `category_incategory` tinyint(4) NOT NULL DEFAULT 0,
  `newsletter_incategory` tinyint(4) NOT NULL DEFAULT 0,
  `calendar_incategory` tinyint(4) NOT NULL DEFAULT 0,
  `category_indetails` tinyint(4) NOT NULL DEFAULT 0,
  `newsletter_indetails` tinyint(4) NOT NULL DEFAULT 0,
  `calendar_indetails` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `widget_settings`
--

INSERT INTO `widget_settings` (`id`, `feature_inhome`, `category_inhome`, `follow_inhome`, `tag_inhome`, `poll_inhome`, `calendar_inhome`, `newsletter_inhome`, `category_incategory`, `newsletter_incategory`, `calendar_incategory`, `category_indetails`, `newsletter_indetails`, `calendar_indetails`) VALUES
(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `admin_languages`
--
ALTER TABLE `admin_languages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `advertisements`
--
ALTER TABLE `advertisements`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `follows`
--
ALTER TABLE `follows`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `fonts`
--
ALTER TABLE `fonts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `galleries`
--
ALTER TABLE `galleries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `generalsettings`
--
ALTER TABLE `generalsettings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `image_albums`
--
ALTER TABLE `image_albums`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `image_categories`
--
ALTER TABLE `image_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `image_galleries`
--
ALTER TABLE `image_galleries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `languages`
--
ALTER TABLE `languages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `logos`
--
ALTER TABLE `logos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pages`
--
ALTER TABLE `pages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `personality_answers`
--
ALTER TABLE `personality_answers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `personality_questions`
--
ALTER TABLE `personality_questions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `personality_results`
--
ALTER TABLE `personality_results`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `poll_answers`
--
ALTER TABLE `poll_answers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `poll_questions`
--
ALTER TABLE `poll_questions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `poll_results`
--
ALTER TABLE `poll_results`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `title` (`title`),
  ADD KEY `title_2` (`title`),
  ADD KEY `title_3` (`title`);
ALTER TABLE `posts` ADD FULLTEXT KEY `title_4` (`title`);
ALTER TABLE `posts` ADD FULLTEXT KEY `description` (`description`);
ALTER TABLE `posts` ADD FULLTEXT KEY `description_2` (`description`);
ALTER TABLE `posts` ADD FULLTEXT KEY `slug` (`slug`);
ALTER TABLE `posts` ADD FULLTEXT KEY `slug_2` (`slug`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rss_feeds`
--
ALTER TABLE `rss_feeds`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `seotools`
--
ALTER TABLE `seotools`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `short_lists`
--
ALTER TABLE `short_lists`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sitemaps`
--
ALTER TABLE `sitemaps`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `socialsettings`
--
ALTER TABLE `socialsettings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `social_links`
--
ALTER TABLE `social_links`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `social_providers`
--
ALTER TABLE `social_providers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subscribers`
--
ALTER TABLE `subscribers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `trivia_answers`
--
ALTER TABLE `trivia_answers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `trivia_questions`
--
ALTER TABLE `trivia_questions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `trivia_results`
--
ALTER TABLE `trivia_results`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `views`
--
ALTER TABLE `views`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `widgets`
--
ALTER TABLE `widgets`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `widget_settings`
--
ALTER TABLE `widget_settings`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `admin_languages`
--
ALTER TABLE `admin_languages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `advertisements`
--
ALTER TABLE `advertisements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;

--
-- AUTO_INCREMENT for table `follows`
--
ALTER TABLE `follows`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `fonts`
--
ALTER TABLE `fonts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `galleries`
--
ALTER TABLE `galleries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;

--
-- AUTO_INCREMENT for table `generalsettings`
--
ALTER TABLE `generalsettings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `image_albums`
--
ALTER TABLE `image_albums`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `image_categories`
--
ALTER TABLE `image_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `image_galleries`
--
ALTER TABLE `image_galleries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `languages`
--
ALTER TABLE `languages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `logos`
--
ALTER TABLE `logos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `pages`
--
ALTER TABLE `pages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `personality_answers`
--
ALTER TABLE `personality_answers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=190;

--
-- AUTO_INCREMENT for table `personality_questions`
--
ALTER TABLE `personality_questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;

--
-- AUTO_INCREMENT for table `personality_results`
--
ALTER TABLE `personality_results`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT for table `poll_answers`
--
ALTER TABLE `poll_answers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=103;

--
-- AUTO_INCREMENT for table `poll_questions`
--
ALTER TABLE `poll_questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `poll_results`
--
ALTER TABLE `poll_results`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4003;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `rss_feeds`
--
ALTER TABLE `rss_feeds`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `seotools`
--
ALTER TABLE `seotools`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `short_lists`
--
ALTER TABLE `short_lists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `sitemaps`
--
ALTER TABLE `sitemaps`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `socialsettings`
--
ALTER TABLE `socialsettings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `social_links`
--
ALTER TABLE `social_links`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `social_providers`
--
ALTER TABLE `social_providers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `subscribers`
--
ALTER TABLE `subscribers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `trivia_answers`
--
ALTER TABLE `trivia_answers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=499;

--
-- AUTO_INCREMENT for table `trivia_questions`
--
ALTER TABLE `trivia_questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=354;

--
-- AUTO_INCREMENT for table `trivia_results`
--
ALTER TABLE `trivia_results`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=121;

--
-- AUTO_INCREMENT for table `views`
--
ALTER TABLE `views`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=667;

--
-- AUTO_INCREMENT for table `widgets`
--
ALTER TABLE `widgets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `widget_settings`
--
ALTER TABLE `widget_settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
