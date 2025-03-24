export function changeTheme() {
  const theme = localStorage.getItem("theme") || "lara-light-indigo";
  const linkElement = document.createElement("link");

  linkElement.rel = "stylesheet";
  linkElement.href = `/themes/${theme}/theme.css`;
  // Append the new theme
  if (theme?.includes("dark")) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  document.head.appendChild(linkElement);
}

export function ApiFilterAdapter(filters: any) {
  const _adaptedFilters: any = [];
  Object.keys(filters).forEach((key) => {
    filters[key].constraints.forEach((constraint) => {
      if (constraint.value !== null && constraint.value !== undefined) {
        _adaptedFilters.push({
          field: key,
          value: constraint.value,
          operator:
            constraint.matchMode === "dateIs"
              ? "dateequals"
              : constraint.matchMode === "dateIsNot"
                ? "datenotequals"
                : constraint.matchMode,
        });
      }
    });
  });
  return _adaptedFilters;
}

export function ExportTable(content, fileName, contentType) {
  const a = document.createElement("a");
  const file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}

export function ExportFile(
  content: any,
  fileName: string,
  contentType: string,
) {
  try {
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url); // Belleği temizle
  } catch (error) {
    console.error("Dosya indirme sırasında hata oluştu:", error);
  }
}

// MIME türünü dosya uzantısına göre çözümleyen fonksiyon
const getMimeType = (dosyaAdi: string): string => {
  const lastDotIndex = dosyaAdi.lastIndexOf(".");
  const extension =
    lastDotIndex !== -1
      ? dosyaAdi.substring(lastDotIndex + 1).toLowerCase()
      : "";

  switch (extension) {
    case "pdf":
      return "application/pdf";
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "gif":
      return "image/gif";
    case "txt":
      return "text/plain";
    case "doc":
      return "application/msword";
    case "docx":
      return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    case "xls":
      return "application/vnd.ms-excel";
    case "xlsx":
      return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    case "ppt":
      return "application/vnd.ms-powerpoint";
    case "pptx":
      return "application/vnd.openxmlformats-officedocument.presentationml.presentation";
    case "zip":
      return "application/zip";
    case "rar":
      return "application/x-rar-compressed";
    case "csv":
      return "text/csv";
    default:
      return "application/octet-stream"; // Genel binary dosya türü
  }
};

// Dosya görüntüleme işlemini yapan fonksiyon
export function ViewFile(
  sistemDosyaId: string,
  getDokumanBySistemDosyaId: any,
): void {
  getDokumanBySistemDosyaId.mutate(sistemDosyaId, {
    onSuccess: (data) => {
      const dosyaAdi = data?.data?.object?.dosyaAdi; // Dosya adı
      const dosyaContent = data?.data?.object?.objectData; // Base64 formatındaki dosya içeriği
      const dosyaContentBase64 = dosyaContent.split(",")[1];

      const binaryString = window.atob(dosyaContentBase64);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);

      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      // MIME türünü dosya uzantısına göre belirle
      const mimeType = getMimeType(dosyaAdi);

      // Blob nesnesi oluştur
      const blob = new Blob([bytes], { type: mimeType });
      const url = window.URL.createObjectURL(blob); // Blob URL oluştur

      // Yeni bir sekmede aç
      window.open(url, "_blank");

      // Oluşturulan URL'yi serbest bırak (hafıza yönetimi için)
      window.URL.revokeObjectURL(url);
    },
    onError: (error) => {
      console.error("Dosya görüntüleme hatası:", error);
    },
  });
}

//dosya indirme işlemini yapan fonksiyon
export function DownloadFile(
  sistemDosyaId: string,
  getDokumanBySistemDosyaId: any,
) {
  // Veri çekme işlemi
  getDokumanBySistemDosyaId.mutate(sistemDosyaId, {
    onSuccess: (data) => {
      const dosyaAdi = data?.data?.object?.dosyaAdi; // Dosya adı
      const dosyaContent = data?.data?.object?.objectData; // Base64 formatındaki dosya içeriği
      const dosyaContentBase64 = dosyaContent.split(",")[1];

      if (dosyaAdi && dosyaContentBase64) {
        // Base64 verisini çözümle
        const binaryString = window.atob(dosyaContentBase64); // Base64 string'ini binary string'e çevirir
        const len = binaryString.length;
        const bytes = new Uint8Array(len); // Byte array oluşturur

        // Binary string'i byte array'e dönüştür
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }

        // Blob nesnesi oluştur (Dosya türü örnek olarak 'application/pdf', ihtiyaca göre değiştirilebilir)
        const blob = new Blob([bytes], { type: "application/octet-stream" }); // Uygun MIME türünü kullanın
        const url = window.URL.createObjectURL(blob); // Blob URL oluştur

        // Dinamik bir indirme linki oluştur ve dosyayı indir
        const link = document.createElement("a");
        link.href = url;
        link.download = dosyaAdi; // İndirilecek dosyanın adı
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // İşlem bittikten sonra DOM'dan kaldır

        // Oluşturulan URL'yi serbest bırak (hafıza yönetimi için)
        window.URL.revokeObjectURL(url);
      }
    },
    onError: (error) => {
      console.error("Dosya indirme hatası:", error);
    },
  });
}

//db den gelen değerleri gün ay veya yılı dönecek şekilde değiştiren fonksiyon. tip 0:gün 1:ay 2:yıl bilgisini string olarak döner
export function FormatDate(date: string, type: number) {
  const monthNames = [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ];
  const fdate = dateFormatterBackendToFronted(date);
  const dateObject = new Date(fdate);
  const day = dateObject.getDate();
  const month = monthNames[dateObject.getMonth()];
  const year = dateObject.getFullYear();
  switch (type) {
    case 0:
      return day.toString();
    case 1:
      return month.toString();
    case 2:
      return year.toString();
    default:
      return "";
  }
}
