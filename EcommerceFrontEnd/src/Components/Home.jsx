import React, { useEffect, useState } from 'react'
import ImageSlider from './ImageSlider'
import Card from './Card';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
import Shopees from './Shopees';
import Dsc from './Dsc';
import mancamera from '../../public/mancamera.jpg'
export const Home = () => {
  const image='https://www.gulahmedshop.com/media/wysiwyg/2024/01_banners/11_19/2024_11_19_salt_wb.jpg';
  const [popular, setpopular] = useState([])
  const [trending, settrending] = useState([])
const fetchpopular=()=>{
        fetch('http://localhost:5000/api/Shop/Wearhubpopular',{
            method:'GET',
        }).then((res)=>{
            return res.json()
        }).then((Data)=>{
            console.log(Data);
            setpopular(Data)
            
        })
    }

    const fetchtrending=()=>{
      fetch('http://localhost:5000/api/Shop/TopTrending',{
          method:'GET',
      }).then((res)=>{
          return res.json()
      }).then((Data)=>{
          console.log(Data);
          settrending(Data)
          
      })
  }
  useEffect(()=>{
    fetchpopular()
  },[])
    useEffect(()=>{
   
        fetchtrending()
       
    },[])

    
 
  useEffect(()=>{
    Aos.init();
  },[])
 
    
  return (
    
    <div>
        <ImageSlider />
      
    <div id='hello' className=' h-[730px] w-screen flex justify-between ' data-aos="flip-up"
     data-aos-easing="ease-out-cubic"
     data-aos-duration="2000">
     <u className='ml-28 mt-20'><Link className='text-gray-200 font-serif text-[20px] 'to='#'>Mens Collection</Link></u> 
      <u  className='mr-28 mt-20'><Link className='text-gray-200 font-serif text-[20px] ' to='#'>Women's Collection</Link></u>
      
    </div>
    <div className="relative h-screen w-full overflow-hidden" data-aos="flip-left"
     data-aos-easing="ease-out-cubic"
     data-aos-duration="2000">
  {/* YouTube Iframe */}
  <iframe
    className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
    src="https://www.youtube.com/embed/HtzCMTiG5aM?autoplay=1&mute=1&loop=1&playlist=HtzCMTiG5aM&controls=0&showinfo=0&modestbranding=1&rel=0"
    title="YouTube Background Video"
    frameBorder="0"
    allow="autoplay; fullscreen; encrypted-media"
    referrerPolicy="strict-origin-when-cross-origin"
    allowFullScreen
  ></iframe>
</div>

    <section className="p-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-300">WearHub's Popular</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8  ">
        {popular.map((items) => (
          <Card key={items._id} title={items.name} category={items.Category} price={items.price} image={items.bigimage} />
        ))}
      </div>
    </section>
    <div  data-aos="fade-down"
     data-aos-easing="linear"
     data-aos-duration="1500" className="desc flex justify-between lg:h-72 w-screen  pl-20 pr-20 md:h-40 sm:h-36 mt-20" style={{  backgroundColor: 'rgb(48, 46, 46)'}}>
        <Dsc number="01" title="Order Online" description="Share some details here. This is Flexible section where you can share anything you want." />
        <Dsc number="02" title="Free Shipping" description="Share some details here. This is Flexible section where you can share anything you want."/>
        <Dsc number="03" title="More Freshness" description="Share some details here. This is Flexible section where you can share anything you want."/>
        <Dsc number="04" title="Safe Payment" description="Share some details here. This is Flexible section where you can share anything you want."/>
      </div>
      <Shopees imagsrc={mancamera} paragraph="Explore Our Exquisite clothing Collections & Shop Now for the Perfect cloths" title="Call to Action"/>
        <br />
        <section className="p-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-300">Top Trending Items</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
      {trending.map((items) => (
          <Card key={items._id} title={items.name} category={items.Category} price={items.price} image={items.bigimage} />
        ))}
      </div>
    </section>
    </div>
    
    
  )
}

export default Home
