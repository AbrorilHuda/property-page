export const validateName = (name: string): string | null => {
  const trimmed = name.trim();
  if (!trimmed) return 'Nama lengkap wajib diisi';
  if (trimmed.length < 3) return 'Nama minimal 3 karakter';
  if (trimmed.length > 100) return 'Nama maksimal 100 karakter';
  return null;
};

export const validateEmail = (email: string): string | null => {
  const trimmed = email.trim();
  if (!trimmed) return 'Email wajib diisi';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) return 'Email tidak valid';
  return null;
};

export const validateWhatsApp = (phone: string): string | null => {
  const trimmed = phone.trim();
  if (!trimmed) return 'Nomor WhatsApp wajib diisi';
  const phoneRegex = /^(\+62|62|08)\d{8,12}$/;
  if (!phoneRegex.test(trimmed)) {
    return 'Nomor WhatsApp tidak valid (gunakan format: +62xxxxx atau 08xxxx)';
  }
  return null;
};

export interface ValidationError {
  field: string;
  message: string;
}

export const validateForm = (data: {
  namaLengkap: string;
  email: string;
  nomorWhatsApp: string;
}): ValidationError[] => {
  const errors: ValidationError[] = [];

  const nameError = validateName(data.namaLengkap);
  if (nameError) errors.push({ field: 'namaLengkap', message: nameError });

  const emailError = validateEmail(data.email);
  if (emailError) errors.push({ field: 'email', message: emailError });

  const whatsappError = validateWhatsApp(data.nomorWhatsApp);
  if (whatsappError) errors.push({ field: 'nomorWhatsApp', message: whatsappError });

  return errors;
};
