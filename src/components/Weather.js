import React, { useRef, useState } from 'react'
import ChartBot from './ChartBot';


function Weather() {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${year}-${month}-${day}`;


    function getSeason() {
        switch(month.toString()) {
            case '12':
            case '1':
            case '2':
                return 'winter';
            
            case '3':
            case '4':
            case '5':
                return 'spring';
            
            case '6':
            case '7':
            case '8':
                return 'summer';
            
            case '9':
            case '10': 
            case '11':
                return 'fall';
        }
    }

    let season = getSeason();
    
    const [location, setLocation] = useState('hyderabad');
    const textarea = useRef();
    const [serror, setError] = useState(null);
    

    // const url = 'https://weatherapi-com.p.rapidapi.com/forecast.json?q=hyderabad&dt=2024-09-18';
    const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${location}&dt=${currentDate}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'af277767f3msh989911cf5208f00p136707jsn8d48f60452f6',
            'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
        }
    };

    async function test() {
        try {
            const response = await fetch(url, options);
            const result = await response.json().then((value) => {
                return ChartBot(value,season);
            });
            textarea.current.value = result.result;
            console.log(result);
            // console.log(result.result);
            // console.log(result.current.temp_c);
            // console.log(result.current.uv);
            // console.log(result.current.wind_dir);
            // console.log(result.current.wind_mph);
            // console.log(result.current.humidity);

        } catch (error) {
            console.error(error);
            setError(error);
            textarea.current.value = serror;
        }

    }


    return (
        <>
            <section className='w-100 p-5 bg-black' style={{ height: '100vh' }}>
                <div className='container'>
                    <h1 className='text-white my-4'>Farmers App</h1>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label text-white">Enter State or District Name</label>
                        <input value={location} onChange={(e) => setLocation(e.target.value)} type="email" className="forzm-control ms-5 rounded p-2" id="exampleFormControlInput1" placeholder="name@example.com" />
                    </div>
                    <button className='d-block m-auto btn btn-success' onClick={test}>Submit</button>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label text-white">which crop is best for farming in {location}</label>
                        <textarea ref={textarea} className="form-control" id="exampleFormControlTextarea1" rows="10"></textarea>
                    </div>

                </div>

            </section>

        </>
    )
}

export default Weather
