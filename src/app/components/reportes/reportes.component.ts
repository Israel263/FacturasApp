import { Component, OnInit } from '@angular/core';
import { Usuarios, Reporte } from '../../Models/Entities.model';
import Chart from 'chart.js/auto';
import { SFacturasService } from '../../services/sfacturas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent implements OnInit {
  constructor(private sFacturas: SFacturasService, public ruta: Router) { }

  ngOnInit(): void {
    this.ObtenerReporte(1);
  }
  reporte: Reporte = new Reporte();
  listaClientes: Usuarios[] = [];
  chart: any;
  chart2: any;
  chartPai: number = 0
  chartBar: number = 0
  liElegido: number = 0

  ObtenerReporte(eleccion: number) {
    this.liElegido = eleccion;
    this.sFacturas.listarReporte().subscribe(
      reporte => {
        this.reporte = reporte
        this.ObtenerCliente(parseInt(reporte.clienteAlta), true)
        this.ObtenerCliente(parseInt(reporte.clienteBaja), false)
        this.reporte.ListaDescriptores.forEach(cliente => {
          var cli: string | undefined = this.listaClientes.find(x => x.usuarioID == parseInt(cliente))?.nombre
          if (cli) {
            var indice = this.reporte.ListaDescriptores.findIndex(x => x == cliente)
            this.reporte.ListaDescriptores[indice] = cli
          }

        });
        this.crearChart('bar', 'miChart', this.chart);
        this.crearChart('pie', 'miPieChart', this.chart2)
      },
      error => {
        console.log('Un error al obtener el reporte ' + eleccion, error)
      }
    )
  }

  ObtenerCliente(id_cli: number, alta: boolean) {
    this.sFacturas.retornarUsuarios().subscribe(
      respuesta => {
        if (respuesta.esCorrecto) {
          this.listaClientes = Object.values(respuesta.valor);
          if (Object.values(respuesta.valor) && Object.values(respuesta.valor).length > 0) {
            var cli: Usuarios | undefined = Object.values(respuesta.valor).find(x => x.usuarioID === id_cli);
            if (cli && alta) {
              this.reporte.clienteAlta = cli.nombre + " " + cli.apellido;
            } else if (cli && !alta) {
              this.reporte.clienteBaja = cli.nombre + " " + cli.apellido;
            }
          }
        }
      },
    error => {
        console.error("Error al obtener clientes:", error);
      }
    );
  }

  crearChart(tipoChart: ChartType, idHtml: string, chart: Chart) {

    const pie = document.getElementById('pie') as HTMLDivElement
    const barra = document.getElementById('bar') as HTMLDivElement


    if (this.chartBar >= 1 && idHtml == 'miChart') {
      barra.innerHTML = ''
      barra.innerHTML = '<canvas id="miChart"></canvas>'
      this.chartBar = 0;
    } else if (this.chartPai >= 1 && idHtml == 'miPieChart') {
      pie.innerHTML = ''
      pie.innerHTML = '<canvas id="miPieChart"></canvas>'
      this.chartPai = 0;
    }


    const ctx = document.getElementById(idHtml) as HTMLCanvasElement;

    if (idHtml == 'miChart') {
      this.chartBar = this.chartBar + 1;
    } else if (idHtml == 'miPieChart') {
      this.chartPai = this.chartPai + 1;
    }



    chart = new Chart(ctx, {
      type: tipoChart, // Puedes cambiar el tipo de gráfico según tus necesidades --pie
      data: {
        labels: this.reporte.ListaDescriptores, // Ejemplo de etiquetas
        datasets: [{
          label: 'Cantidad de Facturas',
          data: this.reporte.ListaValores, // Ejemplo de datos
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }


}

type ChartType = 'line' | 'bar' | 'radar' | 'doughnut' | 'polarArea' | 'bubble' | 'scatter' | 'pie';
