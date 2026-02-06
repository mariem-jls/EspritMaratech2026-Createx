package com.omnia.omnia.Entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Family {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(unique = true, nullable = false)
    private String reference; // Ex: "FAM-2026-001"

    @Column(nullable = false)
    private String headOfFamily;

    private String phone;

    private String address;

    private Double latitude;

    private Double longitude;

    private Integer familySize;

    @Column(length = 2000)
    private String needsDescription;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private PriorityLevel priorityLevel = PriorityLevel.Medium;

    private String notes;

    // ✅ NOUVEAU : Référence aux types d'aide fréquemment nécessaires
    @ManyToMany
    @JoinTable(
            name = "family_frequent_aid_types",
            joinColumns = @JoinColumn(name = "family_id"),
            inverseJoinColumns = @JoinColumn(name = "aid_type_id")
    )
    @Builder.Default
    public List<AidType> frequentAidTypes = new ArrayList<>();

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        if (reference == null || reference.isEmpty()) {
            // Génération automatique de référence
            reference = "FAM-" + System.currentTimeMillis() % 10000;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}