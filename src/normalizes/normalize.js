function normalizeStock(input) {
    if (typeof input === "boolean" && input == true) {
        return "Tersedia";
    } else if (typeof input == "number" && input > 0) {
        return "Tersedia";
    } else if (typeof input == "string" && input == "ada") {
        return "ada";
    }
    else {
        return "Habis";
    };
}

function finalPrice(base_price, tax) {
    return base_price + tax;
}

function vendorDicount(vendor, finalPrice) {
    if (vendor == "Warung") {
        return finalPrice - (finalPrice * 0.1);
    } else {
        return finalPrice;
    }
}

function normalizeCategory(name, category) {
    if (category == "Food") {
        return `${name} (Recommended)`;
    } else {
        return `${name}`;
    }
}

function normalizeProduct(raw, vendor) {
    return {
        id: raw.kd_produk || raw.sku || raw.id || null,
        name: raw.nm_brg || raw.productName || normalizeCategory(raw.details?.name, raw.details?.category) || null,
        price: vendorDicount(vendor, parseInt(raw.hrg) || raw.price || finalPrice(raw.pricing?.base_price, raw.pricing?.tax)) || null,
        stock: normalizeStock(raw.ket_stok || raw.isAvailable || raw.stock) || null,
        vendor: vendor || null,
    }
}

module.exports = { normalizeProduct };
