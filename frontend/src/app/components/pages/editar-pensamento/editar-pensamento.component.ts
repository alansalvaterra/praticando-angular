import { Component } from '@angular/core';
import { PensamentoService } from '../../../services/pensamento.service';
import { IPensamento } from '../../../interfaces/IPensamento';
import { ActivatedRoute, Router } from '@angular/router';
import { FormPensamentoComponent } from '../../shared/form-pensamento/form-pensamento.component';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-editar-pensamento',
  standalone: true,
  imports: [
    FormPensamentoComponent,
    CommonModule
  ],
  templateUrl: './editar-pensamento.component.html',
  styleUrl: './editar-pensamento.component.css'
})

export class EditarPensamentoComponent {
  pensamento: IPensamento = {
    id: 0,
    mensagem: '',
    autor: '',
    modelo: 0
  };

  constructor(
    private service: PensamentoService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      const pensamentoEncontrado = this.service.listarPorId(parseInt(id, 10));

      if (pensamentoEncontrado) {
        this.pensamento = pensamentoEncontrado;
      } else {
        this.snackBar.open('Pensamento não encontrado!', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        this.router.navigate(['/home']);
      }
    }
  }

  editaPensamento(pensamento: IPensamento): void {
    this.service.editarPensamento(pensamento);
    this.router.navigate(['/home']);
    this.snackBar.open('Pensamento editado com sucesso!', 'Fechar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  cancelar(): void {
    this.router.navigate(['/home']);
  }
}
