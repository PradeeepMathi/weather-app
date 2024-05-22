import '../Stylsheet/HumidityData.css'
import humidity from '../assets/humidity.png';
import wind from '../assets/wind.png'
export default function HumidityData({humiditys,winds}){
    return(
        <>
        <div className="data-container">
            <div className="element">
                <img src={humidity} alt='humidity' className='icon'/>
                <div className='data'>
                    <div className='humidity-percent'>{humiditys}%</div>
                    <div className='text'>Humidity</div>
                </div>
            </div>
            <div className="element">
                <img src={wind} alt='wind' className='icon'/>
                <div className='data'>
                    <div className='wind-percent'>{winds}Km/h</div>
                    <div className='text'>Wind Speed</div>
                </div>
            </div>
            
        </div>
       
        </>

    )
}