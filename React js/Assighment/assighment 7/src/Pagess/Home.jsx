import React from 'react'
import Navbar from '../components/Navbar'
import HeroSection1 from '../components/HeroSection1'
import HeroSection2 from '../components/HeroSection2'
import './card.css'
import Slider from '../components/Slider'
import Slider2 from '../components/Slider2'
import big1 from '../components/imgs/big1.png'
import big2 from '../components/imgs/big2.png'
import big3 from '../components/imgs/big3.png'
import big4 from '../components/imgs/big4.png'
import big5 from '../components/imgs/big5.png'
import big6 from '../components/imgs/big6.png'
import big7 from '../components/imgs/big7.png'
import big8 from '../components/imgs/big8.png'
import big9 from '../components/imgs/big9.png'

import small1 from '../components/imgs/small1.png'
import small2 from '../components/imgs/small2.png'
import small3 from '../components/imgs/small3.png'
import small4 from '../components/imgs/small4.png'
import small5 from '../components/imgs/small5.png'
import small6 from '../components/imgs/small6.png'
import small7 from '../components/imgs/small7.png'
import small8 from '../components/imgs/small8.png'
import small9 from '../components/imgs/small9.png'
import s1l from '../components/imgs/s1l.png'
import s2l from '../components/imgs/s2l.png'
import s3l from '../components/imgs/s3l.png'  
import s4l from '../components/imgs/s4l.png'
import s5l from '../components/imgs/s5l.png'
import Footer from '../components/Footer'
function Home() {
  const sl2img =[s1l,s2l,s3l,s4l,s5l]
  const bigScreenshots = [big1, big2, big3, big4, big5, big6, big7, big8, big9];
  const smallScreenshots = [small1, small2, small3, small4, small5, small6, small7, small8, small9];
  return (
    <div>
      <Navbar />
      <HeroSection1 bgi='https://www.apple.com/v/home/ck/images/heroes/iphone-family/hero_iphone_family__fuz5j2v5xx6y_large.jpg' title='iPhone' subtitle='Say hello to the latest generation of iPhone.' b1_text='Learn more' b2_text='Shop iPhone' />
      <br />
      <HeroSection1 bgi='https://www.apple.com/v/home/ck/images/heroes/apple-watch-ny/hero_apple_watch_ny__c8f1tzaoa72a_large.jpg' title='Apple Watch' subtitle='Turn resolutions into routines. Quit quitting your fitness goals.' b1_text='Learn more' b2_text='buy' />
      <br />
      <HeroSection1 bgi='https://www.apple.com/v/home/ck/images/heroes/ipad-air/hero_ipad_air_avail__c34ycq52exg2_large.jpg' title='iPad air' subtitle='Now supercharged by the M3 chip.' b1_text='Learn more' b2_text='buy' />
      <span style={{paddingBottom:'6px', visibility:'hidden'}}></span>
      <HeroSection2
        card1_title="MacBook Pro 14"
        card1_subtitle="Supercharged by M5"
        card1_img_src="https://www.apple.com/v/home/ck/images/promos/macbook-pro-m5/promo_macbook_pro_m5__gnwzdhijhm6a_large.jpg"
        card1_b1_text="Learn more"
        card1_b2_text="Buy"
        card2_logo={<i className="fab fa-apple"></i>}
        card2_title="WATCH ULTRA 3"
        card2_subtitle="Personal beast."
        card2_img_src="https://www.apple.com/v/home/ck/images/promos/apple-watch-ultra-3/promo_apple_watch_ultra3__bwvslhbxx99e_large.jpg"
        card2_b1_text="Learn more"
        card2_b2_text="Buy"
      />
            <div className="container-fluid bg-light mt-1">
      <div className="row g-3">
        
        {/* Left Card: AirPods Pro 3 */}
        <div className="col-12 col-md-6">
          <div className="card bg125 border-0 rounded-0 h-100 text-center pt-5 overflow-hidden" style={{ minHeight: '580px' }}>
            <div className="card-body p-0">
              <h2 className="mb-1" style={{fontSize:'28px', fontWeight:"600"}}>AirPods Pro 3</h2>
              <p className="mb-4" style={{fontSize:'16px'}}>
                The world’s best in-ear <br /> Active Noise Cancellation.
              </p>
              <div className="d-flex justify-content-center gap-2 mb-5">
                <button className="btn btn-primary rounded-pill px-4 py-2 fw-semibold hoverrrr" style={{margin:'0px 10px' , backgroundColor: '#0071e3', borderColor: '#0071e3' }}>
                  Learn more
                </button>
                <button className="rounded-pill px-4 py-2 fw-semibold hoverrr" style={{margin:'0px 10px' , color: '#0071e3', borderColor: '#0071e3' , background:'#fff'}}>
                  Buy
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Card: Apple Fitness+ */}
        <div className="col-12 col-md-6" >
          <div className="card border-0 bg123 rounded-0 h-100 text-center pt-5 overflow-hidden" style={{ minHeight: '580px' }}>
            <div className="card-body p-0">
              <h2 className="mb-1" style={{fontSize:'28px', fontWeight:"600"}}>
                <span className="me-1"><i className="fab fa-apple"></i></span>Fitness+
              </h2>
              <p className="mb-1" style={{fontSize:'16px'}}>
                Start the year strong with guided <br /> workouts and meditations.
              </p>
              <p className="text-secondary small mb-4">Get up to 3 months on us.¹</p>
              <div className="d-flex justify-content-center gap-2 mb-5">
                <button className="btn btn-primary rounded-pill px-4 py-2 fw-semibold hoverrrr" style={{margin:'0px 10px' , backgroundColor: '#0071e3', borderColor: '#0071e3' }}>
                  Learn more
                </button>
                <button className="rounded-pill px-4 py-2 fw-semibold hoper" style={{height: "52px" ,width: "140px" , margin:'0px 10px' , color: '#0071e3', borderColor: '#0071e3' , overflow:'none'}}>
                  Try it free
                </button>
              </div>
              
            </div>
          </div>
        </div>

      </div>
    </div>
    <div className="container-fluid bg-light mt-1">
      <div className="row g-3">
        
        {/* Left Card: AirPods Pro 3 */}
        <div className="col-12 col-md-6">
          <div className="card bg1250 border-0 rounded-0 h-100 text-center pt-5 overflow-hidden" style={{ minHeight: '580px' }}>
            <div className="card-body p-0">
              <h2 className="mb-1" style={{fontSize:'28px', fontWeight:"600"}}><i className="fab fa-apple"></i>Trade In</h2>
              <p className="mb-4" style={{fontSize:'16px'}}>
                Get up to $180–$650<br/> in credit when you trade in<br/> iPhone 13 or higher<sup>2</sup>.
              </p>
              <div className="d-flex justify-content-center gap-2 mb-5">
                <button className="btn btn-primary rounded-pill px-4 py-2 fw-semibold" style={{margin:'0px 10px' , backgroundColor: '#0071e3', borderColor: '#0071e3',height: "52px" ,  overflow:'none'}}>
                  Get your estimate
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Card: Apple Fitness+ */}
        <div className="col-12 col-md-6" >
          <div className="card border-0 bg1230 rounded-0 h-100 text-center pt-5 overflow-hidden" style={{ minHeight: '580px' }}>
            <div className="card-body p-0">
              <h2 className="mb-1" style={{fontSize:'28px', fontWeight:"600"}}>
                <span className="me-1"><i className="fab fa-apple"></i></span>Card
              </h2>
              <p className="mb-4" style={{fontSize:'16px',marginBottom:"24px"}}>
                Get up to 3% Daily Cash back<br/> with every purchase.
              </p>
              <div className="d-flex justify-content-center gap-2 mb-5">
                <button className="btn btn-primary rounded-pill px-4 py-2 fw-semibold hoverrrr" style={{margin:'0px 10px' , backgroundColor: '#0071e3', borderColor: '#0071e3' }}>
                  Learn more
                </button>
                <button className="rounded-pill px-4 py-2 fw-semibold hoper" style={{height: "52px" ,width: "140px" , margin:'0px 10px' , color: '#0071e3', borderColor: '#0071e3' , overflow:'none'}}>
                  Try it free
                </button>
              </div>
              
            </div>
          </div>
        </div>

      </div>
    </div>
    <br />
    <Slider 
      title="Endless entertainment." 
      bigImgData={bigScreenshots} 
      smallImgData={smallScreenshots} 
    />
    <Slider2 title="More from Apple." imgData={sl2img} />
    <Footer/>
    </div>
  )
}
export default Home