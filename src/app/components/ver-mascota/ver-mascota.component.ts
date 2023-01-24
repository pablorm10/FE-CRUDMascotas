import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Mascota } from 'src/app/interfaces/mascota';
import { MascotaService } from 'src/app/services/mascota.service';

@Component({
  selector: 'app-ver-mascota',
  templateUrl: './ver-mascota.component.html',
  styleUrls: ['./ver-mascota.component.css']
})
export class VerMascotaComponent implements OnInit, OnDestroy {
   id!: number;
   mascota !: Mascota;

   mascota$ !: Observable<Mascota>;
   loading: boolean = false;

   routeSub!: Subscription;

  constructor(private _mascotaService : MascotaService, private aRoute: ActivatedRoute) {
    // this.id = +this.aRoute.snapshot.paramMap.get('id')!;
   }

  ngOnInit(): void {
    // this.mascota$ = this._mascotaService.getMascota(this.id);
    this.routeSub = this.aRoute.params.subscribe(data =>{
      this.id = data['id'];

      this.obtenerMascota();
    })
  }

  ngOnDestroy(): void{
    this.routeSub.unsubscribe();
  }

  obtenerMascota(){
    this.loading = true;
     this._mascotaService.getMascota(this.id).subscribe(data =>{
       this.mascota = data;
       this.loading = false;
    });
   }

}
