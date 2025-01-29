import React from "react";

const WindowWashingCompanyWebsite: React.FC = () => {
  const containerStyle: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
  };

  const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '50px 0',
    borderRadius: '8px',
  };

  const headerTitleStyle: React.CSSProperties = {
    fontSize: '3rem',
    marginBottom: '10px',
  };

  const headerSubtitleStyle: React.CSSProperties = {
    fontSize: '1.2rem',
  };

  const sectionStyle: React.CSSProperties = {
    margin: '40px 0',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: '2rem',
    marginBottom: '20px',
    color: '#4CAF50',
  };

  const sectionTextStyle: React.CSSProperties = {
    fontSize: '1.1rem',
    marginBottom: '20px',
    lineHeight: '1.8',
  };

  const serviceListStyle: React.CSSProperties = {
    listStyleType: 'none',
  };

  const serviceItemStyle: React.CSSProperties = {
    fontSize: '1.1rem',
    marginBottom: '10px',
    paddingLeft: '20px',
    position: 'relative',
  };

  const benefitListStyle: React.CSSProperties = {
    listStyleType: 'none',
  };

  const benefitItemStyle: React.CSSProperties = {
    fontSize: '1.1rem',
    marginBottom: '10px',
    paddingLeft: '20px',
    position: 'relative',
  };

  const quoteButtonStyle: React.CSSProperties = {
    padding: '15px 30px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1.1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  };

  const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#333',
    color: 'white',
    marginTop: '40px',
  };

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <h1 style={headerTitleStyle}>Crystal Clear Windows</h1>
        <p style={headerSubtitleStyle}>Your trusted partner for spotless, streak-free windows.</p>
      </header>

      <section style={sectionStyle}>
        <h2 style={sectionTitleStyle}>About Us</h2>
        <p style={sectionTextStyle}>
          At Crystal Clear Windows, we take pride in delivering top-notch window washing services. With years of experience and a dedication to excellence, our team ensures your windows are spotless, streak-free, and gleaming. Whether it's residential or commercial, we’ve got the skills and the equipment to tackle windows of all shapes and sizes.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Our Services</h2>
        <ul style={serviceListStyle}>
          <li style={serviceItemStyle}>
            <strong>Residential Window Washing:</strong> Enjoy crystal-clear views from the comfort of your home.
          </li>
          <li style={serviceItemStyle}>
            <strong>Commercial Window Washing:</strong> Keep your business’s windows spotless and inviting for customers.
          </li>
          <li style={serviceItemStyle}>
            <strong>High-Rise Window Washing:</strong> We specialize in safely and efficiently cleaning windows in high-rise buildings.
          </li>
          <li style={serviceItemStyle}>
            <strong>Screen Cleaning:</strong> We don’t just clean windows; we’ll make sure your screens are fresh and free of dust.
          </li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Why Choose Us?</h2>
        <p style={sectionTextStyle}>
          We understand that you have many choices when it comes to window washing, which is why we go above and beyond to ensure customer satisfaction. Here’s why you should choose us:
        </p>
        <ul style={benefitListStyle}>
          <li style={benefitItemStyle}>Experienced professionals with extensive training and skill.</li>
          <li style={benefitItemStyle}>Eco-friendly cleaning products that are safe for your family, pets, and the environment.</li>
          <li style={benefitItemStyle}>Affordable pricing with no hidden fees.</li>
          <li style={benefitItemStyle}>Flexible scheduling to fit your needs.</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Get a Free Quote</h2>
        <p style={sectionTextStyle}>
          Ready to have your windows sparkling clean? Contact us today for a free, no-obligation quote. We look forward to making your windows shine!
        </p>
        <button
          style={quoteButtonStyle}
          onClick={() => alert("Requesting a quote...")}
        >
          Request a Quote
        </button>
      </section>

      <footer style={footerStyle}>
        <p>&copy; 2025 Crystal Clear Windows. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default WindowWashingCompanyWebsite;
