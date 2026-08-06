export const config = {
  whatsappNumber: import.meta.env.PUBLIC_WHATSAPP_NUMBER || "+62812345678",
  adminEmail: import.meta.env.PUBLIC_ADMIN_EMAIL || "admin@bumigroup.com",
  businessPhone: import.meta.env.PUBLIC_BUSINESS_PHONE || "+62212345678",
  businessAddress:
    import.meta.env.PUBLIC_BUSINESS_ADDRESS ||
    "Jl. Merdeka No. 123, Jakarta, Indonesia",
  businessHours: import.meta.env.PUBLIC_BUSINESS_HOURS || "09:00 - 18:00",
  instagram: import.meta.env.PUBLIC_INSTAGRAM || "@perumahanbumigroup",
  tiktok: import.meta.env.PUBLIC_TIKTOK || "@perumahanbumigroup",
};

export const whatsappLink = (message: string) => {
  const encoded = encodeURIComponent(message);
  const num = config.whatsappNumber.replace("+", "").replace(/^0/, "62");
  return `https://wa.me/${num}?text=${encoded}`;
};
