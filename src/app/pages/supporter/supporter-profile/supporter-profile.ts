import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthService } from '../../../core/services/auth.service';
import { SupporterService } from '../../../core/services/supporter.service';


@Component({
  selector: 'app-supporter-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './supporter-profile.html',
  styleUrl: './supporter-profile.css',
})
export class SupporterProfile implements OnInit {


  utilizador:any = {

    nome:'',
    email:'',
    telefone:'',
    endereco:'',
    foto:'https://i.pravatar.cc/300'

  };


  mensagem:string|null = null;


  private supporterId!:number;



  constructor(

    private authService:AuthService,

    private supporterService:SupporterService

  ){}



  ngOnInit():void{


    const user =
      this.authService.getUser();



    if(user){


      this.supporterId = user.id;



      this.utilizador = {

        nome:
          user.nome || '',


        email:
          user.email || '',


        telefone:
          user.telefone || '',


        endereco:
          user.endereco || '',


        foto:
          user.foto ||
          'https://i.pravatar.cc/300'

      };


    }


  }





  // 📷 Selecionar nova foto

  selecionarFoto(event:any){


    const file =
      event.target.files[0];



    if(!file){

      return;

    }



    this.supporterService
      .updateAvatar(
        this.supporterId,
        file
      )
      .subscribe({



        next:(response)=>{


          console.log(
            'Avatar atualizado:',
            response
          );



          // Atualiza imagem imediatamente

          this.utilizador.foto =
              response.foto;



          // Atualiza localStorage

          const user =
            this.authService.getUser();



          this.authService.setUser({

            ...user,

            foto:response.foto

          });



          this.mensagem =
            'Foto de perfil atualizada com sucesso!';



          setTimeout(()=>{

            this.mensagem=null;

          },3000);



        },



        error:(err)=>{


          console.error(
            'Erro ao alterar foto',
            err
          );


          this.mensagem =
            'Erro ao atualizar foto!';


        }



      });



  }







  guardar():void{


    this.authService.setUser({

      ...this.authService.getUser(),

      ...this.utilizador

    });



    this.mensagem =
      'Perfil atualizado com sucesso!';



    setTimeout(()=>{

      this.mensagem=null;

    },3000);



  }


}