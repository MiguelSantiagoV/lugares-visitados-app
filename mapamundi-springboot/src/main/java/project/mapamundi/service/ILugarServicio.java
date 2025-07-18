package project.mapamundi.service;

import project.mapamundi.model.Lugar;

import java.util.List;
import java.util.Optional;

public interface ILugarServicio {
    public List<Lugar> listarLugares();
    public Optional<Lugar> buscarLugarPorId(Integer lugarId);
    public Lugar guardarLugar(Lugar lugar);
    public void eliminarLugar(Lugar lugar);
}
