package tr.org.turksat.file.service;

import java.io.InputStream;

public interface FileReadOnlyService{
    InputStream getFile(String path);
}