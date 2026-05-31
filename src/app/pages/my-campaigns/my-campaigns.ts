import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, switchMap } from 'rxjs';
import { CampaignService } from '../../core/services/campaign.service';
import { AuthService } from '../../core/services/auth.service';
@Component({
  selector: 'app-my-campaigns',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './my-campaigns.html',
  styleUrls: ['./my-campaigns.css'],
})
export class MyCampaigns {

  private refresh$ = new BehaviorSubject<void>(undefined);

  campanhas$ = this.refresh$.pipe(
    switchMap(() => {
  const userId = this.authService.getUserId();
  return this.campaignService.getMyCampaigns(userId!);
})
  );

  mensagemSucesso: string | null = null;

  modalAberto = false;

  campanhaEditando: any = {
    id: null,
    titulo: '',
    descricao: '',
    valorAlvo: 0
  };

  constructor(private campaignService: CampaignService, private authService: AuthService) {}

  // 🔵 abrir modal com dados reais
  editar(campanha: any) {
    this.campanhaEditando = { ...campanha };
    this.modalAberto = true;
  }

  fecharModal() {
    this.modalAberto = false;
  }

  salvarEdicao() {

    const formData = new FormData();
    formData.append('titulo', this.campanhaEditando.titulo);
    formData.append('descricao', this.campanhaEditando.descricao);
    formData.append('valorAlvo', String(this.campanhaEditando.valorAlvo));

    this.campaignService.updateCampaign(this.campanhaEditando.id, formData)
      .subscribe({
        next: () => {

          this.modalAberto = false;
          this.refresh$.next();

          this.mensagemSucesso = 'Campanha atualizada com sucesso!';

          setTimeout(() => this.mensagemSucesso = null, 3000);
        },
        error: (err) => console.error(err)
      });
  }

  eliminar(id: number) {

    this.campaignService.deleteCampaign(id).subscribe({
      next: () => {

        this.refresh$.next();

        this.mensagemSucesso = 'Campanha eliminada com sucesso!';

        setTimeout(() => this.mensagemSucesso = null, 3000);
      },
      error: (err) => console.error(err)
    });
  }
}