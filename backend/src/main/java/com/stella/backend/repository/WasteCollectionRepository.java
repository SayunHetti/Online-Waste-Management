package com.stella.backend.repository;

import com.stella.backend.model.WasteCollection;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WasteCollectionRepository extends JpaRepository<WasteCollection, Long> {
}
