package project.mapamundi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project.mapamundi.model.Lugar;

public interface LugarRepositorio extends JpaRepository<Lugar, Integer> {
}
