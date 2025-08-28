
# 🖼️ Image Scrambler

Ứng dụng nhỏ viết bằng **React + Canvas** giúp bạn upload một bức ảnh, sau đó chia ảnh thành nhiều hàng (rows) và xáo trộn vị trí các hàng.  
Kết quả hiển thị song song giữa ảnh gốc và ảnh đã bị xáo trộn.

---

## 🚀 Tính năng

- [x] Upload ảnh từ máy tính (`.jpg`, `.png`, …).
- [x] Tự động chia ảnh thành số hàng phù hợp (mặc định `10`, có thể thay đổi).
- [x] Xáo trộn ngẫu nhiên các hàng ảnh.
- [x] Sinh ra `Key` (chuỗi chứa thông tin hoán đổi) để có thể dùng cho giải mã.
- [x] Hiển thị song song ảnh gốc và ảnh đã scramble.
- [ ] Tải ảnh đã xoá trộn.
- [ ] Cho phép tải nhiều ảnh lên.
- [ ] Mã hoá `Key` với base64 và XOR. 
# 🖼️ Image Scrambler

A small application written in **React + Canvas** that helps you upload an image, then split the image into multiple rows and shuffle the rows. 
The result is displayed in parallel between the original image and the scrambled image.

---

## 🚀 Features

- [x] Upload images from your computer (`.jpg`, `.png`, …).

- [x] Automatically split the image into the appropriate number of rows (default `10`, can be changed).

- [x] Randomly shuffle the image rows.

- [x] Generate `Key` (string containing swap information) that can be used for decoding.

- [x] Display the original image and the scrambled image in parallel.
- [ ] Download images.
- [ ] Accept upload images.
- [ ] Encrypt `Key` with base64 and XOR. 

## 📷 Demo
<p align="center">
  <img src="images/image.png" alt="Demo Screenshot" width="600"/>
</p>

<span>Live: https://scramble-image.vercel.app/</span>

# Thank's for using<3