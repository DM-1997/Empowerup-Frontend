import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CampaignService } from '../../core/services/campaign.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-create-campaign',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-campaign.html',
  styleUrl: './create-campaign.css',
})
export class CreateCampaign {

  campanha = {
    titulo: '',
    descricao: '',
    valorAlvo: 0,

    imageFile: null as File | null,
    imageName: '',

    videoFile: null as File | null,
    videoName: ''
  };

  constructor(
    private campaignService: CampaignService,
    private authService: AuthService
  ) {}

  // 📸 IMAGEM
  onImageSelected(event: any) {
    const file = event.target.files?.[0];

    if (file) {
      this.campanha.imageFile = file;
      this.campanha.imageName = file.name;
    }
  }

  // 🎥 VÍDEO
  onVideoSelected(event: any) {
    const file = event.target.files?.[0];

    if (file) {
      this.campanha.videoFile = file;
      this.campanha.videoName = file.name;
    }
  }

  // 🚀 CRIAR CAMPANHA
  criarCampanha() {

    const user = this.authService.getUser();

    if (!user?.id) {
      alert('Precisa estar logado');
      return;
    }

    const formData = new FormData();

    formData.append('titulo', this.campanha.titulo);
    formData.append('descricao', this.campanha.descricao);
    formData.append('valorAlvo', String(this.campanha.valorAlvo));
    formData.append('proponenteId', String(user.id));

    if (this.campanha.imageFile) {
      formData.append('imagem', this.campanha.imageFile);
    }

    if (this.campanha.videoFile) {
      formData.append('video', this.campanha.videoFile);
    }

    this.campaignService.createCampaign(formData).subscribe({
      next: (res) => {
        console.log('OK:', res);
        alert('Campanha criada com sucesso!');
        this.resetForm();
      },
      error: (err) => {
        console.error(err);
        alert('Erro ao criar campanha');
      }
    });
  }

  // 🔄 RESET
  resetForm() {
    this.campanha = {
      titulo: '',
      descricao: '',
      valorAlvo: 0,
      imageFile: null,
      imageName: '',
      videoFile: null,
      videoName: ''
    };
  }
}