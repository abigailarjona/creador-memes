import React, {useState} from "react";
import InputColor from 'react-input-color';
import {useEffect} from 'react';
import html2canvas from 'html2canvas';

const EditarMeme = () => {

    const [meme, setMeme] = useState([]);
    const [imagen, setImagen] = useState('');
    const [texto, setTexto] = useState();
    const [textoDos, setTextoDos] = useState();
    const [colorDos, setColorDos] = useState({});
    const [tamañoTexto, setTamañoTexto] = useState('Normal');
    const [fuente, setFuente] = useState('Anton');


    const elegirImg= (e)=>{
        setImagen(meme[e.target.value]);
         
    }
    const elegitTamaño = (e)=> {
        setTamañoTexto(e.target.value);
    }

    const elegirFuentes =(e) => {
        const letra = document.getElementById('texto');
        const letra2 = document.getElementById('textodos');

        setFuente(e.target.value);
        switch (e.target.value) {
            case 'Verdana':
                letra.style.fontFamily="'Verdana', sans-serif";
                letra2.style.fontFamily ="'Verdana', sans-serif";
                break;
            case 'Josefin Sans':
                letra.style.fontFamily="'Josefin Sans', sans-serif";
                letra2.style.fontFamily="'Josefin Sans', sans-serif";
                break;
            case 'Comic Neue':
                letra.style.fontFamily="'Comic Neue', cursive";
                letra2.style.fontFamily="'Comic Neue', cursive";
                break;
            case 'Times':
                letra.style.fontFamily="'Times', serif";
                letra2.style.fontFamily="'Times', serif";
                break;
            default:
                break;
        }
    }

    const textomeme = (e) =>{
        setTexto(e.target.value);
        
    }
    const textomemeDos = (e) =>{
        setTextoDos(e.target.value);
        
    } 

    const exportarMeme = (e) =>{
        html2canvas(document.querySelector('#meme'), { allowTaint: true, useCORS: true, width: 400})
        .then(function (canvas) {
            let img = canvas.toDataURL("memes/jpg");
            let link = document.createElement("a");
            link.download = "memepropio.jpg";
            link.href = img;
            link.click();
        });
    };

    useEffect(() => {
        fetch('https://api.imgflip.com/get_memes')
            .then(x => x.json())
            .then(response => {
                setMeme(response.data.memes)
                setImagen(response.data.memes[1])
            })

        
            .catch(err => console.error(err)); 
    }, []);

    return(
        <div className="text-center">
         
             <h1 className="mt-3 mb-3 text-center" >Editor de Memes</h1>
             <h3 className="mt-3 mb-3 text-center">elegí un meme</h3>
                <select id="qwe" defaultValue='0' onChange={elegirImg} className="form-select form-select-lg mb-3 w-50 m-auto" arial-label=".form-select-lg example" name ="img" >{
                    meme.map((op, index, arr) =>
                    <option value={index}>{op.name}</option>) }
                </select>
            <div className='principal'>
                <div className='contenedor'>
                    <div className='contenedorInputs'>
                        <h5 className="mt-3 mb-3 text-center">Ingresa el texto </h5>
                            <input id='inputUno' onChange={textomeme} className="form-control w-100 m-auto d-block" type="text" name="memetexto" maxLength={80} placeholder="Frase uno" arial-label="default input example"></input>
                            <input id='inputDos' onChange={textomemeDos} className="form-control w-100 m-auto d-block mt-3" type="text" name="memetexto" maxLength={80} placeholder="Frase dos" arial-label="default input example"></input>
                    </div>


                    <div className='selectores'>
                    <div className='selectorColor'>
                        <h5>Elegí un color</h5>
                        <InputColor initialValue={'#000000'} onChange={setColorDos} onInput />
                    </div>
                    <div className='selectorTamaño'>
                        <h5>Elegí un tamaño</h5>
                        <select id="selectTamaño" defaultValue='0' onChange={elegitTamaño} className="form-select mb-3 w-25 m-auto" arial-label=".form-select-lg example" name ="" >
                            <option value={'14'}>Chico</option>
                            <option value={'24'}>Normal</option>
                            <option value={'34'}>Grande</option>
                        </select>
                    </div>
                    <div className='selectorLetra'>
                        <h5>Elegí una letra</h5>
                            <select id="selectFuentes" defaultValue='0' onChange={elegirFuentes} className="form-select  m-auto" arial-label=".form-select-lg example" name ="" >
                                <option value={'Verdana'}>Verdana</option>
                                <option value={'Josefin Sans'}>Josefin Sans</option>
                                <option value={'Comic Neue'}>Comic Neue</option>
                                <option value={'Times'}>Times</option>
                            </select>
                    </div>
                </div>

                    <div contentFigure>
                        <figure id='meme'>
                            <p id="texto"  className="posicionBase" style={{color:`${colorDos.rgba}`, fontSize:`${tamañoTexto}px`, fontFamily:`${fuente};`}}>{texto}</p>
                            <p id="textodos" className="posicionBase" style={{color:`${colorDos.rgba}`, fontSize:`${tamañoTexto}px`, fontFamily:`${fuente};`}}>{textoDos}</p>
                            <img  src={imagen.url} alt="posicionBase" className='img' />
                        </figure>
                    </div>
                </div>
                
            </div>
            <button id='decargar' onClick={exportarMeme}  type="button" className="btn btn-warning btn-lg mt-4 mb-4 m-auto">Descargá tu Meme</button>         
        </div>
)
}

export default EditarMeme;