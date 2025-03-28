package tr.org.turksat.file.config;

import io.minio.MinioClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MinioConfig {

    @Value("${minio.accessKey}")
    String accessKey;
    @Value("${minio.secretKey}")
    String secretKey;
    @Value("${minio.url}")
    String url;

    @Bean
    public MinioClient minioClient() {
        return MinioClient.builder().credentials(accessKey, secretKey).endpoint(url).build();
    }
}