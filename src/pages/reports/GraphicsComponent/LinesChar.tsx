import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { useEffect, useState } from "react";
import Product from "../../products/Product";
import { searchProduct } from "../../products/ProductApi";


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const LinesChart:React.FC = () => {
    const [productos, setProductos] = useState<Product[]>([]);
    const [chartData, setChartData] = useState<any>(null);
    useEffect(() =>{
        obtenerDatos();
        
      }, []);
     
    
   
    const obtenerDatos = async ()=>{
       
        let result = await searchProduct();
        setProductos(result);
        let nombres = await productos.map((p)=>{
            return p.nameProd
        })
        let cantidad = await productos.map((p)=>{
            return p.amount
        })
        let midata = {
            labels: nombres,
            datasets: [ // Cada una de las líneas del gráfico
                {
                    label: 'Beneficios',
                    data: cantidad,
                    tension: 0.5,
                    fill : true,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    pointRadius: 5,
                    pointBorderColor: 'rgba(255, 99, 132)',
                    pointBackgroundColor: 'rgba(255, 99, 132)',
                },
                {
                    label: 'Otra línea',
                    data: [20, 25, 60, 65, 45, 10, 0, 25, 35, 7, 20, 25]
                },
            ],
        };

        setChartData(midata);
    }
    
    
    var misoptions = {
        scales : {
            y : {
                min : 0
            },
            x: {
                ticks: { color: 'rgb(255, 99, 132)'}
            }
        }
    };

    return(
        <div>
          {chartData ? (
            <Line data={chartData} options={misoptions}/>
          ) : (
            <p>Cargando datos del gráfico...</p>
          )}
        </div>
        
        ) ;

};



export default LinesChart;