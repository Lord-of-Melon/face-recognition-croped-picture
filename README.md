## Framework
Disini gw pake React .TSX bukan .JSX ga banyak perbedaannya sama yang .JSX, Tailwind CSS.
---
## Database
* Database belum ada dan belum ditentukan.
* Rencananya gw mau pake sqlite buat database tapi serah kalian kalo mau pake apa.
* Database disini cuma buat tempat nyimpen sementara dari gambar yang di upload user, gambar crop hasil dari model face recognition kita
---
## Flow App
```mermaid
graph TD
A[Upload Gambar] --> B[Gambar Disimpan di DB]
B --> C[Model Mengambil Gambar dari DB]
C --> D[Model mengolah Gambar]
D --> E[Hasil Model Disimpan di DB]
E --> [Hasil di GUI mengambil hasil crop dari DB]
```
---
## How to Use
```Bash
http://localhost:5173/
```
# Lainnya
Download bisa di hilangkan kalo ga mau ribet
