import { companyProfile } from '../data/bumiGroup';

export const config = {
  whatsappNumber: import.meta.env.PUBLIC_WHATSAPP_NUMBER || '+6282330443131',
  adminEmail: import.meta.env.PUBLIC_ADMIN_EMAIL || companyProfile.email,
  businessPhone: import.meta.env.PUBLIC_BUSINESS_PHONE || companyProfile.mainAdminPhone,
  businessAddress:
    import.meta.env.PUBLIC_BUSINESS_ADDRESS || companyProfile.headOfficeAddress,
  businessHours:
    import.meta.env.PUBLIC_BUSINESS_HOURS || companyProfile.mainHours,
  instagram: import.meta.env.PUBLIC_INSTAGRAM || companyProfile.instagramHandle,
  instagramUrl: companyProfile.instagramUrl,
};

export const normalizePhoneToWa = (phone: string): string => {
  const digits = phone.replace(/\D/g, '');
  if (digits.startsWith('62')) return digits;
  if (digits.startsWith('0')) return `62${digits.slice(1)}`;
  return `62${digits}`;
};

export const whatsappLink = (message: string, targetPhone?: string) => {
  const encoded = encodeURIComponent(message);
  const num = normalizePhoneToWa(targetPhone || config.whatsappNumber);
  return `https://wa.me/${num}?text=${encoded}`;
};
