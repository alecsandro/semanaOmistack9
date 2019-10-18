import React,{useState,useMemo} from "react";
import camera from '../../assets/camera.svg';
import './styles.css';
import api from '../../services/Api';


export default function New({history}) {
  const [company, setCompany] = useState('');
  const [techs, setTechs] = useState('');
  const [price,setPrice] = useState('');
  const [thumbnail,setThumbnail] = useState(null);

  const preview = useMemo(()=>{
      return thumbnail ? URL.createObjectURL(thumbnail) : null;
    },
    [thumbnail]

  )

async function HandleSubmit(e){
  e.preventDefault();
  const user_id = localStorage.getItem('user');

  const data = new FormData();
  data.append('thumbnail',thumbnail);
  data.append('company',company);
  data.append('techs',techs);
  data.append('price',price);  

  await api.post('/spots', data, {
    headers: { user_id }
  })

  history.push('/dashboard');
}


  return (
    <form onSubmit={HandleSubmit}>
      <label id="thumbnail" style={{backgroundImage: `url(${preview})`}} className={thumbnail ? 'has_thumbnail': ''}>        
        <input type="file" onChange={x=> setThumbnail(x.target.files[0])} />
        <img src={camera} alt="sele imagem"/>
      </label>

      <label htmlFor="company">Empresa</label>
        <input type="text" id="company" placeholder="Nome da sua Empresa"value={company} onChange={event=>setCompany(event.target.value)} />        
        
        <label htmlFor="techs">Tecnologia</label>
        <input type="text" id="techs" placeholder="Quais tecnologias usam?" value={techs} onChange={event=>setTechs(event.target.value)} />        
      
        <label htmlFor="price">Tecnologia</label>
        <input type="text" id="price" placeholder="valor 0 para gratuito" value={price} onChange={event=>setPrice(event.target.value)} />

        <button type="submit" className="btn">Cadastrar</button>
        {console.log(company)}
    
      </form>
  );
}
