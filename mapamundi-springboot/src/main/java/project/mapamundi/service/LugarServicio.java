package project.mapamundi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.mapamundi.model.Lugar;
import project.mapamundi.repository.LugarRepositorio;

import java.util.List;
import java.util.Optional;

@Service
public class LugarServicio implements ILugarServicio{

    @Autowired
    private LugarRepositorio lugarRepositorio;

    @Override
    public List<Lugar> listarLugares() {
        return lugarRepositorio.findAll();
    }
    @Override
    public Optional<Lugar> buscarLugarPorId(Integer lugarId) {
        return lugarRepositorio.findById(lugarId);
    }
    @Override
    public Lugar guardarLugar(Lugar lugar) {
        return lugarRepositorio.save(lugar);
    }
    @Override
    public void eliminarLugar(Lugar lugar) {
        lugarRepositorio.delete(lugar);
    }
}
