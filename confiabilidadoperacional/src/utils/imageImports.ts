// Import all images from assets folder
import img1 from "../assets/209230-e1762537368610.jpeg";
import img2 from "../assets/256219.jpeg";
import img3 from "../assets/929382.jpeg";
import img4 from "../assets/2880871.jpeg";
import img5 from "../assets/15893881-e1761699164195.jpeg";
import img6 from "../assets/27404517-e1761698942755.jpeg";
import img7 from "../assets/icolttjygaa-1.jpg.jpeg";
import img8 from "../assets/reliable_icon.png";
import img9 from "../assets/wrx2tdzzgdw.jpg.jpeg";

// Import home images
import homeImg1 from "../assets/home/photo-1568872244907-f281d3b3544e.jfif";
import homeImg2 from "../assets/home/photo-1573166364710-411396f726c5.jfif";
import homeImg3 from "../assets/home/photo-1590402494610-2c378a9114c6.jfif";
import homeImg4 from "../assets/home/photo-1620886423846-d6d6a047c7b4.jfif";
import homeImg5 from "../assets/home/photo-1672552226380-486fe900b322.jfif";
import homeImg6 from "../assets/home/photo-1675270714610-11a5cadcc7b3.jfif";
import homeImg7 from "../assets/home/photo-1681949215173-fe0d15c790c1.jfif";
import homeImg8 from "../assets/home/photo-1696862350889-56a73ea0598f.jfif";

// Import resources images
import resImg1 from "../assets/resources/photo-1521051426148-4946df2795d4.jfif";
import resImg2 from "../assets/resources/photo-1573166826272-5acd0ef8f650.jfif";
import resImg3 from "../assets/resources/photo-1621273974441-4d7193d7bee1.jfif";
import resImg4 from "../assets/resources/photo-1628719187438-09a104d3cb2c.jfif";
import resImg5 from "../assets/resources/photo-1672552226380-486fe900b322.jfif";
import resImg6 from "../assets/resources/photo-1675270714610-11a5cadcc7b3.jfif";
import resImg7 from "../assets/resources/photo-1687292291646-9bf8a20f99df.jfif";
import resImg8 from "../assets/resources/photo-1692914274476-0e6920cc80cf.jfif";

// Article ID to image mapping
export const articleImages: Record<number, string> = {
  327: img1, // odvodywkxgk-e1761709472757.jpg.jpeg -> 209230-e1762537368610.jpeg
  326: img2, // 10396416.jpeg -> 256219.jpeg
  325: img3, // 257700.jpeg -> 929382.jpeg
  324: img4, // 13247379-e1761698059778.jpeg -> 2880871.jpeg
  323: img5, // lmb98ootoyu.jpg.jpeg -> 15893881-e1761699164195.jpeg
  322: img6, // 3760790.jpeg -> 27404517-e1761698942755.jpeg
  320: img7, // qiuwauflevg.jpg.jpeg -> icolttjygaa-1.jpg.jpeg
  319: img9, // Using img9 for 319 -> wrx2tdzzgdw.jpg.jpeg
};

// All available images for carousels
export const allImages = [
  { src: img1, alt: "Industrial operations image 1" },
  { src: img2, alt: "Industrial operations image 2" },
  { src: img3, alt: "Industrial operations image 3" },
  { src: img4, alt: "Industrial operations image 4" },
  { src: img5, alt: "Industrial operations image 5" },
  { src: img6, alt: "Industrial operations image 6" },
  { src: img7, alt: "Industrial operations image 7" },
  { src: img8, alt: "Reliable icon" },
  { src: img9, alt: "Industrial operations image 8" },
];

export const homeImages = [
  { src: homeImg1, alt: "Home image 1" },
  { src: homeImg2, alt: "Home image 2" },
  { src: homeImg3, alt: "Home image 3" },
  { src: homeImg4, alt: "Home image 4" },
  { src: homeImg5, alt: "Home image 5" },
  { src: homeImg6, alt: "Home image 6" },
  { src: homeImg7, alt: "Home image 7" },
  { src: homeImg8, alt: "Home image 8" },
];

export const resourceImages = [
  { src: resImg1, alt: "Resources image 1" },
  { src: resImg2, alt: "Resources image 2" },
  { src: resImg3, alt: "Resources image 3" },
  { src: resImg4, alt: "Resources image 4" },
  { src: resImg5, alt: "Resources image 5" },
  { src: resImg6, alt: "Resources image 6" },
  { src: resImg7, alt: "Resources image 7" },
  { src: resImg8, alt: "Resources image 8" },
];
