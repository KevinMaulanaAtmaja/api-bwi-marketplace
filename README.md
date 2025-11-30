# 🧩 Banyuwangi Marketplace – API Integrator

API Integrator ini dibuat untuk menggabungkan data dari **3 API UMKM Banyuwangi** (Warung, Fashion, Resto) menjadi satu format yang seragam sehingga dapat digunakan oleh developer dan vendor.

Base URL integrator:
👉 **https://api-bwi-marketplace.vercel.app/**

---

## 🌐 Sumber API yang Digunakan

| Sumber | Deskripsi | Endpoint |
|-------|-----------|----------|
| **API Warung (M1)** | Produk UMKM/Warung | `/produk` |
| **API Fashion (M2)** | Produk fashion | `/products` |
| **API Resto (M3)** | Produk restoran/kuliner | `/menu` |

> URL lengkap tiap API disimpan dalam file `.env`.

---

## 🛠️ Teknologi

- Node.js
- Express.js
- Helmet.js
- Axios
- Dotenv

---

## 📦 Instalasi

### 1️⃣ Clone repository
```
git clone https://github.com/KevinMaulanaAtmaja/api-bwi-marketplace.git
cd api-bwi-marketplace
```

### 2️⃣ Install dependencies
```
npm install
```

### 3️⃣ Ubah file `.env.example` menjadi `.env`
```
API_TOKO="https://warungklontong.vercel.app/produk"
API_FASHION="https://api-fashion-amber.vercel.app/products"
API_RESTO="https://api-resto.vercel.app/menu"
```

### 4️⃣ Jalankan Server
```
npm start
```

---

## 🚀 Endpoint Utama

### GET `/integrator-products`
Mengambil data dari ketiga API, menormalisasi, lalu menggabungkannya.

---

## 🔧 Aturan Normalisasi

| Sumber | Field | Normalisasi |
|--------|-------|-------------|
| **M1** | harga string, stok `"ada/habis"` | harga → number, status tetap |
| **M2** | status boolean | true → `"Tersedia"`, false → `"Habis"` |
| **M3** | base_price + tax, stok angka | hitung harga_final, stok >0 → `"Tersedia"` |

Output final akan memiliki format:
```
{
  "id": "...",
  "name": "...",
  "price": ...,
  "stock": "ada" | "Tersedia" | "Habis",
  "vendor": "Warung" | "Fashion" | "Resto"
}
```

---

## 📘 Contoh Response
```json
{
  "message": "success",
  "total": 6,
  "data": [
    {
      "id": "A001",
      "name": "kopi bubuk",
      "price": 13500,
      "stock": "ada",
      "vendor": "Warung"
    },
    {
      "id": "TSHIRT-BLETOK-006",
      "name": "Welcome Home Bletokers",
      "price": 95000,
      "stock": "Habis",
      "vendor": "Fashion"
    },
    {
      "id": "1",
      "name": "Nasi Tempong (Recommended)",
      "price": 22000,
      "stock": "Tersedia",
      "vendor": "Resto"
    },
  ]
}
```
