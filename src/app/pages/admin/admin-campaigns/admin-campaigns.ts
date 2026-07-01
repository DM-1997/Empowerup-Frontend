import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, switchMap } from 'rxjs';
import { AdminCampaignService } from '../../../core/services/adminCampaign.service';

@Component({
  selector: 'app-admin-campaigns',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-campaigns.html',
  styleUrl: './admin-campaigns.css'
})
export class AdminCampaigns {

  private refresh$ = new BehaviorSubject<void>(undefined);

  campaigns$ = this.refresh$.pipe(
    switchMap(() => this.adminCampaignService.getAllCampaigns())
  );

  modalAberto = false;

  campanhaSelecionada: any = {};

  constructor(private adminCampaignService: AdminCampaignService){}

  abrirDetalhes(campanha:any){

    this.campanhaSelecionada = {...campanha};

    this.modalAberto = true;

  }

  fecharModal(){

    this.modalAberto = false;

  }

  approveCampaign(id:number){

    this.adminCampaignService.approveCampaign(id).subscribe({
      next:()=>this.refresh$.next(),
      error:err=>console.error(err)
    });

  }

  deleteCampaign(id:number){

    if(!confirm("Deseja eliminar esta campanha?")){
      return;
    }

    this.adminCampaignService.deleteCampaign(id).subscribe({
      next:()=>this.refresh$.next(),
      error:err=>console.error(err)
    });

  }

}