import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalServiceService } from '@shared/services/modal-service.service';

@Component({
  selector: 'app-modaladdpost',
  templateUrl: './modaladdpost.component.html',
  styleUrls: ['./modaladdpost.component.css']
})
export class ModaladdpostComponent implements OnInit, OnDestroy  {

    @Input() id: string;
    private element: any;

    constructor(private modalService: ModalServiceService, private el: ElementRef) {
      this.element = el.nativeElement;
    }

    ngOnInit(): void {
      // asegúrese de que existe el atributo id

      if (!this.id) {
          console.error('modal must have an id');
          return;
      }

      // mover el elemento a la parte inferior de la página (justo antes de </body>) para que pueda mostrarse encima de todo lo demás
      document.body.appendChild(this.element);

      // close modal on background click
      this.element.addEventListener('click', (el: any)  => {
          if (el.target.className === 'jw-modal') {
              this.close();
          }
      });

      // agregue uno mismo (esta instancia modal) al servicio modal para que sea accesible desde los controladores
      this.modalService.add(this);
    }

    // eliminarse a sí mismo del servicio modal cuando se destruye el componente
    ngOnDestroy(): void {
      this.modalService.remove(this.id);
      this.element.remove();
    }

    // open modal
    open(): void {
        this.element.style.display = 'block';
        document.body.classList.add('jw-modal-open');
    }

    // close modal
    close(): void {
        this.element.style.display = 'none';
        document.body.classList.remove('jw-modal-open');
    }
}
