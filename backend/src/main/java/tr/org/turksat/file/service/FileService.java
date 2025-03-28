package tr.org.turksat.file.service;

public interface FileService<T> {
    String uploadFile(T file);

    void deleteFile(String path);
}
