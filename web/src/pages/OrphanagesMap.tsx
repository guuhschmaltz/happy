import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import Leaflet from 'leaflet';

import 'leaflet/dist/leaflet.css';

import '../styles/pages/orphanages-map.css';

import mapMarkerImg from '../images/map-marker.svg';
import api from '../services/api';

interface Orphanage{
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

const mapIcon = Leaflet.icon({
  iconUrl: mapMarkerImg,
  iconSize: [58,68],
  iconAnchor: [29, 68],
  popupAnchor: [178, 2],
})

function OrphanagesMap(){
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
  //Utilizando o useState para ciclo de renderização
  useEffect(()=>{
    api.get('orphanages').then(response =>{
      setOrphanages(response.data);
    });
  }, []);
  //toda vez que fizermos uma chamada da api utilizamos o useEffect
  //o mesmo irá impedir que o mesmo item seja renderizado inúmeras vezes na tela
  return(
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy" />
          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando sua visita :)</p>
        </header>

        <footer>
          <strong>Cotia</strong>
          <span>São Paulo</span>
        </footer>
      </aside>

      <Map center={[-23.6059256,-46.9212177]}
        zoom={14}
        style={{ width:"100%", height:"100%" }}>
          <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {orphanages.map(orphanage =>{
            return(
              <Marker 
              icon={mapIcon}
              position={[orphanage.latitude,orphanage.longitude]}
              key={orphanage.id}
            >
              <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                {orphanage.name}
                <Link to={`orphanages/${orphanage.id}`}>
                  <FiArrowRight size={20} color="#fff"/>
                </Link>
              </Popup>
            </Marker>
            )
          })}

        </Map>


      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#fff" />
      </Link>
    </div>
  );
}

export default OrphanagesMap;