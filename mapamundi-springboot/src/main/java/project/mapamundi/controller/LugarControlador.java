package project.mapamundi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.mapamundi.model.Lugar;
import project.mapamundi.service.LugarServicio;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/mapamundi-api/lugares")
@CrossOrigin(value = "http://localhost:3000")
public class LugarControlador {

    @Autowired
    private LugarServicio lugarServicio;

    @GetMapping
    public List<Lugar> listarLugares(){
        return lugarServicio.listarLugares();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Lugar> lugarPorId(@PathVariable int id){
        Lugar lugar = lugarServicio.buscarLugarPorId(id).orElse(null);
        return ResponseEntity.ok(lugar);
    }
    @PostMapping
    public ResponseEntity<Lugar> guardarLugar(@RequestBody Lugar lugar){
        Lugar lugarGuardado = lugarServicio.guardarLugar(lugar);
        return new ResponseEntity<>(lugarGuardado, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Lugar> modificarLugar(@PathVariable int id, @RequestBody Lugar lugarNuevo){
        Lugar lugar = lugarServicio.buscarLugarPorId(id).orElse(null);
        if(lugar == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        if(lugar.getNombre() != null) lugar.setNombre(lugarNuevo.getNombre());
        if(lugar.getZona() != null) lugar.setZona(lugarNuevo.getZona());
        if(lugar.getPais() != null) lugar.setPais(lugarNuevo.getPais());
        if(lugar.getPais() != null ) lugar.setPais(lugarNuevo.getPais());
        if(lugar.getContinente() != null) lugar.setContinente(lugarNuevo.getContinente());
        lugarServicio.guardarLugar(lugar);
        return new ResponseEntity<>(lugar, HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    public void eliminarLugar(@PathVariable int id){
        Lugar lugar = lugarServicio.buscarLugarPorId(id).orElse(null);
        lugarServicio.eliminarLugar(lugar);
    }


}
