package tr.org.turksat.common.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lowagie.text.*;
import com.lowagie.text.Document;
import com.lowagie.text.pdf.BaseFont;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.apache.poi.xwpf.usermodel.*;
import org.openxmlformats.schemas.wordprocessingml.x2006.main.CTPageSz;
import org.openxmlformats.schemas.wordprocessingml.x2006.main.CTSectPr;
import org.openxmlformats.schemas.wordprocessingml.x2006.main.STPageOrientation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.NoSuchMessageException;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;
import tr.org.turksat.aop.exception.BusinessException;
import tr.org.turksat.common.constant.CommonMessageConstant;
import tr.org.turksat.common.model.dto.BaseRequestDto;
import tr.org.turksat.common.model.dto.ResourceDto;
import tr.org.turksat.common.util.Pattern;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.lang.reflect.Field;
import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Component
public class ExporterServiceImpl implements ExporterService {
    private final ObjectMapper objectMapper;
    private final MessageSource messageSource;

    @Autowired
    public ExporterServiceImpl(ObjectMapper objectMapper, MessageSource messageSource) {
        this.objectMapper = objectMapper;
        this.messageSource = messageSource;
    }

    public <T> ResourceDto export(BaseRequestDto baseRequestDto, List<T> dtoList, String fileName) {
        if (CollectionUtils.isEmpty(baseRequestDto.getFieldNames())) {
            return null;
        }

        ResourceDto resourceDto = null;
        switch (baseRequestDto.getExportType()) {
            case "pdf": {
                try {
                    resourceDto = convertExcelToPdf(dtoList, fileName, baseRequestDto.getFieldNames());
                } catch (IllegalAccessException e) {
                    throw new BusinessException(CommonMessageConstant.EXPORT_HATA, HttpStatus.NOT_FOUND);
                }
                break;
            }
            case "csv": {
                resourceDto = exportToCsv(dtoList, fileName, baseRequestDto.getFieldNames());
                break;
            }
            case "excel": {
                try {
                    resourceDto = exportToExcel(dtoList, fileName, baseRequestDto.getFieldNames());
                } catch (IllegalAccessException e) {
                    throw new BusinessException(CommonMessageConstant.EXPORT_HATA, HttpStatus.NOT_FOUND);
                }
                break;
            }
            case "json": {
                resourceDto = exportToJson(dtoList, fileName, baseRequestDto.getFieldNames());
                break;
            }
            case "word": {
                try {
                    resourceDto = convertExcelToWord(dtoList, fileName, baseRequestDto.getFieldNames());
                } catch (IllegalAccessException e) {
                    throw new BusinessException(CommonMessageConstant.EXPORT_HATA, HttpStatus.NOT_FOUND);
                }
                break;
            }
        }
        return resourceDto;
    }

    public <T> ResourceDto exportToExcel(List<T> data, String fileName, List<String> fields) throws IllegalAccessException {
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Sheet1");

        // Header row
        Row headerRow = sheet.createRow(0);
        CellStyle headerStyle = workbook.createCellStyle();
        org.apache.poi.ss.usermodel.Font headerFont = workbook.createFont();
        headerFont.setBold(true);
        headerStyle.setFont(headerFont);
        headerStyle.setBorderBottom(BorderStyle.THIN);
        headerStyle.setBorderTop(BorderStyle.THIN);
        headerStyle.setBorderLeft(BorderStyle.THIN);
        headerStyle.setBorderRight(BorderStyle.THIN);

        for (int i = 0; i < fields.size(); i++) {
            String fieldName = fields.get(i);
            String headerName = null;
            try {
                headerName = messageSource.getMessage(fieldName, null, Locale.getDefault());
            } catch (NoSuchMessageException e) {
                headerName = fieldName;
            }

            Cell cell = headerRow.createCell(i);
            cell.setCellValue(headerName);
            cell.setCellStyle(headerStyle);
        }

        // Data rows
        int rowNum = 1;
        CellStyle cellStyle = workbook.createCellStyle();
        cellStyle.setBorderBottom(BorderStyle.THIN);
        cellStyle.setBorderTop(BorderStyle.THIN);
        cellStyle.setBorderLeft(BorderStyle.THIN);
        cellStyle.setBorderRight(BorderStyle.THIN);
        cellStyle.setWrapText(true); // Enable text wrapping
        //cellStyle.setShrinkToFit(true);
        for (T item : data) {
            Row row = sheet.createRow(rowNum++);
            List<String> values = getFieldValues(item, fields);
            for (int i = 0; i < values.size(); i++) {
                String value = values.get(i);
                Cell cell = row.createCell(i);
                cell.setCellValue(value);
                cell.setCellStyle(cellStyle);
            }
        }
        try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
            workbook.write(outputStream);
            workbook.close();
            Resource resource = new ByteArrayResource(outputStream.toByteArray());
            return new ResourceDto(resource, MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"), fileName);
        } catch (IOException e) {
            throw new RuntimeException("Excel dosyası oluşturulurken hata oluştu");
        }
    }

    private <T> List<String> getFieldValues(T item, List<String> fields) throws IllegalAccessException {
        return fields.stream()
                .map(fieldName -> {
                    try {
                        Field field = getField(item.getClass(), fieldName);
                        field.setAccessible(true);
                        if ("null".equals(String.valueOf(field.get(item)))) {
                            return "";
                        }
                        if (field.getName().equalsIgnoreCase("silindi")) {
                            return "true".equals(String.valueOf(field.get(item))) ? "Pasif" : "Aktif";
                        }
                        if (field.getType().equals(Boolean.class) || field.getType().equals(boolean.class)) {
                            return "true".equals(String.valueOf(field.get(item))) ? "Var" : "";
                        }
                        if (field.getType().equals(LocalDateTime.class)) {
                            try {
                                return ((LocalDateTime) field.get(item)).format(Pattern.DATE_TIME_FORMATTER);
                            } catch (Exception e) {
                            }
                        }
                        return String.valueOf(field.get(item));
                    } catch (NoSuchFieldException | IllegalAccessException e) {
                        e.printStackTrace();
                        return "";
                    }
                }).collect(Collectors.toList());
    }

    private Field getField(Class<?> clazz, String fieldName) throws NoSuchFieldException {
        Class<?> currentClass = clazz;
        while (currentClass != null) {
            try {
                return currentClass.getDeclaredField(fieldName);
            } catch (NoSuchFieldException e) {
                currentClass = currentClass.getSuperclass();
            }
        }
        throw new NoSuchFieldException("Field " + fieldName + " not found in class hierarchy");
    }

    @Override
    public <T> ResourceDto convertExcelToPdf(List<T> data, String fileName, List<String> fields) throws IllegalAccessException {

        ResourceDto excelResource = exportToExcel(data, fileName, fields);
        try (ByteArrayInputStream excelStream = new ByteArrayInputStream(excelResource.getResource().getInputStream().readAllBytes());
             Workbook workbook = new XSSFWorkbook(excelStream);
             ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {

            Document pdfDocument = new Document(PageSize.A3.rotate()); // A3  size for better fitting
            PdfWriter.getInstance(pdfDocument, outputStream);
            pdfDocument.open();

            Sheet sheet = workbook.getSheetAt(0);
            int numberOfColumns = sheet.getRow(0).getPhysicalNumberOfCells();
            PdfPTable pdfTable = new PdfPTable(numberOfColumns);
            pdfTable.setWidthPercentage(100);

            // Adding custom font for Turkish characters
            BaseFont bf = BaseFont.createFont("fonts/LiberationSans-Regular.ttf", BaseFont.IDENTITY_H, BaseFont.EMBEDDED);
            com.lowagie.text.Font font = new com.lowagie.text.Font(bf, 12);

            // Add header row once
            Row headerRow = sheet.getRow(0);
            for (Cell headerCell : headerRow) {
                PdfPCell pdfCell = new PdfPCell(new Phrase(headerCell.getStringCellValue(), font));
                pdfCell.setHorizontalAlignment(Element.ALIGN_CENTER);
                pdfTable.addCell(pdfCell);
            }
            pdfTable.setHeaderRows(1);

            // Add data rows
            Iterator<Row> rowIterator = sheet.iterator();
            rowIterator.next(); // Skip header row
            while (rowIterator.hasNext()) {
                Row dataRow = rowIterator.next();
                for (Cell dataCell : dataRow) {
                    //String cellValue = ("null".equals(dataCell.getStringCellValue())) ? "" : dataCell.toString();
                    String cellValue = dataCell.toString();
                    PdfPCell pdfCell = new PdfPCell(new Phrase(cellValue, font));
                    pdfTable.addCell(pdfCell);
                }
            }
            pdfDocument.add(pdfTable);
            pdfDocument.close();
            Resource resource = new ByteArrayResource(outputStream.toByteArray());
            return new ResourceDto(resource, MediaType.APPLICATION_PDF, fileName);
        } catch (IOException | DocumentException e) {
            throw new RuntimeException("PDF dönüştürme sırasında hata oluştu", e);
        }
    }

    private List<String> gethaderNames(List<String> fields) {
        if (CollectionUtils.isEmpty(fields)) return fields;

        List<String> headerNames = new ArrayList<>();
        fields.forEach(fieldName -> {
            String headerName = null;
            try {
                headerName = messageSource.getMessage(fieldName, null, Locale.getDefault());
            } catch (NoSuchMessageException e) {
                headerName = fieldName;
            }
            headerNames.add(headerName);
        });
        return headerNames;
    }


    @Override
    public <T> ResourceDto exportToCsv(List<T> data, String fileName, List<String> fields) {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        try (CSVPrinter csvPrinter = new CSVPrinter(new OutputStreamWriter(outputStream, StandardCharsets.UTF_8),
                CSVFormat.DEFAULT.withHeader(gethaderNames(fields).toArray(new String[0])).withDelimiter(';'))) {// Delimiter olarak noktalı virgül kullanılıyor
            for (T item : data) {
                List<String> values = getFieldValues(item, fields);
                csvPrinter.printRecord(values);
            }
        } catch (IOException | IllegalAccessException e) {
            e.printStackTrace();
            throw new RuntimeException("CSV dosyası oluşturulurken hata oluştu");
        }

        Resource resource = new ByteArrayResource(outputStream.toByteArray());
        return new ResourceDto(resource, MediaType.parseMediaType("text/csv; charset=UTF-8"), fileName);
    }

    @Override
    public <T> ResourceDto exportToJson(List<T> data, String fileName, List<String> fields) {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        try (OutputStreamWriter writer = new OutputStreamWriter(outputStream, StandardCharsets.UTF_8)) {
            for (T item : data) {
                String json = generateJsonString(item, fields);
                writer.write(json);
                writer.write("\n"); // Add new line after each JSON object
            }
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("JSON dosyası oluşturulurken hata oluştu");
        }

        Resource resource = new ByteArrayResource(outputStream.toByteArray());
        return new ResourceDto(resource, MediaType.parseMediaType("application/json; charset=UTF-8"), fileName);
    }

    private <T> String generateJsonString(T item, List<String> fields) throws JsonProcessingException {
        return objectMapper.writeValueAsString(
                fields.stream()
                        .collect(Collectors.toMap(
                                field -> field,
                                field -> {
                                    try {
                                        Field tempField = getField(item.getClass(), field);
                                        tempField.setAccessible(true); // Erişim yetkisini ayarla
                                        return tempField.get(item);
                                    } catch (NoSuchFieldException | IllegalAccessException e) {
                                        e.printStackTrace();
                                        return null;
                                    }
                                })
                        )
        );
    }

    @Override
    public <T> ResourceDto convertExcelToWord(List<T> data, String fileName, List<String> fields) throws IllegalAccessException {
        // Excel'i oluştur ve oku
        ResourceDto excelResource = exportToExcel(data, fileName, fields);

        try (ByteArrayInputStream excelStream = new ByteArrayInputStream(excelResource.getResource().getInputStream().readAllBytes());
             Workbook workbook = new XSSFWorkbook(excelStream);
             ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {

            // Word belgesi oluştur
            XWPFDocument document = new XWPFDocument();

            // Eğer sütun sayısı 2'den fazla ise A3 yatay formatına geç
            Sheet sheet = workbook.getSheetAt(0);
            int numberOfColumns = sheet.getRow(0).getPhysicalNumberOfCells();

            if (numberOfColumns > 2) {
                // A3 boyutunda ve yatay mod için gerekli sayfa ayarları
                CTSectPr sectPr = document.getDocument().getBody().addNewSectPr();
                XWPFParagraph para = document.createParagraph();
                para.setPageBreak(true); // Sayfa sonu eklemek için

                CTPageSz pageSize = sectPr.addNewPgSz();
                pageSize.setOrient(STPageOrientation.LANDSCAPE); // Yatay mod
                pageSize.setW(BigInteger.valueOf(16840)); // A3 genişlik
                pageSize.setH(BigInteger.valueOf(11900)); // A3 yükseklik
            }

            // Word tablosunu oluşturun, ilk satırı manuel ekliyoruz
            XWPFTable table = document.createTable(1, numberOfColumns);

            // Kenarlıkları ayarla (tüm hücreler için)
            setTableBorders(table);

            // Header satırı oluştur, ilk satırı al ve tüm sütunlara header ekle
            Row firstRow = sheet.getRow(0);
            XWPFTableRow headerRow = table.getRow(0);  // İlk satır (Header)

            for (int colIndex = 0; colIndex < numberOfColumns; colIndex++) {
                Cell excelCell = firstRow.getCell(colIndex);
                XWPFTableCell wordCell = headerRow.getCell(colIndex);
                wordCell.setText(getCellValue(excelCell));
                setCellStyle(wordCell);  // Hücre stilini ayarla
            }

            // Verileri ekle: Excel'deki satırları oku ve tabloya ekle
            for (int rowIndex = 1; rowIndex < sheet.getPhysicalNumberOfRows(); rowIndex++) {
                Row excelRow = sheet.getRow(rowIndex);
                XWPFTableRow wordRow = table.createRow();  // Her veri satırı için yeni satır oluştur

                for (int colIndex = 0; colIndex < numberOfColumns; colIndex++) {
                    Cell excelCell = excelRow.getCell(colIndex);
                    XWPFTableCell wordCell = wordRow.getCell(colIndex);
                    if (wordCell == null) {
                        wordCell = wordRow.addNewTableCell();  // Yeni hücre oluştur
                    }
                    wordCell.setText(getCellValue(excelCell));
                    setCellStyle(wordCell);  // Hücre stilini ayarla
                }
            }

            // Word belgesini çıktı olarak yaz
            document.write(outputStream);

            // Word dosyasını ResourceDto olarak döndür
            Resource wordResource = new ByteArrayResource(outputStream.toByteArray());
            return new ResourceDto(wordResource, MediaType.APPLICATION_OCTET_STREAM, fileName + ".docx");

        } catch (IOException e) {
            throw new RuntimeException("Excel'den Word'e dönüştürme sırasında hata oluştu", e);
        }
    }

    // Hücredeki değeri almak için yardımcı metod
    private String getCellValue(Cell cell) {
        switch (cell.getCellType()) {
            case STRING:
                return cell.getStringCellValue();
            case NUMERIC:
                if (DateUtil.isCellDateFormatted(cell)) {
                    return cell.getDateCellValue().toString();
                } else {
                    return String.valueOf(cell.getNumericCellValue());
                }
            case BOOLEAN:
                return String.valueOf(cell.getBooleanCellValue());
            case FORMULA:
                return cell.getCellFormula();
            case BLANK:
                return "";
            default:
                return "";
        }
    }

    private void setTableBorders(XWPFTable table) {
        table.setInsideHBorder(XWPFTable.XWPFBorderType.SINGLE, 1, 0, "000000");
        table.setInsideVBorder(XWPFTable.XWPFBorderType.SINGLE, 1, 0, "000000");
        table.setTopBorder(XWPFTable.XWPFBorderType.SINGLE, 1, 0, "000000");
        table.setBottomBorder(XWPFTable.XWPFBorderType.SINGLE, 1, 0, "000000");
        table.setLeftBorder(XWPFTable.XWPFBorderType.SINGLE, 1, 0, "000000");
        table.setRightBorder(XWPFTable.XWPFBorderType.SINGLE, 1, 0, "000000");
    }

    // Hücre stilini ayarlayan metod (Örneğin hizalama, padding vb.)
    private void setCellStyle(XWPFTableCell cell) {
        cell.setVerticalAlignment(XWPFTableCell.XWPFVertAlign.CENTER);
        XWPFParagraph paragraph = cell.getParagraphs().get(0);
        paragraph.setAlignment(ParagraphAlignment.CENTER);
        XWPFRun run = paragraph.createRun();
        run.setFontSize(10);
    }

}