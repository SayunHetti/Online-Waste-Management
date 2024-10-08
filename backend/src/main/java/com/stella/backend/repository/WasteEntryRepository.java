package com.stella.backend.repository;

import com.stella.backend.model.WasteEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface WasteEntryRepository extends JpaRepository<WasteEntry, Long> {
    Optional<WasteEntry> findByUserId(Long userId);
}
