import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-campaign',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-campaign.html',
  styleUrl: './create-campaign.css',
})
export class CreateCampaign {

  campanha = {
    titulo: '',
    descricao: '',
    valorAlvo: 0,
    estado: 'ATIVA',
    proponenteId: 1,
    imagemUrl: '',
    videoFile: null as File | null,
    videoName: ''
  };

  onVideoSelected(event: any) {
    const file = event.target.files?.[0];

    if (file) {
      this.campanha.videoFile = file;
      this.campanha.videoName = file.name;
    }
  }

  criarCampanha() {
    console.log('Campanha criada:', this.campanha);
  }
}