import './TeamCard.css'

const AboutUsTeamMember = ({ name, title1, title2, linkedinUrl, imageSrc }: { name: string; title1: string; title2: string; linkedinUrl: string; imageSrc: string }) => {
  return (
    <div className="about-us-team">
      <div className="about-us-card">
        <div className="profile-wrapper">
          <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
            <div className="profile-image">
              <img src={imageSrc} alt={name} />
            </div>
          </a>
          <br />
          <div className="profile-name">
            <h5>{name}</h5>
          </div>
          <div className="profile-title">
            <h6>{title1}</h6>
            <h6>{title2}</h6>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AboutUsTeamMember;
