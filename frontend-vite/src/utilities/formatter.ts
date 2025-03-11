import { format, parse } from "date-fns";

export function dateFormatterFrontend(dateString?: string | Date) {
  if (dateString) {
    return format(dateString, "dd/MM/yyyy").toString();
  }
  return "";
}

export function dateFormatterBackend(dateString?: string | Date) {
  if (dateString) {
    return format(dateString, "dd/MM/yyyy' 'HH:mm");
    //return format(dateString, "dd/MM/yyyy' 'HH:mm:ss.SSS");
  }
  return "";
}

export function dateFormatterBackendToFronted(dateString?: string) {
  if (dateString) {
    // Tarihi ve saati parçalama
    const [datePart, timePart] = dateString.split(" ");
    const [day, month, year] = datePart.split("/");
    const [hours, minutes] = timePart.split(":");

    // Tarih stringini oluşturma
    const dateToParse = `${year}-${month}-${day}T${hours}:${minutes}:00`;

    // Tarihi parse etme
    const parsedDate = parse(dateToParse, "yyyy-MM-dd'T'HH:mm:ss", new Date());

    // Formatlama
    return format(parsedDate, "yyyy-MM-dd'T'HH:mm:ss.SSS");
  }
  return "";
}

export function dateFormatWithCalendar(dateString?: string) {
  const dateFormat = "dd/MM/yyyy";
  if (dateString != null) {
    return parse(dateString, dateFormat, new Date());
  }
  return "";
}
