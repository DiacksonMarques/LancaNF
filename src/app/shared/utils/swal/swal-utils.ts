import Swal, { SweetAlertResult } from "sweetalert2";

export class SwalUtils{
  showSucessSave(type: string): Promise<SweetAlertResult>{
    return Swal.fire({
      title: `${type} salvo(a) com sucesso!`,
      icon: 'success',
      position: 'center',
    });
  }

  showSucessDelete(type: string): void{
    Swal.fire({
      title: `${type} exclido(a) com sucesso!`,
      icon: 'success',
      position: 'center',
    });
  }

  showLoading(text: string){
    Swal.fire({
      title: text,
      text: 'Carregando...',
      position: 'center',
      didOpen: () => {
        Swal.showLoading();
      }
    });
  }

  showSucess(text: string): Promise<SweetAlertResult>{
    return Swal.fire({
      title: text,
      icon: 'success',
      position: 'center',
    });
  }

  showWarning(text: string): Promise<SweetAlertResult>{
    return Swal.fire({
      title: text,
      icon: 'warning',
      position: 'center',
    });
  }

  showConfirm(text: string, buttonConfirm= "Sim", buttonCancel = "Não"): Promise<SweetAlertResult>{
    return Swal.fire({
      title: text,
      icon: 'warning',
      position: 'center',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: buttonConfirm,
      cancelButtonText: buttonCancel,
    });
  }
}
