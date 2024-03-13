import React , {useState,useEffect} from 'react'
import {useDispatch , useSelector} from 'react-redux'
import { Link , useLocation } from 'react-router-dom'
import {filterfoodsaction} from '../redux/action/filteraction'
import {getfoodaction} from '../redux/action/foodaction'
import './home.css'
import {Offersection,Headersection , Daytime,Gallerysection} from './homestyle.js'
import { addtocart } from '../redux/action/cartaction'
import { clearcart } from '../redux/action/cartaction'
import { clearorder } from '../redux/action/orderaction'
import { deleteLocalStorage } from '../helpers/localstorageproecesses'
import {Successmessage} from '../helpers/message'
import {Showloading} from '../helpers/loading'
import axios from 'axios'


const Home =() => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [successmsg , setsuccessmsg] = useState(null);
  //console.log(location.state.params.paymentIntent.status)
  const {newsArrival} = useSelector(state => state.filters)
  const {foods} = useSelector(state => state.foods)
  const {loading} = useSelector(state => state.loading)

  useEffect(async() => {
      if(location.state && location.state.params.paymentIntent.status === 'succeeded'){
      await axios.post('https://restaurantappbackend.onrender.com/api/order',{
            orderdetails : JSON.parse(localStorage.getItem('cart')),
            paymentmethod:JSON.parse(localStorage.getItem('paymentmethod')),
            userId : JSON.parse(localStorage.getItem('user'))._id,
            useremail : JSON.parse(localStorage.getItem('user')).email,
          })
        }
  },[dispatch])

  useEffect(() => {
    if(location.state && location.state.params.paymentIntent.status === 'succeeded'){
      //clear cart redux
    dispatch(clearcart())
    //clear order redux
    dispatch(clearorder())
    //clear localstorage except user
    deleteLocalStorage('cart');
    deleteLocalStorage('shipping')
    deleteLocalStorage('paymentmethod')
    setsuccessmsg('the payment process is successful !')  
    setTimeout(() => {
      setsuccessmsg(null)
    }, 5000);
    } 
  },[])
  useEffect(() => {
    dispatch(filterfoodsaction('desc',3))
  },[dispatch])

  useEffect(() => {
    dispatch(getfoodaction())
  },[dispatch])

  const returnmenu = () => {
    const menuresult = [];
    for (let i = 0; i < 3; i++) {
     {foods && foods[i] &&
      menuresult.push(
       <div className="col-md-4" key={foods[i]._id}>
                    <div className="card managefoodcard">
                    <div className="card-img-top">
                        <img src={foods[i].foodimage} height="230" width="100%" />
                    </div>
                    <div className="card-body managefoodtext">
                    <div className="card-title">
                    <h5>
                    {foods[i].foodname}
                    </h5>
                    </div><hr style={{width:'80%'}} />
                    <div className="card-text">
                    {foods[i].price} $<br />
                    {foods[i].quantity <=0 ? 'outstock' : 'instock'}<br />
                    <h6>{foods[i].description}</h6>
                    </div>
                    </div>
                    <div className="card-body filterbuttons">
                    <Link to={`/product/${foods[i]._id}`}>
                        <button className="btn1 btn1-warning">
                         view product
                        </button>
                    </Link>
                        <button className="btn1 btn1-primary" disabled={foods[i].quantity <= 0} onClick={() => dispatch(addtocart(foods[i]))}>
                         add to card
                        </button>
                    </div>
                    </div>
                </div>
      );
     }
    }
    return(
        <div className='row'>
            {loading && Showloading()}
            {menuresult}
        </div>
      )
  }

  return (
    <div className="Home">
      <Headersection id="header">
        <div className="content">
        {successmsg && Successmessage('congratulations ... your payment operation is successful !')}
            <h1>Welcome To <span className="primary-text"> Food Lover </span> Restaurant</h1>
            <p>Here you can find Most delicacies food in the world</p>
            <Link to="/shop" className="btn1 btn1-primary">Book your items</Link>
        </div>
    </Headersection>

    <main>
        
        <section id="about">
            <div className="container">
                <div className="title">
                    <h2>The Food Lover history</h2>
                    <p>More than 25+ years of experience</p>
                </div>
                <div className="about-content">
                    <div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur, quibusdam saepe natus
                            numquam dolorum aliquam ducimus molestias tenetur? Quaerat, atque blanditiis. Debitis
                            voluptatem
                            sequi quibusdam nihil eveniet obcaecati soluta rem.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat nesciunt aspernatur earum
                            sequi
                            consequatur, quasi iste quod nam esse adipisci neque commodi voluptate deserunt architecto
                            rerum. Blanditiis labore sed sapiente.</p>
                        <a href="#" className="btn1 btn1-secondary">LEARN MORE</a>
                    </div>
                    <img src="./img/about_img.png" alt="Pizza" />
                </div>
            </div>
        </section>
        
        <Offersection id="offers">
            <div className="container">
                <div className="title">
                    <h2>Our Special Offers</h2>
                    <p>More than 25+ years of experience</p>
                </div>
                <div className="offers-items">
                    <div>
                        <img src="./img/offer1.png" alt="Quattro Pasta" />
                        <div>
                            <h3>Quattro Pasta</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, quibusdam.</p>
                            <p><del>$ 55.00</del> <span className="primary-text">$18.00</span></p>
                        </div>
                    </div>
                    <div>
                        <img src="./img/offer2.png" alt="Vegertarian Pasta" />
                        <div>
                            <h3>Vegertarian Pasta</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, quibusdam.</p>
                            <p><del>$ 55.00</del> <span className="primary-text">$18.00</span></p>
                        </div>
                    </div>
                    <div>
                        <img src="./img/offer3.png" alt="Quattro Pasta" />
                        <div>
                            <h3>Gluten-Free Pasta</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, quibusdam.</p>
                            <p><del>$ 55.00</del> <span className="primary-text">$18.00</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </Offersection>
        
        <section id="menu">
            <div className="container">
                <div className="title">
                    <h2>Our Special Menu</h2>
                    <p>Order two and get third for free</p>
                </div>
                <div className="menu-items">
                    <div className="menu-items-left">
                        <div className="menu-item">
                            <img src="./img/food1.png" alt="LASAL Cheese" />
                            <div>
                                <h3>LASAL CHEESE <span className="primary-text">$18.00</span></h3>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, explicabo.</p>
                            </div>
                        </div>
                        <div className="menu-item">
                            <img src="./img/food2.png" alt="JUMBO CRAB SHRIMP" />
                            <div>
                                <h3>JUMBO CRAB SHRIMP <span className="primary-text">$24.00</span></h3>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, explicabo.</p>
                            </div>
                        </div>
                        <div className="menu-item">
                            <img src="./img/food3.png" alt="KOKTAIL JUCIE" />
                            <div>
                                <h3>KOKTAIL JUCIE <span className="primary-text">$12.00</span></h3>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, explicabo.</p>
                            </div>
                        </div>
                        <div className="menu-item">
                            <img src="./img/food4.png" alt="CAPO STEAK" />
                            <div>
                                <h3>CAPO STEAK <span className="primary-text">$60.00</span></h3>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, explicabo.</p>
                            </div>
                        </div>
                        <div className="menu-item">
                            <img src="./img/food5.png" alt="ORGANIC FRUIT SALAD" />
                            <div>
                                <h3>ORGANIC FRUIT SALAD <span className="primary-text">$8.00</span></h3>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, explicabo.</p>
                            </div>
                        </div>
                        <div className="menu-item">
                            <img src="./img/food6.png" alt="CHEESE PIZZA" />
                            <div>
                                <h3>CHEESE PIZZA <span className="primary-text">$18.00</span></h3>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, explicabo.</p>
                            </div>
                        </div>
                    </div>
                    <div className="menu-items-right">
                        <div className="menu-item">
                            <img src="./img/food7.jpeg" alt="KOFTA MEAT" />
                            <div>
                                <h3>KOFTA MEAT <span className="primary-text">$40.00</span></h3>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, explicabo.</p>
                            </div>
                        </div>
                        <div className="menu-item">
                            <img src="./img/food8.jpeg" alt="SPANISH PIES" />
                            <div>
                                <h3>SPANISH PIES <span className="primary-text">$14.00</span></h3>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, explicabo.</p>
                            </div>
                        </div>
                        <div className="menu-item">
                            <img src="./img/food9.jpeg" alt="CHEESE TOST" />
                            <div>
                                <h3>CHEESE TOST <span className="primary-text">$6.00</span></h3>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, explicabo.</p>
                            </div>
                        </div>
                        <div className="menu-item">
                            <img src="./img/food10.jpeg" alt="FRUIT SALAD" />
                            <div>
                                <h3>FRUIT SALAD <span className="primary-text">$14.00</span></h3>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, explicabo.</p>
                            </div>
                        </div>
                        <div className="menu-item">
                            <img src="./img/food11.jpeg" alt="CHICKEN SHAWARMA" />
                            <div>
                                <h3>CHICKEN SHAWARMA <span className="primary-text">$20.00</span></h3>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, explicabo.</p>
                            </div>
                        </div>
                        <div className="menu-item">
                            <img src="./img/food12.jpeg" alt="MEGA CHEESE PIZZA" />
                            <div>
                                <h3>MEGA CHEESE PIZZA <span className="primary-text">$30.00</span></h3>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, explicabo.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <Link to='/shop' style={{textDecoration:'none'}}><button  className="btn1 btn1-third">EXPLORE FULL MENU</button></Link>
            </div>
        </section>
       
        <Daytime id="daytime">
            <div className="container">
                <div className="daytime-items">
                    <div className="daytime-item">
                        <img src="./img/breckfastIcon.png" alt="Breakfast" />
                        <h3>Breakfast</h3>
                        <p>8:00 am to 10:00 am</p>
                    </div>
                    <div className="daytime-item">
                        <img src="./img/lunchIcon.png" alt="Lunch" />
                        <h3>Lunch</h3>
                        <p>4:00 pm to 7:00 pm</p>
                    </div>
                    <div className="daytime-item">
                        <img src="./img/dinnerIcon.png" alt="Dinner" />
                        <h3>Dinner</h3>
                        <p>9:00 pm to 1:00 Am</p>
                    </div>
                    <div className="daytime-item">
                        <img src="./img/dessertIcon.png" alt="dessert" />
                        <h3>Dessert</h3>
                        <p>All day</p>
                    </div>
                </div>
            </div>
        </Daytime>
       
        <Gallerysection id="gallery">
            <div className="container">
                <h2>Our Food Gallery</h2>
                <div className="img-gallery">
                    <img src="./img/gallery1.jpeg" alt="gallery1" />
                    <img src="./img/gallery2.jpeg" alt="gallery2" />
                    <img src="./img/gallery3.jpeg" alt="gallery3" />
                    <img src="./img/gallery4.jpeg" alt="gallery4" />
                    <img src="./img/gallery5.jpeg" alt="gallery5" />
                    <img src="./img/gallery6.jpeg" alt="gallery6" />
                </div>
            </div>
        </Gallerysection>
       
        <section id="contact">
            <div className="container">
                <div className="contact-content">
                    <div className="contact-info">
                        <div>
                            <h3>ADDRESS</h3>
                            <p><i className="fa fa-map-marker" aria-hidden="true"></i> Hosary Mosque, 6 October, Egypt</p>
                            <p><i className="fa fa-phone" aria-hidden="true"></i> Phone: 123456789</p>
                            <p><i className="fa fa-envelope" aria-hidden="true"></i> support@foodlover.com</p>
                        </div>
                        <div>
                            <h3>WORKING HOURS</h3>
                            <p>8:00 am to 11:00 pm on Weekdays</p>
                            <p>11:00 am to 1:00 Am on Weekends</p>
                        </div>
                    </div>
                    <form id="form1">
                        <input type="text" name="Name" id="name" placeholder="Full Name" />
                        <input type="email" name="email" id="email" placeholder="Email Address" />
                        <input type="text" name="subject" id="subject" placeholder="Subject" />
                        <textarea name="message" id="message" cols="30" rows="5" placeholder="Message"></textarea>
                        <button type="submit" className="btn1 btn1-third" disabled="true">SEND MESSAGE</button>
                    </form>
                </div>
            </div>
        </section>
        
    </main>
    <footer id="footer">
        <p>Copyright &copy; 2023 All rights reserved | made by <b> <a href="https://mohamedelkashef.com "
                    target="_blank"> Mohamed Elkashef</a> </b></p>
    </footer>
    </div>
  );
}

export default Home;
