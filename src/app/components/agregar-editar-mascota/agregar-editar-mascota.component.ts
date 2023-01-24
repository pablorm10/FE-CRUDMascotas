import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Mascota } from 'src/app/interfaces/mascota';
import { MascotaService } from 'src/app/services/mascota.service';

@Component({
  selector: 'app-agregar-editar-mascota',
  templateUrl: './agregar-editar-mascota.component.html',
  styleUrls: ['./agregar-editar-mascota.component.css']
})
export class AgregarEditarMascotaComponent implements OnInit {
  loading: boolean;
  form: FormGroup;
  id: number;

  operation: string = "Agregar";

  constructor(private fb: FormBuilder, private _mascotaService: MascotaService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private aRoute: ActivatedRoute) {
    this.loading = false;
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      raza: ['', Validators.required],
      color: ['', Validators.required],
      edad: ['', Validators.required],
      peso: ['', Validators.required],
    });

    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
    console.log(this.id);
  }

  ngOnInit(): void {
    if (this.id != 0){
      this.operation = "Editar";
      this.obtenerMascota(this.id);
    }
  }

  obtenerMascota(id: number) {
    this.loading = true;
    this._mascotaService.getMascota(id).subscribe(data=>{
      this.form.patchValue({
        nombre: data.nombre,
        raza: data.raza,
        edad: data.edad,
        peso: data.peso,
        color: data.color,
      })
      console.log(data);
      this.loading = false;
    })
  }

  agregarEditarMascota(){
    // nombre: this.form.get('nombre')?.value;


    const mascota: Mascota = {
      nombre: this.form.get('nombre')?.value,
      edad: this.form.value.edad,
      raza: this.form.value.raza,
      color: this.form.value.color,
      peso: this.form.value.peso,
    }

    if(this.id != 0){
      mascota.id = this.id;
      this.editarMascota(this.id, mascota);
    } else {
      this.agregarMascota(mascota);
    }
  }

  editarMascota(id: number, mascota: Mascota){
    this.loading = true;
    this._mascotaService.updateMascota(id, mascota).subscribe(() => {
      this.loading = false;
      this.mensajeExito("La mascota fue editada con éxito");
      this.router.navigate(['/listMascotas']);
    })

  }

  agregarMascota(mascota: Mascota){
    this._mascotaService.addMascota(mascota).subscribe(data=>{
      this.mensajeExito("La mascota fue agregada con éxito");
      this.router.navigate(['/listMascotas']);
    })

  }

  mensajeExito(texto: string){
    this._snackBar.open(texto, '',
    { duration: 4000,
      horizontalPosition: 'right',
      });
  }
}
