import React, { useEffect } from 'react';
import '../App.css';
import Button from '../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import video from '../images/video2.mp4'

const LandingPage = () => {
  const backgroundImageUrl = "https://imgs.search.brave.com/Cdid-Ljh-WIjSqap88oerJlbPlUBaEE6t8PYr1Wp5Yg/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9idXJz/dC5zaG9waWZ5Y2Ru/LmNvbS9waG90b3Mv/ZGV2ZWxvcGVyLWNv/ZGluZy1pbi1waHAu/anBnP3dpZHRoPTEw/MDAmZm9ybWF0PXBq/cGcmZXhpZj0wJmlw/dGM9MA";

  const navigate = useNavigate();

  useEffect(() => {
    const protectLandingPage = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log("No tokens are here");
        navigate("/login");
      } else {
        try {
          const response = await fetch(`http://localhost:3000/pages/landingpage`, {
            method: 'GET',
            headers: {
              "Authorization": `${token}`
            }
          });
          const data = await response.json();
          // Handle response based on status codes
          if (data.status === 200) {
            // Token is valid, continue to landing page
            console.log(data.msg);
          } else if (data.status === 400) {
            // No token provided, navigate to login page
            console.log(data.msg);
            navigate('/login');
          } else if (data.status === 411) {
            // Invalid token, navigate to login page
            console.log(data.msg);
            navigate('/login');
          }
        } catch (error) {
          console.error('Error checking token:', error);
          navigate('/login');
        }
      }
    };

    protectLandingPage();
    const intervalId = setInterval(protectLandingPage, 30000);
    
    return () => clearInterval(intervalId);
  }, [navigate]);

  return (
    <div
      className="bg-cover bg-center bg-no-repeat h-screen md:h-full"
      style={{ backgroundImage: `url(${backgroundImageUrl})`, width: '100vw', height: '100vh', overflow: 'hidden' }}
    >
    <div className="landing-page">
      <div className="max-landing">
        <div className="landing-contents">
          <header>
            The Best<span className='gradient1'> Todo Solution </span>You Can <span className='gradient2'>Find On </span>Internet
          </header>
          <span className="landing-description">
            You can create, display, edit, delete, and search the todos and it's completely working as well
          </span>

          <Link to="/todos"><Button buttonClass="landing-button" buttonValue="Create your first todo" /></Link>
        </div>
      {/* <img src="../../src/images/landing-image3.png" className="landing-image" /> */}
      
      </div>
    </div>
    </div>
  );
}

export default LandingPage;