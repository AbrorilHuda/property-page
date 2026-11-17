export interface ProjectAdmin {
  label: string;
  phoneDisplay: string;
  whatsappRaw: string;
}

export interface BumiProject {
  id: string;
  name: string;
  shortName: string;
  category: 'Kantor Pusat' | 'Klaster Hunian';
  district: 'Pamekasan' | 'Tlanakan' | 'Pademawu';
  areaLabel: string;
  summary: string;
  address: string;
  hours?: string;
  adminLabel: string;
  adminPhone: string;
  secondaryPhone?: string;
  unitHighlight: string;
  mapsQuery: string;
}

export const companyProfile = {
  legalName: 'PT Bumi Griya Madani',
  brandName: 'Bumi Group',
  brandAlt: 'Perumahan Bumi Group',
  region: 'Kabupaten Pamekasan, Madura, Jawa Timur',
  email: 'bumigriyamadani@gmail.com',
  instagramHandle: '@perumahan_bumigroup',
  instagramUrl: 'https://www.instagram.com/perumahan_bumigroup/',
  headOfficeAddress:
    'Jl. Raya Kangenan No. 38, Pocok, Laden, Kec. Pamekasan, Kabupaten Pamekasan, Jawa Timur 69317',
  mainAdminPhone: '0823-3044-3131',
  mainHours: 'Senin - Jumat (08.00 - 16.00 WIB), Sabtu (12.00 - 16.00 WIB)',
};

export const officialAdmins: ProjectAdmin[] = [
  {
    label: 'Admin Kantor Pusat & Tlanakan',
    phoneDisplay: '0823-3044-3131',
    whatsappRaw: '6282330443131',
  },
  {
    label: 'Admin Bumi Kangenan Cluster',
    phoneDisplay: '0823-3642-4142',
    whatsappRaw: '6282336424142',
  },
  {
    label: 'Admin Area Pademawu & Bazaraya',
    phoneDisplay: '0813-3370-7033',
    whatsappRaw: '6281333707033',
  },
  {
    label: 'Admin Royal Pademawu (Utama)',
    phoneDisplay: '0823-3344-4930',
    whatsappRaw: '6282333444930',
  },
  {
    label: 'Admin Royal Pademawu (Alternatif)',
    phoneDisplay: '0853-3156-9933',
    whatsappRaw: '6285331569933',
  },
];

export const bumiProjects: BumiProject[] = [
  {
    id: 'kantor-pusat',
    name: 'Kantor Pusat Pemasaran Bumi Group',
    shortName: 'Kantor Pusat Laden',
    category: 'Kantor Pusat',
    district: 'Pamekasan',
    areaLabel: 'Laden, Kec. Pamekasan',
    summary:
      'Kantor pusat sekaligus pusat informasi pemasaran utama PT Bumi Griya Madani untuk konsultasi unit, siteplan, dan pemberkasan.',
    address:
      'Jl. Raya Kangenan No. 38, Pocok, Laden, Kec. Pamekasan, Kabupaten Pamekasan, Jawa Timur 69317',
    hours: 'Senin - Jumat (08.00 - 16.00 WIB), Sabtu (12.00 - 16.00 WIB), Minggu tutup',
    adminLabel: 'Admin Kantor Pusat & Tlanakan',
    adminPhone: '0823-3044-3131',
    unitHighlight: 'Pusat Layanan Konsultasi & Pemasaran',
    mapsQuery: 'Jl. Raya Kangenan No. 38, Pocok, Laden, Kec. Pamekasan, Jawa Timur 69317',
  },
  {
    id: 'bumi-kangenan-cluster',
    name: 'Perumahan Bumi Kangenan Cluster',
    shortName: 'Bumi Kangenan Cluster',
    category: 'Klaster Hunian',
    district: 'Pamekasan',
    areaLabel: 'Kangenan, Kec. Pamekasan',
    summary:
      'Kawasan hunian klaster modern minimalis yang berada satu kawasan dengan kantor pemasaran utama di area Laden, Pamekasan.',
    address:
      'Jl. Raya Kangenan No. 38, Pocok, Laden, Kec. Pamekasan, Kabupaten Pamekasan, Jawa Timur 69317',
    hours: 'Senin - Jumat (08.00 - 16.00 WIB), Sabtu (12.00 - 16.00 WIB), Minggu tutup',
    adminLabel: 'Admin Bumi Kangenan Cluster',
    adminPhone: '0823-3642-4142',
    unitHighlight: 'Unit Klaster Modern Minimalis',
    mapsQuery: 'Perumahan Bumi Kangenan Cluster Pamekasan',
  },
  {
    id: 'bumi-tlanakan-residence',
    name: 'Bumi Tlanakan Residence',
    shortName: 'Bumi Tlanakan Residence',
    category: 'Klaster Hunian',
    district: 'Tlanakan',
    areaLabel: 'Panglegur, Kec. Tlanakan',
    summary:
      'Proyek pengembangan hunian modern minimalis termasuk perencanaan rumah Tipe 50 di jalur utama Kecamatan Tlanakan.',
    address:
      'Jl. Raya Panglegur, Pangloros, Panglegur, Kec. Tlanakan, Kabupaten Pamekasan, Jawa Timur 69371',
    hours: 'Senin - Sabtu (08.00 - 16.00 WIB), konfirmasi jadwal via Admin',
    adminLabel: 'Admin Kantor Pusat & Tlanakan',
    adminPhone: '0823-3044-3131',
    unitHighlight: 'Pengembangan Rumah Tipe 50',
    mapsQuery: 'Jl. Raya Panglegur, Pangloros, Tlanakan, Kabupaten Pamekasan, Jawa Timur 69371',
  },
  {
    id: 'bumi-group-pademawu',
    name: 'Perumahan Bumi Group Pademawu',
    shortName: 'Bumi Group Pademawu',
    category: 'Klaster Hunian',
    district: 'Pademawu',
    areaLabel: 'Lawangan Daya, Pademawu',
    summary:
      'Titik lokasi pemasaran dan pengembangan hunian klaster Bumi Group untuk wilayah strategis Kecamatan Pademawu.',
    address:
      'Jl. Lawangan Daya, RT.08/RW.3, Tebana, Lawangan Daya, Kec. Pademawu, Kabupaten Pamekasan, Jawa Timur 69323',
    hours: 'Senin - Sabtu (08.00 - 16.00 WIB), Minggu tutup',
    adminLabel: 'Admin Area Pademawu & Bazaraya',
    adminPhone: '0813-3370-7033',
    unitHighlight: 'Klaster Residensial & Komersial',
    mapsQuery: 'Jl. Lawangan Daya, Tebana, Lawangan Daya, Pademawu, Pamekasan 69323',
  },
  {
    id: 'grand-bazaraya-permai',
    name: 'Perumahan Grand Bazaraya Permai',
    shortName: 'Grand Bazaraya Permai',
    category: 'Klaster Hunian',
    district: 'Pamekasan',
    areaLabel: 'Bugih, Kota Pamekasan',
    summary:
      'Proyek hunian klaster modern minimalis dalam portofolio Bumi Group yang terletak di area Bugih, kawasan kota Pamekasan.',
    address:
      'Jl. Basar, Sobih, Bugih, Kec. Pamekasan, Kabupaten Pamekasan, Jawa Timur 69316',
    hours: 'Hubungi Admin Area Pademawu & Bazaraya',
    adminLabel: 'Admin Area Pademawu & Bazaraya',
    adminPhone: '0813-3370-7033',
    unitHighlight: 'Hunian Klaster Area Kota Bugih',
    mapsQuery: 'Jl. Basar, Sobih, Bugih, Kec. Pamekasan, Kabupaten Pamekasan 69316',
  },
  {
    id: 'royal-pademawu',
    name: 'Perumahan Royal Pademawu Pamekasan',
    shortName: 'Royal Pademawu',
    category: 'Klaster Hunian',
    district: 'Pademawu',
    areaLabel: 'Dasok, Kec. Pademawu',
    summary:
      'Kawasan hunian klaster dari portofolio Bumi Group yang berlokasi di Desa Dasok, Kecamatan Pademawu dengan dua titik layanan admin.',
    address:
      'RGMC+434, Dasok, Kec. Pademawu, Kabupaten Pamekasan, Jawa Timur 69323',
    hours: 'Senin - Sabtu (08.00 - 16.00 WIB), Minggu tutup',
    adminLabel: 'Admin Royal Pademawu',
    adminPhone: '0823-3344-4930',
    secondaryPhone: '0853-3156-9933',
    unitHighlight: 'Klaster Hunian Wilayah Pademawu',
    mapsQuery: 'Perumahan Royal Pademawu Dasok Pamekasan',
  },
];

export const buildMapsUrl = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
