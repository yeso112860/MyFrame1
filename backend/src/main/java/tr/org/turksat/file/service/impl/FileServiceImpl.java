package tr.org.turksat.file.service.impl;

import io.minio.MinioClient;
import io.minio.ObjectWriteResponse;
import io.minio.PutObjectArgs;
import io.minio.RemoveObjectArgs;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import tr.org.turksat.aop.constant.MessageConstant;
import tr.org.turksat.aop.exception.BusinessException;
import tr.org.turksat.aop.properties.ModuleProperties;
import tr.org.turksat.file.service.FileService;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.UUID;

@Service
@Slf4j
public class FileServiceImpl implements FileService<MultipartFile> {

    private final MinioClient minioClient;
    private final ModuleProperties moduleProperties;

    @Value("${minio.bucketName}")
    String bucketName;
    @Value("${minio.acceptable-content-types}")
    String contentTypes;
    @Value("${minio.acceptable-file-types}")
    String fileTypes;

    @Autowired
    public FileServiceImpl(MinioClient minioClient, ModuleProperties moduleProperties) {
        this.minioClient = minioClient;
        this.moduleProperties = moduleProperties;
    }

    @Override
    public String uploadFile(MultipartFile multipartFile) {
        ArrayList<String> acceptableContentTypes = new ArrayList<>(Arrays.asList(contentTypes.split(",")));
        ArrayList<String> acceptableFileTypes = new ArrayList<>(Arrays.asList(fileTypes.split(",")));
        String path = pathOlustur(multipartFile.getOriginalFilename());
        if (!acceptableContentTypes.contains(multipartFile.getContentType())) {
            throw new BusinessException("file.0003", HttpStatus.UNSUPPORTED_MEDIA_TYPE);
        }
        if (!acceptableFileTypes.contains(FilenameUtils.getExtension(multipartFile.getOriginalFilename()))) {
            throw new BusinessException("file.0005", HttpStatus.UNSUPPORTED_MEDIA_TYPE);
        }

        try {
            ObjectWriteResponse response = minioClient.putObject(PutObjectArgs.builder()
                    .bucket(bucketName)
                    .object(path)
                    .stream(multipartFile.getInputStream(), multipartFile.getSize(), -1)
                    .contentType(multipartFile.getContentType())
                    .build());
        } catch (Exception e) {
            e.printStackTrace();
            throw new BusinessException("file.0001", HttpStatus.BAD_REQUEST);
        } finally {
            return path;
        }
    }

    @Override
    public void deleteFile(String path) {

        if (StringUtils.isBlank(path)) {
            throw new BusinessException("file.0004", HttpStatus.BAD_REQUEST);
        }

        try {
            minioClient.removeObject(RemoveObjectArgs.builder()
                    .bucket(bucketName)
                    .object(path)
                    .build());
        } catch (Exception e) {
            log.error(MessageConstant.LOG0001, e);
        }
    }

    private String pathOlustur(String orjinalDosyaAdi) {
        String extension = FilenameUtils.getExtension(orjinalDosyaAdi);
        String dosyaAdi = UUID.randomUUID().toString();
        String dosyaTamAdi = new StringBuilder().append(dosyaAdi).append(".").append(extension).toString();
        String tarih = LocalDate.now().toString().replace("-", "");
        String modulAdi = moduleProperties.getAdi();

        return new StringBuilder("/").append(tarih).append("/").append(modulAdi).append("/").append(dosyaTamAdi).toString();
    }
}
