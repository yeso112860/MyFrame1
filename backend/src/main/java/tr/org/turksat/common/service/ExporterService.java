package tr.org.turksat.common.service;

import tr.org.turksat.common.model.dto.BaseRequestDto;
import tr.org.turksat.common.model.dto.ResourceDto;

import java.util.List;

public interface ExporterService {

    <T> ResourceDto export(BaseRequestDto baseRequestDto, List<T>  dtoList, String fileName);

     <T> ResourceDto exportToExcel(List<T> data, String fileName, List<String> fields) throws IllegalAccessException;

    <T> ResourceDto convertExcelToPdf(List<T> data, String fileName, List<String> fields) throws IllegalAccessException;

    <T> ResourceDto exportToCsv(List<T> data, String fileName, List<String> fields);

    <T> ResourceDto exportToJson(List<T> data, String fileName, List<String> fields);

    <T> ResourceDto convertExcelToWord(List<T> data, String fileName, List<String> fields) throws IllegalAccessException;
}