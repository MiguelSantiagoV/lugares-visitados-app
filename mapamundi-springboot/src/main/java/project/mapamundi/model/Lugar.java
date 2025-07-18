package project.mapamundi.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Lugar {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idLugar;
    @Column(unique = true)
    private String nombre;
    private String zona;
    private String pais;
    @Enumerated(EnumType.STRING)
    private Continente continente;
}
