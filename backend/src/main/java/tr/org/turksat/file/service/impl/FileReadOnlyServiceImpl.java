package tr.org.turksat.file.service.impl;

import io.minio.GetObjectArgs;
import io.minio.MinioClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import tr.org.turksat.aop.exception.BusinessException;
import tr.org.turksat.file.service.FileReadOnlyService;

import java.io.InputStream;

@Service
public class FileReadOnlyServiceImpl implements FileReadOnlyService {

    @Value("${minio.bucketName}")
    String bucketName;

    private final MinioClient minioClient;

    @Autowired
    public FileReadOnlyServiceImpl(MinioClient minioClient) {
        this.minioClient = minioClient;
    }

    @Override
    public InputStream getFile(String fileName) {
        InputStream stream;
        try {
            stream = minioClient.getObject(GetObjectArgs.builder()
                    .bucket(bucketName)
                    .object(fileName)
                    .build());
        } catch (Exception e) {
            throw new BusinessException("file.0002", HttpStatus.NOT_FOUND, fileName);
        }
        return stream;
    }
}
